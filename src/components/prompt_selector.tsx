import { useState } from 'react';

export interface PromptSelectorProps {
    onSelectPrompt?: (prompt: string) => void; // `?` means optional
}

export default function PromptSelector({ onSelectPrompt }: PromptSelectorProps) {

    const [showOtherInput, setShowOtherInput] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(''); // starts as ''
    
    // TS interface to type the event object for the handleSelectChange function
    interface SelectChangeEvent {
        target: { // target element that triggered the event
            value: string; //value of the target element
        };
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelectedPrompt(value);
        if (onSelectPrompt) {
            onSelectPrompt(value);
        }
        if (value === 'other') {
            setShowOtherInput(true); //sets showOtherInput to true
        } else {
            setShowOtherInput(false); //sets showOtherInput to false
        }
    };

    return (<div>
        <label>
            "open when..." <br />
            <select value={selectedPrompt} onChange={handleSelectChange} required >
                <option value="" disabled>select a prompt</option>
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