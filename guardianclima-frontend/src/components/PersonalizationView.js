import React, { useState } from 'react';
import { styles } from '../styles/professionalStyles';

function PersonalizationView({ setView, user, setUser }) {
    const [style, setStyle] = useState('Casual');
    const [activity, setActivity] = useState('Oficina');
    const [sensitivity, setSensitivity] = useState('Normal');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://127.0.0.1:5000/api/user/preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    estilo: style,
                    actividad: activity,
                    sensibilidad: sensitivity,
                }),
            });

            const data = await res.json(); 

            if (!res.ok) {
                throw new Error(data.error || 'No se pudieron guardar las preferencias.');
            }
            
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
            }

            // Actualizamos el estado local del usuario y cambiamos la vista
            setUser({ ...user, prefs_saved: true });
            setView('main');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fade-in" style={styles.authContainer}>
            <h2 style={styles.authTitle}>¡Personaliza tu Experiencia!</h2>
            <p style={styles.authSubtitle}>Ayúdanos a darte los mejores consejos. Esto potenciará la IA.</p>

            <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ fontWeight: 600, color: '#374151' }}>¿Cuál es tu estilo principal?</label>
                    <select value={style} onChange={(e) => setStyle(e.target.value)} className="select-style">
                        <option>Casual</option>
                        <option>Deportivo</option>
                        <option>Elegante</option>
                        <option>Minimalista</option>
                    </select>
                </div>
                <div>
                    <label style={{ fontWeight: 600, color: '#374151' }}>¿Cuál suele ser tu actividad del día?</label>
                    <select value={activity} onChange={(e) => setActivity(e.target.value)} className="select-style">
                        <option>Oficina</option>
                        <option>Estudiante</option>
                        <option>Trabajo Remoto</option>
                        <option>Actividades al Aire Libre</option>
                    </select>
                </div>
                <div>
                    <label style={{ fontWeight: 600, color: '#374151' }}>¿Cómo te llevas con el frío?</label>
                    <select value={sensitivity} onChange={(e) => setSensitivity(e.target.value)} className="select-style">
                        <option>Baja</option>
                        <option>Normal</option>
                        <option>Alta</option>
                    </select>
                </div>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button onClick={handleSubmit} disabled={isLoading} className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
                {isLoading ? 'Guardando...' : '¡Listo! Llevame a la App'}
            </button>
        </div>
    );
};

export default PersonalizationView;