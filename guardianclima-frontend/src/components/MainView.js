// MainView.js

import React, { useRef, useEffect } from 'react';
import { styles } from '../styles/professionalStyles';
import PlanTag from './PlanTag';
import WeatherCard from './WeatherCard';
import HistoryList from './HistoryList';
import TravelAssistant from './TravelAssistant'; // --- NUEVO: Importar el componente
import { LogoutIcon, StarIcon, WandIcon, RobotIcon } from './icons'; // Asegúrate de que WandIcon y RobotIcon estén importados

function MainView(props) {
    // Desestructurar las props para facilitar el uso y la lectura del código
    const {
        user, // Información del usuario (incluye .plan, .username) 
        setView, // Función para cambiar la vista (e.g., a 'pricing') 
        handleLogout, // Función para cerrar sesión 
        ciudad, // Ciudad actual en el input de búsqueda 
        setCiudad, // Función para actualizar la ciudad en el input 
        handleBuscarClima, // Función para buscar el clima 
        isLoading, // Estado de carga para la búsqueda de clima 
        isAdviceLoading, // Estado de carga para el consejo IA básico 
        handleBuscarHistorial, // Función para mostrar/ocultar historial 
        historial, // Datos del historial de búsquedas 
        error, // Mensaje de error general 
        clima, // Datos del clima actual 
        consejoIA, // Consejo IA básico (texto) 
        handleConsejoIA, // función para el consejo IA básico
        // --- NUEVAS PROPS PARA EL CONSEJO DE VESTIMENTA CON IMÁGENES ---
        selectedFiles, // Archivos de imagen seleccionados por el usuario
        setSelectedFiles, // Función para actualizar los archivos seleccionados
        aiOutfitConsejo, // Consejo de vestimenta IA basado en imágenes
        isAiOutfitLoading, // Estado de carga para el consejo de vestimenta con imágenes
        aiOutfitError, // Mensaje de error para el consejo de vestimenta con imágenes
        handleGenerateAiOutfit, // Función para generar el consejo de vestimenta con imágenes
        submittedImages, // Las imágenes que generaron el consejo
        outfitCity, // --- NUEVO: Ciudad para el consejo de outfit
        setOutfitCity, // --- NUEVO: Setter para la ciudad del outfit

        // --- PROPS PARA EL ASISTENTE DE VIAJE ---
        handleGenerateTravelAdvice,
        isTravelLoading,
        travelAdvice,
        travelError,
        // --- FIN NUEVAS PROPS ---
    } = props;

    const fileInputRef = useRef(null); // --- NUEVO: Referencia para el input de archivo

    // --- NUEVO: Efecto para limpiar el input de archivo después de la carga ---
    useEffect(() => {
        // Si la carga ha terminado y tenemos un consejo, reseteamos el input
        if (!isAiOutfitLoading && aiOutfitConsejo) {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [isAiOutfitLoading, aiOutfitConsejo]);

    // Función auxiliar para manejar el cambio de archivos en el input de tipo 'file'
    const handleFileChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };

    // Función auxiliar para verificar si el usuario tiene un plan Premium o Pro 
    const isPremium = user && user.plan === 'premium';
    const isFree = user && user.plan === 'free';

    return (
        <div className="fade-in" style={{ minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
            {/* Enhanced Header */}
            <header style={styles.mainHeader}>
                <div>
                    <h1 style={styles.header}>Hola, {user?.username}</h1>
                    <p style={styles.subtitle}>Tu pronóstico personalizado</p>
                </div>
                <div className="header-content" style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    {/* Muestra la etiqueta del plan actual del usuario  */}
                    <PlanTag plan={user?.plan} />

                    {/* Botón para gestionar el plan y acceder a la página de precios  */}
                    <button onClick={() => setView('pricing')} style={styles.upgradeButton}>
                        <StarIcon />
                        Gestionar Plan
                    </button>

                    {/* Botón para cerrar sesión  */}
                    <button onClick={handleLogout} className="logout-btn">
                        <LogoutIcon /> Cerrar Sesión
                    </button>
                </div>
            </header>

            {/* Enhanced Main Content Layout */}
            <div style={styles.mainContentWrapper}>
                <div className="main-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 350px',
                    gap: '2rem',
                    alignItems: 'flex-start',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 2rem'
                }}>
                    {/* Main Content Area */}
                    <div style={styles.mainContentArea}>
                        {/* Search Card */}
                        <div style={styles.card}>
                            <div style={styles.searchCardCentered}>
                                <h3 style={styles.cardTitle}>Buscar Clima</h3>
                                <div className="search-section" style={styles.searchSection}>
                                    <input
                                        type="text"
                                        value={ciudad}
                                        onChange={(e) => setCiudad(e.target.value)}
                                        placeholder="Busca una ciudad..."
                                        style={styles.searchInput}
                                    />
                                    <button
                                        onClick={handleBuscarClima}
                                        className="btn btn-primary"
                                        style={{ 
                                            flexShrink: 0,
                                            minWidth: '120px',
                                            height: '56px',
                                            borderRadius: '1.2rem',
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            boxShadow: '0 4px 16px rgba(59,130,246,0.13)',
                                            background: 'linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)',
                                            border: 'none',
                                            transition: 'background 0.2s, box-shadow 0.2s',
                                        }}
                                        // Deshabilita los botones si alguna de las operaciones de IA está en curso
                                        disabled={isLoading || isAdviceLoading || isAiOutfitLoading}
                                    >
                                        {isLoading ? 'Buscando...' : 'Buscar'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mensajes de carga y error para la búsqueda de clima */}
                        {isLoading && !clima && (
                            <div style={{
                                textAlign: 'center', 
                                marginTop: '2rem', 
                                color: '#64748B',
                                fontSize: '1.125rem',
                                fontWeight: 500
                            }}>
                                🔍 Buscando clima...
                            </div>
                        )}
                        {error && !clima && <p style={styles.error}>{error}</p>}

                        {/* Muestra la tarjeta del clima si hay datos  */}
                        {clima && <WeatherCard
                            clima={clima}
                            consejoIA={consejoIA} // Pasa el consejo IA básico a WeatherCard
                            isAdviceLoading={isAdviceLoading} // Pasa el estado de carga del consejo IA básico
                            handleConsejoIA={handleConsejoIA} // Pasa la función para el consejo IA básico
                        />}

                        {/* --- NUEVA SECCIÓN: CONSEJO DE VESTIMENTA CON IMÁGENES (PREMIUM/PRO) --- */}
                        <div className="fade-in card-hover" style={styles.card}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75em', marginBottom: '0.5em' }}>
                                <h3 style={styles.premiumCardTitle}>
                                    Consejo de Vestimenta con IA{isPremium ? ' Premium' : ''}
                                </h3>
                            </div>
                            
                            {/* Usage Information */}
                            {isFree && user.ai_outfit_uses < 3 && (
                                <div style={{
                                    backgroundColor: '#FEF3C7',
                                    color: '#92400E',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    marginBottom: '1.5rem',
                                    textAlign: 'center',
                                    border: '1px solid #FDE68A',
                                    fontWeight: 500
                                }}>
                                    🎯 Te quedan {3 - user.ai_outfit_uses} usos gratuitos. ¡Actualiza a Premium para usos ilimitados!
                                </div>
                            )}
                            {isFree && user.ai_outfit_uses >= 3 && (
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
                                    ⚠️ Has agotado tus usos gratuitos. ¡Actualiza a Premium para usos ilimitados!
                                </div>
                            )}
                            {!isFree && (
                                <p style={{
                                    color: '#64748B', 
                                    fontSize: '1rem', 
                                    marginBottom: '1.5rem', 
                                    textAlign: 'center',
                                    lineHeight: '1.6'
                                }}>
                                    📸 Sube fotos de tu ropa y elige una ciudad para obtener recomendaciones personalizadas basadas en el clima.
                                </p>
                            )}

                            {/* --- NUEVO: Input para la ciudad del outfit --- */}
                            <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                                <label style={styles.inputLabel}>Ciudad para el consejo</label>
                                <input
                                    type="text"
                                    value={outfitCity}
                                    onChange={(e) => setOutfitCity(e.target.value)}
                                    placeholder="Elige una ciudad para el consejo..."
                                    style={{...styles.searchInput, width: '100%', boxSizing: 'border-box'}}
                                    disabled={isAiOutfitLoading || (isFree && user.ai_outfit_uses >= 3)}
                                />
                            </div>

                            {/* File Upload Section */}
                            <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                                <label style={styles.inputLabel}>Fotos de tu ropa</label>
                                <input
                                    type="file"
                                    multiple // Permite seleccionar múltiples archivos
                                    accept="image/*" // Solo acepta archivos de imagen
                                    onChange={handleFileChange} // Llama a la función al cambiar la selección de archivos
                                    style={{...styles.fileInput, width: '100%'}} // Aplica estilos para el input de archivo
                                    disabled={isAiOutfitLoading || (isFree && user.ai_outfit_uses >= 3)}
                                    ref={fileInputRef} // --- NUEVO: Asignar la referencia
                                />
                                {/* Muestra los nombres de los archivos seleccionados */}
                                {selectedFiles.length > 0 && (
                                    <div style={{
                                        marginTop: '0.75rem', 
                                        fontSize: '0.875rem', 
                                        color: '#64748B',
                                        backgroundColor: '#F1F5F9',
                                        padding: '0.75rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #E2E8F0'
                                    }}>
                                        📁 Archivos seleccionados: {selectedFiles.map(file => file.name).join(', ')}
                                    </div>
                                )}
                            </div>

                            {/* Botón para generar el consejo de IA con imágenes */}
                            <button
                                onClick={handleGenerateAiOutfit} // Llama a la función para enviar las imágenes y obtener el consejo
                                className="btn btn-gradient"
                                // Deshabilita el botón si está cargando, no hay archivos seleccionados o no se ha ingresado una ciudad
                                disabled={isAiOutfitLoading || selectedFiles.length === 0 || !outfitCity || (isFree && user.ai_outfit_uses >= 3)}
                                style={{...styles.aiButton, marginTop: '1rem', width: '100%'}}
                            >
                                <WandIcon />
                                {isAiOutfitLoading ? 'Analizando Ropa...' : 'Generar Consejo de Vestimenta'}
                            </button>

                            {/* Muestra mensajes de error específicos para esta funcionalidad */}
                            {aiOutfitError && <p style={styles.error}>{aiOutfitError}</p>}

                            {/* Muestra el consejo de vestimenta si ya se generó */}
                            {aiOutfitConsejo && (
                                <div className="fade-in" style={{...styles.aiAdvice, marginTop: '2rem'}}>
                                    <div style={styles.aiAdviceIconContainer}>
                                        <RobotIcon />
                                    </div>
                                    <div style={{ width: '100%', textAlign: 'center' }}>
                                        <h4 style={styles.aiAdviceTitle}>Tu Outfit por Guardián IA</h4>
                                        {/* Galería de imágenes subidas */}
                                        {submittedImages.length > 0 && (
                                            <div style={styles.imageGallery}>
                                                {submittedImages.map((image, index) => (
                                                    <img key={index} src={image} alt={`prenda ${index + 1}`} style={styles.galleryImage} />
                                                ))}
                                            </div>
                                        )}
                                        <p style={styles.aiAdviceText}>{aiOutfitConsejo}</p>
                                    </div>
                                </div>
                            )}

                            {isFree && user.ai_outfit_uses >= 3 && (
                                <button onClick={() => setView('pricing')} style={{...styles.upgradeButton, marginTop: '1.5rem', width: '100%'}}>
                                    <StarIcon /> Ver Planes Premium
                                </button>
                            )}
                        </div>
                        {/* --- FIN NUEVA SECCIÓN --- */}

                        {/* --- NUEVA SECCIÓN: ASISTENTE DE VIAJE (PREMIUM/PRO) --- */}
                        {user.plan === 'premium' && (
                            <TravelAssistant 
                                user={user}
                                handleGenerateTravelAdvice={handleGenerateTravelAdvice}
                                isTravelLoading={isTravelLoading}
                                travelAdvice={travelAdvice}
                                travelError={travelError}
                                setView={setView}
                            />
                        )}
                        {/* --- FIN NUEVA SECCIÓN --- */}
                    </div>

                    {/* Enhanced History Sidebar */}
                    <div className="history-sidebar" style={{ 
                        ...styles.card, 
                        ...styles.historyCard, 
                        width: '100%', 
                        opacity: '1',
                        pointerEvents: 'auto',
                        position: 'sticky',
                        top: '2rem'
                    }}>
                        <HistoryList 
                            user={user} 
                            historial={user?.plan === 'free' ? historial.slice(0, 5) : historial} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainView;