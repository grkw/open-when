import { useState } from 'react';

export default function PromptSelector() {

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

    return (<div>
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
        )}</div>
    )
}