import PromptSelector from "./prompt_selector";
import { useState, useEffect } from 'react';
import Envelope from "@/components/envelope";
import { LetterProps } from "@/components/letter";

export interface LetterOpenerProps {
    hasWrittenLetter: boolean
    setHasWrittenLetter: (value: boolean) => void;
    setView: (value: string) => void;
    unopenedLetters: LetterProps[] | null;
}

// Similar to LetterBrowser but:
// 1. we allow the user to insert their info in the "read" field in the letter
// 2. and we only let them open one letter.
export default function LetterOpener({ hasWrittenLetter, setHasWrittenLetter, setView, unopenedLetters }: LetterOpenerProps) {

    const [selectedPrompt, setSelectedPrompt] = useState<string>('');
    const [openerName, setOpenerName] = useState<string>('');
    const [filteredData, setFilteredData] = useState<LetterProps[] | null>(null);
    const [openerLocation, setOpenerLocation] = useState<string>('');

    const handleOpenLetter = () => {
        setHasWrittenLetter(false);
    }

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
        }

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
            {hasWrittenLetter ? (
                <div>
                    <p>thank you for writing a letter! you can now open a new letter. select the prompt you'd like:</p>
                    <PromptSelector onSelectPrompt={setSelectedPrompt}></PromptSelector>
                    <Envelope prompt={selectedPrompt} />
                    <button onClick={handleOpenLetter}>open!</button>

                    {/* <Letter></Letter> get the first non-open letter in that category*/}
                    <label>
                        read by <input id="authorname" style={{ width: '10em' }} minLength={0} maxLength={25} placeholder='name (ex. "Grace", "ya girl", "kind carrot")' value={openerName} onChange={(e) => setOpenerName(e.target.value)} />
                    </label>
                    <label>
                        in <input id="authorlocation" style={{ width: '10em' }} minLength={0} maxLength={25} placeholder={'where you\'re writing from (ex. "NYC", "under a blanket", "the other side")'} value={openerLocation} onChange={(e) => setOpenerLocation(e.target.value)} />
                    </label>
                    <button onClick={saveLetter}>save letter</button>
                    {/* Save to db */}
                </div>
            ) :
                <div>
                    <p>there are currently # letter credits available. if you're in the letter-writing headspace, please write a letter. if not, go ahead and use a credit in lieu of writing a letter!</p>
                    <button onClick={() => setView('write')}>write a letter</button>
                    <button>use a credit</button>
                </div>
            }
            <button onClick={() => setView('browse')}>return to browsing</button>
        </div>
    );
}
