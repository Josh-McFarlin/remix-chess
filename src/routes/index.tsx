import React from "react";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const nums = [8, 7, 6, 5, 4, 3, 2, 1];

export default function IndexRoute() {
  return (
    <div className="remix__page">
      <main>
        {nums.map((number) => (
          <div key={number}>
            {letters.map((letter) => (
              <a key={number + letter} href={`/move/${letter}${number}`}>
                <img
                  src={`/piece/${letter}${number}`}
                  alt={`Chess piece: ${letter}${number}`}
                />
              </a>
            ))}
          </div>
        ))}
      </main>
      <img src={`/stats`} alt={`Game Stats`} />
    </div>
  );
}
