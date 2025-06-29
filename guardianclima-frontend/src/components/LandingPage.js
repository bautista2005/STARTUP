import React, { useState } from 'react';
import { styles } from '../styles/professionalStyles'; // Importa los estilos
import PlanCard from './PlanCard'; // Importa el componente de tarjeta de plan
import { WandIcon, RobotIcon, LogoIcon } from './icons'; // Importa los iconos existentes

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

function NavLink({ href, children, onClick }) {
    const [hover, setHover] = useState(false);

    const linkStyle = {
        color: hover ? '#3B82F6' : '#4B5568',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '1rem',
        padding: '0.5rem 0',
        position: 'relative',
        transition: 'color 0.3s',
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
        transition: 'transform 0.3s ease-out',
    };

    return (
        <a 
            href={href}
            style={linkStyle}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {children}
            <span style={underlineStyle}></span>
        </a>
    );
}

function LandingPage({ onNavigateToAuth, setView, handleUpgrade, currentUserPlan }) {
    const plans = [
        { id: 'free', name: 'Plan Gratuito', price: '$0', cta: 'Comenzar' },
        { id: 'premium', name: 'Plan Premium', price: '$2.99', cta: 'Actualizar Ahora' },
        { id: 'pro', name: 'Plan Pro', price: '$4.99', cta: 'Volverse Pro' }
    ];

    const landingPageStyles = {
        navbar: {
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            position: 'fixed',
            width: '100%',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        navbarContent: {
            maxWidth: '1200px',
            width: '100%',
            padding: '1.5rem 2rem',
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
        hero: {
            backgroundColor: '#F9FAFB',
            color: '#1F2937',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: '90vh',
            padding: '6rem 2rem',
        },
        heroContent: {
            padding: '0 2rem', // Only horizontal padding
            maxWidth: '900px', // Slightly wider content area
            width: '100%',
            textAlign: 'center',
        },
        heroAppName: {
            fontSize: '3rem',
            fontWeight: '800',
            color: '#1F2937',
            marginBottom: '1rem',
            letterSpacing: '-0.025em',
        },
        heroTagline: {
            fontSize: '1.5rem',
            fontWeight: '500',
            marginBottom: '2rem',
            lineHeight: '1.4',
            color: '#4B5568',
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
        },
        heroSubtitle: {
            fontSize: '1.125rem',
            color: '#6B7280',
            marginBottom: '2.5rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 2.5rem auto',
        },
        ctaButton: {
            backgroundColor: '#3B82F6',
            color: '#FFFFFF',
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(59, 130, 246, 0.1)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                backgroundColor: '#2563EB',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(59, 130, 246, 0.15)',
            },
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
            transition: 'all 0.3s ease-in-out',
            cursor: 'default',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            },
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
        },
        footer: {
            background: '#1F2937', // Un gris más oscuro
            color: '#E5E7EB', // Un gris claro para el texto
            textAlign: 'center',
            padding: '2rem 0',
        },
    };

    const handleNavLinkClick = (e, id) => {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth'
        });
    };

    return (
        <div id="landing-page-scroll-container" style={{ fontFamily: styles.appWrapper.fontFamily, color: '#333', backgroundColor: styles.appWrapper.backgroundColor, maxWidth: '1200px', margin: '0 auto' }}>
            {/* Navbar */}
            <nav style={landingPageStyles.navbar}>
                <div style={landingPageStyles.navbarContent}>
                    <button onClick={() => document.getElementById('landing-page-scroll-container').scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, zIndex: 1001 }}>
                        <LogoIcon />
                    </button>
                    <div style={landingPageStyles.navLinksWrapper}>
                        <ul style={landingPageStyles.navLinks}>
                            <li><NavLink href="#features" onClick={(e) => handleNavLinkClick(e, 'features')}>Características</NavLink></li>
                            <li><NavLink href="#pricing" onClick={(e) => handleNavLinkClick(e, 'pricing')}>Precios</NavLink></li>
                            <li><NavLink href="#contact" onClick={(e) => handleNavLinkClick(e, 'contact')}>Contacto</NavLink></li>
                        </ul>
                    </div>
                    <button onClick={() => onNavigateToAuth('auth')} style={styles.authToggle}>
                        Iniciar Sesión
                    </button>
                </div>
            </nav>

            <div style={landingPageStyles.mainContentWrapper}>
                {/* Hero Section */}
                <section id="hero" style={landingPageStyles.hero}>
                    <div style={landingPageStyles.heroContent}>
                        <h1 style={landingPageStyles.heroAppName}>Guardián Clima</h1>
                        <h3 style={landingPageStyles.heroTagline}>Tu Pronóstico del Tiempo, Elevado a un Nuevo Nivel</h3>
                        <p style={landingPageStyles.heroSubtitle}>Guardián Clima no solo te dice si lloverá, sino que te prepara para ello con consejos de vestimenta y asistencia de viaje impulsados por IA.</p>
                        <button onClick={() => onNavigateToAuth('auth')} style={landingPageStyles.ctaButton}>
                            Empieza Gratis
                        </button>
                    </div>
                </section>

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
                            <h3 style={landingPageStyles.featureTitle}>Consejos de Vestimenta con IA</h3>
                            <p style={landingPageStyles.featureDescription}>Sube fotos de tu ropa y recibe recomendaciones sobre qué ponerte según el clima de tu destino. (Premium/Pro)</p>
                        </div>
                        <div style={landingPageStyles.featureCard}>
                            <RobotIcon />
                            <h3 style={landingPageStyles.featureTitle}>Asistente de Viaje Inteligente</h3>
                            <p style={landingPageStyles.featureDescription}>Planifica tus viajes con la ayuda de nuestra IA, que te dará consejos sobre qué empacar y qué esperar del clima. (Premium/Pro)</p>
                        </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" style={{ ...landingPageStyles.section, ...landingPageStyles.pricingSection }}>
                    <div style={landingPageStyles.sectionContent}>
                        <h2 style={landingPageStyles.sectionTitle}>Elige el Plan Perfecto Para Ti</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                            {plans.map(plan => (
                                <PlanCard
                                    key={plan.id}
                                    plan={plan}
                                    popular={plan.id === 'premium'}
                                    handleUpgrade={handleUpgrade}
                                    isCurrentUserPlan={plan.id === currentUserPlan}
                                    onSelectPlan={() => onNavigateToAuth('auth')} // Redirige al login/registro al seleccionar
                                />
                            ))}
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
        </div>
    );
}

export default LandingPage;
