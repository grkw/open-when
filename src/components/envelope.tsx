import styles from '@/components/envelope.module.css';

export interface EnvelopeProps {
    prompt: string,
    author_name: string,
    author_location: string,
    created_date: string,
    browse: boolean,
    setView: (value: string) => void;
}

export default function Envelope({ prompt, browse, setView, author_name, author_location, created_date}: EnvelopeProps) {

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className={styles.envelope}>

            <div className={styles.triangleDown} />
            <div className={styles.inTriangle}>
                {prompt}
                <p>written by <b>{author_name}</b> from <b>{author_location}</b> on <b>{formatDate(created_date)}</b></p>
            </div>
            {browse && <><p>this is a new letter!</p>
            <p> <button onClick={() => setView('browserOpen')}>open it?</button></p></>}
        </div>
    );
}