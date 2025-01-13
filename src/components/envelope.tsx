import styles from '@/components/envelope.module.css';

export interface EnvelopeProps {
    prompt: string,
    // author: string,
    // reader: string,
    opened: boolean,
    text: string,
    image_id: string, // ?
    className?: string,
} // TODO: add animation for which envelope is being opened (will show an empty envelope)

export default function Envelope({ prompt, className }: EnvelopeProps) {
    // console.log(arguments);
    function handleClick() {
        console.log('envelope clicked!');
    }
    return (<div>
    <p style={{ textAlign: 'center' }}># opened, # unopened</p>
    <div className={`${styles.envelope} ${className}`}>
        <div className={styles.triangleDown}></div>
        <p style={{ paddingTop: '20px' }}><button onClick={handleClick}>{prompt}</button></p>
        </div>
        </div>);
}