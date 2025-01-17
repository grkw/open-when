import { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/client";
import LetterOpener from "@/components/letter_opener";
import LetterBrowser from "@/components/letter_browser";
import LetterEditor from "@/components/letter_editor";
import { LetterProps } from "@/components/letter";

export default function Home() {

  const defaultPrompts = [
    "you're feeling blue",
    "you feel lost",
    "you’ve messed up",
    "you need a laugh",
    "you’re exhausted",
    "you’re pissed off",
    "you feel lonely",
    "you're stressed out",
    "other"
    ];

  const [view, setView] = useState('browse');
  const [hasWrittenLetter, setHasWrittenLetter] = useState(false);
  const [openedLetters, setOpenedLetters] = useState<LetterProps[] | null>(null);
  const [unopenedLetters, setUnopenedLetters] = useState<LetterProps[] | null>(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const [openedResponse, unopenedResponse] = await Promise.all([
          supabase.from("letters").select().eq('is_opened', 'true'),
          supabase.from("letters").select().eq('is_opened', 'false')
        ]);

        if (openedResponse.error) {
          console.error('Error fetching opened letters:', openedResponse.error);
          setOpenedLetters(null);
        } else {
          console.log('Opened letters:', openedResponse.data);
          setOpenedLetters(openedResponse.data);
        }

        if (unopenedResponse.error) {
          console.error('Error fetching unopened letters:', unopenedResponse.error);
          setUnopenedLetters(null);
        } else {
          console.log('Unopened letters:', unopenedResponse.data);
          setUnopenedLetters(unopenedResponse.data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchLetters();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>open when...</h1>
      <p>welcome! browse open letters. </p>
      <div>
        {view === 'browse' &&
          (<LetterBrowser setView={setView} openedLetters={openedLetters} defaultPrompts={defaultPrompts} />)}
        {view === 'write' && (<div>
          <LetterEditor setHasWrittenLetter={setHasWrittenLetter} setView={setView} defaultPrompts={defaultPrompts}/>
        </div>)}
        {view === 'open' && (<div>
          <LetterOpener hasWrittenLetter={hasWrittenLetter} setHasWrittenLetter={setHasWrittenLetter} setView={setView} unopenedLetters={unopenedLetters} defaultPrompts={defaultPrompts}/>
          </div>)}
      </div>
    </div>
  );
}
