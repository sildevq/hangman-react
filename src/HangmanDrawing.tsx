import React from "react";

function Gallows() {
  return (
    <>
      <div className="h-[50px] w-[10px] bg-black absolute top-0 right-0"></div>
      <div className="h-[10px] w-[200px] bg-black ml-[120px]"></div>
      <div className="h-[400px] w-[10px] bg-black ml-[120px]"></div>
      <div className="h-[10px] w-[250px] bg-black"></div>
    </>
  );
}

const HEAD = (
  <div className="w-[50px] h-[50px] rounded-full border-[10px] border-black absolute top-[50px] right-[-20px]" />
);

const BODY = (
  <div className="w-[10px] h-[100px] bg-black absolute top-[100px] right-[0px]" />
);

const LEFT_ARM = (
  <div className="w-[100px] h-[10px] bg-black absolute top-[150px] right-[10px] rotate-[30deg] origin-bottom-right" />
);

const RIGHT_ARM = (
  <div className="w-[100px] h-[10px] bg-black absolute top-[150px] right-[-100px] rotate-[-30deg] origin-bottom-left" />
);

const LEFT_LEG = (
  <div className="w-[100px] h-[10px] bg-black absolute top-[190px] right-[0px] rotate-[-60deg] origin-bottom-right" />
);

const RIGHT_LEG = (
  <div className="w-[100px] h-[10px] bg-black absolute top-[190px] right-[-90px] rotate-[60deg] origin-bottom-left" />
);

const BODY_PARTS = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG];

type HangmanDrawingProps = {
  numberOfIncorrectGuesses: number;
};

function HangmanDrawing({ numberOfIncorrectGuesses }: HangmanDrawingProps) {
  return (
    <div className="relative">
      <Gallows />
      {BODY_PARTS.slice(0, numberOfIncorrectGuesses).map((Part, index) => (
        <React.Fragment key={index}>{Part}</React.Fragment>
      ))}
    </div>
  );
}

export default HangmanDrawing;
