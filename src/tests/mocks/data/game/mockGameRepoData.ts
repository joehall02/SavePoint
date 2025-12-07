import { GameDetails } from "../../../../models/game.js";

export const mockGetAllGamesData: object[] = [
  {
    id: 740,
    name: "Halo: Combat Evolved",
  },
  {
    id: 2640,
    name: "Halo: Combat Evolved Anniversary",
  },
  {
    id: 45148,
    name: "Halo 4: Limited Edition",
  },
  {
    id: 163108,
    name: "Halo 3 + Halo Wars",
  },
  {
    id: 7348,
    name: "Halo: The Master Chief Collection",
  },
  {
    id: 989,
    name: "Halo 3: ODST",
  },
  {
    id: 103281,
    name: "Halo Infinite",
  },
  {
    id: 991,
    name: "Halo 4",
  },
  {
    id: 986,
    name: "Halo 2",
  },
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
