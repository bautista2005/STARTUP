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

// --- COMPONENTE PRINCIPAL ---
function App() {
  // --- 2. GESTIÓN DEL ESTADO CENTRALIZADO ---
  const [view, setView] = useState('auth');
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
  const [isHidingHistory, setIsHidingHistory] = useState(false);

  // --- NUEVOS ESTADOS PARA LA FUNCIONALIDAD DE IA CON IMÁGENES ---
  const [selectedFiles, setSelectedFiles] = useState([]); // Array para los archivos de imagen seleccionados
  const [aiOutfitConsejo, setAiOutfitConsejo] = useState(null); // Para el consejo de vestimenta con imágenes
  const [isAiOutfitLoading, setIsAiOutfitLoading] = useState(false); // Para el estado de carga del consejo de vestimenta
  const [aiOutfitError, setAiOutfitError] = useState(null); // Para errores del consejo de vestimenta con imágenes
  // --- FIN DE NUEVOS ESTADOS ---


  const API_URL = 'http://127.0.0.1:5000';

  // --- 3. LÓGICA DE NEGOCIO Y MANEJADORES DE EVENTOS ---

  const updateUserFromToken = (token) => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentUser = {
            id: decoded.sub,
            username: decoded.username,
            plan: decoded.plan,
            prefs_saved: decoded.prefs_saved
        };
        setUser(currentUser);
        if (!currentUser.prefs_saved) {
            setView('personalization');
        } else {
            setView('main');
        }
      } catch (e) {
        console.error("Token inválido o expirado:", e); // Añadir log para depuración
        handleLogout();
      }
    } else {
      setUser(null);
      setView('auth');
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
  };

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
    } catch (err) { setError(err.message); }
    finally { setIsLoading(false); }
  };

  const handleBuscarHistorial = async () => {
    if (historial.length > 0) {
        setIsHidingHistory(true);
        setTimeout(() => { setHistorial([]); setIsHidingHistory(false); }, 500);
        return;
    }
    setIsLoading(true); setError('');
    try {
      const storedToken = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/v1/history`, {
        headers: { 'Authorization': `Bearer ${storedToken}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo cargar el historial.');
      setHistorial(data);
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
    } catch (err) { setError(err.message); setConsejoIA(''); }
    finally { setIsAdviceLoading(false); }
  };

  // --- NUEVA FUNCIÓN: Generar consejo de IA con imágenes ---
  const handleGenerateAiOutfit = async () => {
    if (selectedFiles.length === 0) {
      setAiOutfitError("Por favor, selecciona al menos una imagen.");
      return;
    }
    const ciudadActual = clima?.name || ciudad; // Usar la ciudad del clima actual o la ciudad buscada
    if (!ciudadActual) {
      setAiOutfitError("Por favor, busca una ciudad primero para obtener el clima actual.");
      return;
    }

    setIsAiOutfitLoading(true);
    setAiOutfitError(null);
    setAiOutfitConsejo(null);

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('imagenes', file);
    });
    formData.append('ciudad', ciudadActual);

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
    } catch (err) {
      console.error("Error al generar consejo de vestimenta con IA:", err);
      setAiOutfitError(err.message || "Ocurrió un error al generar el consejo de vestimenta.");
    } finally {
      setIsAiOutfitLoading(false);
      setSelectedFiles([]); // Limpiar los archivos seleccionados después de la subida
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
      setView('main');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 4. RENDERIZADO CONDICIONAL DE VISTAS ---
  const renderContent = () => {
    if (!user) {
      return (
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
        />
      );
    }

    switch(view) {
      case 'personalization':
        return <PersonalizationView setView={setView} user={user} setUser={setUser} />;

      case 'main':
        return (
          <MainView
            user={user}
            setView={setView}
            handleLogout={handleLogout}
            ciudad={ciudad}
            setCiudad={setCiudad}
            handleBuscarClima={handleBuscarClima}
            isLoading={isLoading}
            isAdviceLoading={isAdviceLoading} // para el consejo IA básico
            handleBuscarHistorial={handleBuscarHistorial}
            historial={historial}
            error={error}
            clima={clima}
            consejoIA={consejoIA} // consejo IA básico
            handleConsejoIA={handleConsejoIA} // función para consejo IA básico
            isHidingHistory={isHidingHistory}
            // --- NUEVAS PROPS PARA EL CONSEJO DE VESTIMENTA CON IMÁGENES ---
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            aiOutfitConsejo={aiOutfitConsejo}
            isAiOutfitLoading={isAiOutfitLoading}
            aiOutfitError={aiOutfitError}
            handleGenerateAiOutfit={handleGenerateAiOutfit}
            // --- FIN NUEVAS PROPS ---
          />
        );
      case 'pricing':
        return <PricingPage setView={setView} handleUpgrade={handleUpgradePlan} currentUserPlan={user.plan} />;

      default:
        return <MainView user={user} setView={setView} handleLogout={handleLogout} />;
    }
  }

  return (
    <div style={styles.appWrapper}>
      <GlobalStyles />
      <div style={styles.container}>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;