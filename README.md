# 🌤️ Weather Forecast App

A responsive weather forecast web application built with **React** and **Vite**. Search any city in the world to get real-time current conditions and a 5-day forecast, powered by the OpenWeather API.

---

## Overview

This app lets users search for any city, view current weather conditions, and browse a 5-day forecast — all with a clean, responsive UI and support for both metric and imperial units.

---

## Features

- **City search** with location results (handles ambiguous city names)
- **Current weather** — temperature, feels like, humidity, wind speed, and condition icon
- **5-day forecast** with daily weather summaries
- **Unit toggle** — switch between °C (metric) and °F (imperial)
- **Error handling** — graceful messages for invalid cities or API failures
---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm**
- A free [OpenWeather API key](https://openweathermap.org/api)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then open `.env.local` and add your API key (see [Environment Variables](#-environment-variables) below).

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

---

## Environment Variables

Create a `.env.local` file in the project root with the following:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

> **Never commit your `.env.local` file.** It is already listed in `.gitignore`.