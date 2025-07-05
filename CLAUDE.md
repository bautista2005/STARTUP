# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GuardianClima is a weather-based clothing recommendation web application with AI-powered features. It consists of a Flask backend with PostgreSQL database and a React frontend. The application uses a freemium model with PayPal integration for premium subscriptions.

## Development Commands

### Backend (Flask)
```bash
# Activate virtual environment
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run development server
python app.py
```

### Frontend (React)
```bash
# Navigate to frontend directory
cd guardianclima-frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Architecture Overview

### Backend Structure
- **app.py**: Main Flask application with all routes and business logic
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Models**: Users, History, Personalization tables
- **Authentication**: JWT-based with bcrypt password hashing
- **External APIs**: OpenWeatherMap, Google Gemini, PayPal REST SDK
- **Features**: Freemium usage tracking, weather data, AI clothing recommendations

### Frontend Structure
- **React 19** with Create React App
- **Styling**: Tailwind CSS with custom design system
- **Components**: Modular component structure with layout, UI, and feature components
- **Authentication**: JWT token management with localStorage
- **Payment**: PayPal React SDK integration
- **State Management**: React hooks and context

### Key Components
- **AuthView.js**: User registration and login
- **MainView.js**: Main dashboard with weather and outfit recommendations
- **TravelAssistant.js**: AI-powered travel packing assistant
- **PricingPage.js**: Subscription plans and PayPal integration
- **PersonalizationView.js**: User preference customization

## Environment Configuration

### Backend (.env)
```env
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URL=postgresql://user:pass@localhost/guardianclima
WEATHER_API_KEY=your_openweathermap_key
GEMINI_API_KEY=your_google_gemini_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### Frontend (.env.local)
```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

## Database Schema

- **Users**: id, username, email, password, plan, usage_count, monthly_usage, last_reset
- **History**: id, user_id, location, weather_data, outfit_recommendation, timestamp
- **Personalization**: id, user_id, preferences (JSON), created_at, updated_at

## Development Notes

- Backend runs on port 5000, frontend on port 3000
- Frontend proxy configured to backend in package.json
- PayPal configured for sandbox mode by default
- Usage limits enforced for free plan (3 outfit recommendations, 2 travel assistant uses per month)
- All API routes are CORS-enabled for localhost:3000
- Images handled with Pillow for potential future features