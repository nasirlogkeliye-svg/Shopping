export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;
    
    // Aapke diye gaye naye credentials
    const BOT_TOKEN = process.env.BOT_TOKEN || '8951307689:AAFkIRx2qfismG77Y7y6J_nUa5gjCHafrek';
    const CHAT_ID = process.env.CHAT_ID || '6076330929';

    try {
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();
        
        if (data.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false, error: data });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
