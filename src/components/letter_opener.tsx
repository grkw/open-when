import { useState, useEffect } from 'react';
import { UpdatedOpenedLetterProps } from "@/components/letter_browser";
import { LetterProps } from "@/components/letter";
import Letter from "@/components/letter";

export interface LetterOpenerProps {
    setView: (value: string) => void;
    openedLetter: LetterProps;
    openerProps: UpdatedOpenedLetterProps | undefined; // hacky fix for compiler error
}

export default function LetterOpener({ setView, openedLetter, openerProps }: LetterOpenerProps) {

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
            <p>your letter has been saved and can now be browsed by the community!</p>
            <br />
            <p>all good?&nbsp;<button onClick={() => setView('')}>return to browsing</button></p>
            <br />
            <br />
            <p>not nice?&nbsp;<button>remove from the repository</button></p>
        </>
    );
}
