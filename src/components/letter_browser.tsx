import styles from '@/components/letter_browser.module.css';
import Letter, { LetterProps } from '@/components/letter';
import PromptSelector from './prompt_selector';
import { supabase } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

export interface LetterBrowserProps {
    setView: (value: string) => void;
}

// TODO: User can click through all the opened letters and then they get to the unopened letters (if they keep searching, then they'll have incentive): "oop, this is a new letter! if you want to open it, you have some options: (write a letter) or (use a letter credit)"
export default function LetterBrowser({setView}: LetterBrowserProps) {
    // const { is_browser, ...letterProps } = props;
    const [data, setData] = useState<LetterProps[] | null>(null);

    useEffect(() => { // The useEffect hook is used to perform a side effect (fetching data from Supabase) after the component mounts.
        supabase.from("letters").select('*').then((response) => {
            if (response.error) {
                console.error(response.error);
                setData(null);
            } else {
                console.log(response.data);
                setData(response.data);
            }
        });
    }, []) // Empty dependency array means this effect runs once after the initial render

    return (
        <div>
            <h2>browse open letters</h2>
            <p>we currently have # of "you feel sad," # of "you need a laugh," ...</p>
            <p>select a prompt and then browse within that category.</p>
            <PromptSelector></PromptSelector>
            {data && <Letter props={data[0]}></Letter>}
            <button>next</button>
            <button>prev</button>
            <br/>
            <br/>
            <p>what's next?</p>
            <button onClick={() => setView('write')}>write a letter</button>
            <button onClick={() => setView('open')}>open a new letter</button>
        </div>
    );
}

