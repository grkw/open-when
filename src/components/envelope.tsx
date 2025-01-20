import styles from '@/components/envelope.module.css';

export interface EnvelopeProps {
    prompt: string,
}

export default function Envelope({ prompt }: EnvelopeProps) {

    return (
        <div className={styles.envelope}>
            <div className={styles.triangleDown}></div>
            <p style={{ paddingTop: '80px' }}>{prompt}</p>
        </div>
    );
}