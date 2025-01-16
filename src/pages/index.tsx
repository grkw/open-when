import { useState } from 'react';

import LetterOpener from "@/components/letter_opener";
import LetterBrowser from "@/components/letter_browser";
import LetterEditor from "@/components/letter_editor";

export default function Home() {
  const [view, setView] = useState('browse');
  const [hasWrittenLetter, setHasWrittenLetter] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>open when...</h1>
      <p>welcome! browse open letters. </p>
      <div>
        {view === 'browse' &&
          (<LetterBrowser setView={setView}/>)}
        {view === 'write' && (<div>
          <LetterEditor setHasWrittenLetter={setHasWrittenLetter} setView={setView} />
        </div>)}
        {view === 'open' && (<div>
          <LetterOpener hasWrittenLetter={hasWrittenLetter} setHasWrittenLetter={setHasWrittenLetter}  setView={setView}/>
          </div>)}
      </div>
    </div>
  );
}
