import React from 'react';
import { styles } from '../styles/professionalStyles';

// Icono de Checkmark para las características
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

function PlanCard({ plan, popular, handleUpgrade, isCurrentUserPlan }) {
    const cardStyle = {
        ...styles.card,
        flex: 1,
        minWidth: '280px',
        textAlign: 'center',
        border: popular ? '2px solid #6d28d9' : '1px solid #e5e7eb',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
    };
    
    const buttonStyle = popular && !isCurrentUserPlan ? "btn btn-primary" : "btn btn-secondary";

    const features = {
        'free': ["Clima actual y pronóstico", "Consejo de IA básico del día", "Historial de 5 consultas", "Publicidad no intrusiva"],
        'premium': ["Todo lo del plan gratuito", "Sin anuncios", "Alertas Proactivas Avanzadas", "Historial Ilimitado y Analítica", "Widgets Personalizables", "Asistente de Viaje IA"],
        'pro': ["Todo lo del Plan Premium", "Soporte para múltiples perfiles (familia)", "Asistente de Actividades IA", "Mapas Interactivos (radar)", "Integración con Calendarios"]
    };
    
    return (
        <div style={cardStyle} className="fade-in">
            {popular && <div style={{position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#6d28d9', color: 'white', padding: '0.25rem 1rem', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 600}}>MÁS POPULAR</div>}
            <h3 style={{fontSize: '1.5rem', fontWeight: 700, color: '#4f46e5', margin: '1rem 0'}}>{plan.name}</h3>
            <p style={{fontSize: '2.5rem', fontWeight: 800, margin: 0}}>{plan.price}</p>
            <p style={{color: '#6b7280', marginBottom: '2rem'}}>por mes</p>
            <ul style={{listStyle: 'none', padding: 0, textAlign: 'left', flexGrow: 1}}>
                {features[plan.id].map((feature, index) => (
                    <li key={index} style={{padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <CheckIcon />
                        {feature}
                    </li>
                ))}
            </ul>
            <button
                className={buttonStyle}
                style={{width: '100%', marginTop: '2rem'}}
                onClick={() => handleUpgrade(plan.id)}
                disabled={isCurrentUserPlan}
            >
                {isCurrentUserPlan ? 'Tu Plan Actual' : plan.cta}
            </button>
        </div>
    );
}

export default PlanCard;