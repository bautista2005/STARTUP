import React from 'react';
import { styles } from '../styles/professionalStyles';
import PlanTag from './PlanTag';
import WeatherCard from './WeatherCard';
import HistoryList from './HistoryList';
import { LogoutIcon, StarIcon } from './icons';

function MainView(props) {
    return (
        <div className="fade-in">
            <header style={styles.mainHeader}>
                <div>
                    <h1 style={styles.header}>Hola, {props.user.username}</h1>
                    <p style={styles.subtitle}>Tu pronóstico personalizado</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <PlanTag plan={props.user.plan} />

                    <button onClick={() => props.setView('pricing')} style={styles.upgradeButton}>
                        <StarIcon />
                        Gestionar Plan
                    </button>

                    <button onClick={props.handleLogout} className="logout-btn">
                        <LogoutIcon /> Cerrar Sesión
                    </button>
                </div>
            </header>
            
            <div style={{...styles.mainContentWrapper, justifyContent: props.historial.length > 0 ? 'space-between' : 'center' }}>
                <div style={styles.leftColumn}>
                    <div style={styles.card}>
                        <div style={styles.searchSection}>
                            <input type="text" value={props.ciudad} onChange={(e) => props.setCiudad(e.target.value)} placeholder="Busca una ciudad..." style={styles.searchInput} />
                            <button onClick={props.handleBuscarClima} className="btn btn-primary" disabled={props.isLoading || props.isAdviceLoading}>
                                {props.isLoading ? 'Buscando...' : 'Buscar'}
                            </button>
                        </div>
                        <button onClick={props.handleBuscarHistorial} style={styles.historyToggle} disabled={props.isLoading || props.isAdviceLoading}>
                            {props.historial.length > 0 ? 'Ocultar Historial' : 'Mostrar Historial'}
                        </button>
                    </div>

                    {props.isLoading && !props.clima && <p style={{textAlign: 'center', marginTop: '2rem', color: '#6b7280'}}>Buscando clima...</p>}
                    {props.error && !props.clima && <p style={styles.error}>{props.error}</p>}
                    
                    {props.clima && <WeatherCard {...props} />}
                </div>
                {props.historial.length > 0 && 
                    <div style={styles.rightColumn}>
                        <HistoryList user={props.user} historial={props.historial} isHiding={props.isHidingHistory} />
                    </div>
                }
            </div>
        </div>
    );
}

export default MainView;