import { useState, useEffect } from 'react';

import { formatDate } from '@/utils/utils';
import PromptSelector from './prompt_selector';
import Envelope from "@/components/envelope";

export interface LetterEditorProps {
    setView: (value: string) => void;
    prompts: string[];
    numUnopenedLetters: number,
    setNumUnopenedLetters: (value: number) => void;
}

export default function LetterEditor({ setView, prompts, numUnopenedLetters, setNumUnopenedLetters }: LetterEditorProps) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorLocation, setAuthorLocation] = useState('');
    const [letterBody, setLetterBody] = useState('');

    const promptsAndOther = [...prompts, 'other'];

    const handleReset = () => {
        setPrompt('');
        setLetterBody('');
        setAuthorName('');
        setAuthorLocation('');
    }

    useEffect(() => {
        // Reset form fields when the component mounts
        handleReset();
    }, []);

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

        setNumUnopenedLetters(numUnopenedLetters + 1);
    };

    if (isSubmitted) {
        return (
            <>
                <br />
                <Envelope prompt={prompt} browse={false} setView={setView} author_name={authorName} author_location={authorLocation} created_date={new Date().toISOString()} />
                <p>your letter has been submitted.</p>
                <br />
                <br />
                <button onClick={() => setIsSubmitted(false)}>write another letter</button>&nbsp;
                <br />
                <br />
                <button onClick={() => setView('browse')}>return to browsing</button>
            </>
        );
    } else {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <h2>write a letter</h2>
                    <p>some questions to guide your writing: what things do you tell yourself when you&apos;re feeling this way - what would you tell a loved one? what do you recommend for validating it, taking your mind off of it, alleviating it, reminding yourself that this too shall pass?</p>
                    <br />
                    <div className='letterEditor'>
                        <PromptSelector selectedPrompt={prompt} setSelectedPrompt={setPrompt} prompts={promptsAndOther}></PromptSelector>
                        <br />
                        <label>
                            <textarea style={{ height: '30vw', width: '75vw' }} minLength={100} maxLength={2000} placeholder="write your letter! (100 to 2000 chars) " required value={letterBody} onChange={(e) => setLetterBody(e.target.value)} />
                        </label>
                        <br />
                        <div style={{ alignSelf: 'flex-start' }}>
                            <label>
                                written by <input id="authorname" type="text" style={{ width: '10em' }} minLength={0} maxLength={25} placeholder='your name' value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
                            </label>
                            <label>
                                &nbsp;from <input id="authorlocation" type="text" style={{ width: '13em' }} minLength={0} maxLength={25} placeholder={'where you\'re writing from'} value={authorLocation} onChange={(e) => setAuthorLocation(e.target.value)} />
                            </label>
                            <label>
                                &nbsp;on {formatDate(new Date().toISOString())}
                            </label>
                        </div>
                    </div>
                    <br />
                    <button onClick={handleReset} type="reset">reset</button> &nbsp;
                    <button type="submit" className="custom-button-class">
                        submit
                    </button>
                </form>
                <br />
                <br />
                <br />
                <button onClick={() => setView('browse')}>return to browsing</button>
                <br />
                <br />
            </>
        );
    }
}