import React from "react";

type HangmanWord = {
  guessedLetters: string[];
  wordToGuess: string;
  reveal?: boolean;
};

function HangmanWord({
  guessedLetters,
  wordToGuess,
  reveal = false,
}: HangmanWord) {
  return (
    <div className="flex gap-5 text-8xl font-bold uppercase font-mono">
      {wordToGuess.split("").map((letter, index) => (
        <span key={index} className={`border-b-8 border-black`}>
          <span
            className={`${
              guessedLetters.includes(letter) || reveal
                ? "visible"
                : "invisible"
            } ${
              !guessedLetters.includes(letter) && reveal
                ? "text-red-500"
                : "text-black"
            }`}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}

export default HangmanWord;
