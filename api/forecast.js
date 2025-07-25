export default async function handler(req, res)
{
    try
    {
        const { city } = req.query;

        if (!city)
        {
            return res.status(400).json({ error: 'Parametro city mancante' });
        }

        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=3&lang=it`);
        const data = await response.json();
        res.status(200).json(data);
    }
    catch (error)
    {
        console.error('Errore API Forecast:', error);
        res.status(500).json({ error: 'Errore durante la richiesta Forecast' });
    }
}