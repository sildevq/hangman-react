const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const btnStyles =
  "w-full cursor-pointer border-4 border-black aspect-square text-4xl font-bold text-black uppercase hover:bg-[hsl(200_100%_75%)] focus:bg-[hsl(200_100%_75%)]";

type KeyboardProps = {
  disabled?: boolean;
  correctLetters: string[];
  incorrectLetters: string[];
  addGussedLetter: (letter: string) => void;
};

function Keyboard({
  correctLetters,
  incorrectLetters,
  addGussedLetter,
  disabled = false,
}: KeyboardProps) {
  return (
    <div className="w-[75%] mx-auto grid grid-cols-[repeat(auto-fill,_minmax(75px,_1fr))] gap-2">
      {KEYS.map((key, index) => {
        const isCorrect = correctLetters.includes(key);
        const isIncorrect = incorrectLetters.includes(key);

        return (
          <button
            key={index}
            onClick={() => addGussedLetter(key)}
            disabled={isCorrect || isIncorrect || disabled}
            className={`${btnStyles} ${
              isCorrect ? "bg-[hsl(200_100%_50%)] text-white" : ""
            } ${isIncorrect ? "opacity-30" : ""}`}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}

export default Keyboard;
