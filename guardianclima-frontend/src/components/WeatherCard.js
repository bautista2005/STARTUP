import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { Button, Card } from './ui';
import { ThermometerIcon, HumidityIcon, WandIcon, RobotIcon } from './icons';

function WeatherCard({ clima, consejoIA, isAdviceLoading, handleConsejoIA }) {
    const { theme } = useTheme();

    // Get temperature color based on value
    const getTemperatureColor = (temp) => {
        if (temp < 10) return 'text-blue-500';
        if (temp < 20) return 'text-cyan-500';
        if (temp < 30) return 'text-green-500';
        if (temp < 35) return 'text-yellow-500';
        return 'text-red-500';
    };

    // Get weather animation class based on weather icon
    const getWeatherAnimationClass = (iconCode) => {
        // OpenWeatherMap icon codes
        if (iconCode.includes('01')) return 'weather-icon-sun'; // clear sky
        if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return 'weather-icon-cloud'; // clouds
        if (iconCode.includes('09') || iconCode.includes('10')) return 'weather-icon-rain'; // rain
        if (iconCode.includes('11')) return 'weather-icon-thunder'; // thunderstorm
        if (iconCode.includes('13')) return 'weather-icon-snow'; // snow
        if (iconCode.includes('50')) return 'weather-icon-mist'; // mist/fog
        return 'weather-icon-cloud'; // default to cloud animation
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <Card 
                variant="glass" 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300"
                padding="lg"
            >
                {/* Weather Header */}
                <motion.div 
                    className="flex items-start justify-between mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <div className="flex-1">
                        <h3 className={`text-2xl font-bold mb-2 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                            {clima.name}, {clima.sys.country}
                        </h3>
                        <p className={`text-sm capitalize ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            {clima.weather[0].description}
                        </p>
                    </div>
                    <motion.img 
                        src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`} 
                        alt="weather icon"
                        className={`w-16 h-16 object-contain ${getWeatherAnimationClass(clima.weather[0].icon)}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.div>

                {/* Weather Details Grid */}
                <motion.div 
                    className="grid grid-cols-2 gap-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    {/* Temperature Card */}
                    <div className={`
                        p-4 rounded-xl transition-all duration-200 hover:scale-105
                        ${theme === 'dark' 
                            ? 'bg-blue-500/10 border border-blue-500/20' 
                            : 'bg-blue-50 border border-blue-200'
                        }
                    `}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                                theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
                            }`}>
                                <ThermometerIcon className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <p className={`text-2xl font-bold ${getTemperatureColor(clima.main.temp)}`}>
                                    {Math.round(clima.main.temp)}°C
                                </p>
                                <p className={`text-xs ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                    Temperatura
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Humidity Card */}
                    <div className={`
                        p-4 rounded-xl transition-all duration-200 hover:scale-105
                        ${theme === 'dark' 
                            ? 'bg-cyan-500/10 border border-cyan-500/20' 
                            : 'bg-cyan-50 border border-cyan-200'
                        }
                    `}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                                theme === 'dark' ? 'bg-cyan-500/20' : 'bg-cyan-100'
                            }`}>
                                <HumidityIcon className="w-5 h-5 text-cyan-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-cyan-500">
                                    {clima.main.humidity}%
                                </p>
                                <p className={`text-xs ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                    Humedad
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* AI Advice Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mb-6"
                >
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleConsejoIA}
                        disabled={isAdviceLoading}
                        loading={isAdviceLoading}
                        icon={WandIcon}
                        className="w-full"
                    >
                        {isAdviceLoading ? 'Generando...' : 'Obtener Consejo de Vestimenta IA'}
                    </Button>
                </motion.div>

                {/* AI Advice Section */}
                <AnimatePresence>
                    {consejoIA && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: 20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className={`
                                p-6 rounded-xl border
                                ${theme === 'dark' 
                                    ? 'bg-gradient-to-br from-purple-500/10 to-primary-500/10 border-purple-500/20' 
                                    : 'bg-gradient-to-br from-purple-50 to-primary-50 border-purple-200'
                                }
                            `}
                        >
                            <div className="flex items-start gap-4">
                                <motion.div 
                                    className={`
                                        p-3 rounded-full
                                        ${theme === 'dark' 
                                            ? 'bg-purple-500/20' 
                                            : 'bg-purple-100'
                                        }
                                    `}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <RobotIcon className="w-6 h-6 text-purple-500" />
                                </motion.div>
                                <div className="flex-1">
                                    <h4 className={`text-lg font-semibold mb-3 ${
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        Consejo del Guardián IA
                                    </h4>
                                    <p className={`text-sm leading-relaxed ${
                                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                        {consejoIA}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    );
}

export default WeatherCard;