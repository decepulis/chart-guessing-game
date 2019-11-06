/*
filename.csv : {
  dateColumn: '',
  columns: [],
  solutions: [],
  hints: []
}
*/
const games = {
  "trump-obama": {
    dateColumn: "Month",
    columns: ["trump:", "obama:"],
    solutions: [
      "Trump v. Obama",
      "Donald Trump Barack Obama",
      "Presidential Elections"
    ],
    hints: ["Public Figures", "Politics", "Yes We Can Make America Great Again"]
  },
  "star-wars": {
    dateColumn: "Month",
    columns: ["star wars:"],
    solutions: [
      "Star Wars",
      "Revenge of the Sith The Force Awakens Rogue One The Last Jedi"
    ],
    hints: [
      "Hollywood",
      "I have the high ground!",
      "It's not a story a Jedi would tell you."
    ]
  },
  "nintendo-wii": {
    dateColumn: "Month",
    columns: ["Nintendo Wii:"],
    solutions: ["Nintendo Wii", "Wii"],
    hints: ["Entertainment", "Video Games", "Popular 2006 Game Console"]
  }
};

const checkGames = games => {
  // only run this process in development...
  if (process.env.NODE_ENV !== "development") {
    return games;
  }

  console.warn("Checking games array...");

  if (typeof games !== typeof {}) {
    throw Error("games is not an object");
  }

  const requiredKeys = ["dateColumn", "columns", "solutions", "hints"];
  Object.entries(games).forEach(([game, details]) => {
    fetch(`./data/${game}.csv`, { method: "HEAD" }).then(response => {
      if (response.status !== 200) {
        throw Error(`Couldn't find file ./data/${game}.csv`);
      }
    });

    if (typeof details !== typeof {}) {
      throw Error(`Entry ${game} is not an object`);
    }

    const hasAllKeys = requiredKeys.every(requriedKey => {
      return details.hasOwnProperty(requriedKey);
    });
    if (!hasAllKeys) {
      throw Error(
        `Entry ${game} is missing a required key from ${requiredKeys}`
      );
    }

    if (
      !Array.isArray(details.columns) ||
      !Array.isArray(details.solutions) ||
      !Array.isArray(details.hints)
    ) {
      throw Error(
        `game columns, solutions, and hints must be arrays. ${game} violates this constraint.`
      );
    }
  });
  return games;
};

export const selectRandomGame = games => {
  const gameKeys = Object.keys(games);
  const randomKey = gameKeys[Math.floor(Math.random() * gameKeys.length)];

  return [randomKey, games[randomKey]];
};

export default checkGames(games);
