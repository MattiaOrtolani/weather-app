export default async function handler(req, res)
{
    try
    {
        const response = await fetch(`https://api.weatherapi.com/v1/ip.json?key=${process.env.API_KEY}&q=auto:ip`);
        const data = await response.json();
        res.status(200).json(data);
    }
    catch (error)
    {
        console.error('Errore API IP:', error);
        res.status(500).json({ error: 'Errore durante la richiesta IP' });
    }
}