import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// --- 1. IMPORTACIONES ---
// Ahora importamos nuestros componentes modulares y estilos
import { GlobalStyles } from './styles/GlobalStyles';
import { styles } from './styles/professionalStyles';
import AuthView from './components/AuthView';
import PersonalizationView from './components/PersonalizationView';
import MainView from './components/MainView';
import PricingPage from './components/PricingPage';

// --- COMPONENTE PRINCIPAL ---
function App() {
  // --- 2. GESTIÓN DEL ESTADO CENTRALIZADO ---
  const [view, setView] = useState('auth'); // Vistas: 'auth', 'personalization', 'main', 'pricing'
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
  
  const API_URL = 'http://127.0.0.1:5000';

  // --- 3. LÓGICA DE NEGOCIO Y MANEJADORES DE EVENTOS ---

  // Función para decodificar el token y establecer el estado del usuario
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
        // Lógica de redirección basada en las preferencias guardadas
        if (!currentUser.prefs_saved) {
            setView('personalization');
        } else {
            setView('main');
        }
      } catch (e) {
        // Si el token es inválido, cerramos sesión
        handleLogout();
      }
    } else {
      setUser(null);
      setView('auth');
    }
  };

  // Hook para verificar el token al cargar la app
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        updateUserFromToken(storedToken);
    }
  }, []);

  // Función para manejar registro e inicio de sesión
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
        await handleAuth('login'); // Inicia sesión automáticamente tras el registro
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

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setClima(null); 
    setHistorial([]); 
    setConsejoIA('');
    setError('');
    setView('auth');
  };

  // Funciones para la API del clima y la app
  const handleBuscarClima = async () => {
    if (!ciudad) return;
    setIsLoading(true); setClima(null); setError(''); setConsejoIA('');
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
  
  const handleConsejoIA = async () => {
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
  // Esta función elige qué componente de vista mostrar.
  const renderContent = () => {
    // Si no hay usuario, siempre se muestra la vista de autenticación.
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

    // Si hay usuario, se decide la vista correcta basándose en el estado 'view'.
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
            isAdviceLoading={isAdviceLoading}
            handleBuscarHistorial={handleBuscarHistorial} 
            historial={historial}
            error={error} 
            clima={clima} 
            consejoIA={consejoIA}
            handleConsejoIA={handleConsejoIA} 
            isHidingHistory={isHidingHistory}
          />
        );
      case 'pricing':
        return <PricingPage setView={setView} handleUpgrade={handleUpgradePlan} currentUserPlan={user.plan} />;
      
      default: // Vista por defecto si el estado es inválido
        return <MainView user={user} setView={setView} handleLogout={handleLogout} />;
    }
  }

  // --- 5. ESTRUCTURA JSX PRINCIPAL ---
  // El cascarón de la aplicación.
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