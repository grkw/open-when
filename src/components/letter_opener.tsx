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
}

// Similar to LetterBrowser but:
// 1. we allow the user to insert their info in the "read" field in the letter
// 2. and we only let them open one letter.
export default function LetterOpener({ hasWrittenLetter, setHasWrittenLetter, setView, unopenedLetters, defaultPrompts }: LetterOpenerProps) {

    const [selectedPrompt, setSelectedPrompt] = useState<string>('');
    const [filteredData, setFilteredData] = useState<LetterProps[] | null>(null);
    const [openerName, setOpenerName] = useState<string>('');
    const [openerLocation, setOpenerLocation] = useState<string>('');
    const [openedID, setOpenedID] = useState(0);
    const [openedLetter, setOpenedLetter] = useState<LetterProps | null>(null);
    const [counts, setCounts] = useState<number[]>(new Array(defaultPrompts.length).fill(0));
    const [saved, setSaved] = useState(false);

    const handleOpenLetter = () => {
        setHasWrittenLetter(false);
        if (filteredData && filteredData.length > 0) {
            console.log("filteredData");
            console.log(filteredData);
            const updatedLetter = { ...filteredData[0], is_opened: true };
            setOpenedID(updatedLetter.id)
            setFilteredData([updatedLetter])
            setOpenedLetter(updatedLetter);
        } else {
            console.error('No letters available to open.');
            return <p>no letters available to open for this prompt</p>;
        }
    }

    useEffect(() => {
        if (unopenedLetters) {
            const promptCounts = new Array(defaultPrompts.length).fill(0);
            unopenedLetters.forEach(letter => {
                const index = defaultPrompts.indexOf(letter.prompt);
                if (index !== -1) {
                    promptCounts[index]++;
                    console.log(letter.prompt);
                } else {
                    promptCounts[promptCounts.length - 1]++;
                    console.log('other: ', letter.prompt);
                }
            });
            console.log("promptCounts");
            console.log(promptCounts);
            setCounts(promptCounts);
        }
    }, [unopenedLetters, defaultPrompts]);

    useEffect(() => {
        if (unopenedLetters) {
            const filtered = unopenedLetters.filter(letter => letter.prompt === selectedPrompt);
            setFilteredData(filtered);
        }
    }, [selectedPrompt, unopenedLetters]) // effect will only activate if the values in the list change

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
        }).then((data) => {
            console.log(data)
            // do stuff with response here
        }).catch((error) => {
            console.error(error)
            // do stuff with error here
        })
    }

    return (
        <div>
            <h2>open a new letter</h2>
            {true ? ( // hasWrittenLetter
                <div>
                    <p>thank you for writing a letter! you can now open a new letter. select the prompt you'd like:</p><br/>
                    <PromptSelector onSelectPrompt={setSelectedPrompt} counts={counts} defaultPrompts={defaultPrompts} label='available'></PromptSelector>
                    {openedLetter ? (
                        <div className='letterBody'>
                        <Letter {...openedLetter} setOpenerName={setOpenerName} setOpenerLocation={setOpenerLocation} />
                        </div>
                    ) : (
                        <Envelope prompt={selectedPrompt} />
                    )}
                    <br/>
                    {!openedLetter && <button onClick={handleOpenLetter}>open!</button>}
                    {openedLetter && <button onClick={saveLetter}>save letter</button>}
                    {saved && <p>your letter has been saved and can be browsed by the community!</p>}
                </div>
            ) :
                <div>
                    <p>there are currently # letter credits available. if you're in the letter-writing headspace, please write a letter. if not, go ahead and use a credit in lieu of writing a letter!</p>
                    <button onClick={() => setView('write')}>write a letter</button>
                    <button>use a credit</button>
                </div>
            }
            <br />
            <button onClick={() => setView('browse')}>return to browsing</button>
        </div>
    );
}
