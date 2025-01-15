import styles from '@/components/envelope.module.css';

export interface EnvelopeProps {
    prompt: string,
} // TODO: add animation for which envelope is being opened (will show an empty envelope)

export default function Envelope({ prompt }: EnvelopeProps) {
    function handleClick() {
        console.log('envelope clicked!');
    }
    return (
        <div className={styles.envelope}>
            <div className={styles.triangleDown}></div>
            <p style={{ paddingTop: '20px' }}><button onClick={handleClick}>{prompt}</button></p>
        </div>
    );
}