import React, { useState, useEffect } from 'react';
import { styles } from '../styles/professionalStyles';
import { LogoIcon, UserIcon, MailIcon, LockIcon } from './icons';

function AuthView({ handleAuth, isLoading, error, username, setUsername, email, setEmail, password, setPassword, handleToggleAuthMode, initialMode, setView }) {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  
  useEffect(() => {
    setIsRegister(initialMode === 'register');
  }, [initialMode]);

  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    handleToggleAuthMode(isRegister ? 'login' : 'register'); // Llamar a la función del padre para limpiar los estados y establecer el modo
  };

  return (
    <div className="fade-in" style={styles.authContainer}>
      <button onClick={() => setView('landing')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <LogoIcon />
      </button>
      <h2 style={styles.authTitle}>{isRegister ? 'Crear Nueva Cuenta' : 'Iniciar Sesión'}</h2>
      <p style={styles.authSubtitle}>Tu compañero meteorológico inteligente</p>
      
      <div key={isRegister ? 'register' : 'login'} className="fade-in" style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
        {isRegister && (
          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}><UserIcon /></span>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" style={styles.input} />
          </div>
        )}
        
        <div style={styles.inputGroup}>
          <span style={styles.inputIcon}><MailIcon /></span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo Electrónico" style={styles.input} />
        </div>

        <div style={styles.inputGroup}>
          <span style={styles.inputIcon}><LockIcon /></span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" style={styles.input} />
        </div>
      </div>

      {error && <p style={{...styles.error, whiteSpace: 'pre-line'}}>{error}</p>}
      
      <button 
        onClick={() => handleAuth(isRegister ? 'register' : 'login')} 
        disabled={isLoading} 
        className="btn-primary"
        style={styles.primaryButton}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.3)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px rgba(59, 130, 246, 0.2)';
        }}
      >
          {isLoading ? (isRegister ? 'Registrando...' : 'Cargando...') : (isRegister ? 'Crear Cuenta' : 'Iniciar Sesión')}
      </button>

      <button onClick={toggleAuthMode} style={styles.authToggle}>
        {isRegister ? '¿Ya tienes una cuenta? Inicia Sesión' : '¿No tienes una cuenta? Regístrate'}
      </button>
    </div>
  );
}

export default AuthView;