import { useState } from 'react';
import { LetterProps } from "@/components/letter";
import Letter from "@/components/letter";

export interface LetterOpenerProps {
    setView: (value: string) => void;
    openedLetter: LetterProps;
    setNumOpenedLetters: (value : number) => void;
    setNumUnopenedLetters: (value : number) => void;
    numUnopenedLetters: number;
    numOpenedLetters: number;
}

// Similar to LetterBrowser but:
// 1. we allow the user to insert their info in the "read" field in the letter
// 2. and we only let them open one letter.
export default function LetterOpener({ setView, openedLetter, setNumOpenedLetters, setNumUnopenedLetters, numOpenedLetters, numUnopenedLetters}: LetterOpenerProps) {

    const [openerName, setOpenerName] = useState<string>('');
    const [openerLocation, setOpenerLocation] = useState<string>('');

    const [saved, setSaved] = useState(false);

    const saveLetter = () => {

        const letterData = {
            id: openedLetter.id,
            opener_name: openerName,
            opener_location: openerLocation,
            is_opened: true,
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

        setNumOpenedLetters(numOpenedLetters+1);
        setNumUnopenedLetters(numUnopenedLetters-1);
    }

    return (
        <div>
            <h2>open a new letter</h2>
            <br />
            <div>
                {openedLetter &&
                    <Letter {...openedLetter} setOpenerName={setOpenerName} setOpenerLocation={setOpenerLocation} />
                }
                <br />
                {openedLetter && <button onClick={saveLetter}>save letter</button>}
                {saved && <p>your letter has been saved and can now be browsed by the community!</p>}
            </div>
            <br />
            <button onClick={() => setView('')}>return to browsing</button>
            <br />
            <br />
        </div>
    );
}
