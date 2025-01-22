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
    "you've messed up",
    "you need a laugh",
    "you're exhausted",
    "you're pissed off",
    "you feel lonely",
    "you're stressed out",
    "you're feeling insecure",
    "you're bored",
    "other"
  ];

  const [view, setView] = useState('instructions');
  const [hasWrittenLetter, setHasWrittenLetter] = useState(false);
  const [openedLetters, setOpenedLetters] = useState<LetterProps[]>([]);
  const [unopenedLetters, setUnopenedLetters] = useState<LetterProps[]>([]);
  const [unopenedCounts, setUnopenedCounts] = useState<number[]>(new Array(defaultPrompts.length).fill(-1));
  const [openedCounts, setOpenedCounts] = useState<number[]>(new Array(defaultPrompts.length).fill(-1));
  const [numCredits, setNumCredits] = useState(0);
  // const [openedLetter, setOpenedLetter] = useState<LetterProps[]>([]);
  // const [openedID, setOpenedID] = useState(0); 

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const [openedResponse, unopenedResponse] = await Promise.all([
          supabase.from("letters").select().eq('is_opened', 'true'),
          supabase.from("letters").select().eq('is_opened', 'false')
        ]);

        if (openedResponse.error) {
          console.error('Error fetching opened letters:', openedResponse.error);
          // setOpenedLetters(null);
        } else {
          console.log('Opened letters:', openedResponse.data);
          setOpenedLetters(openedResponse.data);
        }

        if (unopenedResponse.error) {
          console.error('Error fetching unopened letters:', unopenedResponse.error);
          // setUnopenedLetters(null);
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

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const { data, error } = await supabase.from("credits").select().eq('id', 1);
        if (error) {
          console.error('Error fetching credits:', error);
        } else if (data) {
          setNumCredits(data[0]?.num_credits || 0);
          console.log('credits', data[0]?.num_credits);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchCredits();
  }, []); // Ensure the dependency array is present

  useEffect(() => {
    if (unopenedLetters) {
      const promptCounts = new Array(defaultPrompts.length).fill(0);
      unopenedLetters.forEach(letter => {
        const index = defaultPrompts.indexOf(letter.prompt);
        if (index !== -1) {
          promptCounts[index]++;
        } else {
          promptCounts[promptCounts.length - 1]++;
        }
      });
      setUnopenedCounts(promptCounts);
      console.log("unopened counts", promptCounts);
    }
  }, [unopenedLetters]); //unopenedLetters, 


  useEffect(() => {
    if (openedLetters) {
      const promptCounts = new Array(defaultPrompts.length).fill(0);
      openedLetters.forEach(letter => {
        const index = defaultPrompts.indexOf(letter.prompt);
        if (index !== -1) {
          promptCounts[index]++;
        } else {
          promptCounts[promptCounts.length - 1]++;
        }
      });
      setOpenedCounts(promptCounts);
      console.log("opened counts", promptCounts);
    }
  }, [openedLetters]); //openedLetters, 

  const numUnopenedLetters = unopenedLetters ? unopenedCounts.reduce((partialSum, a) => partialSum + a, 0) : NaN;


  return (
    <div className="wrapper">
      <h1>open when...</h1>

      {view === 'instructions' && <div><p>welcome, internet friend! how are you feeling?</p>
        <br />
        <p>this is a community-driven site that allows people to give and receive emotional support via digital letters. we may not know each other, but as fellow human beings, we can still send kindness and well-wishes to each other.</p>
        <br />
        <p>if you&apos;re looking for some advice on how to navigate a particular feeling, you can browse letters that have been opened — and if there are unopened letters available, you can open and sign them, making them available for anyone to see!</p>
        <br />
        <p>if you&apos;d like to provide emotional support to a fellow internet friend, you can submit your own letter for someone else.</p>
        <br />
        <button onClick={() => setView('browse')}>browse letters</button>
        </div>}

      {view === 'browse' && (
        <LetterBrowser view={view} setView={setView} unopenedLetters={unopenedLetters}  openedLetters={openedLetters} openedCounts={openedCounts} unopenedCounts={unopenedCounts} defaultPrompts={defaultPrompts} />
      )}
      {view === 'write' && (
        <LetterEditor setHasWrittenLetter={setHasWrittenLetter} setView={setView} defaultPrompts={defaultPrompts} numUnopenedLetters={numUnopenedLetters} />
      )}
      {/* {view === 'open' && (
        <LetterOpener setView={setView} openedLetter={openedLetter} openedID={openedID} />
      )} */}

    </div>
  );
}
