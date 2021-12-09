const deployUrl = "https://remix-chess.fly.dev";
const assetPath = (coordinate) => `${deployUrl}/piece/${coordinate}`;
const movePath = (coordinate) => `${deployUrl}/move/${coordinate}`;

let result =
  "|   | A | B | C | D | E | F | G | H |" +
  "\n" +
  "| - | - | - | - | - | - | - | - | - |" +
  "\n";

const nums = [8, 7, 6, 5, 4, 3, 2, 1];
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

nums.forEach((num) => {
  const items = [num.toString()];

  letters.forEach((letter) => {
    const coordinate = letter + num;

    items.push(
      `[![${coordinate}](${assetPath(coordinate)})](${movePath(coordinate)})`
    );
  });

  result += "| " + items.join(" | ") + " |\n";
});

console.log(result);
