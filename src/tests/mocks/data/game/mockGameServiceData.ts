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

export const mockIncorrectGameData: Object = {
  name: "Game1",
  notes: "Example",
  isBox: true,
  userRating: 3,
  platform: 1,
}

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

export const mockEditGameData: Object = {
  title: "Super Smash TV",
  condition: "Bad",
  notes: "Condition of the disc is very good but the box is damaged.",
  boxIncluded: true,
  rating: 4.2,
  platformId: 12,
};

export const mockEditGameIncorrectConfitionData: Object = {
  title: "Super Smash TV",
  condition: "Meh",
  notes: "Condition of the disc is very good but the box is damaged.",
  boxIncluded: true,
  rating: 4.2,
  platformId: 12,
};

export const mockEditGameReturnData: Object = {
  title: "Super Smash TV",
  condition: "Bad",
  igdbId: 123,
  notes: "Condition of the disc is very good but the box is damaged.",
  boxIncluded: true,
  rating: 4.2,
  platformId: 12,
};

export const mockSearchIgdbData: object[] = [
  {
    id: 26041,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co2fx3.jpg",
    },
    name: "Batman: Arkham Knight - 2008 Movie Batman Skin",
  },
  {
    id: 75545,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/onujdb7krwmvflsgiicg.jpg",
    },
    name: "Batman: Arkham City - Arkham City Skins Pack",
  },
  {
    id: 138111,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co3zh1.jpg",
    },
    name: "Batman: Arkham City - Batman Inc. Batsuit Skin",
  },
  {
    id: 26042,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co2fva.jpg",
    },
    name: "Batman: Arkham Knight - Batman: Noel Skin",
  },
  {
    id: 198676,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co4wti.jpg",
    },
    name: "Batman",
  },
  {
    id: 198672,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co7xjx.jpg",
    },
    name: "Batman",
  },
  {
    id: 25997,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co7xj9.jpg",
    },
    name: "Batman: Arkham Knight - PlayStation 4 Exclusive Skins Pack",
  },
  {
    id: 51525,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co208l.jpg",
    },
    name: "Batman: The Enemy Within",
  },
  {
    id: 2738,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co1qrn.jpg",
    },
    name: "LEGO Batman: The Videogame",
  },
  {
    id: 7685,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co3jk7.jpg",
    },
    name: "LEGO Batman 3: Beyond Gotham",
  },
  {
    id: 77258,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co3zcm.jpg",
    },
    name: "Batman: Arkham City Lockdown",
  },
  {
    id: 45203,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co1ssv.jpg",
    },
    name: "The Adventures of Batman & Robin",
  },
  {
    id: 5346,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co69sz.jpg",
    },
    name: "The Adventures of Batman & Robin",
  },
  {
    id: 214896,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co5yv4.jpg",
    },
    name: "Batman",
  },
  {
    id: 14288,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co2kxj.jpg",
    },
    name: "Batman",
  },
  {
    id: 164313,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co6l6c.jpg",
    },
    name: "Batman",
  },
  {
    id: 73262,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co3071.jpg",
    },
    name: "Batman: The Enemy Within - Episode 2: The Pact",
  },
  {
    id: 91033,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co2zuc.jpg",
    },
    name: "Batman: The Enemy Within - Episode 1: The Enigma",
  },
  {
    id: 96066,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co1vdt.jpg",
    },
    name: "Batman: The Enemy Within - Episode 5: Same Stitch",
  },
  {
    id: 81123,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co1vds.jpg",
    },
    name: "Batman: The Enemy Within - Episode 4: What Ails You",
  },
  {
    id: 80910,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co3072.jpg",
    },
    name: "Batman: The Enemy Within - Episode 3: Fractured Mask",
  },
  {
    id: 304232,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co8amt.jpg",
    },
    name: "Lexibook Batman Compact Cyber Arcade Portable Console",
  },
  {
    id: 115072,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co1vde.jpg",
    },
    name: "Batman: The Telltale Series - Episode 5: City of Light",
  },
  {
    id: 26993,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co1vdc.jpg",
    },
    name: "Batman: The Telltale Series - Episode 3: New World Order",
  },
  {
    id: 26638,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/ygu3ksbago1vxditorig.jpg",
    },
    name: "Batman: The Telltale Series - Episode 1: Realm of Shadows",
  },
  {
    id: 115071,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co1vdd.jpg",
    },
    name: "Batman: The Telltale Series - Episode 4: Guardian of Gotham",
  },
  {
    id: 26964,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/t8r49fxxltxttweo2dv6.jpg",
    },
    name: "Batman: The Telltale Series - Episode 2: Children of Arkham",
  },
  {
    id: 198678,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co7xji.jpg",
    },
    name: "Batman Returns",
  },
  {
    id: 329827,
    cover: {
      url: "https://images.igdb.com/igdb/image/upload/t_1080p/co9c7t.jpg",
    },
    name: "Barcode Battler II: Batman Returns - Batman",
  },
];

export const mockSearchParam: object = {
  searchParam: "Batman",
};

export const mockUnauthorizedSearchParam: object = {
  searchParam: "unauthorized",
}

export const mockPlatformName: object = {
  platform: "original_xbox"
}

export const mockIncorrectPlatformName: object = {
  platform: "zbox"
}