import Letter, { LetterProps } from '@/components/letter';
import PromptSelector from './prompt_selector';
import { useState, useEffect } from 'react';
// import Envelope from '@/components/envelope';

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
    const [lettersForPrompt, setLettersForPrompt] = useState<LetterProps[] | null>(null);

    useEffect(() => {
        if (openedLetters) {
            const filtered = openedLetters.filter(letter => letter.prompt === selectedPrompt);
            setLettersForPrompt(filtered);
            setCurrentIndex(0);
        }
    }, [selectedPrompt, openedLetters]) // effect will only activate if the values in the list change

    const handleNext = () => {
        if (lettersForPrompt && currentIndex < lettersForPrompt.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (lettersForPrompt && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    return (
        <div>
            <h2>browse letters</h2>
            
            <PromptSelector onSelectPrompt={setSelectedPrompt} defaultPrompts={defaultPrompts} label='available' openedCounts={openedCounts} unopenedCounts={unopenedCounts}/>
            <br />
            {/* first show all opened letters, then show unopened letters as envelopes */}
            {(lettersForPrompt && lettersForPrompt.length > 0) ? 
                (<>  
                <Letter {...lettersForPrompt[currentIndex]} />
                </>) : (<div className='letter'></div>)}
                {/* {unopenedCounts[defaultPrompts.indexOf[selectedPrompt]] > 0 && currentIndex >= lettersForPrompt.length && <Envelope></Envelope>} */}
            <br />
            <button className={selectedPrompt === '' ||  currentIndex === 0 ? 'disabled' : ''} onClick={handlePrev} disabled={selectedPrompt === '' || currentIndex === 0}>prev</button>&nbsp;
            <button className={selectedPrompt === '' || currentIndex === (lettersForPrompt && lettersForPrompt.length - 1)? 'disabled' : ''} onClick={handleNext} disabled={selectedPrompt === '' || currentIndex === (lettersForPrompt && lettersForPrompt.length - 1)}>next</button>
            <br />
            <br />

            { selectedPrompt !== '' && <div><p>what&apos;s next?</p>
            <button onClick={() => setView('write')}>write a letter</button>&nbsp;
            <button onClick={() => setView('open')}>open a new letter</button></div>}
        </div>
    );
}
  