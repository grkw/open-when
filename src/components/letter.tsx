import styles from '@/components/letter.module.css';
import { useState } from 'react';

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
    is_opened: boolean,
    setOpenerName?: (value: string) => void;
    setOpenerLocation?: (value: string) => void;
}

export default function Letter(props: LetterProps) {

    const { prompt, author_name, author_location, created_date, opener_name, opener_location, opened_date, letter_body, is_opened, setOpenerName, setOpenerLocation } = props;

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (<div className='letter'>
        <div className={styles.prompt}>{prompt}</div>
        <div>written by <em>{author_name}</em> from <em>{author_location}</em> on <em>{formatDate(created_date)}</em> </div>
        {setOpenerName && setOpenerLocation ? ( // then we know we've just opened it and wanna save the reader info
            <div>
                <label>
                    opened by <input id="authorname" style={{ width: '10em' }} minLength={0} maxLength={25} placeholder='your name' value={opener_name} onChange={(e) => setOpenerName && setOpenerName(e.target.value)} />
                </label>
                <label>
                    in <input id="authorlocation" style={{ width: '10em' }} minLength={0} maxLength={25} value={opener_location} onChange={(e) => setOpenerLocation && setOpenerLocation(e.target.value)} placeholder="where you're reading from" />
                </label>
                <label>
                    on {formatDate(new Date().toISOString())}
                </label>
            </div>

        ) : (
            <div>and opened by <em>{opener_name}</em> in <em>{opener_location}</em> on <em>{formatDate(opened_date)}</em></div>
        )}
        <br />
        <div className={styles.letter_body}><em>{letter_body}</em></div>
    </div>);
} 