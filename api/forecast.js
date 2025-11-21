export default async function handler(req, res) {
try {
    const { lat, lon, q, days = '3', lang = 'it' } = req.query;

    // Precedenza: lat/lon -> q (nome città o "lat,lon")
    let qParam = '';
    if (lat && lon) {
        qParam = `${lat},${lon}`;
    } else if (q) {
        qParam = String(q).trim();
    }

    if (!qParam) {
        return res.status(400).json({ error: "Parametri mancanti: fornire 'lat' e 'lon' oppure 'q' (città o 'lat,lon')" });
    }
    if (!process.env.API_KEY) {
        return res.status(500).json({ error: 'API_KEY non configurata nel server' });
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${encodeURIComponent(qParam)}&days=${encodeURIComponent(days)}&aqi=yes&lang=${encodeURIComponent(lang)}`;
    const apiRes = await fetch(url);

    if(!apiRes.ok) {
        if (apiRes.status === 400 || apiRes.status === 404) {
            return res.status(404).json({ error: `Località non trovata: '${qParam}'` });
        }
        throw new Error(`Errore API esterna: ${apiRes.status}`);
    }

    const data = await apiRes.json();
    return res.status(200).json(data);
    } 
    catch (error) 
    {
        console.error('Errore API Forecast:', error);
        return res.status(500).json({ error: 'Errore durante la richiesta Forecast' });
    }
}
