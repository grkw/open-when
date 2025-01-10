import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function CardView() {
    const [data, setData] = useState();

    useEffect(() => {
        supabase.from("Cards").select().then((data)=>{
            console.log(data)
            setData(data)
        });
    }, [])

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}