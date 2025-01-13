import styles from '@/components/letter_browser.module.css';
import Letter from '@/components/letter';
import PromptSelector from './prompt_selector';

export interface LetterBrowserProps {
    is_browser: boolean, //if not browser, then it's an opener
    prompt: string,
    author_name: string,
    author_location: string,
    created_date: string,
    opener_name: string,
    opener_location: string,
    opened_date: string,
    letter_body: string
}

// TODO: User can click through all the opened letters and then they get to the unopened letters (if they keep searching, then they'll have incentive): "oop, this is a new letter! if you want to open it, you have some options: (write a letter) or (use a letter credit)"
export default function LetterBrowser(props: LetterBrowserProps) {
    const { is_browser, ...letterProps } = props;
    return (
        <div>
            <h2>browse open letters</h2>
            <p>we currently have # of "you feel sad," # of "you need a laugh," ...</p>
            <p>select a prompt and then browse within that category.</p>
            <PromptSelector></PromptSelector>
            <Letter {...letterProps}></Letter>
            <button>next</button>
            <button>prev</button>
        </div>
    );
}