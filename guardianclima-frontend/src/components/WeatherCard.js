import React from 'react';
import { styles } from '../styles/professionalStyles';
import { ThermometerIcon, HumidityIcon, WandIcon, RobotIcon } from './icons';

function WeatherCard({ clima, consejoIA, isAdviceLoading, handleConsejoIA }) {
    return (
        <div className="fade-in" style={styles.card}>
            {/* Cabecera con nombre de la ciudad e icono del clima */}
            <div style={styles.weatherHeader}>
                <div>
                    <h3 style={styles.weatherCity}>{clima.name}, {clima.sys.country}</h3>
                    <p style={styles.weatherDescription}>{clima.weather[0].description}</p>
                </div>
                <img 
                    src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} 
                    alt="weather icon" 
                    style={styles.weatherIcon}
                />
            </div>

            {/* Grid con detalles de temperatura y humedad */}
            <div style={styles.weatherGrid}>
                <div style={{...styles.infoCard, ...styles.tempCard}}>
                    <ThermometerIcon /> 
                    <p><strong>{Math.round(clima.main.temp)}°C</strong><br/>Temperatura</p>
                </div>
                <div style={{...styles.infoCard, ...styles.humidityCard}}>
                    <HumidityIcon /> 
                    <p><strong>{clima.main.humidity}%</strong><br/>Humedad</p>
                </div>
            </div>

            {/* Botón para solicitar el consejo de la IA */}
            <button 
                onClick={handleConsejoIA} 
                className="btn btn-gradient" 
                disabled={isAdviceLoading} 
                style={styles.aiButton}
            >
                <WandIcon /> 
                {isAdviceLoading ? 'Generando...' : 'Obtener Consejo de Vestimenta IA'}
            </button>

            {/* Sección que aparece cuando se recibe el consejo de la IA */}
            {consejoIA && (
                <div className="fade-in" style={styles.aiAdvice}>
                    <div style={styles.aiAdviceIconContainer}>
                        <RobotIcon />
                    </div>
                    <div>
                        <h4 style={styles.aiAdviceTitle}>Consejo del Guardián IA</h4>
                        <p style={styles.aiAdviceText}>{consejoIA}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeatherCard;