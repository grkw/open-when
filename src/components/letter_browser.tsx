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

export interface UpdatedOpenedLetterProps {
    id: number,
    opener_name: string,
    opener_location: string,
    opened_date: string,
    is_opened: boolean
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
    const [updatedLetterProps, setUpdatedLetterProps] = useState<UpdatedOpenedLetterProps>();
    const [openerName, setOpenerName] = useState<string>('');
    const [openerLocation, setOpenerLocation] = useState<string>('');

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

    const handleOpenClick = (id: number) => {
        console.log("handleOpenClick");
        setView('open');

        setUpdatedLetterProps(() => {
            const newProps = {
                id: id,
                opener_name: openerName,
                opener_location: openerLocation,
                opened_date: new Date().toISOString(),
                is_opened: true,
            };
            console.log('UpdatedOpenedLetterProps:', newProps);
            return newProps;
        });

    };

    useEffect(() => {
        console.log("use effect for updatedletterprops");
        if (updatedLetterProps) {
            console.log("in if(updatedletterprops)");
            fetch("/api/open_letter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedLetterProps),
            }).then(async (response) => {
                if (response.ok) {
                    setNumOpenedLetters(numOpenedLetters + 1);
                    setNumUnopenedLetters(numUnopenedLetters - 1);
                    console.log("response was ok");
                    return await response.json();
                }
            });
        }
    }, [updatedLetterProps]);

    // Render the letter (or envelope) based on the current index and selected prompt
    const renderLetters = () => {

        if (selectedPrompt === '') {
            return (<div className='letter' style={{ 'backgroundColor': 'white' }}></div>);
        }

        const letter = lettersForPrompt[currentIndex];
        const hasInputInfo = openerName != '' && openerLocation != '';

        if (currentIndex <= numOpenedByPrompt - 1) {
            return (<Letter {...letter} />);
        } else {
            const { author_name, author_location, created_date, id } = letter;
            return (
                <>
                    <Envelope prompt={selectedPrompt} author_name={author_name} author_location={author_location} created_date={created_date} />
                    <p>this is a new letter! if you&apos;d like to open it, please put your name and location.</p>
                    <br />
                    <div style={{ display: 'inline' }}>
                        <br />
                        <form>
                        <label>
                            <input id="authorname" style={{ width: '7em' }} minLength={0} maxLength={25} placeholder='your name' value={openerName} onChange={(e) => setOpenerName && setOpenerName(e.target.value)} required />&nbsp;
                        </label>
                        &nbsp;
                        <label>
                            <input id="authorlocation" style={{ width: '13em' }} minLength={0} maxLength={25} value={openerLocation} onChange={(e) => setOpenerLocation && setOpenerLocation(e.target.value)} placeholder="where you're reading from" required />&nbsp;
                        </label>
                        &nbsp;
                        <button type='submit' onClick={() => handleOpenClick(id)} className={hasInputInfo ? '' : 'disabled'} disabled={!hasInputInfo}>open</button>
                        </form>
                        <br />
                        <br />
                    </div>
                </>
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
                        <PromptSelector selectedPrompt={selectedPrompt} setSelectedPrompt={setSelectedPrompt} prompts={prompts} />
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
                    <LetterOpener setView={setBrowserView} openedLetter={lettersForPrompt[currentIndex]} openerProps={updatedLetterProps} />
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
