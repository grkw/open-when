import { formatDate } from '@/utils/utils';

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
    setHasClickedRead?: (value: boolean) => void;
}

export default function Letter(props: LetterProps) {

    const { prompt, author_name, author_location, created_date, opener_name, opener_location, opened_date, letter_body, setOpenerName, setOpenerLocation, setHasClickedRead } = props;

    const renderLetter = () => {
        return (
            <>
                <div>opened by <b>{opener_name}</b> in <b>{opener_location}</b> on <b>{formatDate(opened_date)}</b></div>
                <br />
                <div><p style={{ whiteSpace: 'pre-line' }}>{letter_body}</p></div>
                <br />
                <div className='letter_footer'>written by <b>{author_name}</b> from <b>{author_location}</b> on <b>{formatDate(created_date)}</b></div>
            </>
        );
    };

    return (<div className='letter'>
        <div style={{ textAlign: 'center' }}>open when {prompt}</div>
        <br />
        {renderLetter()}
    </div>);
} 