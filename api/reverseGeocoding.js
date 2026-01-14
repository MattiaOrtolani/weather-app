export default async function handler(req, res) {
    const {lat, lon} = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ error: "Parametri mancanti: fornire 'lat' e 'lon'" });
    }

    let qParam = {lat, lon};

    let url = `https://nominatim.openstreetmap.org/reverse?&format=jsonv2&lat=${encodeURIComponent(qParam.lat)}&lon=${encodeURIComponent(qParam.lon)}&addressdetails=1&accept-language=en`;
    const apiRes = await fetch(url);

    if(!apiRes.ok) {
        return res.status(500).json({ error: `Errore API esterna: ${apiRes.status}` });
    }
    
    const data = await apiRes.json();
    return res.status(200).json(data);
}