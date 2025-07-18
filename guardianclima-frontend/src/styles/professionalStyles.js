// Exporta el objeto de estilos para ser usado por los componentes.
export const styles = {
    appWrapper: { 
        backgroundColor: '#F8FAFC', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        paddingTop: '2rem', 
        paddingBottom: '2rem', 
        fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'" 
    },
    container: { 
        width: '100%', 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 2rem' 
    },
    authContainer: {
        backgroundColor: '#FFFFFF',
        padding: '1.5rem 2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        maxWidth: '380px',
        margin: '0 auto',
        border: '1px solid #F1F5F9',
    },
    authTitle: {
        margin: '0',
        fontSize: '1.75rem',
        fontWeight: '700',
        color: '#1F2937',
        background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    authSubtitle: {
        margin: '0',
        color: '#6B7280',
        fontSize: '0.875rem',
        fontWeight: '500',
    },
    inputGroup: {
        width: '100%',
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        color: '#9CA3AF',
    },
    input: {
        width: '100%',
        padding: '0.875rem 0.875rem 0.875rem 2.75rem',
        fontSize: '0.95rem',
        border: '1px solid #D1D5DB',
        borderRadius: '0.5rem',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: '#FAFBFC',
        '&:focus': {
            borderColor: '#3B82F6',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
            backgroundColor: '#FFFFFF',
        },
    },
    inputLabel: { 
        display: 'block', 
        marginBottom: '0.5rem', 
        fontSize: '0.875rem', 
        fontWeight: '600', 
        color: '#4b5563' 
    },
    
    // Enhanced MainView Header Styles
    mainHeader: (theme = 'light') => ({ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        padding: '1.5rem 2rem',
        backgroundColor: theme === 'dark' ? '#151b26' : '#FFFFFF',
        borderRadius: '1.5rem',
        boxShadow: theme === 'dark' 
            ? '0 8px 25px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: theme === 'dark' ? 'none' : '1px solid #F1F5F9',
        transition: 'all 0.3s ease'
    }),
    header: { 
        margin: 0, 
        fontSize: '2.25rem', 
        fontWeight: 800, 
        background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.025em'
    },
    subtitle: { 
        marginTop: '0.5rem', 
        color: '#64748B',
        fontSize: '1.125rem',
        fontWeight: 500
    },
    
    // Enhanced Card Styles
    card: (theme = 'light') => ({ 
        backgroundColor: theme === 'dark' ? '#151b26' : '#FFFFFF', 
        padding: '2rem', 
        borderRadius: '1.5rem', 
        boxShadow: theme === 'dark' 
            ? '0 12px 25px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', 
        marginBottom: '2rem', 
        width: '100%', 
        boxSizing: 'border-box',
        border: theme === 'dark' ? 'none' : '2px solid #F1F5F9',
        transition: 'all 0.3s ease',
    }),
    
    // Enhanced Search Section
    searchSection: { 
        display: 'flex', 
        gap: '1.2rem', 
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.5rem',
    },
    searchInput: (theme = 'light') => ({ 
        flex: 1, 
        padding: '1.2rem 1.5rem', 
        fontSize: '1.1rem', 
        border: theme === 'dark' ? 'none' : '2px solid #E2E8F0', 
        borderRadius: '1.2rem', 
        outline: 'none',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: theme === 'dark' ? '#1e2631' : '#F8FAFC',
        color: theme === 'dark' ? '#e2e8f0' : '#1E293B',
        boxShadow: theme === 'dark' 
            ? '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : '0 2px 8px rgba(59,130,246,0.06)',
        '&:focus': {
            borderColor: theme === 'dark' ? 'none' : '#3B82F6',
            backgroundColor: theme === 'dark' ? '#242c3a' : '#FFFFFF',
            boxShadow: theme === 'dark' 
                ? '0 6px 20px rgba(0,0,0,0.4), 0 0 0 2px rgba(99, 102, 241, 0.4)' 
                : '0 0 0 3px rgba(59, 130, 246, 0.1)'
        },
        '&::placeholder': {
            color: theme === 'dark' ? '#6b7280' : '#94A3B8'
        }
    }),
    
    // Enhanced File Input
    fileInput: {
        padding: '1rem 1.5rem',
        fontSize: '1rem',
        border: '2px dashed #CBD5E1',
        borderRadius: '1rem',
        outline: 'none',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: '#F8FAFC',
        cursor: 'pointer',
        '&:hover': {
            borderColor: '#3B82F6',
            backgroundColor: '#EFF6FF'
        },
        '&:focus': {
            borderColor: '#3B82F6',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
        }
    },
    
    historyToggle: { 
        background: 'none', 
        border: 'none', 
        color: '#3B82F6', 
        cursor: 'pointer', 
        marginTop: '1rem', 
        padding: 0, 
        fontWeight: 600 
    },
    error: { 
        color: '#DC2626', 
        textAlign: 'center', 
        fontWeight: '600', 
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: '#FEF2F2',
        borderRadius: '0.75rem',
        border: '1px solid #FECACA'
    },
    
    // Enhanced Weather Styles
    weatherHeader: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        borderBottom: '2px solid #F1F5F9', 
        paddingBottom: '1.5rem',
        marginBottom: '1.5rem'
    },
    weatherCity: { 
        margin: 0, 
        fontSize: '1.75rem', 
        fontWeight: 700,
        color: '#1E293B'
    },
    weatherDescription: { 
        margin: '0.5rem 0 0 0', 
        color: '#64748B', 
        textTransform: 'capitalize',
        fontSize: '1.125rem',
        fontWeight: 500
    },
    weatherIcon: { 
        width: '80px', 
        height: '80px', 
        marginTop: '-10px', 
        marginRight: '-10px' 
    },
    weatherGrid: { 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1.5rem', 
        marginTop: '1.5rem' 
    },
    infoCard: { 
        borderRadius: '1rem', 
        padding: '1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }
    },
    tempCard: { 
        backgroundColor: '#FEF2F2', 
        color: '#DC2626',
        border: '1px solid #FECACA'
    },
    humidityCard: { 
        backgroundColor: '#EFF6FF', 
        color: '#2563EB',
        border: '1px solid #BFDBFE'
    },
    
    // Enhanced AI Button
    aiButton: { 
        marginTop: '1.5rem', 
        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', 
        color: 'white', 
        border: 'none', 
        borderRadius: '1rem', 
        padding: '1rem 2rem', 
        fontWeight: '600', 
        cursor: 'pointer', 
        transition: 'all 0.3s ease-in-out', 
        boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2)',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        '&:hover:not(:disabled)': {
            transform: 'translateY(-3px)',
            boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.3)'
        },
        '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
            transform: 'none'
        }
    },
    
    // Enhanced AI Advice
    aiAdvice: (theme = 'light') => ({ 
        marginTop: '2rem', 
        backgroundColor: theme === 'dark' ? '#1e2631' : '#F0F9FF', 
        padding: '2rem', 
        borderRadius: '1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        alignItems: 'center', 
        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '2px solid #BFDBFE',
        boxShadow: theme === 'dark' 
            ? '0 8px 25px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
    }),
    aiAdviceIconContainer: (theme = 'light') => ({ 
        backgroundColor: theme === 'dark' ? '#242c3a' : '#DBEAFE', 
        borderRadius: '50%', 
        padding: '1rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexShrink: 0,
        width: '60px',
        height: '60px',
        boxShadow: theme === 'dark' 
            ? '0 6px 15px rgba(0, 0, 0, 0.3)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }),
    aiAdviceTitle: (theme = 'light') => ({ 
        margin: '0 0 1rem 0', 
        fontWeight: 700, 
        color: theme === 'dark' ? '#a5b4fc' : '#1E40AF',
        fontSize: '1.25rem'
    }),
    aiAdviceText: (theme = 'light') => ({ 
        margin: 0, 
        color: theme === 'dark' ? '#e2e8f0' : '#374151', 
        lineHeight: '1.7',
        fontSize: '1rem',
        textAlign: 'center'
    }),
    
    cardTitle: {
        margin: 0,
        fontSize: '2.1rem',
        fontWeight: 800,
        background: 'linear-gradient(90deg, #1E40AF 0%, #3B82F6 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-0.01em',
        textAlign: 'center',
        marginBottom: '1.5rem',
    },
    
    // Enhanced Main Content Layout
    mainContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    mainContentArea: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    
    // Enhanced History Card
    historyCard: {
        flexShrink: 0,
        width: '350px',
        maxHeight: 'calc(100vh - 6rem)',
        overflowY: 'auto',
        transition: 'all 0.3s ease-in-out',
        position: 'sticky',
        top: '2rem'
    },
    historyList: {
        listStyleType: 'none',
        padding: 0,
        margin: '0 0.5rem 0 0',
        maxHeight: '600px',
        overflowY: 'auto'
    },
    historyItem: { 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        padding: '1.25rem', 
        backgroundColor: '#F8FAFC', 
        borderRadius: '1rem', 
        marginBottom: '1rem', 
        transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
        border: '1px solid #F1F5F9',
        cursor: 'pointer',
        boxShadow: '0 0 0 rgba(0,0,0,0)',
        ':hover': {
            backgroundColor: '#E0E7FF',
            transform: 'translateY(-3px) scale(1.03)',
            boxShadow: '0 6px 18px -4px rgba(59,130,246,0.10)',
            border: '1.5px solid #3B82F6',
        }
    },
    historyTempBubble: { 
        backgroundColor: '#DBEAFE', 
        color: '#1E40AF', 
        padding: '0.5rem 1rem', 
        borderRadius: '9999px', 
        fontWeight: '700', 
        fontSize: '0.875rem',
        border: '1px solid #BFDBFE'
    },
    historyCity: (theme = 'light') => ({ 
        fontWeight: 600, 
        color: theme === 'dark' ? '#f1f5f9' : '#1E293B',
        fontSize: '1rem'
    }),
    historyDesc: (theme = 'light') => ({ 
        margin: 0, 
        color: theme === 'dark' ? '#cbd5e1' : '#64748B', 
        textTransform: 'capitalize', 
        fontSize: '0.875rem',
        fontWeight: 500
    }),
    historyDate: { 
        color: '#94A3B8', 
        fontSize: '0.75rem', 
        marginLeft: 'auto',
        fontWeight: 500
    },
    
    authToggle: {
        background: 'none',
        border: 'none',
        color: '#6B7280',
        cursor: 'pointer',
        padding: '0.5rem',
        fontWeight: '500',
        fontSize: '0.875rem',
        transition: 'color 0.2s',
        '&:hover': {
            color: '#3B82F6',
        },
    },
    primaryButton: {
        width: '100%',
        padding: '0.875rem',
        fontSize: '0.95rem',
        fontWeight: '600',
        color: '#FFFFFF',
        background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        boxShadow: '0 4px 6px rgba(59, 130, 246, 0.2)',
    },
    
    // Enhanced Plan Tags
    planTag: { 
        display: 'inline-block', 
        padding: '0.5rem 1rem', 
        borderRadius: '9999px', 
        fontSize: '0.75rem', 
        fontWeight: '700', 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em', 
        color: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    freeTag: { 
        color: '#374151', 
        backgroundColor: '#F3F4F6',
        border: '1px solid #E5E7EB'
    },
    premiumTag: { 
        background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)', 
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)' 
    },
    premium: {
        color: '#3B82F6',
        padding: 0,
        margin: 0,
    },
    freemiumMessage: { 
        backgroundColor: '#E0F2FE', 
        color: '#1E40AF', 
        padding: '1.25rem', 
        borderRadius: '1rem', 
        marginBottom: '1.5rem', 
        textAlign: 'center', 
        fontSize: '0.875rem',
        border: '1px solid #BFDBFE',
        fontWeight: 500
    },
    
    // Enhanced Upgrade Button
    upgradeButton: { 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', 
        color: 'white', 
        border: 'none', 
        borderRadius: '1rem', 
        padding: '0.75rem 1.5rem', 
        fontWeight: '600', 
        cursor: 'pointer', 
        transition: 'all 0.3s ease-in-out', 
        boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2)',
        fontSize: '0.875rem'
    },
    
    // Enhanced Premium Card Title
    premiumCardTitle: {
        marginTop: 0,
        fontWeight: 700,
        paddingBottom: '1rem',
        color: '#1E40AF',
        textAlign: 'center',
        fontSize: '1.5rem',
        background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        width: '100%',
        display: 'block',
    },
    
    // Enhanced Image Gallery
    imageGallery: { 
        display: 'flex', 
        gap: '1rem', 
        marginTop: '1.5rem', 
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    galleryImage: { 
        width: '100px', 
        height: '100px', 
        borderRadius: '1rem', 
        objectFit: 'cover', 
        border: '3px solid #BFDBFE',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)'
        }
    },
    searchCardCentered: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        width: '100%',
    },
};