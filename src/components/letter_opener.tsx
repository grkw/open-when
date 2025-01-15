import PromptSelector from "./prompt_selector";
import { useState } from 'react';
import Envelope from "@/components/envelope";

export interface LetterOpenerProps {
    hasWrittenLetter: boolean
    setHasWrittenLetter: (value: boolean) => void;
    setView: (value: string) => void;
}

// Similar to LetterBrowser but:
// 1. we allow the user to insert their info in the "read" field in the letter
// 2. and we only let them open one letter.
export default function LetterOpener({hasWrittenLetter, setHasWrittenLetter, setView}: LetterOpenerProps) {

    const [selectedPrompt, setSelectedPrompt] = useState<string>('');

    const handleOpenLetter = () => {
        setHasWrittenLetter(false);
    }

    return (
        <div>
            <h2>open a new letter</h2>
            {hasWrittenLetter ? (
                <div>
                    <p>thank you for writing a letter! you can now open a new letter. select the prompt you'd like:</p>
                    <PromptSelector onSelectPrompt={setSelectedPrompt}></PromptSelector>
                    <Envelope prompt={selectedPrompt}/>
                    <button onClick={handleOpenLetter}>open!</button>
                    
                    {/* <Letter></Letter> */}
                    <button>save letter</button> 
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
