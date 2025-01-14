import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function CardView() {
    const [data, setData] = useState<any[] | null>(null);

    useEffect(() => { // The useEffect hook is used to perform a side effect (fetching data from Supabase) after the component mounts.
        supabase.from("letters").select().then((response) => {
            if (response.error) {
                console.error(response.error);
                setData(null);
            } else {
                console.log(response.data);
                setData(response.data);
            }
        });
    }, []) // Empty dependency array means this effect runs once after the initial render

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}