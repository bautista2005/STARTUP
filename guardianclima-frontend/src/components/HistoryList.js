import React from 'react';
import { styles } from '../styles/professionalStyles';

function HistoryList({ historial, user, isHiding }) {
    return (
        <div className={isHiding ? 'fade-out' : 'fade-in'} style={{...styles.card, ...styles.historyCard}}>
            <h3 style={styles.cardTitle}>Historial de Búsquedas</h3>
            {user.plan === 'free' && (
                <div style={styles.freemiumMessage}>
                    Estás viendo tus últimas 5 búsquedas. <strong>¡Hazte Premium para ver el historial completo!</strong>
                </div>
            )}
            <ul style={styles.historyList}>
                {historial.map((item, index) => (
                    <li key={index} style={styles.historyItem}>
                        <span style={styles.historyTempBubble}>{Math.round(item.temperatura)}°C</span>
                        <div>
                            <strong style={styles.historyCity}>{item.ciudad}</strong>
                            <p style={styles.historyDesc}>{item.descripcion}</p>
                        </div>
                        <small style={styles.historyDate}>{new Date(item.fecha + ' UTC').toLocaleDateString('es-ES')}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HistoryList;