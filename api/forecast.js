export default async function handler(req, res) {
    try {
        const { lat, lon } = req.query;

        // Controllo parametri obbligatori
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Parametri mancanti: lat e lon sono obbligatori' });
        }

        // Costruzione query per WeatherAPI
        const queryParam = `${lat},${lon}`;

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${queryParam}&days=3&lang=it`);

        if (!response.ok) {
            throw new Error(`Errore API esterna: ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Errore API Forecast:', error);
        res.status(500).json({ error: 'Errore durante la richiesta Forecast' });
    }
}