import styles from '@/components/letter_editor.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function LetterEditor() {

    const [showOtherInput, setShowOtherInput] = useState(false); 
    // showOtherInput: boolean state variable set to a default value of false
    // setShowOtherInput: a function to update the value of showOtherInput

    // TS interface to type the event object for the handleSelectChange function
    interface SelectChangeEvent {
        target: { // target element that triggered the event
            value: string; //value of the target element
        };
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        if (event.target.value === 'other') {
            setShowOtherInput(true); //sets showOtherInput to true
        } else {
            setShowOtherInput(false); //sets showOtherInput to false
        }
    };

    return (
        <div>
        <form className={ styles.formModule }>
             <h2>write a letter</h2>
             <div className={ styles.letterBodyEditor}>
             <label>
                select a prompt: "open when..." <br />
                <select onChange={handleSelectChange} required >
                    <option value="you're feeling blue">you're feeling blue</option>
                    <option value="you feel lost">you feel lost</option>
                    <option value="you've messed up">you've messed up</option>
                    <option value="other">other</option>
                </select>
            </label>
            <br />

            {showOtherInput && (
                <label>
                    please specify <br />
                    <input type="text" placeholder="Enter category" />
                </label>
            )}
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
            <button className="custom-button-class">
                <Link href='/write_letter'>submit</Link>
            </button>
        </form>
        <p>not in the letter-writing headspace, but still want to open a new letter? you can use a community-donated letter credit (# available): </p>
        <button>use a credit</button>
        </div>
    );
}