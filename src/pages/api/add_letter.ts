import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { prompt, author_name, author_location, letter_body } = req.body;
        const created_date = new Date().toISOString();
        try {
            const { data, error } = await supabase.from('letters').insert([
                {
                    prompt,
                    author_name,
                    author_location,
                    created_date,
                    letter_body,
                    is_opened: false,
                },
            ]);

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