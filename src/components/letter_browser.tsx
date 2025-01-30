import Letter, { LetterProps } from '@/components/letter';
import LetterOpener from '@/components/letter_opener';
import PromptSelector from './prompt_selector';
import { useState, useEffect } from 'react';
import Envelope from '@/components/envelope';

export interface LetterBrowserProps {
    setView: (value: string) => void;
    openedLetters: LetterProps[];
    unopenedLetters: LetterProps[];
    defaultPrompts: string[];
    openedCounts: number[];
    unopenedCounts: number[];
    numOpenedLetters: number;
    numUnopenedLetters: number;
    setNumUnopenedLetters: (value : number) => void;
    setNumOpenedLetters: (value : number) => void;
}

export default function LetterBrowser({ setView, openedLetters, unopenedLetters, defaultPrompts, openedCounts, unopenedCounts, setNumOpenedLetters, setNumUnopenedLetters, numOpenedLetters, numUnopenedLetters}: LetterBrowserProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [numOpenedByPrompt, setNumOpenedByPrompt] = useState(0);
    const [lettersForPrompt, setLettersForPrompt] = useState<LetterProps[]>(); // opened AND unopened
    const [browserView, setBrowserView] = useState('');

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            handlePrev();
        } else if (event.key === 'ArrowRight') {
            handleNext();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [lettersForPrompt, currentIndex]); // Add dependencies to ensure the event listener is updated


    useEffect(() => {
        const filteredOpened = openedLetters.filter(letter => letter.prompt === selectedPrompt);
        setNumOpenedByPrompt(filteredOpened.length);
        const filteredUnopened = unopenedLetters.filter(letter => letter.prompt === selectedPrompt);
        setLettersForPrompt(filteredOpened.concat(filteredUnopened));
        setCurrentIndex(0);
    }, [selectedPrompt, openedLetters, unopenedLetters]) // effect will only activate if the values in the list change

    const handleNext = () => {
        if (lettersForPrompt && currentIndex < lettersForPrompt.length - 1) {
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
            return (<div className='letter' style={{ 'backgroundColor': 'white' }}></div>);
        }
        if (lettersForPrompt[currentIndex]) {
            if (currentIndex <= numOpenedByPrompt - 1) {
                return (<Letter {...lettersForPrompt[currentIndex]} />);
            } else {
                const author_name = lettersForPrompt[currentIndex].author_name;
                const author_location = lettersForPrompt[currentIndex].author_location;
                const created_date = lettersForPrompt[currentIndex].created_date;
                return (<div>
                    <Envelope prompt={selectedPrompt} browse={true} setView={setBrowserView} author_name={author_name} author_location={author_location} created_date={created_date} />
                </div>
                );
            }
        }
        return;
    };

    const renderNavigationButtons = () => {
        let isPrevDisabled = false;
        let isNextDisabled = false;

        if (selectedPrompt === '') {
            isPrevDisabled = true;
            isNextDisabled = true;
        }

        if (currentIndex === 0) {
            isPrevDisabled = true;
        }

        if (lettersForPrompt && (currentIndex >= lettersForPrompt.length - 1)) {
            isNextDisabled = true;
        }

        return (selectedPrompt !== '' &&
            <>

                <button className={isPrevDisabled ? 'disabled' : ''} onClick={handlePrev} disabled={isPrevDisabled}>prev</button>&nbsp;
                <button className={isNextDisabled ? 'disabled' : ''} onClick={handleNext} disabled={isNextDisabled}>next</button>
                &nbsp;{(openedCounts && unopenedCounts) && selectedPrompt !== '' && ` (${openedCounts[defaultPrompts.indexOf(selectedPrompt)]} opened${`, ${unopenedCounts[defaultPrompts.indexOf(selectedPrompt)]} unopened`})`}
            </>
        );
    };

    return (
        <div>
            {browserView === '' &&
                <><h2>browse letters</h2>
                    <PromptSelector onSelectPrompt={setSelectedPrompt} defaultPrompts={defaultPrompts} label='available' openedCounts={openedCounts} unopenedCounts={unopenedCounts} />
                    <br />
                    {renderLetters()}
                    <br />
                    {renderNavigationButtons()}
                    <br />
                    <br /></>
            }

            {browserView === 'browserOpen' && lettersForPrompt && <LetterOpener setView={setBrowserView} openedLetter={lettersForPrompt[currentIndex]} setNumUnopenedLetters={setNumUnopenedLetters} setNumOpenedLetters={setNumOpenedLetters} numUnopenedLetters={numUnopenedLetters} numOpenedLetters={numOpenedLetters} />}

            <br />
            <button onClick={() => setView('write')}>write a letter</button>
            <br />
            <br />
        </div>
    );
}
