# Weather App 🌤️

Un'applicazione meteo moderna sviluppata con Angular 19 che fornisce previsioni meteorologiche dettagliate con un'interfaccia utente elegante e responsive.

## ✨ Caratteristiche

- 🌍 **Rilevamento automatico della posizione** basato sull'IP dell'utente
- 📅 **Previsioni a 3 giorni** complete
- 🕐 **Previsioni orarie** dettagliate
- 🌙 **Fasi lunari** e orari di alba/tramonto
- 💨 **Informazioni meteo avanzate**: vento, umidità, indice UV

## 🛠️ Tecnologie utilizzate

- **Angular 19** - Framework frontend
- **TypeScript** - Linguaggio di programmazione
- **SCSS** - Styling avanzato
- **RxJS** - Gestione reattiva dei dati
- **WeatherAPI.com** - API per i dati meteorologici

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere installato:

- [Node.js](https://nodejs.org/) (versione 18 o superiore)
- [npm](https://www.npmjs.com/) (incluso con Node.js)
- [Angular CLI](https://angular.io/cli) (opzionale ma consigliato)

## 🚀 Installazione e avvio

### 1. Clona il repository

```bash
git clone https://github.com/MattiaOrtolani/weather-app.git
cd weather-app
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. ⚠️ Configurazione API Key (IMPORTANTE!)

**Il progetto richiede una API key gratuita da WeatherAPI.com**

#### Passaggio 1: Registrati su WeatherAPI.com
1. Vai su [WeatherAPI.com](https://www.weatherapi.com/)
2. Clicca su "Sign Up" e crea un account gratuito
3. Dopo la registrazione, vai nella sezione "My API Keys"
4. Copia la tua API key personale

#### Passaggio 2: Crea il file .env
1. Nella cartella principale del progetto (stessa cartella di `package.json`), crea un file chiamato `.env`
2. Aggiungi la tua API key al file `.env`:

```env
API_KEY=LA_TUA_API_KEY_QUI
```

**Esempio:**
```env
API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

> **⚠️ IMPORTANTE**: 
> - Non condividere mai la tua API key pubblicamente
> - Il file `.env` è già incluso nel `.gitignore` per evitare che venga committato per errore
> - Non rimuovere `.env` dal `.gitignore`
> - Sostituisci `LA_TUA_API_KEY_QUI` con la tua vera API key (senza spazi o virgolette)

### 4. Avvia l'applicazione

```bash
npm run start-all
```

Questo comando avvierà sia il backend che il frontend. L'applicazione sarà disponibile su `http://localhost:4200`

## 📱 Come utilizzare l'app

1. **Avvio automatico**: L'app rileva automaticamente la tua posizione basandosi sull'IP
2. **Visualizzazione dati**: Vedrai immediatamente:
   - Temperatura attuale e previsioni orarie
   - Previsioni settimanali
   - Informazioni su vento, umidità e indice UV
   - Orari di alba/tramonto e fasi lunari

## 🔧 Script disponibili

- `npm run start-all` - Avvia sia backend che frontend contemporaneamente
- `npm run start:frontend` - Avvia solo il frontend Angular
- `npm run start:backend` - Avvia solo il backend Vercel
- `npm run build` - Compila l'app per la produzione
- `npm run test` - Esegue i test unitari
- `npm run watch` - Compila in modalità watch per lo sviluppo

## 📁 Struttura del progetto

```
src/
├── app/
│   ├── components/           # Componenti dell'applicazione
│   │   ├── header/          # Intestazione dell'app
│   │   ├── hours-temperature/  # Previsioni orarie
│   │   ├── humidity/        # Indicatore umidità
│   │   ├── moon-hours/      # Fasi lunari
│   │   ├── sun-hours/       # Alba e tramonto
│   │   ├── uv/              # Indice UV
│   │   ├── week-temperature/ # Previsioni settimanali
│   │   └── wind/            # Informazioni vento
│   ├── app.service.ts       # Servizio per API calls
│   └── app.config.ts        # Configurazione Angular
├── api/                     # API routes per Vercel
│   ├── ip.js               # Endpoint per rilevamento IP
│   └── forecast.js         # Endpoint per previsioni meteo
├── styles.scss             # Stili globali
└── .env                    # Variabili d'ambiente (API key)
```

## 🌐 API utilizzata

Il progetto utilizza [WeatherAPI.com](https://www.weatherapi.com/docs/) per ottenere i dati meteorologici.

**Endpoint utilizzati:**
- `ip.json` - Rilevamento automatico della posizione
- `forecast.json` - Previsioni meteorologiche complete

---

Sviluppato con ❤️ da [Mattia Ortolani](https://github.com/MattiaOrtolani)