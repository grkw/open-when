import PromptSelector from "./prompt_selector";
import { useState, useEffect } from 'react';
import Envelope from "@/components/envelope";
import { LetterProps } from "@/components/letter";
import Letter from "@/components/letter";

export interface LetterOpenerProps {
    hasWrittenLetter: boolean
    setHasWrittenLetter: (value: boolean) => void;
    setView: (value: string) => void;
    unopenedLetters: LetterProps[] | null;
    defaultPrompts: string[];
    numCredits: number,
    setNumCredits: (value: number) => void;
    unopenedCounts: number[];
}

// Similar to LetterBrowser but:
// 1. we allow the user to insert their info in the "read" field in the letter
// 2. and we only let them open one letter.
export default function LetterOpener({ hasWrittenLetter, setHasWrittenLetter, setView, unopenedLetters, defaultPrompts, numCredits, setNumCredits, unopenedCounts}: LetterOpenerProps) {

    const [selectedPrompt, setSelectedPrompt] = useState<string>('');
    const [filteredData, setFilteredData] = useState<LetterProps[] | null>(null);
    const [openerName, setOpenerName] = useState<string>('');
    const [openerLocation, setOpenerLocation] = useState<string>('');
    const [openedID, setOpenedID] = useState(0);
    const [openedLetter, setOpenedLetter] = useState<LetterProps | null>(null);
    // const [counts, setCounts] = useState<number[]>(new Array(defaultPrompts.length).fill(0));
    const [saved, setSaved] = useState(false);

    const handleOpenLetter = () => {
        
        if (filteredData && filteredData.length > 0) {
            const updatedLetter = { ...filteredData[0], is_opened: true };
            setOpenedID(updatedLetter.id)
            setFilteredData([updatedLetter])
            setOpenedLetter(updatedLetter);
        } else {
            console.error('No letters available to open.');
            return <p>no letters available to open for this prompt</p>;
        }
    }

    const handleCreditClick = () => {

        setHasWrittenLetter(true);

        const updatedCredits: number = numCredits - 1;
        setNumCredits(updatedCredits);
        console.log("numCredits", updatedCredits);

        interface UpdateCreditResponse {
        success: boolean;
        message: string;
        }

        fetch("/api/update_credit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ num_credits: updatedCredits }),
        }).then(async (response: Response): Promise<UpdateCreditResponse> => {
        if (response.ok) {
            return await response.json();
        }
        throw new Error('Network response was not ok.');
        }).then((data: UpdateCreditResponse) => {
        console.log("updateCreditResponse");
        console.log(data);
        // do stuff with response here
        }).catch((error: Error) => {
        console.error(error);
        // do stuff with error here
        });
    }

    // useEffect(() => {
    //     if (unopenedLetters) {
    //         const promptCounts = new Array(defaultPrompts.length).fill(0);
    //         unopenedLetters.forEach(letter => {
    //             const index = defaultPrompts.indexOf(letter.prompt);
    //             if (index !== -1) {
    //                 promptCounts[index]++;
    //             } else {
    //                 promptCounts[promptCounts.length - 1]++;
    //              }
    //         });
    //         setCounts(promptCounts);
    //     }
    // }, [unopenedLetters, defaultPrompts]);

    useEffect(() => {
        if (unopenedLetters) {
            const filtered = unopenedLetters.filter(letter => letter.prompt === selectedPrompt);
            setFilteredData(filtered);
        }
    }, [selectedPrompt, unopenedLetters]) // effect will only activate if the values in the list change

    useEffect(() => {
        if (saved) {
            setHasWrittenLetter(false);
        }
    }, [saved]);

    useEffect(() => {
        // Set hasWrittenLetter to false when the component mounts
        setHasWrittenLetter(false);
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const saveLetter = () => {
        const letterData = {
            opener_name: openerName,
            opener_location: openerLocation,
            id: openedID,
        }

        setSaved(true);

        fetch("/api/open_letter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(letterData),
        }).then(async (response) => {
            if (response.ok) {
                return await response.json()
            }
        })
    }

    return (
        <div>
            <h2>open a new letter</h2>
            {hasWrittenLetter ? ( // hasWrittenLetter
                <div>
                    <p></p><br/>
                    <PromptSelector onSelectPrompt={setSelectedPrompt} unopenedCounts={unopenedCounts} defaultPrompts={defaultPrompts} label='available'></PromptSelector>
                    <br />
                    {openedLetter ? (
                        <Letter {...openedLetter} setOpenerName={setOpenerName} setOpenerLocation={setOpenerLocation} />
                    ) : (
                        <Envelope prompt={selectedPrompt} />
                    )}
                    <br/>
                    {!openedLetter && <button onClick={handleOpenLetter}>open!</button>}
                    {openedLetter && <button onClick={saveLetter}>save letter</button>}
                    {saved && <p>your letter has been saved and can now be browsed by the community!</p>}
                </div>
            ) :
                <div>
                    <p>there are currently <em>{numCredits}</em> letter-opening credits available. if you&apos;re in the letter-writing headspace, please write a letter. if not, go ahead and use a credit in lieu of writing a letter!</p>
                    <br />
                    <button onClick={() => setView('write')}>write a letter</button>&nbsp;
                    <button onClick={handleCreditClick} disabled={numCredits === 0}>use a credit</button>
                </div>
            }
            <br />
            <br />
            <button onClick={() => setView('browse')}>return to browsing</button>
        </div>
    );
}
