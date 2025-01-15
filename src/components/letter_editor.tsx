import { useState } from 'react';

import styles from '@/components/letter_editor.module.css';
import PromptSelector from './prompt_selector';
import Envelope from "@/components/envelope";

export interface LetterEditorProps {
    setHasWrittenLetter: (value: boolean) => void;
    setView: (value: string) => void;
}

export default function LetterEditor({ setHasWrittenLetter, setView}: LetterEditorProps) {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setHasWrittenLetter(true);
        setIsSubmitted(true);
    }

    if (isSubmitted) {
        return (
            <div>
                <h2>your letter has been submitted.</h2>
                <p>there are now # of community letter credits!</p>
                <Envelope prompt='prompt'/>
                <button onClick={() => setIsSubmitted(false)}>write another letter</button>
                <button onClick={() => setView('browse')}>return to browsing</button>
                <button onClick={() => setView('open')}>open a new letter</button> 
            </div>
        );
    }

    return (
        <div>
        <form className={ styles.formModule } onSubmit={handleSubmit}>
             <h2>write a letter</h2>
             <div className={ styles.letterBodyEditor}>
            <PromptSelector></PromptSelector>
            <br />
            <label>
                written by <input id="authorname" style={{ width: '10em' }} minLength={0} maxLength={25} placeholder='name (ex. "Grace", "ya girl", "kind carrot")' />
            </label>
            <label>
                in <input id="authorlocation" style={{ width: '10em' }} minLength={0} maxLength={25} placeholder={'where you\'re writing from (ex. "NYC", "under a blanket", "the other side")'} />
            </label>
            <label>
                at <input id="currentdatetime" style={{ width: '10em' }} minLength={0} maxLength={25} placeholder={'datetime'} />
            </label>
                and opened by ??? in ??? at ???
            <br />
            <label>
                <textarea style={{ height: '10em', width: '40em' }} minLength={100} maxLength={2000} placeholder="write your letter! (100 to 2000 chars)" required />
            </label>
            <br />
            <label>
                add an optional image (.png, .jpg, .jpeg) <br />
                <input type="file" accept=".png, .jpg, .jpeg" />
            </label>
            <br />
            </div>
            <label>
                would you like to donate your open credit to the community? 
                <input type="checkbox" />
            </label>
            <br />
            <p>who is this letter for?</p>
            <div>
                <label>
                    <input type="radio" name="recipient" value="myself" required />
                    myself
                </label>
                <br />
                <label>
                    <input type="radio" name="recipient" value="someone else" />
                    someone else
                </label>
            </div>
            <br />
            <button type="reset">reset</button>
            <button type="submit" className="custom-button-class">
                submit
            </button>

            <button onClick={() => setView('browse')}>return to browsing</button>
           
        </form>
        </div>
    );
}