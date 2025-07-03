import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { styles } from '../styles/professionalStyles';
import { jwtDecode } from 'jwt-decode';

// --- Función para verificar y renovar el token ---
const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            return true;
        }
        return false;
    } catch (e) {
        return true;
    }
};

const refreshToken = async () => {
    // Aquí va la lógica para renovar el token, por ejemplo, llamando a tu endpoint de refresh
    // Esto es un placeholder, necesitas implementar la lógica real
    console.log("Token-ul a expirat, este necesară reînnoirea");
    // const response = await fetch('/api/refresh', { method: 'POST' });
    // const data = await response.json();
    // localStorage.setItem('token', data.access_token);
    // return data.access_token;
    return null; // Devuelve null si la renovación falla
};


// Icono de Checkmark para las características
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>  
);

function PlanCard({ plan, popular, handleUpgrade, isCurrentUserPlan, onSelectPlan }) {
    const cardStyle = {
        ...styles.card,
        flex: 1,
        minWidth: '280px',
        textAlign: 'center',
        border: popular ? '2px solid #6d28d9' : '1px solid #e5e7eb',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: popular ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2f7 100%)' : '#fff', // Subtle gradient for popular card
    };
    
    const buttonStyle = popular && !isCurrentUserPlan ? "btn btn-primary" : "btn btn-secondary";

    const features = {
        'free': ["Clima actual y pronóstico", "Consejo de IA básico del día", "Historial de 5 consultas", "Publicidad no intrusiva"],
        'premium': ["Todo lo del plan gratuito", "Sin anuncios", "Alertas Proactivas Avanzadas", "Historial Ilimitado y Analítica", "Widgets Personalizables", "Asistente de Viaje IA"],
        
    };
    
    return (
        <div style={cardStyle}>
            {popular && <div style={{position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#6d28d9', color: 'white', padding: '0.25rem 1rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600, boxShadow: '0 4px 8px rgba(0,0,0,0.2)'}}>MÁS POPULAR</div>}
            <h3 style={{fontSize: '1.5rem', fontWeight: 700, color: '#4f46e5', margin: '1rem 0'}}>{plan.name}</h3>
            <p style={{fontSize: '2.5rem', fontWeight: 800, margin: 0}}>
                {plan.originalPrice && <span style={{textDecoration: 'line-through', color: '#6b7280', fontSize: '1.5rem', marginRight: '0.5rem'}}>{plan.originalPrice} USD</span>}
                {plan.price} USD
            </p>
            {plan.originalPrice && <div style={{position: 'absolute', top: '80px', right: '10px', background: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, transform: 'rotate(10deg)'}}>¡50% OFF!</div>}
            <p style={{color: '#6b7280', marginBottom: '2rem'}}>por mes</p>
            <ul style={{listStyle: 'none', padding: 0, textAlign: 'left', flexGrow: 1}}>
                {(features[plan.id] || []).map((feature, index) => (
                    <li key={index} style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <CheckIcon />
                        {feature}
                    </li>
                ))}
            </ul>
            {plan.id === 'premium' && !isCurrentUserPlan ? (
                <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                    <PayPalButtons
                        createOrder={async (data, actions) => {
                            let token = localStorage.getItem('token');
                            if (isTokenExpired(token)) {
                                token = await refreshToken();
                                if (!token) {
                                    alert("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
                                    return;
                                }
                            }
                            return fetch('/api/paypal/create-order', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ plan_id: plan.id })
                            })
                            .then(res => res.json())
                            .then(data => {
                                console.log('PayPal createOrder response:', data);
                                if (!data.orderID) {
                                    throw new Error('No se recibió el ID de la orden de PayPal.');
                                }
                                return data.orderID;
                            })
                            .catch(err => {
                                alert(err.message);
                                // Optionally: handle error more gracefully
                                throw err; // Ensure PayPal SDK knows the order creation failed
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then(details => {
                                alert('Transaction completed by ' + details.payer.name.given_name);
                                handleUpgrade(plan.id);
                            });
                        }}
                    />
                </PayPalScriptProvider>
            ) : (
                <button
                    className={buttonStyle}
                    style={{width: '100%', marginTop: '2rem'}}
                    onClick={() => isCurrentUserPlan ? null : (onSelectPlan ? onSelectPlan() : handleUpgrade(plan.id))}
                    disabled={isCurrentUserPlan}
                >
                    {isCurrentUserPlan ? 'Tu Plan Actual' : plan.cta}
                </button>
            )}
        </div>
    );
}

export default PlanCard;