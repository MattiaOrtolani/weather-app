export default async function handler(req, res) {
    const {lat, lon} = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ error: "Parametri mancanti: fornire 'lat' e 'lon'" });
    }

    let qParam = {lat, lon};

    const url = `https://nominatim.openstreetmap.org/reverse?&format=jsonv2&lat=${encodeURIComponent(
        qParam.lat
    )}&lon=${encodeURIComponent(qParam.lon)}&addressdetails=1&accept-language=en`;

    try {
        const apiRes = await fetch(url, {
            headers: {
                'User-Agent': 'weather-app (https://github.com/MattiaOrtolani/weather-app.git)',
            },
        });

        if (!apiRes.ok) {
            const errorBody = await apiRes.text();
            console.error('Reverse geocoding API error', apiRes.status, errorBody);
            return res.status(500).json({ error: `Errore API esterna: ${apiRes.status}` });
        }

        const data = await apiRes.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Reverse geocoding failure:', error);
        return res.status(500).json({ error: 'Errore durante la chiamata a OpenStreetMap' });
    }
}
