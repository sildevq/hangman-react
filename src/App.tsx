import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const correctLetters = guessedLetters.filter((letter) =>
    wordToGuess.includes(letter)
  );
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  // recreates after every render, so we're using useCallback here
  // not
  // function addGuessedLetter(letter: string) {
  //   if (guessedLetters.includes(letter)) return;
  //   setGuessedLetters((currentLetters) => [...currentLetters, letter]);
  // }
  // but

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters]
  );

  // Без зависимости guessedLetters в useEffect будет использоваться старая версия addGuessedLetter, в которой guessedLetters всегда пустой (или устаревший). Из-за этого проверка includes ломается
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-2xl text-black text-center">
        {isLoser && "You lose! Refresh to try again"}
        {isWinner && "You win! Refresh to try again"}
      </div>
      <HangmanDrawing numberOfIncorrectGuesses={incorrectLetters.length} />
      <HangmanWord
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
        reveal={isLoser}
      />
      <div className="self-stretch">
        <Keyboard
          correctLetters={correctLetters}
          incorrectLetters={incorrectLetters}
          addGussedLetter={addGuessedLetter}
          disabled={isLoser || isWinner}
        />
      </div>
    </div>
  );
}

export default App;
