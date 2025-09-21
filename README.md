# Weather App

Applicazione meteo sviluppata con Angular 19. Mostra condizioni attuali, previsioni orarie e dei prossimi tre giorni. La posizione viene ricavata automaticamente dall'indirizzo IP; i dati provengono da WeatherAPI.

## Perché

Obiettivo del progetto: imparare a consumare API in Angular utilizzando gli Observable di RxJS (gestione asincrona con `HttpClient`, `Observable`, operatori come `map`/`catchError`, e `async` pipe nei template).

## Funzionalità

- Rilevamento posizione tramite IP
- Previsioni per le prossime 72 ore e per i prossimi tre giorni
- Condizioni attuali: temperatura, vento, umidità, indice UV
- Orari di alba e tramonto
- Fasi lunari
- Interfaccia responsive

## Tecnologie

- Angular 19 (frontend)
- TypeScript
- SCSS
- RxJS
- WeatherAPI.com (dati meteo)

## Requisiti

- Node.js 18 o superiore
- npm
- (Opzionale) Angular CLI

## Installazione

```bash
git clone https://github.com/MattiaOrtolani/weather-app.git
cd weather-app
npm install
```

## Configurazione

Questa applicazione richiede una API key di WeatherAPI (gratuita).

1) Registrati su https://www.weatherapi.com/ e recupera la tua chiave da "My API Keys".
2) Crea un file `.env` nella cartella principale del progetto e inserisci:

```env
API_KEY=LA_TUA_API_KEY
```

Note importanti:
- Non condividere la tua API key.
- `.env` è già nel `.gitignore`.
- Non usare virgolette o spazi attorno al valore.

## Avvio

Avvia frontend e backend insieme:

```bash
npm run start-all
```

L'app è raggiungibile su `http://localhost:4200`.

Avvio separato (se serve):

```bash
npm run start:frontend
npm run start:backend
```

## Script

- `npm run start-all`: avvia frontend e backend
- `npm run start:frontend`: solo frontend Angular
- `npm run start:backend`: solo backend (Vercel routes)
- `npm run build`: build di produzione
- `npm run test`: test unitari
- `npm run watch`: build in watch per sviluppo

<!-- ## Screenshot -->

<!-- Organizzazione consigliata delle immagini per dispositivo:

- Desktop/Laptop: `public/screenshots/desktop/`
- Tablet: `public/screenshots/tablet/`
- Telefono: `public/screenshots/phone/`

Risoluzioni suggerite (indicative):
- Desktop: 1440×900 o 1920×1080
- Tablet: 768×1024 o 1024×768
- Telefono: 390×844 o 414×896

Esempi di inserimento nel README (aggiorna i percorsi con i tuoi file):

```markdown
### Desktop/Laptop
![Home – Desktop 1440px](public/screenshots/desktop/home-1440.png)

### Tablet
![Home – Tablet 1024px](public/screenshots/tablet/home-1024.png)

### Telefono
![Home – Phone 390px](public/screenshots/phone/home-390.png)
``` -->

## Struttura del progetto

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── hours-temperature/
│   │   ├── humidity/
│   │   ├── moon-hours/
│   │   ├── sun-hours/
│   │   ├── uv/
│   │   └── week-temperature/
│   ├── app.service.ts
│   └── app.config.ts
├── api/
│   ├── ip.js
│   └── forecast.js
├── styles.scss
└── .env
```

## API

L'app utilizza WeatherAPI. Per i dettagli sugli endpoint e sui limiti consulta la documentazione ufficiale: https://www.weatherapi.com/docs/

Endpoint principali usati:
- `ip.json`: rilevamento approssimativo della posizione tramite IP
- `forecast.json`: condizioni attuali e previsioni

## Note

- Il rilevamento tramite IP è approssimativo e dipende dal provider.
- I limiti del piano gratuito di WeatherAPI possono influire su frequenza e quantità di richieste.
- Problemi comuni: errore 401 → verifica `API_KEY`; CORS → avvia tramite `npm run start-all` per usare il backend locale.