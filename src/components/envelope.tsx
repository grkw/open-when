import styles from '@/components/envelope.module.css';
import { formatDate } from '@/utils/utils';

export interface EnvelopeProps {
    prompt: string,
    author_name: string,
    author_location: string,
    created_date: string,
}

export default function Envelope({ prompt, author_name, author_location, created_date }: EnvelopeProps) {

    return (
        <div className={styles.envelope}>
            <div className={styles.triangleDown} />
            <br />
            open when&nbsp;{prompt}
            <p>written by <b>{author_name}</b> from <b>{author_location}</b> on <b>{formatDate(created_date)}</b></p>
        </div>
    );
}