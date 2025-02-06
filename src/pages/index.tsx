import { useState, useEffect } from 'react';

import { calculateCounts, calculateTotalCount } from '@/utils/utils';
import { useFetchLetters } from '@/utils/useFetchLetters';
import Header from "@/components/header";
import Welcome from "@/components/welcome";
import LetterBrowser from "@/components/letter_browser";
import LetterEditor from "@/components/letter_editor";

export default function Home() {

  const [view, setView] = useState('welcome');
  const { openedLetters, unopenedLetters, prompts } = useFetchLetters(view);
  const [unopenedCounts, setUnopenedCounts] = useState<number[]>([]);
  const [openedCounts, setOpenedCounts] = useState<number[]>([]);
  const [numUnopenedLetters, setNumUnopenedLetters] = useState<number>(0);
  const [numOpenedLetters, setNumOpenedLetters] = useState<number>(0);

  useEffect(() => {
    setOpenedCounts(calculateCounts(openedLetters, prompts));
    setUnopenedCounts(calculateCounts(unopenedLetters, prompts));
  }, [prompts, openedLetters, unopenedLetters]);

  useEffect(() => {
    setNumUnopenedLetters(calculateTotalCount(unopenedCounts));
    setNumOpenedLetters(calculateTotalCount(openedCounts));
  }, [unopenedCounts, openedCounts]);

  const displayView = () => {
    switch (view) {
      case 'welcome':
        return <Welcome setView={setView} numOpenedLetters={numOpenedLetters} numUnopenedLetters={numUnopenedLetters} />;
      case 'browse':
        return <LetterBrowser setView={setView} unopenedLetters={unopenedLetters} openedLetters={openedLetters} openedCounts={openedCounts} unopenedCounts={unopenedCounts} prompts={prompts} numUnopenedLetters={numUnopenedLetters} numOpenedLetters={numOpenedLetters} setNumOpenedLetters={setNumOpenedLetters} setNumUnopenedLetters={setNumUnopenedLetters} />;
      case 'write':
        return <LetterEditor setView={setView} prompts={prompts} numUnopenedLetters={numUnopenedLetters} setNumUnopenedLetters={setNumUnopenedLetters} />;
      default:
        return null;
    }
  };

  // useEffect(() => {
  //   console.log("moderate text use effect");
  //   fetch("/api/moderate_text", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify("you're smart"),
  //   }).then(async (response) => {
  //     if (response.ok) {
  //       return await response.json()
  //     }
  //   }).then((data) => {console.log(data)})
  // }, []);
// }).then((data) => {
//   // do stuff with response here
// }).catch((error) => {
//   console.error(error)
//   // do stuff with error here
// })
// }

  return (
    <div className="wrapper">
      <Header setView={setView} numOpenedLetters={numOpenedLetters} numUnopenedLetters={numUnopenedLetters} />
      {displayView()}
    </div>
  );
}
