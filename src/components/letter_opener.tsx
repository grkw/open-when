// import PromptSelector from "./prompt_selector";
import { useState, useEffect } from 'react';
// import Envelope from "@/components/envelope";
import { LetterProps } from "@/components/letter";
import Letter from "@/components/letter";

export interface LetterOpenerProps {
    setView: (value: string) => void;
    openedLetter: LetterProps;
    // openedID: number;
        // const updatedLetter = { ...filteredData[0], is_opened: true }; in Browser
        // setOpenedID(updatedLetter.id)
        // setFilteredData([updatedLetter]) ???????
        // setOpenedLetter(updatedLetter);
}

// Similar to LetterBrowser but:
// 1. we allow the user to insert their info in the "read" field in the letter
// 2. and we only let them open one letter.
export default function LetterOpener({ setView, openedLetter }: LetterOpenerProps) {

    console.log("letteropener");

    // const [selectedPrompt, setSelectedPrompt] = useState<string>('');
    // const [filteredData, setFilteredData] = useState<LetterProps[] | null>(null);
    const [openerName, setOpenerName] = useState<string>('');
    const [openerLocation, setOpenerLocation] = useState<string>('');
    // const openedID = useState(0);
    // const openedLetter = useState<LetterProps | null>(null);
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
            <button onClick={() => setView('browse')}>return to browsing</button>
        </div>
    );
}
