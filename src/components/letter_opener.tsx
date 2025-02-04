import { useState, useEffect } from 'react';
import { LetterProps } from "@/components/letter";
import Letter from "@/components/letter";
import { Update } from 'next/dist/build/swc/types';

export interface LetterOpenerProps {
    setView: (value: string) => void;
    openedLetter: LetterProps;
    setNumOpenedLetters: (value: number) => void;
    setNumUnopenedLetters: (value: number) => void;
    numUnopenedLetters: number;
    numOpenedLetters: number;
}

interface UpdatedOpenedLetterProps {
    id: number,
    opener_name: string,
    opener_location: string,
    opened_date: string,
    is_opened: boolean
}

export default function LetterOpener({ setView, openedLetter, setNumOpenedLetters, setNumUnopenedLetters, numOpenedLetters, numUnopenedLetters }: LetterOpenerProps) {

    const [openerName, setOpenerName] = useState<string>('');
    const [openerLocation, setOpenerLocation] = useState<string>('');
    const [updatedLetterProps, setUpdatedLetterProps] = useState<UpdatedOpenedLetterProps>();
    const [hasRead, setHasRead] = useState(false);

    useEffect(() => {
        if (hasRead) {

            setUpdatedLetterProps ({
                id: openedLetter.id,
                opener_name: openerName,
                opener_location: openerLocation,
                opened_date: new Date().toISOString(),
                is_opened: true,
            });

            fetch("/api/open_letter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedLetterProps),
            }).then(async (response) => {
                if (response.ok) {
                    return await response.json()
                }
            })

            setNumOpenedLetters(numOpenedLetters + 1);
            setNumUnopenedLetters(numUnopenedLetters - 1);
        }
    }, [hasRead]);

    return (
        <>
            <h2>open a new letter</h2>
            <br />
            {!hasRead &&
                <Letter {...openedLetter} setOpenerName={setOpenerName} setOpenerLocation={setOpenerLocation} setHasClickedRead={setHasRead} />
            }
            {updatedLetterProps && <>
                <Letter 
                    id={openedLetter.id}
                    prompt={openedLetter.prompt}
                    author_name={openedLetter.author_name}
                    author_location={openedLetter.author_location}
                    created_date={openedLetter.created_date}
                    letter_body={openedLetter.letter_body}
                    opener_name={updatedLetterProps.opener_name}
                    opener_location={updatedLetterProps.opener_location}
                    opened_date={updatedLetterProps.opened_date}
                    is_opened={updatedLetterProps.is_opened}
                />
                <br />
                <p>your letter has been saved and can now be browsed by the community!</p>
            </>}
            <br />
            <button onClick={() => setView('')}>return to browsing</button>
            <br />
            <br />
        </>
    );
}
