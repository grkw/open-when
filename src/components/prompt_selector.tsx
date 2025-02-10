import { useState } from 'react';
import React from 'react';

export interface PromptSelectorProps {
    selectedPrompt: string;
    setSelectedPrompt: (prompt: string) => void;
    prompts: string[];
}

const PromptSelector = React.memo(({ selectedPrompt, setSelectedPrompt, prompts } : PromptSelectorProps) => {

    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherPrompt, setOtherPrompt] = useState(''); 

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedPrompt(value);
        setShowOtherInput(value === 'other');
    };

    const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setOtherPrompt(value);
        setSelectedPrompt(value);
        console.log('selected prompt: ', value);
    };

    console.log("prompt selector render");

    return (
        <div>
            <label>
                open when&nbsp;
                <select value={selectedPrompt} onChange={handleSelectChange} required autoFocus>
                    <option value="" disabled>select a prompt</option>
                    {prompts.map((prompt, index) => (
                        <option
                            key={index}
                            value={prompt}
                        >
                            {prompt}
                        </option>
                    ))}
                </select>
            </label>
            &nbsp;
            {showOtherInput && (
                <label>
                    <input type="text" placeholder="please specify" value={otherPrompt} onChange={handleOtherChange} />
                </label>
            )}
        </div>
    );
});

PromptSelector.displayName = 'PromptSelector';

export default PromptSelector;