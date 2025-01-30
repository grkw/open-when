import Letter, { LetterProps } from '@/components/letter';
import LetterOpener from '@/components/letter_opener';
import PromptSelector from './prompt_selector';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Envelope from '@/components/envelope';

export interface LetterBrowserProps {
    setView: (value: string) => void;
    openedLetters: LetterProps[];
    unopenedLetters: LetterProps[];
    prompts: string[];
    openedCounts: number[];
    unopenedCounts: number[];
    numOpenedLetters: number;
    numUnopenedLetters: number;
    setNumUnopenedLetters: (value: number) => void;
    setNumOpenedLetters: (value: number) => void;
}

// Handle keypress events for navigation
const handleKeyDown = (event: KeyboardEvent, handlePrev: () => void, handleNext: () => void) => {
    if (event.key === 'ArrowLeft') {
        handlePrev();
    } else if (event.key === 'ArrowRight') {
        handleNext();
    }
};

export default function LetterBrowser({ setView, openedLetters, unopenedLetters, prompts, openedCounts, unopenedCounts, setNumOpenedLetters, setNumUnopenedLetters, numOpenedLetters, numUnopenedLetters }: LetterBrowserProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [browserView, setBrowserView] = useState('');

    // Memoize the letters (both opened and unopened) filtered by the selected prompt (caches the result of the calculation between re-renders)
    const lettersForPrompt = useMemo(() => {
        const filteredOpened = openedLetters.filter(letter => letter.prompt === selectedPrompt);
        const filteredUnopened = unopenedLetters.filter(letter => letter.prompt === selectedPrompt);
        return filteredOpened.concat(filteredUnopened);
    }, [selectedPrompt, openedLetters, unopenedLetters]);

    // Memoize the number of opened letters for the selected prompt (caches the result of the calculation between re-renders)
    const numOpenedByPrompt = useMemo(() => {
        return openedLetters.filter(letter => letter.prompt === selectedPrompt).length;
    }, [selectedPrompt, openedLetters]);

    // Render the letter (or envelope) based on the current index and selected prompt
    const renderLetters = () => {

        if (selectedPrompt === '') {
            return (<div className='letter' style={{ 'backgroundColor': 'white' }}></div>);
        }

        const letter = lettersForPrompt[currentIndex];

        if (currentIndex <= numOpenedByPrompt - 1) {
            return (<Letter {...letter} />);
        } else {
            const { author_name, author_location, created_date } = letter;
            return (
                <Envelope prompt={selectedPrompt} browse={true} setView={setBrowserView} author_name={author_name} author_location={author_location} created_date={created_date} />
            );
        }
    };

    // Handle next button click (useCallback caches the function definition between re-renders)
    const handleNext = useCallback(() => {
        if (currentIndex < lettersForPrompt.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }, [currentIndex, lettersForPrompt]);

    // Handle previous button click (useCallback caches the function definition between re-renders)
    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }, [currentIndex]);

    // Add event listener for keydown events
    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => handleKeyDown(event, handlePrev, handleNext);
        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, [handlePrev, handleNext]);

    const renderNavigationButtons = () => {
        const isPrevDisabled = currentIndex === 0 || selectedPrompt === '';
        const isNextDisabled = currentIndex >= lettersForPrompt.length - 1 || selectedPrompt === '';

        return (selectedPrompt !== '' &&
            <>
                <button className={isPrevDisabled ? 'disabled' : ''} onClick={handlePrev} disabled={isPrevDisabled}>prev</button>
                &nbsp;
                <button className={isNextDisabled ? 'disabled' : ''} onClick={handleNext} disabled={isNextDisabled}>next</button>
                &nbsp;
                {(openedCounts && unopenedCounts) && selectedPrompt !== '' && ` (${openedCounts[prompts.indexOf(selectedPrompt)]} opened${`, ${unopenedCounts[prompts.indexOf(selectedPrompt)]} unopened`})`}
            </>
        );
    };

    const displayBrowserView = () => {
        switch (browserView) {
            case '':
                return (
                    <>
                        <h2>browse letters</h2>
                        <PromptSelector onSelectPrompt={setSelectedPrompt} prompts={prompts} label='available' openedCounts={openedCounts} unopenedCounts={unopenedCounts} />
                        <br />
                        {renderLetters()}
                        <br />
                        {renderNavigationButtons()}
                        <br />
                        <br />
                    </>
                );
            case 'browserOpen':
                return (
                    <LetterOpener setView={setBrowserView} openedLetter={lettersForPrompt[currentIndex]} setNumUnopenedLetters={setNumUnopenedLetters} setNumOpenedLetters={setNumOpenedLetters} numUnopenedLetters={numUnopenedLetters} numOpenedLetters={numOpenedLetters} />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {displayBrowserView()}
            <br />
            <button onClick={() => setView('write')}>write a letter</button>
            <br />
            <br />
        </>
    );
}
