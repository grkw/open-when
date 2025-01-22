import { useState } from 'react';
import styles from '@/components/letter_editor.module.css';
import PromptSelector from './prompt_selector';
import Envelope from "@/components/envelope";

export interface LetterEditorProps {
    setHasWrittenLetter: (value: boolean) => void;
    setView: (value: string) => void;
    defaultPrompts: string[];
    numUnopenedLetters: number,
}

export default function LetterEditor({ setHasWrittenLetter, setView, defaultPrompts, numUnopenedLetters}: LetterEditorProps) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorLocation, setAuthorLocation] = useState('');
    const [letterBody, setLetterBody] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setHasWrittenLetter(true);
        setIsSubmitted(true);

        const letterData = {
            prompt,
            author_name: authorName,
            author_location: authorLocation,
            letter_body: letterBody,
        }

        fetch("/api/add_letter", {
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

    };

    if (isSubmitted) {
        return (
            <div>
                <Envelope prompt={prompt} browse={false} setView={setView}/>
                <p>your letter has been submitted.</p>
                <p>there are now {numUnopenedLetters+1} unopened letters!</p>
                <br/>
                <button onClick={() => setIsSubmitted(false)}>write another letter</button>&nbsp;
                <button onClick={() => setView('open')}>open a new letter</button>
                <br/><br/>
                <button onClick={() => setView('browse')}>return to browsing</button>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <form className={styles.formModule} onSubmit={handleSubmit}>
                <h2>write a letter</h2>
                <div className='letter'>
                    <PromptSelector onSelectPrompt={setPrompt} defaultPrompts={defaultPrompts}></PromptSelector>
                    <br />
                    <label>
                        written by <input id="authorname" style={{ width: '10em' }} minLength={0} maxLength={25} placeholder='your name' value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
                    </label>
                    <label>
                        &nbsp;from <input id="authorlocation" style={{ width: '13em' }} minLength={0} maxLength={25} placeholder={'where you\'re writing from'} value={authorLocation} onChange={(e) => setAuthorLocation(e.target.value)} />
                    </label>
                    <label>
                        &nbsp;on {formatDate(new Date().toISOString())}
                    </label>
                    <br />
                    <br />
                    <br />
                    <label>
                        <textarea style={{ height: '14em', width: '40em' }} minLength={100} maxLength={2000} placeholder="write your letter! (100 to 2000 chars)" required value={letterBody} onChange={(e) => setLetterBody(e.target.value)} />
                    </label>
                    {/* <br />
                    or add an optional audio recording!!!!
                    <label>
                        add an optional image (.png, .jpg, .jpeg) <br />
                        <input type="file" accept=".png, .jpg, .jpeg" />
                    </label> */}
                    <br />
                </div>
                <br/>

                <button type="reset">reset</button> &nbsp;
                <button type="submit" className="custom-button-class">
                    submit
                </button> 
                <br />
                <br />
                <br />
                <button onClick={() => setView('browse')}>return to browsing</button>

            </form>
        </div>
    );
}