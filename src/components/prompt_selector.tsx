import { useState } from 'react';

export interface PromptSelectorProps {
    onSelectPrompt?: (prompt: string) => void; // `?` means optional
    unopenedCounts?: number[];
    openedCounts?: number[];
    label?: string;
    defaultPrompts: string[];
}

export default function PromptSelector({ onSelectPrompt, unopenedCounts, openedCounts, defaultPrompts }: PromptSelectorProps) {

    const [showOtherInput, setShowOtherInput] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(''); // starts as ''
    const [otherPrompt, setOtherPrompt] = useState(''); 
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

    const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setOtherPrompt(value);

        if (onSelectPrompt) {
            onSelectPrompt(value);
        }
    };

    return (<div>
        <label>
        &quot;open when...&quot; <br />
            <select value={selectedPrompt} onChange={handleSelectChange} required >
                <option value="" disabled>select a prompt</option>
                {defaultPrompts.map((prompt, index) => (
                    <option key={index} value={prompt} disabled={((openedCounts && unopenedCounts) && openedCounts[index] === 0) || ((unopenedCounts && !openedCounts) && unopenedCounts[index] === 0)}> 
                            {prompt} 
                            {(openedCounts && unopenedCounts) && ` (${openedCounts[index]} opened${`, ${unopenedCounts[index]} unopened`})`}
                            {(unopenedCounts && !openedCounts) && ` (${unopenedCounts[index]} unopened)`}                        
                    </option>
                ))}
            </select>
        </label>
        <br />

        {showOtherInput && (
            <label>
                <input type="text" placeholder="please specify" value={otherPrompt} onChange={handleOtherChange}/>
            </label>
        )}</div>
    )
}