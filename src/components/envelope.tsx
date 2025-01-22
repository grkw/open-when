import styles from '@/components/envelope.module.css';

export interface EnvelopeProps {
    prompt: string,
    browse: boolean,
    setView: (value: string) => void;
}

export default function Envelope({ prompt, browse, setView }: EnvelopeProps) {

    return (
        <div className={styles.envelope}>

            <div className={styles.triangleDown} />
            <p className={styles.inTriangle}><em>{prompt}</em></p>
            
            {browse && <><p>this is a new letter!</p>
            <p> <button onClick={() => setView('browserOpen')}>open it?</button></p></>}
        </div>
    );
}