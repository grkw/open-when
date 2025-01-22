import Letter, { LetterProps } from '@/components/letter';
import PromptSelector from './prompt_selector';
import { useState, useEffect } from 'react';
import Envelope from '@/components/envelope';

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
        const { totalCount } = calculateCounts(selectedPrompt);
        if (lettersForPrompt && currentIndex < totalCount - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (lettersForPrompt && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const renderLetters = () => {
        // first show all opened letters, then show unopened letters as envelopes
        if (!lettersForPrompt) {
            return;
        }

        if (selectedPrompt === '') {
            return (<div className='letter'></div>);
        }
        console.log("currentIndex", currentIndex);
        console.log("lettersForPrompt.length", lettersForPrompt.length);
        if (currentIndex <= lettersForPrompt.length - 1) {
            console.log("print letter");
            return (<Letter {...lettersForPrompt[currentIndex]} />);
        } else {
            console.log("print envelope");
            return (<Envelope prompt={selectedPrompt}/>);
        }
    };

    const renderNavigationButtons = () => {
        let isPrevDisabled = false;
        let isNextDisabled = false;

        if (selectedPrompt === '') {
            isPrevDisabled = true;
            isNextDisabled = true;
        }

        const { totalCount }= calculateCounts(selectedPrompt);

        if (currentIndex === 0) {
            isPrevDisabled = true;
        }

        if (currentIndex >= totalCount - 1) {
            isNextDisabled = true;
        }

        return (
            <>
                <button className={isPrevDisabled ? 'disabled' : ''} onClick={handlePrev} disabled={isPrevDisabled}>prev</button>&nbsp;
                <button className={isNextDisabled ? 'disabled' : ''} onClick={handleNext} disabled={isNextDisabled}>next</button>
            </>
        );
    };

    const calculateCounts = (prompt: string) => {
        const unopenedCount = unopenedCounts[defaultPrompts.indexOf(selectedPrompt)];
        const openedCount = openedCounts[defaultPrompts.indexOf(selectedPrompt)];
        const totalCount = unopenedCount + openedCount;
        console.log("totalCount", totalCount);
        return { unopenedCount, openedCount, totalCount };
    }

    return (
        <div>
            <h2>browse letters</h2>
            
            <PromptSelector onSelectPrompt={setSelectedPrompt} defaultPrompts={defaultPrompts} label='available' openedCounts={openedCounts} unopenedCounts={unopenedCounts}/>
            <br />
            {renderLetters()}
            <br />
            {renderNavigationButtons()}
            <br />
            <br />

            { selectedPrompt !== '' && <div><p>what&apos;s next?</p>
            <button onClick={() => setView('write')}>write a letter</button>&nbsp;
            <button onClick={() => setView('open')}>open a new letter</button></div>}
        </div>
    );
}
  