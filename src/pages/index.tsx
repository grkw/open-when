import { useState } from 'react';

import EnvelopeBoard from "@/components/envelope_board";
import LetterViewer from "@/components/letter_viewer";
import LetterEditor from "@/components/letter_editor";

export default function Home() {
  const [view, setView] = useState('browse');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>open when...</h1>
      <p>welcome!</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
        <div style={{ flex: '1 1 50%' }}>
          <EnvelopeBoard />
        </div>
        <div style={{ flex: '1 1 50%' }}>
          <h2 style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
            <button onClick={() => setView('browse')}>browse open letters</button>
            <button onClick={() => setView('write')}>write a letter</button>
            <button onClick={() => setView('open')}>open a new letter</button>
          </h2>
          <div>
            {view === 'browse' &&
              (<LetterViewer is_browser={true} prompt="you're feeling sad" author_name="grace" author_location="here" created_date="now" opener_name="joy" opener_location="there" opened_date="tomorrow" letter_body="sorry to hear that"></LetterViewer>)}
            {view === 'write' && (<LetterEditor />)}
            {view === 'open' && (<LetterViewer is_browser={false} prompt="you're feeling sad" author_name="grace" author_location="here" created_date="now" opener_name="joy" opener_location="there" opened_date="tomorrow" letter_body="sorry to hear that"></LetterViewer>)}
          </div>
        </div>
      </div>
    </div>
  ); // TODO: once user hits "submit", the LetterEditor is replaced by text that says "click one of the letters to open it" and the LetterViewer replaces the LetterEditor
}
