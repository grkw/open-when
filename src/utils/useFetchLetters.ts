// Custom hook to handle data fetching from Supabase

import { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/client";
import { LetterProps } from "@/components/letter";

export const useFetchLetters = (view: string) => {
  const [openedLetters, setOpenedLetters] = useState<LetterProps[]>([]);
  const [unopenedLetters, setUnopenedLetters] = useState<LetterProps[]>([]);
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const [openedResponse, unopenedResponse] = await Promise.all([
          supabase.from("letters").select().eq('is_opened', 'true').order('id', { ascending: false }),
          supabase.from("letters").select().eq('is_opened', 'false').order('id', { ascending: false }),
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

    if (view === 'browse' || view === 'welcome') {
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

  return { openedLetters, unopenedLetters, prompts };
};