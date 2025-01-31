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
}

export default function Letter(props: LetterProps) {

    const { prompt, author_name, author_location, created_date, opener_name, opener_location, opened_date, letter_body, setOpenerName, setOpenerLocation } = props;

    const renderOpenedByLine = () => {
        const is_being_opened = setOpenerName && setOpenerLocation;
        if (is_being_opened) {
            return (
                <div style={{display: 'inline'}}>
                <label>
                    opened by <input id="authorname" style={{ width: '7em' }} minLength={0} maxLength={25} placeholder='your name' value={opener_name} onChange={(e) => setOpenerName && setOpenerName(e.target.value)} />&nbsp;
                </label>
                <label>
                    in <input id="authorlocation" style={{ width: '13em' }} minLength={0} maxLength={25} value={opener_location} onChange={(e) => setOpenerLocation && setOpenerLocation(e.target.value)} placeholder="where you're reading from" />&nbsp;
                </label>
                <label>
                    on {formatDate(new Date().toISOString())}
                </label>
            </div>
            );
        } else {
            return (
                <div>opened by <b>{opener_name}</b> in <b>{opener_location}</b> on <b>{formatDate(opened_date)}</b></div>
            );
        }
    };

    return (<div className='letter'>
        <div style={{ textAlign: 'center' }}>open when {prompt}</div>
        <br />
        {renderOpenedByLine()}
        <br />
        <div><p style={{whiteSpace: 'pre-line'}}>{letter_body}</p></div>
        <br />
        <div className='letter_footer'>written by <b>{author_name}</b> from <b>{author_location}</b> on <b>{formatDate(created_date)}</b></div>
    </div>);
} 