import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { num_credits } = req.body;

        try {
            const { data, error } = await supabase.from('credits').update(
                {
                    num_credits: num_credits
                },
            ).eq('id', 1);

            if (error) {
                console.error('Error inserting data:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("successfully updated credits", num_credits);
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