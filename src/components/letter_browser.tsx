import Letter, { LetterProps } from '@/components/letter';
import PromptSelector from './prompt_selector';
import { useState, useEffect } from 'react';
import Envelope from './envelope';

export interface LetterBrowserProps {
    setView: (value: string) => void;
    openedLetters: LetterProps[] | null;
    defaultPrompts: string[];
}

// TODO: User can click through all the opened letters and then they get to the unopened letters (if they keep searching, then they'll have incentive): "oop, this is a new letter! if you want to open it, you have some options: (write a letter) or (use a letter credit)"
export default function LetterBrowser({ setView, openedLetters, defaultPrompts }: LetterBrowserProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [counts, setCounts] = useState<number[]>(new Array(defaultPrompts.length).fill(0));
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [filteredData, setFilteredData] = useState<LetterProps[] | null>(null);

    useEffect(() => {
        if (openedLetters) {
            const promptCounts = new Array(defaultPrompts.length).fill(0);
            openedLetters.forEach(letter => {
                const index = defaultPrompts.indexOf(letter.prompt);
                if (index !== -1) {
                    promptCounts[index]++;
                } else {
                    promptCounts[promptCounts.length - 1]++;
                }
            });
            setCounts(promptCounts);
        }
    }, [openedLetters, defaultPrompts]);

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
            <p>select a prompt and then browse within that category. each letter becomes available for viewing once it has already been opened.</p>
            <PromptSelector onSelectPrompt={setSelectedPrompt} defaultPrompts={defaultPrompts} label='available' counts={counts}/>
            {filteredData && filteredData.length > 0 &&
                <>  
                <Letter {...filteredData[currentIndex]} />
                <br />
                <button onClick={handlePrev} disabled={currentIndex === 0}>prev</button>
                <button onClick={handleNext} disabled={!filteredData || currentIndex === filteredData.length - 1}>next</button>
                </>}
            <br />
            <br />
            <p>what's next?</p>
            <button onClick={() => setView('write')}>write a letter</button>
            <button onClick={() => setView('open')}>open a new letter</button>
        </div>
    );
}
