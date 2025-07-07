# GuardianClima API

GuardianClima is a web application that provides weather information and personalized clothing recommendations using artificial intelligence. The application features a freemium model with PayPal integration for premium subscriptions.

## Features

- User registration and authentication with JWT
- Real-time weather data from OpenWeatherMap
- Personalized clothing advice based on user preferences and weather conditions, powered by Google Gemini
- AI-powered travel assistant for packing lists
- Freemium model with usage limits for free users and premium plans
- PayPal integration for subscription payments
- History of weather queries and outfit recommendations
- User preference customization

## Technologies Used

### Backend

- Python 3.8+
- Flask
- PostgreSQL
- SQLAlchemy
- Flask-JWT-Extended
- Flask-Bcrypt
- Flask-CORS
- Google Gemini API
- OpenWeatherMap API
- PayPal REST SDK

### Frontend

- React.js
- @paypal/react-paypal-js
- jwt-decode
- react-scripts

## Prerequisites

- Python 3.8 or higher
- Node.js 16+ and npm
- PostgreSQL 12+
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/bautista2005/STARTUP.git
cd STARTUP
```

### 2. Backend Setup

#### Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### Install Python Dependencies

```bash
pip install -r requirements.txt
```

#### Database Setup (PostgreSQL)

1. **Install PostgreSQL** if you haven't already:
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - macOS: `brew install postgresql`
   - Ubuntu: `sudo apt-get install postgresql postgresql-contrib`

2. **Create Database:**
   ```sql
   CREATE DATABASE guardianclima;
   ```

3. **Create User (Optional):**
   ```sql
   CREATE USER guardianclima_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE guardianclima TO guardianclima_user;
   ```

#### Environment Configuration

Create a `.env` file in the root directory:

```env
# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_here_make_it_long_and_random

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/guardian_clima_db

# API Keys
WEATHER_API_KEY=your_openweathermap_api_key
GEMINI_API_KEY=your_google_gemini_api_key

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### 3. Frontend Setup

#### Navigate to Frontend Directory

```bash
cd guardianclima-frontend
```

#### Install Node Dependencies

```bash
npm install
```

#### Frontend Environment Configuration

Create a `.env.local` file in the `guardianclima-frontend` directory:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5000

# PayPal Configuration
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id
```

## API Keys Setup

### 1. OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "API keys" section
4. Copy your API key
5. Add it to your `.env` file as `WEATHER_API_KEY`

### 2. Google Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key
5. Add it to your `.env` file as `GEMINI_API_KEY`

### 3. PayPal API Keys

1. Go to [PayPal Developer Portal](https://developer.paypal.com/)
2. Sign in with your PayPal account
3. Navigate to "Apps & Credentials"
4. Create a new app or use an existing one
5. Copy the Client ID and Client Secret
6. Add them to your `.env` file:
   - `PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
7. Add the Client ID to your frontend `.env.local` file as `REACT_APP_PAYPAL_CLIENT_ID`

**Note:** For development, use PayPal Sandbox credentials. For production, use Live credentials.

## Running the Application

### Backend Server

1. **Make sure your virtual environment is activated:**
   ```bash
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

2. **Run the Flask application:**
   ```bash
   python app.py
   ```

The backend server will start on `http://localhost:5000`

### Frontend Development Server

1. **Navigate to the frontend directory:**
   ```bash
   cd guardianclima-frontend
   ```

2. **Start the React development server:**
   ```bash
   npm start
   ```

The frontend application will be accessible at `http://localhost:3000`

## Project Structure

```
STARTUP/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env                  # Backend environment variables
├── guardianclima-frontend/
│   ├── package.json      # Node.js dependencies
│   ├── .env.local        # Frontend environment variables
│   └── src/
│       ├── components/   # React components
│       └── App.js        # Main React application
└── README.md
```

## Features Overview

### Free Plan
- Basic weather information
- Limited AI outfit recommendations (3 uses per month)

### Premium Plan
- Unlimited AI outfit recommendations
- Unlimited AI travel assistant
- Advanced personalization features
- Priority support

## Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Ensure PostgreSQL is running
   - Verify DATABASE_URL in `.env` file
   - Check database credentials

2. **API Key Errors:**
   - Verify all API keys are correctly set in `.env`
   - Ensure API keys have proper permissions
   - Check API usage limits

3. **PayPal Integration Issues:**
   - Verify PayPal credentials are correct
   - Ensure you're using Sandbox credentials for development
   - Check PayPal app configuration

4. **Frontend Build Errors:**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for missing environment variables

### Development Tips

- Use PayPal Sandbox for testing payments
- Monitor API usage to avoid rate limits
- Keep your `.env` files secure and never commit them to version control

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
