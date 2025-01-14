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

export default function Letter(props: LetterProps) {
    return (
        <div className={styles.letter}>
            <div className={styles.prompt}>{props.prompt}</div>
            <div className={styles.author_info}>written by {props.author_name} in {props.author_location} at {props.created_date} and opened by {props.opener_name} in {props.opener_location} at {props.opened_date}</div>
            <div className={styles.letter_body}>{props.letter_body}</div>
        </div>);
} 