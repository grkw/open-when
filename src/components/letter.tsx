import styles from '@/components/letter.module.css';

export interface LetterProps {
    id: number,
    prompt: string,
    author_name: string,
    author_location: string,
    created_date: string,
    opener_name: string,
    opener_location: string,
    opened_date: string,
    letter_body: string,
    is_opened: boolean
}

export default function Letter(props: LetterProps) {

    const { prompt, author_name, author_location, created_date, opener_name, opener_location, opened_date, letter_body } = props;

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (<div className={styles.letter}>
                <div className={styles.prompt}>{prompt}</div>
                <div className={styles.author_info}>written by <em>{author_name}</em> in <em>{author_location}</em> on <em>{formatDate(created_date)}</em> and opened by <em>{opener_name}</em> in <em>{opener_location}</em> on <em>{formatDate(opened_date)}</em></div>
                <div className={styles.letter_body}><em>{letter_body}</em></div>
            </div>);
} 