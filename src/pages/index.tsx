import { useState } from 'react';

import EnvelopeBoard from "@/components/envelope_board";
import LetterBrowser from "@/components/letter_browser";
import LetterEditor from "@/components/letter_editor";
import Envelope from "@/components/envelope";

export default function Home() {
  const [view, setView] = useState('browse');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>open when...</h1>
      <p>welcome! browse open letters. </p>
      <div>
        {view === 'browse' &&
          (<LetterBrowser is_browser={true} prompt="you're feeling sad" author_name="grace" author_location="here" created_date="now" opener_name="joy" opener_location="there" opened_date="tomorrow" letter_body="sorry to hear that"></LetterBrowser>)}
        {view === 'write' && (<div>
          <Envelope prompt='prompt' text='' image_id='' className='hi' opened={false}/>
          <LetterEditor />
        </div>)}
        {view === 'open' && (<div>
          <Envelope prompt='prompt' text='' image_id='' className='hi' opened={false}/>
          <LetterBrowser is_browser={false} prompt="you're feeling sad" author_name="grace" author_location="here" created_date="now" opener_name="joy" opener_location="there" opened_date="tomorrow" letter_body="sorry to hear that"></LetterBrowser>
          </div>)}
      </div>
      <h2 style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
        <button onClick={() => setView('write')}>write a letter</button>
        <button onClick={() => setView('open')}>open a new letter</button>
      </h2>
    </div>
  ); // TODO: once user hits "submit", the LetterEditor is replaced by text that says "click one of the letters to open it" and the LetterBrowser replaces the LetterEditor
}
