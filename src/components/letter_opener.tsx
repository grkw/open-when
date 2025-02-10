import { useState } from 'react';
import { UpdatedOpenedLetterProps } from "@/components/letter_browser";
import { LetterProps } from "@/components/letter";
import Letter from "@/components/letter";

export interface LetterOpenerProps {
    setView: (value: string) => void;
    openedLetter: LetterProps;
    openerProps: UpdatedOpenedLetterProps | undefined; // hacky fix for compiler error
}

export default function LetterOpener({ setView, openedLetter, openerProps }: LetterOpenerProps) {

    const [hasDeleted, setHasDeleted] = useState(false);

    const handleDeleteClick = (id: number) => {
        fetch("/api/delete_letter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(id),
        }).then(async (response) => {
            if (response.ok) {
                console.log("response was ok");
                setHasDeleted(true);
                return await response.json();
            }
        });
    }

    return (
        <>
            <h2>open a new letter</h2>
            <br />
            {openerProps &&
                <Letter
                    id={openedLetter.id}
                    prompt={openedLetter.prompt}
                    author_name={openedLetter.author_name}
                    author_location={openedLetter.author_location}
                    created_date={openedLetter.created_date}
                    letter_body={openedLetter.letter_body}
                    opener_name={openerProps.opener_name}
                    opener_location={openerProps.opener_location}
                    opened_date={openerProps.opened_date}
                    is_opened={openerProps.is_opened}
                />
            }
            <br />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <p>your letter has been saved!</p>
            <div style={{alignContent: 'flex-end'}}>
                wait, is it not nice?&nbsp;
                <button onClick={() => handleDeleteClick(openedLetter.id)} className={hasDeleted ? 'disabled' : ''} disabled={hasDeleted}>remove it</button>
                </div>
            </div>
            { hasDeleted && <><br/> <p>the letter has been deleted. sorry it was not a nice letter and thank you for deleting it to keep our community nice!</p></>}
            <br />
            <p>&nbsp;<button onClick={() => setView('')}>return to browsing</button></p>
            <br />
            <br />
        </>
    );
}
