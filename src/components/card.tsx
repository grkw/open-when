import styles from '@/components/card.module.css';

export interface CardProps{
    prompt: string,
    // author: string,
    // reader: string,
    opened: boolean,
    text: string,
    image_id: string, // ?
    className?: string,
}

export default function Card({prompt, className}: CardProps) {
    console.log(arguments);
    return (<div className={`${styles.card} ${className}`}><p>{prompt}</p></div>);
}