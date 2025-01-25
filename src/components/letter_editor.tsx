import { useState } from 'react';
import styles from '@/components/letter_editor.module.css';
import PromptSelector from './prompt_selector';
import Envelope from "@/components/envelope";

export interface LetterEditorProps {
    setView: (value: string) => void;
    defaultPrompts: string[];
    numUnopenedLetters: number,
}

export default function LetterEditor({ setView, defaultPrompts, numUnopenedLetters}: LetterEditorProps) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorLocation, setAuthorLocation] = useState('');
    const [letterBody, setLetterBody] = useState('');
    
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
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
                <br />
                <Envelope prompt={prompt} browse={false} setView={setView} author_name={authorName} author_location={authorLocation} created_date={formatDate(new Date().toISOString())} />
                <p>your letter has been submitted. (but you gotta reload the page to see the change, hehe. I am working on fixing this...!)</p>
                <br />
                <p>there are now <b>{numUnopenedLetters+1}</b> unopened letters!</p>
                <br/>
                <button onClick={() => setIsSubmitted(false)}>write another letter</button>&nbsp;
                <br/><br/>
                <button onClick={() => setView('browse')}>return to browsing</button>
            </div>
        );
    }

    const defaultPromptsAndOther = [...defaultPrompts, 'other'];

    return (
        <div>
            <form className={styles.formModule} onSubmit={handleSubmit}>
                <h2>write a letter</h2>
                <p>some questions to guide your writing: what things do you tell yourself when you&apos;re feeling this way - what would you tell a loved one? what do you recommend for validating it, taking your mind off of it, alleviating it, reminding yourself that this too shall pass?</p>
                <br />
                <div className='letterEditor'>
                    <PromptSelector onSelectPrompt={setPrompt} defaultPrompts={defaultPromptsAndOther}></PromptSelector>
                    <br />
                    <label>
                        <textarea style={{ height: '18em', width: '50em' }} minLength={100} maxLength={2000} placeholder="write your letter! (100 to 2000 chars) " required value={letterBody} onChange={(e) => setLetterBody(e.target.value)} />
                    </label>
                    {/* <br />
                    or add an optional audio recording!!!!
                    <label>
                        add an optional image (.png, .jpg, .jpeg) <br />
                        <input type="file" accept=".png, .jpg, .jpeg" />
                    </label> */}
          
                    <br />
                    <div style={{alignSelf: 'flex-start'}}>
                    <label>
                        written by <input id="authorname" style={{ width: '10em' }} minLength={0} maxLength={25} placeholder='your name' value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
                    </label>
                    <label>
                        &nbsp;from <input id="authorlocation" style={{ width: '13em' }} minLength={0} maxLength={25} placeholder={'where you\'re writing from'} value={authorLocation} onChange={(e) => setAuthorLocation(e.target.value)} />
                    </label>
                    <label>
                        &nbsp;on {formatDate(new Date().toISOString())}
                    </label>
                    </div>
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