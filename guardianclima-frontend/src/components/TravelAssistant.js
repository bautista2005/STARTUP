import React, { useState } from 'react';
import { styles } from '../styles/professionalStyles';
import { RobotIcon, WandIcon, StarIcon } from './icons';
import Spinner from './Spinner'; // Import the new Spinner component

function TravelAssistant({ user, handleGenerateTravelAdvice, isTravelLoading, travelAdvice, travelError, setView, theme = 'light' }) {
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
        <div className="card-hover-gradient fade-in" style={styles.card(theme)}>
            <h3 style={styles.premiumCardTitle}>Asistente de Viaje IA {isPro && <span style={styles.proTag}>Pro</span>}</h3>
            {isFree && (
                <div style={{
                    backgroundColor: '#FEE2E2',
                    color: '#991B1B',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    border: '1px solid #FCA5A5',
                    fontWeight: 500
                }}>
                    ⚠️ Actualiza a plan premium para usar esta funcionalidad
                </div>
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
                    style={styles.searchInput(theme)}
                    disabled={isTravelLoading || isFree}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }}>
                        <label htmlFor="startDate" style={{...styles.inputLabel, textAlign: 'center'}}>Fecha de inicio del viaje:</label>
                        <input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            style={{...styles.searchInput(theme), textAlign: 'center', width: '100%'}}
                            min={today} // No se pueden seleccionar fechas pasadas
                            disabled={isTravelLoading || isFree}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }}>
                        <label htmlFor="endDate" style={{...styles.inputLabel, textAlign: 'center'}}>Fecha de fin del viaje:</label>
                        <input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            style={{...styles.searchInput(theme), textAlign: 'center', width: '100%'}}
                            min={startDate || today} // La fecha de fin no puede ser anterior a la de inicio
                            disabled={isTravelLoading || isFree}
                        />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button
                    onClick={onGenerate}
                    className="btn btn-gradient"
                    disabled={isTravelLoading || !destination || !startDate || !endDate || isFree}
                    style={{
                        ...styles.aiButton,
                        margin: '0',
                        ...(isFree && {
                            background: '#9CA3AF',
                            color: '#6B7280',
                            cursor: 'not-allowed',
                            opacity: '0.6',
                            transform: 'none',
                            boxShadow: 'none',
                            '&:hover': {
                                transform: 'none',
                                boxShadow: 'none',
                                background: '#9CA3AF'
                            }
                        })
                    }}
                >
                    {isTravelLoading ? <Spinner /> : <WandIcon />}
                    {isTravelLoading ? 'Analizando Destino...' : 'Generar Lista de Equipaje'}
                </button>
            </div>

            {localError && <p style={styles.error}>{localError}</p>}
            {travelError && <p style={styles.error}>{travelError}</p>}

            {travelAdvice && (
                <div className="fade-in" style={{ ...styles.aiAdvice(theme), marginTop: '1.5rem' }}>
                    <div style={styles.aiAdviceIconContainer(theme)}>
                        <RobotIcon />
                    </div>
                    <div>
                        <h4 style={{ ...styles.aiAdviceTitle(theme), textAlign: 'center' }}>Tu Equipaje Inteligente</h4>
                        <p style={{ ...styles.aiAdviceText(theme), whiteSpace: 'pre-line' }}>{travelAdvice}</p>
                    </div>
                </div>
            )}

            {isFree && (
                <button 
                    onClick={() => setView('pricing')} 
                    style={{
                        marginTop: '1.5rem',
                        width: '100%',
                        background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FF6B6B 100%)',
                        backgroundSize: '200% 100%',
                        color: 'white',
                        border: 'none',
                        borderRadius: '1.2rem',
                        padding: '1.2rem 2rem',
                        fontWeight: '700',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundPosition = '100% 0';
                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundPosition = '0% 0';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                    }}
                >
                    <StarIcon />
                    🚀 Desbloquear Premium
                </button>
            )}
        </div>
    );
}

export default TravelAssistant;
