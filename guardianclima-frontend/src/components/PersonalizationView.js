import React, { useState } from 'react';
import { styles } from '../styles/professionalStyles';

function PersonalizationView({ setView, user, setUser }) {
    const questions = [
        {
            id: 'style',
            label: '¿Cuál es tu estilo principal?',
            options: ['Casual', 'Deportivo', 'Elegante', 'Minimalista', 'Bohemio', 'Clásico', 'Urbano']
        },
        {
            id: 'activity',
            label: '¿Cuál suele ser tu actividad del día?',
            options: ['Oficina', 'Estudiante', 'Trabajo Remoto', 'Actividades al Aire Libre', 'Viajes Frecuentes', 'Vida Nocturna']
        },
        {
            id: 'sensitivity',
            label: '¿Cómo te llevas con el frío?',
            options: ['Baja', 'Normal', 'Alta', 'Muy Baja (siempre tengo frío)', 'Muy Alta (siempre tengo calor)']
        },
        {
            id: 'preferredColors',
            label: '¿Qué colores prefieres en tu vestimenta?',
            options: ['Neutros (negro, blanco, gris, beige)', 'Vivos (rojo, azul, verde, amarillo)', 'Pasteles (rosa, celeste, menta)', 'Oscuros (azul marino, borgoña, verde oscuro)', 'Tierra (marrón, ocre, terracota)']
        },
        {
            id: 'weatherPreference',
            label: '¿Cuál es tu clima ideal?',
            options: ['Templado (15-25°C)', 'Cálido (>25°C)', 'Frío (<15°C)', 'Seco', 'Húmedo']
        },
        {
            id: 'travelFrequency',
            label: '¿Con qué frecuencia viajas?',
            options: ['Ocasional (1-2 veces al año)', 'Frecuente (3-6 veces al año)', 'Muy Frecuente (>6 veces al año)', 'Rara vez']
        }
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState({
        style: 'Casual',
        activity: 'Oficina',
        sensitivity: 'Normal',
        preferredColors: 'Neutros (negro, blanco, gris, beige)',
        weatherPreference: 'Templado (15-25°C)',
        travelFrequency: 'Ocasional (1-2 veces al año)'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value
        }));
    };

    const handleNext = () => {
        if (currentPage < questions.length - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

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
                    estilo: answers.style,
                    actividad: answers.activity,
                    sensibilidad: answers.sensitivity,
                    colores_preferidos: answers.preferredColors,
                    preferencia_clima: answers.weatherPreference,
                    frecuencia_viajes: answers.travelFrequency,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'No se pudieron guardar las preferencias.');
            }

            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
            }

            setUser({ ...user, prefs_saved: true });

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const progress = ((currentPage + 1) / questions.length) * 100;
    const currentQuestion = questions[currentPage];

    return (
        <div className="fade-in" style={styles.authContainer}>
            <h2 style={styles.authTitle}>¡Personaliza tu Experiencia!</h2>
            <p style={styles.authSubtitle}>Ayúdanos a darte los mejores consejos. Esto potenciará la IA.</p>

            <div style={{ width: '100%', marginBottom: '2rem' }}>
                <div style={{ height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
                    <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#4CAF50', borderRadius: '4px', transition: 'width 0.5s ease-in-out' }}></div>
                </div>
                <p style={{ textAlign: 'right', marginTop: '0.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
                    Pregunta {currentPage + 1} de {questions.length}
                </p>
            </div>

            <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', textAlign: 'center', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#374151', marginBottom: '1.5rem' }}>{currentQuestion.label}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', maxHeight: '300px', overflowY: 'auto', padding: '0.5rem' }}>
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerChange(currentQuestion.id, option)}
                            style={{
                                ...styles.button, // Assuming a base button style exists
                                backgroundColor: answers[currentQuestion.id] === option ? '#4CAF50' : '#f3f4f6',
                                color: answers[currentQuestion.id] === option ? 'white' : '#374151',
                                border: `1px solid ${answers[currentQuestion.id] === option ? '#4CAF50' : '#d1d5db'}`,
                                padding: '0.75rem 1.5rem',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: answers[currentQuestion.id] === option ? '#4CAF50' : '#e5e7eb',
                                },
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '2rem', gap: '1rem' }}>
                {currentPage > 0 && (
                    <button onClick={handlePrevious} className="btn btn-secondary" style={{ maxWidth: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Anterior
                    </button>
                )}
                {currentPage < questions.length - 1 ? (
                    <button onClick={handleNext} className="btn btn-primary" style={{ marginLeft: 'auto', maxWidth: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Siguiente
                    </button>
                ) : (
                    <button onClick={handleSubmit} disabled={isLoading} className="btn btn-primary" style={{ width: '180px', margin: '0 auto' }}>
                        {isLoading ? 'Guardando...' : '¡Listo! Llevame a la App'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default PersonalizationView;
