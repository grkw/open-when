export interface WelcomeProps {
    setView: (value: string) => void;
    numOpenedLetters: number;
    numUnopenedLetters: number;
}

export default function Welcome({ setView, numUnopenedLetters, numOpenedLetters }: WelcomeProps) {
    return (
        <div>
            <div>
                <h2>about</h2>
                <p>this is a community-driven repository of digital <i>open when</i> letters. an <i>open when</i> letter is a letter meant to be opened at a particular time or in a particular situation (i.e. open when sad, open when tired, open when you need a laugh). usually, <i>open when</i> letters are written between people who already know each other to keep in touch and feel close in the face of long distance separation. however, I think that the idea is still applicable to internet strangers - we may not know each other, but as fellow human beings, we can still send kindness and well-wishes to each other.</p>
                <br />
                <p>note: this is <i>not</i> meant to be a replacement for real-life human interaction! just a supplement perhaps.</p>

                <h2>getting started</h2>
                <p>welcome, internet friend! how are you feeling?</p>
                <br />
                <p>want some advice on how to navigate a particular feeling? you can <button onClick={() => setView('browse')}>browse letters</button> that have been written by past site visitors.</p>
                <br />
                <p>want to provide emotional support to a fellow internet friend? you can <button onClick={() => setView('write')}>write a letter</button> for someone else to open. I find that the act of writing is immensely valuable in itself.</p>
                <br />
                <p> as of now, there are <b>{numOpenedLetters}</b> opened letters (which another person has opened and signed, and now anyone can read) and <b>{numUnopenedLetters}</b> new letters (letters that have yet to be opened and signed).</p>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            <div className='footer'>
                <p>made by <u><a href="https://gracekwak.me/">Grace</a></u> (she/her) at the <u><a href="https://www.recurse.com/">Recurse Center</a></u> in January 2025. a work in progress. <u><a href="https://github.com/grkw/open-when/tree/main">source code</a></u>.</p>
                <br />
                <br />
            </div>
        </div>
    );
}