import styles from '@/components/card.module.css';

export interface CardProps {
    prompt: string,
    // author: string,
    // reader: string,
    opened: boolean,
    text: string,
    image_id: string, // ?
    className?: string,
}

export default function Card({ prompt, className }: CardProps) {
    // console.log(arguments);
    function handleClick() {
        console.log('card clicked!');
    }
    return (<div className={`${styles.card} ${className}`}>
        <div className={styles.triangleDown}></div>
        <p style={{ paddingTop: '20px' }}><button onClick={handleClick}>{prompt}</button></p>
        </div>);
}