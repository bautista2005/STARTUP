import React, { useState } from 'react';
import { styles } from '../styles/professionalStyles'; // Importa los estilos
import PlanCard from './PlanCard'; // Importa el componente de tarjeta de plan
import { WandIcon, RobotIcon, LogoIcon } from './icons'; // Importa los iconos existentes
import PlanCardLanding from './PlanCardLanding';

// Nuevo icono para Pronósticos Precisos
const CloudSunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 0-5 5c0 2.5 2 4.5 5 4.5s5-2 5-4.5a5 5 0 0 0-5-5z"/>
        <path d="M16 17.5a4.5 4.5 0 0 0-9 0"/>
        <path d="M12 13v9"/>
        <path d="M12 13a4 4 0 0 0-4 4"/>
        <path d="M12 13a4 4 0 0 1 4 4"/>
    </svg>
);

function NavLink({ href, children, onClick, isButton }) {
    const [hover, setHover] = useState(false);

    const baseStyle = {
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
    };

    const linkStyle = {
        ...baseStyle,
        color: hover ? '#3B82F6' : '#4B5568',
        position: 'relative',
    };

    const buttonStyle = {
        ...baseStyle,
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
        boxShadow: '0 4px 6px rgba(59, 130, 246, 0.1)',
    };

    const underlineStyle = {
        position: 'absolute',
        width: '100%',
        height: '2px',
        bottom: '-2px',
        left: '0',
        backgroundColor: '#3B82F6',
        transform: hover ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'bottom left',
    };

    const finalStyle = isButton ? { ...buttonStyle, ...(hover && { backgroundColor: '#2563EB', transform: 'translateY(-2px)', boxShadow: '0 6px 12px rgba(59, 130, 246, 0.15)' }) } : linkStyle;

    return (
        <a 
            href={href}
            style={{ ...finalStyle, outline: 'none' }}
            tabIndex={-1}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
        >
            {children}
            {!isButton && <span style={underlineStyle}></span>}
        </a>
    );
}

export function SharedNav({ onNavigateToAuth }) {
    const handleNavLinkClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <nav style={landingPageStyles.navbar}>
            <div style={landingPageStyles.navbarContent}>
                <button onClick={(e) => handleNavLinkClick(e, 'hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <LogoIcon />
                </button>
                <div style={landingPageStyles.navLinksWrapper}>
                    <ul style={landingPageStyles.navLinks}>
                        <li><NavLink href="#features" onClick={(e) => handleNavLinkClick(e, 'features')}>Características</NavLink></li>
                        <li><NavLink href="#pricing" onClick={(e) => handleNavLinkClick(e, 'pricing')}>Precios</NavLink></li>
                        <li><NavLink href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')}>Contacto</NavLink></li>
                    </ul>
                </div>
                <NavLink href="#" onClick={() => onNavigateToAuth('auth')} isButton>Iniciar Sesión</NavLink>
            </div>
        </nav>
    );
}

const landingPageStyles = {
    navbar: {
        backgroundColor: '#FFFFFF',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: '1px solid #E5E7EB',
    },
    navbarContent: {
        maxWidth: '1200px',
        width: '100%',
        padding: '1rem 2rem', // Original vertical padding
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navLinksWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3rem',
    },
    navTitle: {
        ...styles.header,
        fontSize: '1.5rem',
        color: '#1F2937',
    },
    navLinks: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        gap: '3rem',
    },
    // Completely redesigned professional hero section
    hero: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '400% 400%',
        color: '#FFFFFF',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh',
        padding: '8rem 2rem 6rem 2rem',
        position: 'relative',
        overflow: 'hidden',
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
    },
    heroContent: {
        padding: '0 2rem',
        maxWidth: '1000px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
    },
    heroAppName: {
        fontSize: '5rem',
        fontWeight: '900',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2rem',
        letterSpacing: '-0.05em',
        textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        lineHeight: '1.1',
    },
    heroTagline: {
        fontSize: '2.25rem',
        fontWeight: '700',
        marginBottom: '2rem',
        lineHeight: '1.3',
        color: '#F1F5F9',
        maxWidth: '800px',
        margin: '0 auto 2rem auto',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    heroSubtitle: {
        fontSize: '1.375rem',
        color: '#E2E8F0',
        marginBottom: '3.5rem',
        lineHeight: '1.7',
        maxWidth: '750px',
        margin: '0 auto 3.5rem auto',
        fontWeight: '500',
    },
    ctaButton: {
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
        color: '#1E40AF',
        padding: '1.5rem 3.5rem',
        fontSize: '1.25rem',
        fontWeight: '700',
        border: 'none',
        borderRadius: '1rem',
        cursor: 'pointer',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        overflow: 'hidden',
    },
    heroStats: {
        display: 'flex',
        justifyContent: 'center',
        gap: '4rem',
        marginTop: '4rem',
        flexWrap: 'wrap',
    },
    statItem: {
        textAlign: 'center',
        color: '#F1F5F9',
    },
    statNumber: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: '0.5rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    statLabel: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#E2E8F0',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    section: {
        textAlign: 'center',
        width: '100%',
        minHeight: '100vh', // Each section takes full viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionContent: {
        padding: '80px 2rem 0 2rem', // Padding to push content below navbar, and horizontal padding
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
    },
    sectionTitle: {
        fontSize: '2.5rem',
        fontWeight: '700',
        color: styles.header.color,
        marginBottom: '3rem',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    featureCard: {
        ...styles.card,
        textAlign: 'center',
        padding: '2.5rem', // Increased padding
        cursor: 'default',
    },
    featureTitle: {
        fontSize: '1.5rem', // Increased font size
        fontWeight: '600',
        color: styles.header.color,
        marginBottom: '0.75rem', // Adjusted margin
    },
    featureDescription: {
        fontSize: '1.05rem', // Slightly larger font size
        color: styles.subtitle.color,
        lineHeight: '1.6',
    },
    pricingSection: {
        backgroundColor: '#FFFFFF',
    },
    contactSection: {
        backgroundColor: styles.appWrapper.backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    footer: {
        background: '#1F2937', // Un gris más oscuro
        color: '#E5E7EB', // Un gris claro para el texto
        textAlign: 'center',
        padding: '2rem 0',
    },
};

function LandingPage({ onNavigateToAuth, handleUpgrade, currentUserPlan }) {
    const plans = [
        { id: 'free', name: 'Plan Gratuito', price: '$0', cta: 'Comenzar' },
        { id: 'premium', name: 'Plan Premium', price: '$5', originalPrice: '$10', cta: '¡Mejorar Ahora!' }
    ];

    const handleNavLinkClick = (e, id) => {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth'
        });
    };

    // Gradient background for hero and area above navbar
    const heroGradientBg = {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundSize: '400% 400%',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        padding: 0,
        margin: 0,
    };

    return (
        <div id="landing-page-scroll-container" style={{ fontFamily: styles.appWrapper.fontFamily, color: '#333', backgroundColor: styles.appWrapper.backgroundColor, width: '100%' }}>
            <div style={heroGradientBg}>
                <nav style={landingPageStyles.navbar}>
                    <div style={landingPageStyles.navbarContent}>
                        <button onClick={(e) => handleNavLinkClick(e, 'hero')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            <LogoIcon />
                        </button>
                        <div style={landingPageStyles.navLinksWrapper}>
                            <ul style={landingPageStyles.navLinks}>
                                <li><NavLink href="#features" onClick={(e) => handleNavLinkClick(e, 'features')}>Características</NavLink></li>
                                <li><NavLink href="#pricing" onClick={(e) => handleNavLinkClick(e, 'pricing')}>Precios</NavLink></li>
                                <li><NavLink href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')}>Contacto</NavLink></li>
                            </ul>
                        </div>
                        <NavLink href="#" onClick={() => onNavigateToAuth('auth')} isButton>Iniciar Sesión</NavLink>
                    </div>
                </nav>
                {/* Hero Section */}
                <section id="hero" style={{ ...landingPageStyles.hero, paddingTop: '7.5rem' }}>
                    <div style={landingPageStyles.heroOverlay}></div>
                    <div style={landingPageStyles.heroContent}>
                        <h1 style={landingPageStyles.heroAppName}>Guardián Clima</h1>
                        <h3 style={landingPageStyles.heroTagline}>
                            Tu Pronóstico del Tiempo, Elevado a un Nuevo Nivel
                        </h3>
                        <p style={landingPageStyles.heroSubtitle}>
                            Guardián Clima no solo te dice si lloverá, sino que te prepara para ello con consejos de vestimenta 
                            y asistencia de viaje impulsados por IA.
                        </p>
                        <button onClick={() => onNavigateToAuth('auth')} style={landingPageStyles.ctaButton}>
                            🚀 Empieza Gratis
                        </button>
                        {/* Professional Stats */}
                        <div style={landingPageStyles.heroStats}>
                            <div style={landingPageStyles.statItem}>
                                <div style={landingPageStyles.statNumber}>10K+</div>
                                <div style={landingPageStyles.statLabel}>Usuarios Activos</div>
                            </div>
                            <div style={landingPageStyles.statItem}>
                                <div style={landingPageStyles.statNumber}>99.9%</div>
                                <div style={landingPageStyles.statLabel}>Precisión</div>
                            </div>
                            <div style={landingPageStyles.statItem}>
                                <div style={landingPageStyles.statNumber}>24/7</div>
                                <div style={landingPageStyles.statLabel}>Disponibilidad</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* Features Section */}
            <section id="features" style={landingPageStyles.section}>
                <div style={landingPageStyles.sectionContent}>
                    <h2 style={landingPageStyles.sectionTitle}>Funcionalidades Clave</h2>
                    <div style={landingPageStyles.featuresGrid}>
                        <div style={landingPageStyles.featureCard}>
                        <CloudSunIcon />
                        <h3 style={landingPageStyles.featureTitle}>Pronósticos Precisos</h3>
                        <p style={landingPageStyles.featureDescription}>Obtén datos meteorológicos detallados y confiables para cualquier ciudad del mundo al instante.</p>
                    </div>
                    <div style={landingPageStyles.featureCard}>
                        <RobotIcon />
                        <h3 style={landingPageStyles.featureTitle}>Consejos de Vestimenta con IA <h3 style={styles.premium}>Premium</h3></h3>
                        <p style={landingPageStyles.featureDescription}>Sube fotos de tu ropa y recibe recomendaciones sobre qué ponerte según el clima de tu destino.</p>
                    </div>
                    <div style={landingPageStyles.featureCard}>
                        <RobotIcon />
                        <h3 style={landingPageStyles.featureTitle}>Asistente de Viaje Inteligente <h3 style={styles.premium}>Premium</h3></h3>
                        <p style={landingPageStyles.featureDescription}>Planifica tus viajes con la ayuda de nuestra IA, que te dará consejos sobre qué empacar y qué esperar del clima.</p>
                    </div>
                    </div>
                </div>
            </section>
            {/* Pricing Section */}
            <section id="pricing" style={{ ...landingPageStyles.section, ...landingPageStyles.pricingSection }}>
                <div style={landingPageStyles.sectionContent}>
                    <h2 style={landingPageStyles.sectionTitle}>Elige el Plan Perfecto Para Ti</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ flex: 1, maxWidth: '400px' }}>
                            <PlanCardLanding
                                plan={plans[0]}
                                handleUpgrade={handleUpgrade}
                                isCurrentUserPlan={plans[0].id === currentUserPlan}
                                onSelectPlan={() => onNavigateToAuth('auth')}
                            />
                        </div>
                        <div style={{ flex: 1, maxWidth: '400px' }}>
                            <PlanCardLanding
                                plan={plans[1]}
                                popular={true}
                                handleUpgrade={handleUpgrade}
                                isCurrentUserPlan={plans[1].id === currentUserPlan}
                                onSelectPlan={() => onNavigateToAuth('auth')}
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            <section id="contact" style={{ ...landingPageStyles.section, ...landingPageStyles.contactSection }}>
                <div style={landingPageStyles.sectionContent}>
                    <h2 style={landingPageStyles.sectionTitle}>¿Tienes Preguntas?</h2>
                    <p style={{ ...styles.subtitle, maxWidth: '500px', margin: '0 auto 2rem auto' }}>Estamos aquí para ayudarte. Contáctanos para cualquier consulta o sugerencia.</p>
                    <a href="mailto:contacto@guardianclima.com" style={landingPageStyles.ctaButton}>
                        Enviar un Email
                    </a>
                </div>
            </section>
            {/* Footer */}
            <footer style={landingPageStyles.footer}>
                <p>&copy; {new Date().getFullYear()} Guardián Clima. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default LandingPage;
