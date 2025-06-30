import React from 'react';
import { styles } from '../styles/professionalStyles';
import PlanCard from './PlanCard';

function PricingPage({ setView, handleUpgrade, currentUserPlan }) {
    const plans = [
        { id: 'free', name: 'Plan Gratuito', price: '$0', cta: 'Seleccionar' },
        { id: 'premium', name: 'Plan Premium', price: '$5', originalPrice: '$10', cta: '¡Aprovecha la Oferta!' }
    ];

    return (
        <div className="fade-in">
            <header style={{textAlign: 'center', marginBottom: '3rem'}}>
                <h1 style={{...styles.header, fontSize: '2.5rem'}}>Elige el Plan Perfecto Para Ti</h1>
                <p style={{...styles.subtitle, fontSize: '1.125rem'}}>Desbloquea todo el potencial de Guardián Clima.</p>
            </header>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center'}}>
                {plans.map(plan => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        popular={plan.id === 'premium'}
                        handleUpgrade={handleUpgrade}
                        isCurrentUserPlan={plan.id === currentUserPlan}
                    />
                ))}
            </div>
            <div style={{textAlign: 'center', marginTop: '3rem'}}>
                <button onClick={() => setView('main')} style={{...styles.historyToggle, fontSize: '1rem'}}>
                    &larr; Volver al pronóstico
                </button>
            </div>
        </div>
    );
}

export default PricingPage;