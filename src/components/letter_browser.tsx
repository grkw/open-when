import Letter, { LetterProps } from '@/components/letter';
import PromptSelector from './prompt_selector';
import { useState, useEffect } from 'react';

export interface LetterBrowserProps {
    setView: (value: string) => void;
    openedLetters: LetterProps[] | null;
    defaultPrompts: string[];
    openedCounts: number[];
    unopenedCounts: number[];
}

// TODO: User can click through all the opened letters and then they get to the unopened letters (if they keep searching, then they'll have incentive): "oop, this is a new letter! if you want to open it, you have some options: (write a letter) or (use a letter credit)"
export default function LetterBrowser({ setView, openedLetters, defaultPrompts, openedCounts, unopenedCounts}: LetterBrowserProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [counts, setCounts] = useState<number[]>(new Array(defaultPrompts.length).fill(0));
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
            <h2>browse letters</h2>
            <p>select a prompt and then browse within that category.</p>
            <PromptSelector onSelectPrompt={setSelectedPrompt} defaultPrompts={defaultPrompts} label='available' openedCounts={openedCounts} unopenedCounts={unopenedCounts}/>
            <br />
            {(filteredData && filteredData.length > 0) ? 
                (<>  
                <Letter {...filteredData[currentIndex]} />
                </>) : (<div className='letter'></div>)}
            <br />
            <button className={selectedPrompt === '' ||  currentIndex === 0 ? 'disabled' : ''} onClick={handlePrev} disabled={selectedPrompt === '' || currentIndex === 0}>prev</button>&nbsp;
            <button className={selectedPrompt === '' || currentIndex === (filteredData && filteredData.length - 1)? 'disabled' : ''} onClick={handleNext} disabled={selectedPrompt === '' || currentIndex === (filteredData && filteredData.length - 1)}>next</button>
            <br />
            <br />
            <p>what&apos;s next?</p>
            <button onClick={() => setView('write')}>write a letter</button>&nbsp;
            <button onClick={() => setView('open')}>open a new letter</button>
        </div>
    );
}
