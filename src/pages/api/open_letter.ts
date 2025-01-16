import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { opener_name, opener_location } = req.body;
        const opened_date = new Date().toISOString();
        try {
            const { data, error } = await supabase.from('letters').update([
                {
                    opener_name: opener_name,
                    opener_location: opener_location,
                    opened_date: opened_date,
                    is_opened: true,
                },
            ]).eq('id', 4);

            if (error) {
                console.error('Error inserting data:', error);
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json({ data });
        } catch (error) {
            console.error('Unexpected error:', error);
            return res.status(500).json({ error: 'Unexpected error occurred' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}