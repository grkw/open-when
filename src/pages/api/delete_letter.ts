import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        const id = req.body;

        try {
            const { data, error } = await supabase.from('letters').delete().eq('id', id);

            if (error) {
                console.error('Error deleting data:', error);
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json({ data });
        } catch (error) {
            console.error('Unexpected error:', error);
            return res.status(500).json({ error: 'Unexpected error occurred' });
        }
    }
}