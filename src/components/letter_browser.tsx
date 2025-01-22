import Letter, { LetterProps } from '@/components/letter';
import LetterOpener from '@/components/letter_opener';
import PromptSelector from './prompt_selector';
import { useState, useEffect } from 'react';
import Envelope from '@/components/envelope';

export interface LetterBrowserProps {
    setView: (value: string) => void;
    // setOpenedLetter: (value: LetterProps) => void;
    // setOpenedID: (value: number) => void;
    openedLetters: LetterProps[];
    unopenedLetters: LetterProps[];
    defaultPrompts: string[];
    openedCounts: number[];
    unopenedCounts: number[];
    view: string;
}

export default function LetterBrowser({ view, setView, openedLetters, unopenedLetters, defaultPrompts, openedCounts, unopenedCounts}: LetterBrowserProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [numOpenedByPrompt, setNumOpenedByPrompt] = useState(0);
    const [lettersForPrompt, setLettersForPrompt] = useState<LetterProps[]>(); // opened AND unopened
    const [browserView, setBrowserView] = useState('');

    useEffect(() => {
        const filteredOpened = openedLetters.filter(letter => letter.prompt === selectedPrompt);
        setNumOpenedByPrompt(filteredOpened.length);
        const filteredUnopened = unopenedLetters.filter(letter => letter.prompt === selectedPrompt);
        setLettersForPrompt(filteredOpened.concat(filteredUnopened));
        setCurrentIndex(0);
    }, [selectedPrompt, openedLetters, unopenedLetters]) // effect will only activate if the values in the list change

    const handleNext = () => {
        // const { totalCount } = calculateCounts(selectedPrompt);
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
            return (<div className='letter'></div>);
        }
        console.log("openedLetters.length", openedLetters.length);
        if (currentIndex <= numOpenedByPrompt - 1) {
            console.log("currentIndex", currentIndex);
            return (<Letter {...lettersForPrompt[currentIndex]} />);
        } else {
            console.log("currentIndex", currentIndex); // this can change to the LetterOpener component
            // setOpenedID(lettersForPrompt[currentIndex].id);
            // setOpenedLetter(lettersForPrompt[currentIndex]);

            return (<div>
                <Envelope prompt={selectedPrompt} browse={true} setView={setBrowserView} />
            </div>
            );
        }
    };

    const renderNavigationButtons = () => {
        let isPrevDisabled = false;
        let isNextDisabled = false;

        if (selectedPrompt === '') {
            isPrevDisabled = true;
            isNextDisabled = true;
        }

        // const { totalCount } = calculateCounts(selectedPrompt);

        if (currentIndex === 0) {
            isPrevDisabled = true;
        }

        if (lettersForPrompt && (currentIndex >= lettersForPrompt.length - 1)) {
            isNextDisabled = true;
        }

        return (
            <>
                <button className={isPrevDisabled ? 'disabled' : ''} onClick={handlePrev} disabled={isPrevDisabled}>prev</button>&nbsp;
                <button className={isNextDisabled ? 'disabled' : ''} onClick={handleNext} disabled={isNextDisabled}>next</button>
            </>
        );
    };

    // const calculateCounts = (prompt: string) => {
    //     const unopenedCount = unopenedCounts[defaultPrompts.indexOf(selectedPrompt)];
    //     const openedCount = openedCounts[defaultPrompts.indexOf(selectedPrompt)];
    //     const totalCount = unopenedCount + openedCount;
    //     console.log("totalCount", totalCount);
    //     return { unopenedCount, openedCount, totalCount };
    // }
    console.log("view", view);
    if (lettersForPrompt && lettersForPrompt[currentIndex]) {
        console.log("lettersForPrompt[currentIndex].id", lettersForPrompt[currentIndex].id);
    }
    
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

            { browserView === 'browserOpen' && lettersForPrompt && <LetterOpener setView={setView} openedLetter={lettersForPrompt[currentIndex]}/>}

            {selectedPrompt !== '' && <div>
                <p>what&apos;s next?</p>
                <button onClick={() => setView('write')}>write a letter</button>
            </div>}
        </div>
    );
}
