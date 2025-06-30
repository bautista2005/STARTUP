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
        },
        {
            id: 'shoeType',
            label: '¿Qué tipo de calzado prefieres?',
            options: ['Deportivo', 'Casual', 'Elegante', 'Sandalias', 'Botas', 'Zapatillas']
        },
        {
            id: 'exerciseFrequency',
            label: '¿Con qué frecuencia realizas ejercicio físico?',
            options: ['Diario', 'Varias veces a la semana', 'Ocasional', 'Rara vez', 'Nunca']
        },
        {
            id: 'fabricPreference',
            label: '¿Qué tipo de tejido prefieres en tu ropa?',
            options: ['Algodón', 'Sintético', 'Lana', 'Lino', 'Mezcla', 'No tengo preferencia']
        },
        {
            id: 'prendaFavorita',
            label: '¿Qué prenda no puede faltar en tu outfit ideal?',
            options: ['Camiseta', 'Camisa', 'Chaqueta', 'Jeans', 'Pantalón de vestir', 'Falda', 'Vestido', 'Zapatillas', 'Botas', 'Accesorios']
        }
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const [answers, setAnswers] = useState({
        style: 'Casual',
        activity: 'Oficina',
        sensitivity: 'Normal',
        preferredColors: 'Neutros (negro, blanco, gris, beige)',
        weatherPreference: 'Templado (15-25°C)',
        travelFrequency: 'Ocasional (1-2 veces al año)',
        shoeType: 'Deportivo',
        exerciseFrequency: 'Ocasional',
        fabricPreference: 'Algodón',
        prendaFavorita: 'Camiseta',
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
                    tipo_calzado: answers.shoeType,
                    frecuencia_ejercicio: answers.exerciseFrequency,
                    preferencia_tejido: answers.fabricPreference,
                    prenda_favorita: answers.prendaFavorita,
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
        <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
            <div style={{ ...styles.card, maxWidth: '600px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', boxSizing: 'border-box' }}>
                <div>
                    <h2 style={{ ...styles.authTitle, marginBottom: 0 }}>¡Personaliza tu Experiencia!</h2>
                    <p style={styles.authSubtitle}>Ayúdanos a darte los mejores consejos. Esto potenciará la IA.</p>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%' }}>
                    <div style={{ height: '8px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '0.5rem' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%)', borderRadius: '4px', transition: 'width 0.5s ease-in-out' }}></div>
                    </div>
                    <p style={{ textAlign: 'right', fontSize: '0.95rem', color: '#6b7280', margin: 0 }}>
                        Pregunta {currentPage + 1} de {questions.length}
                    </p>
                </div>

                {/* Question Card */}
                <div style={{ ...styles.card, background: '#F8FAFC', boxShadow: 'none', margin: 0, padding: '2rem 1rem', maxWidth: '100%', textAlign: 'center', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem' }}>{currentQuestion.label}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', width: '100%', maxHeight: '300px', overflowY: 'auto', padding: '0.5rem' }}>
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = answers[currentQuestion.id] === option;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerChange(currentQuestion.id, option)}
                                    style={{
                                        ...styles.primaryButton,
                                        background: isSelected ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' : '#F3F4F6',
                                        color: isSelected ? 'white' : '#1E293B',
                                        border: isSelected ? '2px solid #3B82F6' : '1px solid #E5E7EB',
                                        fontWeight: isSelected ? 700 : 600,
                                        boxShadow: isSelected ? '0 4px 12px rgba(59, 130, 246, 0.15)' : 'none',
                                        transition: 'all 0.2s',
                                        minHeight: '48px',
                                        padding: '0.75rem 1rem',
                                    }}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {error && <p style={styles.error}>{error}</p>}

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '1rem', marginTop: 0 }}>
                    {currentPage > 0 && (
                        <button
                            onClick={handlePrevious}
                            style={{ ...styles.primaryButton, maxWidth: '120px', background: '#F3F4F6', color: '#1E293B', border: '1px solid #E5E7EB' }}
                        >
                            Anterior
                        </button>
                    )}
                    {currentPage < questions.length - 1 ? (
                        <button
                            onClick={handleNext}
                            style={{ ...styles.primaryButton, maxWidth: '120px', marginLeft: 'auto' }}
                        >
                            Siguiente
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            style={{ ...styles.primaryButton, width: '180px', margin: '0 auto', background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)', color: 'white', fontWeight: 700 }}
                        >
                            {isLoading ? 'Guardando...' : '¡Listo! Llévame a la App'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PersonalizationView;
