import styles from '@/components/letter.module.css';

export interface LetterProps {
    prompt: string,
    author_name: string,
    author_location: string,
    created_date: string,
    opener_name: string,
    opener_location: string,
    opened_date: string,
    letter_body: string
}

export default function Letter({ prompt, author_name, author_location, created_date, opener_name, opener_location, opened_date, letter_body }: LetterProps) {
    return (
        <div className={styles.letter}>
            <div className={styles.prompt}>{prompt}</div>
            <div className={styles.author_info}>written by {author_name} in {author_location} at {created_date} and opened by {opener_name} in {opener_location} at {opened_date}</div>
            <div className={styles.letter_body}>{letter_body}</div>
        </div>);
}