import styles from '@/components/letter_viewer.module.css';

export interface LetterViewerProps {
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

export default function LetterViewer({is_browser, prompt, author_name, author_location, created_date, opener_name, opener_location, opened_date, letter_body}: LetterViewerProps) {
    return (
        <div>
            { is_browser ? (<p><h2>browse open letters</h2></p>):
           (<p><h2>open a new letter</h2></p>) 
            }
        <div className={styles.letter_viewer}>
        <div className={styles.prompt}>{prompt}</div>
        <div className={styles.author_info}>written by {author_name} in {author_location} at {created_date} and opened by {opener_name} in {opener_location} at {opened_date}</div>
        <div className={styles.letter_body}>{letter_body}</div>
        </div>
        { is_browser && (<div><button>next</button>
        <button>prev</button></div>)}
        </div>
    );
}