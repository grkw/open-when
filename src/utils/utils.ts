export const calculateCounts = (letters: any[], prompts: string[]) => {
  const countsByPrompt = new Array(prompts.length).fill(0);

  letters.forEach(letter => {
    const index = prompts.indexOf(letter.prompt);
    if (index !== -1) {
      countsByPrompt[index]++;
    } else {
      console.log("error: letter prompt not in prompts");
    }
  });

  return countsByPrompt;
};

export const calculateTotalCount = (counts: number[]) => {
  return counts.reduce((partialSum, a) => partialSum + a, 0);
};