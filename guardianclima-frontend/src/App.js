// App.js

import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// --- 1. IMPORTACIONES ---
import { GlobalStyles } from './styles/GlobalStyles';
import { styles } from './styles/professionalStyles';
import AuthView from './components/AuthView';
import PersonalizationView from './components/PersonalizationView';
import MainView from './components/MainView';
import PricingPage from './components/PricingPage';
import LandingPage, { SharedNav } from './components/LandingPage';

// --- COMPONENTE PRINCIPAL ---
function App() {
  // --- 2. GESTIÓN DEL ESTADO CENTRALIZADO ---
  const [view, setView] = useState('landing');
  const [transitioning, setTransitioning] = useState(false);

  const handleSetView = (newView) => {
    if (view !== newView) {
      setTransitioning(true);
      setTimeout(() => {
        setView(newView);
        setTransitioning(false);
      }, 500); // Match CSS transition duration
    }
  };
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Estado para el formulario de autenticación
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estado de la app principal
  const [ciudad, setCiudad] = useState('');
  const [clima, setClima] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [consejoIA, setConsejoIA] = useState('');
  const [isAdviceLoading, setIsAdviceLoading] = useState(false);

  // --- NUEVOS ESTADOS PARA LA FUNCIONALIDAD DE IA CON IMÁGENES ---
  const [selectedFiles, setSelectedFiles] = useState([]); // Array para los archivos de imagen seleccionados
  const [aiOutfitConsejo, setAiOutfitConsejo] = useState(null); // Para el consejo de vestimenta con imágenes
  const [isAiOutfitLoading, setIsAiOutfitLoading] = useState(false); // Para el estado de carga del consejo de vestimenta
  const [aiOutfitError, setAiOutfitError] = useState(null); // Para errores del consejo de vestimenta con imágenes
  const [submittedImages, setSubmittedImages] = useState([]); // Para las imágenes que generaron el consejo
  const [outfitCity, setOutfitCity] = useState(''); // --- NUEVO: Ciudad para el consejo de outfit

  // --- ESTADOS PARA EL ASISTENTE DE VIAJE ---
  const [travelAdvice, setTravelAdvice] = useState(null);
  const [isTravelLoading, setIsTravelLoading] = useState(false);
  const [travelError, setTravelError] = useState(null);
  // --- FIN DE NUEVOS ESTADOS ---


  const API_URL = process.env.REACT_APP_API_BASE_URL;

  // --- 3. LÓGICA DE NEGOCIO Y MANEJADORES DE EVENTOS ---

  const updateUserFromToken = (token) => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentUser = {
            id: decoded.sub,
            username: decoded.username,
            plan: decoded.plan,
            prefs_saved: decoded.prefs_saved,
            ai_outfit_uses: decoded.ai_outfit_uses,
            ai_travel_uses: decoded.ai_travel_uses
        };
        setUser(currentUser);
        console.log("Updated currentUser:", currentUser); // Add this line
      } catch (e) {
        console.error("Token inválido o expirado:", e); // Añadir log para depuración
        handleLogout();
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        updateUserFromToken(storedToken);
    }
  }, []);

  const handleAuth = async (action) => {
    setError('');
    setIsLoading(true);
    try {
      if (action === 'register') {
        const res = await fetch(`${API_URL}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error en el registro.');
        alert(data.mensaje);
        await handleAuth('login');
      } else { // action === 'login'
        const res = await fetch(`${API_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error en el inicio de sesión.');
        localStorage.setItem('token', data.access_token);
        updateUserFromToken(data.access_token);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setClima(null);
    setHistorial([]);
    setConsejoIA('');
    setAiOutfitConsejo(null); // Limpiar también el consejo de vestimenta por imágenes
    setError('');
    setView('auth');
    // Limpiar los campos de autenticación al cerrar sesión
    setUsername('');
    setEmail('');
    setPassword('');
  };

  // --- NUEVA FUNCIÓN: Manejar el cambio entre login y registro ---
  const handleToggleAuthMode = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError(''); // Limpiar cualquier error previo
    // No es necesario cambiar la vista aquí, AuthView maneja su propio estado isRegister
  };

  // --- NUEVA FUNCIÓN: Cargar historial de consultas ---
  const handleFetchHistory = async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) return;

    try {
      const res = await fetch(`${API_URL}/api/v1/history`, {
        headers: { 'Authorization': `Bearer ${storedToken}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al cargar el historial.');
      setHistorial(data);
    } catch (err) {
      console.error("Error al cargar historial:", err.message);
      setError("No se pudo cargar el historial de consultas.");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        updateUserFromToken(storedToken);
    }
  }, []);

  // --- NUEVO: Cargar historial y cambiar vista cuando el usuario está autenticado ---
  useEffect(() => {
    if (user) {
      handleFetchHistory();
      if (user.prefs_saved) {
        setView('main');
      } else {
        setView('personalization');
      }
    }
  }, [user]);

  const handleBuscarClima = async () => {
    if (!ciudad) return;
    setIsLoading(true); setClima(null); setError(''); setConsejoIA(''); setAiOutfitConsejo(null); // Limpiar consejo de outfit al buscar nuevo clima
    try {
      const storedToken = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/weather/${ciudad}`, {
        headers: { 'Authorization': `Bearer ${storedToken}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ciudad no encontrada o error en el servidor.');
      setClima(data);
      // Add new weather data to history
      setHistorial(prevHistorial => [{
        ciudad: data.name,
        temperatura: data.main.temp,
        descripcion: data.weather[0].description,
        fecha: new Date().toISOString().split('T')[0] // Current date
      }, ...prevHistorial]);
    } catch (err) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  const handleConsejoIA = async () => { // Este es el consejo IA BÁSICO (sin imágenes)
    const ciudadActual = clima?.name;
    if (!ciudadActual) return;
    setError(''); setConsejoIA(''); setIsAdviceLoading(true);
    try {
      const storedToken = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/ai-advice/${ciudadActual}`, {
        headers: { 'Authorization': `Bearer ${storedToken}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo generar el consejo.');
      setConsejoIA(data.consejo);
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        updateUserFromToken(data.access_token);
      }
    } catch (err) { setError(err.message); setConsejoIA(''); }
    finally { setIsAdviceLoading(false); }
  };

  // --- NUEVA FUNCIÓN: Generar consejo de IA con imágenes ---
  const handleGenerateAiOutfit = async () => {
    if (selectedFiles.length === 0) {
      setAiOutfitError("Por favor, selecciona al menos una imagen.");
      return;
    }
    if (!outfitCity) { // --- NUEVO: Validar que la ciudad del outfit no esté vacía
      setAiOutfitError("Por favor, ingresa una ciudad para el consejo de vestimenta.");
      return;
    }

    setIsAiOutfitLoading(true);
    setAiOutfitError(null);
    setAiOutfitConsejo(null);
    setSubmittedImages([]); // Limpiar imágenes anteriores

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('imagenes', file);
    });
    formData.append('ciudad', outfitCity); // --- NUEVO: Usar la ciudad del outfit

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/v1/ai-outfit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.status === 403) {
          const errorData = await response.json();
          setAiOutfitError(errorData.error || "Acceso denegado. Esta función es solo para usuarios Premium/Pro.");
          return;
      }

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al generar el consejo de vestimenta por IA.');
      }

      const data = await response.json();
      setAiOutfitConsejo(data.consejo);
      // Guardar las imágenes que se usaron para generar este consejo
      setSubmittedImages(selectedFiles.map(file => URL.createObjectURL(file)));
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        updateUserFromToken(data.access_token);
      }
    } catch (err) {
      console.error("Error al generar consejo de vestimenta con IA:", err);
      setAiOutfitError(err.message || "Ocurrió un error al generar el consejo de vestimenta.");
    } finally {
      setIsAiOutfitLoading(false);
      setSelectedFiles([]); // Limpiar los archivos seleccionados después de la subida
    }
  };

  // --- NUEVA FUNCIÓN: Generar consejo de viaje con IA ---
  const handleGenerateTravelAdvice = async (destination, startDate, endDate) => {
    setIsTravelLoading(true);
    setTravelError(null);
    setTravelAdvice(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/v1/ai-travel-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          ciudad_destino: destination, 
          fecha_inicio: startDate, 
          fecha_fin: endDate 
        }),
      });

      if (response.status === 403) {
          const errorData = await response.json();
          setTravelError(errorData.error || "Acceso denegado. Esta función es solo para usuarios Premium/Pro.");
          return;
      }

      if (!response.ok) {
          const errorData = await response.json();
          throw new new Error(errorData.error || 'Error al generar el asistente de viaje.');
      }

      const data = await response.json();
      setTravelAdvice(data.consejo);
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        updateUserFromToken(data.access_token);
      }
    } catch (err) {
      console.error("Error al generar consejo de viaje con IA:", err);
      setTravelError(err.message || "Ocurrió un error al generar el consejo de viaje.");
    } finally {
      setIsTravelLoading(false);
    }
  };
  // --- FIN NUEVA FUNCIÓN ---

  const handleUpgradePlan = async (planId) => {
    setIsLoading(true);
    try {
      const storedToken = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/user/upgrade`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo actualizar el plan.");

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        updateUserFromToken(data.access_token);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 4. RENDERIZADO CONDICIONAL DE VISTAS ---
  const renderContent = () => {
    const content = {
      auth: (
        <AuthView
          handleAuth={handleAuth}
          isLoading={isLoading}
          error={error}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleToggleAuthMode={handleToggleAuthMode}
          setView={handleSetView}
        />
      ),
      personalization: <PersonalizationView setView={handleSetView} user={user} setUser={setUser} />,
      main: user ? (
        <MainView
          user={user}
          setView={handleSetView}
          handleLogout={handleLogout}
          ciudad={ciudad}
          setCiudad={setCiudad}
          handleBuscarClima={handleBuscarClima}
          isLoading={isLoading}
          isAdviceLoading={isAdviceLoading}
          historial={historial}
          error={error}
          clima={clima}
          consejoIA={consejoIA}
          handleConsejoIA={handleConsejoIA}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          aiOutfitConsejo={aiOutfitConsejo}
          isAiOutfitLoading={isAiOutfitLoading}
          aiOutfitError={aiOutfitError}
          handleGenerateAiOutfit={handleGenerateAiOutfit}
          submittedImages={submittedImages}
          outfitCity={outfitCity}
          setOutfitCity={setOutfitCity}
          handleGenerateTravelAdvice={handleGenerateTravelAdvice}
          isTravelLoading={isTravelLoading}
          travelAdvice={travelAdvice}
          travelError={travelError}
          handleFetchHistory={handleFetchHistory}
        />
      ) : null,
      pricing: <PricingPage setView={handleSetView} handleUpgrade={handleUpgradePlan} currentUserPlan={user?.plan} />,
      landing: <LandingPage onNavigateToAuth={handleSetView} handleUpgrade={handleUpgradePlan} currentUserPlan={user?.plan} />,
    };

    return content[view] || content.landing;
  };

  const containerStyle = {
    width: '100%',
    margin: '0 auto',
    padding: view === 'landing' ? '0' : '0 2rem',
    maxWidth: view === 'landing' ? 'none' : '1200px',
  };

  return (
    <div style={styles.appWrapper}>
      <GlobalStyles />
      {view === 'landing' && <SharedNav onNavigateToAuth={handleSetView} />}
      <div style={containerStyle} className={transitioning ? 'fade-out' : 'fade-in'}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;