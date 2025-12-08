import { Game } from "../../../../models/game.js";

export const mockNewGameData: Game = {
  title: "Game1",
  condition: "Good",
  notes: "Example",
  boxIncluded: true,
  rating: 3,
  igdbId: 21,
  platformId: 1,
};

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

export const mockGetGameByIdData: Game = {
  title: "Super Smash TV",
  condition: "Good",
  notes: "Condition of the disc is very good but the box is damaged.",
  boxIncluded: true,
  rating: 4.2,
  igdbId: 123,
  platformId: 12,
};

export const mockEditGameData: Game = {
  title: "Super Smash TV",
  condition: "Bad",
  notes: "Condition of the disc is very good but the box is damaged.",
  boxIncluded: true,
  rating: 4.2,
  igdbId: 123,
  platformId: 12,
};

export const mockSearchIgdbData: object[] = [
  {
    id: 26041,
    cover: {
      image_id: "co2fx3",
    },
    name: "Batman: Arkham Knight - 2008 Movie Batman Skin",
  },
  {
    id: 75545,
    cover: {
      image_id: "onujdb7krwmvflsgiicg",
    },
    name: "Batman: Arkham City - Arkham City Skins Pack",
  },
  {
    id: 138111,
    cover: {
      image_id: "co3zh1",
    },
    name: "Batman: Arkham City - Batman Inc. Batsuit Skin",
  },
  {
    id: 26042,
    cover: {
      image_id: "co2fva",
    },
    name: "Batman: Arkham Knight - Batman: Noel Skin",
  },
  {
    id: 198676,
    cover: {
      image_id: "co4wti",
    },
    name: "Batman",
  },
  {
    id: 198672,
    cover: {
      image_id: "co7xjx",
    },
    name: "Batman",
  },
  {
    id: 25997,
    cover: {
      image_id: "co7xj9",
    },
    name: "Batman: Arkham Knight - PlayStation 4 Exclusive Skins Pack",
  },
  {
    id: 51525,
    cover: {
      image_id: "co208l",
    },
    name: "Batman: The Enemy Within",
  },
  {
    id: 2738,
    cover: {
      image_id: "co1qrn",
    },
    name: "LEGO Batman: The Videogame",
  },
  {
    id: 7685,
    cover: {
      image_id: "co3jk7",
    },
    name: "LEGO Batman 3: Beyond Gotham",
  },
  {
    id: 77258,
    cover: {
      image_id: "co3zcm",
    },
    name: "Batman: Arkham City Lockdown",
  },
  {
    id: 45203,
    cover: {
      image_id: "co1ssv",
    },
    name: "The Adventures of Batman & Robin",
  },
  {
    id: 5346,
    cover: {
      image_id: "co69sz",
    },
    name: "The Adventures of Batman & Robin",
  },
  {
    id: 214896,
    cover: {
      image_id: "co5yv4",
    },
    name: "Batman",
  },
  {
    id: 14288,
    cover: {
      image_id: "co2kxj",
    },
    name: "Batman",
  },
  {
    id: 164313,
    cover: {
      image_id: "co6l6c",
    },
    name: "Batman",
  },
  {
    id: 73262,
    cover: {
      image_id: "co3071",
    },
    name: "Batman: The Enemy Within - Episode 2: The Pact",
  },
  {
    id: 91033,
    cover: {
      image_id: "co2zuc",
    },
    name: "Batman: The Enemy Within - Episode 1: The Enigma",
  },
  {
    id: 96066,
    cover: {
      image_id: "co1vdt",
    },
    name: "Batman: The Enemy Within - Episode 5: Same Stitch",
  },
  {
    id: 81123,
    cover: {
      image_id: "co1vds",
    },
    name: "Batman: The Enemy Within - Episode 4: What Ails You",
  },
  {
    id: 80910,
    cover: {
      image_id: "co3072",
    },
    name: "Batman: The Enemy Within - Episode 3: Fractured Mask",
  },
  {
    id: 304232,
    cover: {
      image_id: "co8amt",
    },
    name: "Lexibook Batman Compact Cyber Arcade Portable Console",
  },
  {
    id: 115072,
    cover: {
      image_id: "co1vde",
    },
    name: "Batman: The Telltale Series - Episode 5: City of Light",
  },
  {
    id: 26993,
    cover: {
      image_id: "co1vdc",
    },
    name: "Batman: The Telltale Series - Episode 3: New World Order",
  },
  {
    id: 26638,
    cover: {
      image_id: "ygu3ksbago1vxditorig",
    },
    name: "Batman: The Telltale Series - Episode 1: Realm of Shadows",
  },
  {
    id: 115071,
    cover: {
      image_id: "co1vdd",
    },
    name: "Batman: The Telltale Series - Episode 4: Guardian of Gotham",
  },
  {
    id: 26964,
    cover: {
      image_id: "t8r49fxxltxttweo2dv6",
    },
    name: "Batman: The Telltale Series - Episode 2: Children of Arkham",
  },
  {
    id: 198678,
    cover: {
      image_id: "co7xji",
    },
    name: "Batman Returns",
  },
  {
    id: 329827,
    cover: {
      image_id: "co9c7t",
    },
    name: "Barcode Battler II: Batman Returns - Batman",
  },
];

export const mockSearchParam: object = {
  searchParam: "Batman",
};
