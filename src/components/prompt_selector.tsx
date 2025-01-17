import { useState } from 'react';

export interface PromptSelectorProps {
    onSelectPrompt?: (prompt: string) => void; // `?` means optional
    counts?: number[];
    label?: string;
    defaultPrompts: string[];
}

export default function PromptSelector({ onSelectPrompt, counts, defaultPrompts, label }: PromptSelectorProps) {

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
                {defaultPrompts.map((prompt, index) => (
                    <option key={index} value={prompt} disabled={counts && counts[index] === 0}>
                        {prompt} {counts && `(${counts[index]} ${label})`}
                        </option>
                ))}
            </select>
        </label>
        <br />

        {showOtherInput && (
            <label>
                <input type="text" placeholder="please specify" />
            </label>
        )}</div>
    )
}