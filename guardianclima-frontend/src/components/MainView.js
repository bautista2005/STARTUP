// MainView.js

import React, { useRef, useEffect, useState } from 'react';
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
        setAiOutfitConsejo,
        // --- FIN NUEVAS PROPS ---
        lastOutfitCity,
    } = props;

    const fileInputRef = useRef(null); // --- NUEVO: Referencia para el input de archivo

    // --- NUEVO: Outfit history state ---
    const [outfitHistory, setOutfitHistory] = useState([]);
    const [selectedOutfitIndex, setSelectedOutfitIndex] = useState(null);
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOutfit, setModalOutfit] = useState(null);

    // Set the backend API base URL
    const API_BASE_URL = 'http://localhost:5000';

    // --- NUEVO: Efecto para limpiar el input de archivo después de la carga ---
    useEffect(() => {
        // Si la carga ha terminado y tenemos un consejo, reseteamos el input
        if (!isAiOutfitLoading && aiOutfitConsejo) {
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [isAiOutfitLoading, aiOutfitConsejo]);

    // Fetch outfit history from backend on mount/user change or after new AI advice
    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage. User may not be logged in.');
                return;
            }
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/outfits`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOutfitHistory(data);
                    setSelectedOutfitIndex(data.length > 0 ? 0 : null);
                } else {
                    const errorText = await res.text();
                    console.error('Failed to fetch outfit history:', res.status, errorText);
                }
            } catch (e) {
                console.error('Error fetching outfit history:', e);
            }
        };
        fetchHistory();
    }, [user, aiOutfitConsejo]);

    // Función auxiliar para manejar el cambio de archivos en el input de tipo 'file'
    const handleFileChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };

    // Función auxiliar para verificar si el usuario tiene un plan Premium o Pro 
    const isPremium = user && user.plan === 'premium';
    const isFree = user && user.plan === 'free';

    // --- UI logic for showing advice ---
    const showAdvice = () => {
        // Only show advice if a new one was generated in this session
        if (aiOutfitConsejo && submittedImages.length > 0 && lastOutfitCity) {
            return (
                <div className="fade-in" style={{...styles.aiAdvice, marginTop: '2rem'}}>
                    <div style={styles.aiAdviceIconContainer}>
                        <RobotIcon />
                    </div>
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        <h4 style={styles.aiAdviceTitle}>Tu Outfit por Guardián IA</h4>
                        <div style={styles.imageGallery}>
                            {submittedImages.map((image, index) => (
                                <img key={index} src={image} alt={`prenda ${index + 1}`} style={styles.galleryImage} />
                            ))}
                        </div>
                        <p style={{ ...styles.aiAdviceText, whiteSpace: 'pre-line' }}>{aiOutfitConsejo}</p>
                        <div style={{ color: '#64748B', fontSize: '0.9em', marginTop: '0.5em' }}>
                            <span>Ciudad: {lastOutfitCity}</span> &nbsp;|&nbsp;
                            <span>{new Date().toLocaleString('es-ES')}</span>
                        </div>
                    </div>
                </div>
            );
        }
        // Default message
        return (
            <div style={{ color: '#64748B', textAlign: 'center', marginTop: '2rem' }}>
                {'Genera un nuevo consejo de vestimenta para verlo aquí.'}
            </div>
        );
    };

    // Debug: log the outfit history before rendering
    console.log('outfitHistory:', outfitHistory);

    // Handler to open modal with outfit details
    const handleOpenModal = (outfit) => {
        setModalOutfit(outfit);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalOutfit(null);
    };

    useEffect(() => {
        if (typeof setAiOutfitConsejo === 'function') setAiOutfitConsejo('');
    }, []);

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
                        <div className="card-hover-gradient" style={styles.card}>
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
                        <div className="card-hover-gradient" style={styles.card}>
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

                            {/* --- File Upload Section --- */}
                            <div style={{ margin: '1.5rem 0' }}>
                                <input
                                    id="file-upload"
                                    type="file"
                                    multiple
                                    style={{ display: 'none' }}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    disabled={isAiOutfitLoading || (isFree && user.ai_outfit_uses >= 3)}
                                />
                                <label
                                    htmlFor="file-upload"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.75em',
                                        padding: '1.25em 2em',
                                        border: '2px dashed #3B82F6',
                                        borderRadius: '1rem',
                                        background: '#F1F5FE',
                                        color: '#2563EB',
                                        fontWeight: 600,
                                        fontSize: '1.1em',
                                        cursor: isAiOutfitLoading || (isFree && user.ai_outfit_uses >= 3) ? 'not-allowed' : 'pointer',
                                        transition: 'background 0.2s, border 0.2s',
                                        marginBottom: '0.5em'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.background = '#E0E7FF'}
                                    onMouseOut={e => e.currentTarget.style.background = '#F1F5FE'}
                                >
                                    <span role="img" aria-label="upload">📁</span>
                                    {selectedFiles && selectedFiles.length > 0
                                        ? `${selectedFiles.length} archivo(s) seleccionado(s)`
                                        : 'Elegir fotos de tu ropa'}
                                </label>
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

                            {/* --- Show selected outfit from history or latest AI advice --- */}
                            {showAdvice()}

                            {isFree && user.ai_outfit_uses >= 3 && (
                                <button onClick={() => setView('pricing')} style={{...styles.upgradeButton, marginTop: '1.5rem', width: '100%'}}>
                                    <StarIcon /> Ver Planes Premium
                                </button>
                            )}
                        </div>
                        {/* --- FIN NUEVA SECCIÓN --- */}

                        {/* --- NUEVA SECCIÓN: ASISTENTE DE VIAJE (PREMIUM/PRO) --- */}
                        <div className="card-hover-gradient" style={styles.card}>
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
                        </div>
                        {/* --- FIN NUEVA SECCIÓN --- */}
                    </div>

                    {/* Historial de Outfits Sidebar */}
                    <div className="history-sidebar card-hover-gradient" style={{ 
                        ...styles.card, 
                        ...styles.historyCard, 
                        width: '100%', 
                        opacity: '1',
                        pointerEvents: 'auto',
                        position: 'sticky',
                        top: '2rem'
                    }}>
                        <h3 style={{...styles.cardTitle, textAlign: 'center'}}>Historial de Outfits</h3>
                        <ul style={styles.historyList}>
                            {outfitHistory.length === 0 && (
                                <li style={{ color: '#64748B', textAlign: 'center', padding: '1.5rem 0' }}>No hay outfits generados aún.</li>
                            )}
                            {outfitHistory.map((item, index) => (
                                <li
                                className="history-item"
                                onClick={() => handleOpenModal(item)}
                                >
                                    <div>
                                        <strong style={styles.historyCity}>{item.city}</strong>
                                        <p style={styles.historyDesc}>{new Date(item.date).toLocaleDateString('es-ES')}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Modal for outfit details */}
            {isModalOpen && modalOutfit && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(2px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '1.5rem',
                        padding: '2rem',
                        maxWidth: 500,
                        width: '90%',
                        position: 'relative',
                        textAlign: 'center',
                        border: '2px solid transparent',
                        backgroundClip: 'padding-box, border-box',
                        backgroundOrigin: 'padding-box, border-box',
                        backgroundImage: 'linear-gradient(white, white), linear-gradient(90deg, #3B82F6, #6366F1)',
                        boxShadow: '0 8px 32px rgba(59,130,246,0.18)',
                        animation: 'modalFadeIn 0.3s cubic-bezier(.4,2,.6,1)'
                    }}>
                        <button onClick={handleCloseModal} style={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#64748B'
                        }}>&times;</button>
                        <h2 style={{marginBottom: '1rem', color: '#2563EB'}}>Outfit para {modalOutfit.city}</h2>
                        <div style={{color: '#64748B', marginBottom: '1rem'}}>{new Date(modalOutfit.date).toLocaleString('es-ES')}</div>
                        <div style={{textAlign: 'left', color: '#374151', fontSize: '1.1rem', whiteSpace: 'pre-line'}}>{modalOutfit.advice}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainView;