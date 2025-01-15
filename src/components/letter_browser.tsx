import styles from '@/components/letter_browser.module.css';
import Letter, { LetterProps } from '@/components/letter';
import PromptSelector from './prompt_selector';
import { supabase } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import Envelope from './envelope';

export interface LetterBrowserProps {
    setView: (value: string) => void;
}

// TODO: User can click through all the opened letters and then they get to the unopened letters (if they keep searching, then they'll have incentive): "oop, this is a new letter! if you want to open it, you have some options: (write a letter) or (use a letter credit)"
export default function LetterBrowser({ setView }: LetterBrowserProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
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

    const handleNext = () => {
        if (data && currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (data && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <div>
            <h2>browse open letters</h2>
            <p>we currently have # of "you feel sad," # of "you need a laugh," ...</p>
            <p>select a prompt and then browse within that category.</p>
            <PromptSelector />
            {data && data.length > 0 && (
                <Letter {...data[currentIndex]} />)}
            <button onClick={handlePrev} disabled={currentIndex === 0}>prev</button>
            <button onClick={handleNext} disabled={!data || currentIndex === data.length - 1}>next</button>

            <br />
            <br />
            <p>what's next?</p>
            <button onClick={() => setView('write')}>write a letter</button>
            <button onClick={() => setView('open')}>open a new letter</button>
        </div>
    );
}
// {data && data.map((letter, index) => (
//     <Letter key={index} {...letter} />
// ))}
