import { GameDetails } from "../../../../models/game.js";

export const mockGetAllGamesData: object[] = [
  { id: 740, title: "Halo: Combat Evolved", igdbId: 740 },
  { id: 2640, title: "Halo: Combat Evolved Anniversary", igdbId: 2640 },
  { id: 45148, title: "Halo 4: Limited Edition", igdbId: 45148 },
  { id: 163108, title: "Halo 3 + Halo Wars", igdbId: 163108 },
  { id: 7348, title: "Halo: The Master Chief Collection", igdbId: 7348 },
  { id: 989, title: "Halo 3: ODST", igdbId: 989 },
  { id: 103281, title: "Halo Infinite", igdbId: 103281 },
  { id: 991, title: "Halo 4", igdbId: 991 },
  { id: 986, title: "Halo 2", igdbId: 986 },
];

export const mockSearchGamesByTitleData: object[] = [
  { id: 740, title: "Halo: Combat Evolved" },
  { id: 2640, title: "Halo: Combat Evolved Anniversary" },
  { id: 45148, title: "Halo 4: Limited Edition" },
  { id: 163108, title: "Halo 3 + Halo Wars" },
  { id: 7348, title: "Halo: The Master Chief Collection" },
  { id: 989, title: "Halo 3: ODST" },
  { id: 103281, title: "Halo Infinite" },
  { id: 991, title: "Halo 4" },
  { id: 986, title: "Halo 2" },
];

export const mockGetGameData: GameDetails = {
  title: "Super Smash TV",
  condition: "Good",
  notes: "Condition of the disc is very good but the box is damaged.",
  boxIncluded: 1,
  rating: 4.2,
  igdbId: 123,
  platformId: 12,
};
