// src/components/TravelAssistant.js
import React, { useState } from 'react';
import { styles } from '../styles/professionalStyles';
import { RobotIcon, WandIcon, StarIcon } from './icons';

function TravelAssistant({ user, handleGenerateTravelAdvice, isTravelLoading, travelAdvice, travelError, setView }) {
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [localError, setLocalError] = useState(''); // Nuevo estado para errores locales

    const isPro = user && user.plan === 'pro';
    const isFree = user && user.plan === 'free';

    const today = new Date().toISOString().split('T')[0];

    const onGenerate = () => {
        setLocalError(''); // Limpiar errores previos
        // Validaciones básicas
        if (!destination || !startDate || !endDate) {
            setLocalError('Por favor, completa todos los campos (destino, fecha de inicio y fecha de fin).');
            return;
        }
        handleGenerateTravelAdvice(destination, startDate, endDate);
    };

    return (
        <div className="fade-in" style={styles.card}>
            <h3 style={styles.premiumCardTitle}>Asistente de Viaje IA {isPro && <span style={styles.proTag}>Pro</span>}</h3>
            {isFree && user.ai_travel_uses < 1 && (
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Te queda {1 - user.ai_travel_uses} uso gratuito. ¡Actualiza a Pro para usos ilimitados!
                </p>
            )}
            {isFree && user.ai_travel_uses >= 1 && (
                <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Has agotado tu uso gratuito. ¡Actualiza a Pro para usos ilimitados!
                </p>
            )}
            {!isFree && (
                <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Planifica tu maleta de forma inteligente. Ingresa tu destino y fechas para obtener una lista de equipaje optimizada por IA.
                </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Ciudad de destino"
                    style={styles.searchInput}
                    disabled={isTravelLoading || (isFree && user.ai_travel_uses >= 1)}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <label htmlFor="startDate" style={styles.inputLabel}>Fecha de inicio del viaje:</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={styles.searchInput}
                            min={today} // No se pueden seleccionar fechas pasadas
                            disabled={isTravelLoading || (isFree && user.ai_travel_uses >= 1)}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label htmlFor="endDate" style={styles.inputLabel}>Fecha de fin del viaje:</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={styles.searchInput}
                            min={startDate || today} // La fecha de fin no puede ser anterior a la de inicio
                            disabled={isTravelLoading || (isFree && user.ai_travel_uses >= 1)}
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={onGenerate}
                className="btn btn-gradient"
                disabled={isTravelLoading || !destination || !startDate || !endDate || (isFree && user.ai_travel_uses >= 1)}
                style={{ ...styles.aiButton, marginTop: '1.5rem' }}
            >
                <WandIcon />
                {isTravelLoading ? 'Analizando Destino...' : 'Generar Lista de Equipaje'}
            </button>

            {localError && <p style={styles.error}>{localError}</p>}
            {travelError && <p style={styles.error}>{travelError}</p>}

            {travelAdvice && (
                <div className="fade-in" style={{ ...styles.aiAdvice, marginTop: '1.5rem' }}>
                    <div style={styles.aiAdviceIconContainer}>
                        <RobotIcon />
                    </div>
                    <div>
                        <h4 style={styles.aiAdviceTitle}>Tu Equipaje Inteligente</h4>
                        <p style={styles.aiAdviceText}>{travelAdvice}</p>
                    </div>
                </div>
            )}

            {isFree && user.ai_travel_uses >= 1 && (
                <button onClick={() => setView('pricing')} style={{...styles.upgradeButton, marginTop: '1rem', width: 'auto'}}>
                    <StarIcon /> Ver Planes
                </button>
            )}
        </div>
    );
}

export default TravelAssistant;
