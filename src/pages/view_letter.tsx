import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function CardView() {
    const [data, setData] = useState<any[] | null>(null);

    useEffect(() => {
        supabase.from("letters").select().then((response) => {
            if (response.error) {
                console.error(response.error);
                setData(null);
            } else {
                console.log(response.data);
                setData(response.data);
            }
        });
    }, [])

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}