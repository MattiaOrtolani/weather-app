export default async function handler(req, res) {
    try
    {
        const { q = '', lang = 'it' } = req.query;

        const qParam = String(q).trim();
        
        if (!qParam) {
            return res.status(400).json({ error: "Parametro mancante: fornire 'q' (città o 'lat,lon')" });
        }
        if (!process.env.API_KEY) {
            return res.status(500).json({ error: "API_KEY non configurata nel server" });
        }

        const url = `https://api.weatherapi.com/v1/search.json?key=${process.env.API_KEY}&q=${qParam}&lang=${encodeURIComponent(lang)}`;
        const apiRes = await fetch(url);

        if(!apiRes.ok) {
            throw new Error(`Errore API esterna: ${apiRes.status}`);
        }
        
        const data = await apiRes.json();
        return res.status(200).json(data);

    }
    catch (error)
    {
        console.error('Errore API Search Suggestion:', error);
        return res.status(500).json({ error: 'Errore durante la richiesta Search Suggestion' });
    }
}
