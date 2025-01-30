import { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/client";
import LetterBrowser from "@/components/letter_browser";
import LetterEditor from "@/components/letter_editor";
import { LetterProps } from "@/components/letter";

export default function Home() {

  const [view, setView] = useState('instructions');
  const [openedLetters, setOpenedLetters] = useState<LetterProps[]>([]);
  const [unopenedLetters, setUnopenedLetters] = useState<LetterProps[]>([]);
  const [unopenedCounts, setUnopenedCounts] = useState<number[]>([]);
  const [openedCounts, setOpenedCounts] = useState<number[]>([]);
  const [numUnopenedLetters, setNumUnopenedLetters] = useState<number>(0);
  const [numOpenedLetters, setNumOpenedLetters] = useState<number>(0);
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const [openedResponse, unopenedResponse] = await Promise.all([
          supabase.from("letters").select().eq('is_opened', 'true').order('id', {ascending: false}),
          supabase.from("letters").select().eq('is_opened', 'false').order('id', {ascending: false}),
        ]);

        if (openedResponse.error) {
          console.error('Error fetching opened letters:', openedResponse.error);
        } else {
          setOpenedLetters(openedResponse.data);
        }

        if (unopenedResponse.error) {
          console.error('Error fetching unopened letters:', unopenedResponse.error);
        } else {
          setUnopenedLetters(unopenedResponse.data);
        }

      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    if (view === 'browse' || view === 'instructions') {
      fetchLetters();
    }
    
  }, [view]);

  useEffect(() => {
    if (unopenedLetters.length > 0 || openedLetters.length > 0) {

      const uniquePrompts = new Set([
        ...unopenedLetters.map(letter => letter.prompt),
        ...openedLetters.map(letter => letter.prompt)
      ]);

      setPrompts(Array.from(uniquePrompts));
    }
  }, [openedLetters, unopenedLetters]);

  useEffect(() => {

    const unopenedCountsByPrompt = new Array(prompts.length).fill(0);
    const openedCountsByPrompt = new Array(prompts.length).fill(0);

    openedLetters.forEach(letter => {
      const index = prompts.indexOf(letter.prompt);
      if (index !== -1) {
        openedCountsByPrompt[index]++;
      } else {
        console.log("error: opened letter prompt not in prompts");
      }
    })

    unopenedLetters.forEach(letter => {
      const index = prompts.indexOf(letter.prompt);
      if (index !== -1) {
        unopenedCountsByPrompt[index]++;
      } else {
        console.log("error: unopened letter prompt not in prompts");
      }
    })

    setOpenedCounts(openedCountsByPrompt);
    setUnopenedCounts(unopenedCountsByPrompt);

  }, [prompts, openedLetters, unopenedLetters]);

  useEffect(() => {
    const numUnopenedLetters = unopenedLetters ? unopenedCounts.reduce((partialSum, a) => partialSum + a, 0) : NaN;
    const numOpenedLetters = openedLetters ? openedCounts.reduce((partialSum, a) => partialSum + a, 0) : NaN;
    setNumUnopenedLetters(numUnopenedLetters);
    setNumOpenedLetters(numOpenedLetters);
  }, [unopenedCounts, openedCounts]);

  return (
    <div className="wrapper">
      <div style={{ display: 'flex' }}>
        <h1>open when...</h1>
        <button style={{ marginTop: 'auto', marginBottom: '10px' }} onClick={() => setView('instructions')}>home</button>
        <p style={{ marginTop: 'auto', marginBottom: '10px', marginLeft: 'auto'}}>
        <b>{numOpenedLetters}</b>&nbsp;opened letters 
        <br/> 
        <b>{numUnopenedLetters}</b>&nbsp;new letters
        </p>
      </div>
      {view === 'instructions' &&
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
      }

      {view === 'browse' && (
        <LetterBrowser setView={setView} unopenedLetters={unopenedLetters} openedLetters={openedLetters} openedCounts={openedCounts} unopenedCounts={unopenedCounts} defaultPrompts={prompts} numUnopenedLetters={numUnopenedLetters} numOpenedLetters={numOpenedLetters} setNumOpenedLetters={setNumOpenedLetters} setNumUnopenedLetters={setNumUnopenedLetters} />
      )}
      {view === 'write' && (
        <LetterEditor setView={setView} defaultPrompts={prompts} numUnopenedLetters={numUnopenedLetters} setNumUnopenedLetters={setNumUnopenedLetters} />
      )}


      {view === 'instructions' && <div className='footer'>
        <p>made by <u><a href="https://gracekwak.me/">Grace</a></u> (she/her) at the <u><a href="https://www.recurse.com/">Recurse Center</a></u> in January 2025. a work in progress. <u><a href="https://github.com/grkw/open-when/tree/main">source code</a></u>.</p>
        <br />
        <br />
      </div>}
    </div>
  );
}
