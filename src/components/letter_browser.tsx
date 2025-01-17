import styles from '@/components/letter_browser.module.css';
import Letter, { LetterProps } from '@/components/letter';
import PromptSelector from './prompt_selector';
import { supabase } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import Envelope from './envelope';

export interface LetterBrowserProps {
    setView: (value: string) => void;
    openedLetters: LetterProps[] | null;
}

// TODO: User can click through all the opened letters and then they get to the unopened letters (if they keep searching, then they'll have incentive): "oop, this is a new letter! if you want to open it, you have some options: (write a letter) or (use a letter credit)"
export default function LetterBrowser({ setView, openedLetters }: LetterBrowserProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [data, setData] = useState<LetterProps[] | null>(null);
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [filteredData, setFilteredData] = useState<LetterProps[] | null>(null);

    useEffect(() => {
        if (openedLetters) {
            const filtered = openedLetters.filter(letter => letter.prompt === selectedPrompt);
            setFilteredData(filtered);
            setCurrentIndex(0);
        }
    }, [selectedPrompt, openedLetters]) // effect will only activate if the values in the list change

    const handleNext = () => {
        if (filteredData && currentIndex < filteredData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (filteredData && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <div>
            <h2>browse open letters</h2>
            <p>we currently have # of "you feel sad," # of "you need a laugh," ...</p>
            <p>select a prompt and then browse within that category.</p>
            <PromptSelector onSelectPrompt={setSelectedPrompt}/>
            {filteredData && filteredData.length > 0 ? (
                <>
                <Letter {...filteredData[currentIndex]} />
                <button onClick={handlePrev} disabled={currentIndex === 0}>prev</button>
                <button onClick={handleNext} disabled={!filteredData || currentIndex === filteredData.length - 1}>next</button>
                </>
            ) : (
            <p>no available open letters for this prompt</p>
        )}
            <br />
            <br />
            <p>what's next?</p>
            <button onClick={() => setView('write')}>write a letter</button>
            <button onClick={() => setView('open')}>open a new letter</button>
        </div>
    );
}
