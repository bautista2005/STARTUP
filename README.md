# GuardianClima API

GuardianClima is a web application that provides weather information and personalized clothing recommendations using artificial intelligence.

## Features

- User registration and authentication with JWT.
- Real-time weather data from OpenWeatherMap.
- Personalized clothing advice based on user preferences and weather conditions, powered by Google Gemini.
- AI-powered travel assistant for packing lists.
- Freemium model with usage limits for free users and premium plans.
- History of weather queries.

## Technologies Used

### Backend

- Python
- Flask
- PostgreSQL
- SQLAlchemy
- Flask-JWT-Extended
- Google Gemini API
- OpenWeatherMap API

### Frontend

- React.js
- jwt-decode
- react-scripts

## Prerequisites

- Python 3.8+
- Node.js and npm
- PostgreSQL

## Installation

### Backend

1.  **Clone the repository:**

    ```bash
    git clone [https://your-repository-url.git](https://github.com/bautista2005/STARTUP.git)
    cd [your-repository-folder]
    ```

2.  **Create a virtual environment and activate it:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3.  **Install the required Python packages:**

    *Note: A `requirements.txt` file was not found. Based on the `app.py` file, these are the required packages.*

    ```bash
    pip install Flask Flask-Bcrypt Flask-Cors Flask-JWT-Extended Flask-SQLAlchemy Pillow google-generativeai python-dotenv requests
    ```

### Frontend

1.  **Navigate to the frontend directory:**

    ```bash
    cd guardianclima-frontend
    ```

2.  **Install the required npm packages:**

    ```bash
    npm install
    ```

## Configuration

### Backend

1.  **Create a `.env` file in the root directory of the project.**

2.  **Add the following environment variables to the `.env` file:**

    ```env
    JWT_SECRET_KEY=your_strong_jwt_secret_key
    DATABASE_URL=postgresql://user:password@localhost:5432/guardianclima
    WEATHER_API_KEY=your_openweathermap_api_key
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

### Frontend

1.  **Create a `.env.local` file in the `guardianclima-frontend` directory.**

2.  **Add the following environment variable to the `.env.local` file:**

    ```env
    REACT_APP_API_BASE_URL=http://localhost:5000
    ```

### Database Setup (PostgreSQL)

1.  **Make sure you have PostgreSQL installed and running.**

2.  **Create a new database for the application:**

    ```sql
    CREATE DATABASE guardianclima;
    ```

3.  **Update the `DATABASE_URL` in your `.env` file with your PostgreSQL credentials.**

## Running the Application

### Backend

1.  **Make sure you are in the root directory of the project and your virtual environment is activated.**

2.  **Run the Flask application:**

    ```bash
    python app.py
    ```

    The backend server will start on `http://localhost:5000`.

### Frontend

1.  **Navigate to the `guardianclima-frontend` directory.**

2.  **Start the React development server:**

    ```bash
    npm start
    ```

    The frontend application will be accessible at `http://localhost:3000`.

## API Keys

-   **OpenWeatherMap API Key:** You can get a free API key from [https://openweathermap.org/api](https://openweathermap.org/api).
-   **Google Gemini API Key:** You can get an API key from [https://ai.google.dev/](https://ai.google.dev/).
