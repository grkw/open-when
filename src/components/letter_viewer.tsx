import styles from '@/components/letter_viewer.module.css';

export interface LetterViewerProps {
    prompt: string,
    author_name: string,
    author_location: string,
    created_date: string,
    letter_body: string
}

export default function LetterViewer({prompt, author_name, author_location, created_date, letter_body}: LetterViewerProps) {
    return (
        <div className={styles.letter_viewer}>
        <div className={styles.prompt}>{prompt}</div>
        <div className={styles.letter_body}>{letter_body}</div>
        <div className={styles.author_info}>from {author_name} in {author_location} at {created_date}</div>
        </div>
    );
}