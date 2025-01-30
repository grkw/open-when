export interface HeaderProps {
    setView: (value: string) => void;
    numOpenedLetters: number;
    numUnopenedLetters: number;
}

export default function Header({ setView, numOpenedLetters, numUnopenedLetters }: HeaderProps) {
    return (
        <div style={{ display: 'flex' }}>
            <h1>open when...</h1>
            <button style={{ marginTop: 'auto', marginBottom: '10px' }} onClick={() => setView('welcome')}>home</button>
            <p style={{ marginTop: 'auto', marginBottom: '10px', marginLeft: 'auto' }}>
                <b>{numOpenedLetters}</b>&nbsp;opened letters
                <br />
                <b>{numUnopenedLetters}</b>&nbsp;new letters
            </p>
        </div>
    );
}