import { Game } from "../../../../models/game.js";

export const mockNewGameData: Game = {
  title: "Game1",
  condition: "Good",
  notes: "Example",
  boxIncluded: true,
  rating: 3,
  igdbId: 21,
  platformId: 7,
};

export const mockNewGameDataNoRating: Game = {
  title: "Game1",
  condition: "Good",
  notes: "Example",
  boxIncluded: true,
  igdbId: 21,
  platformId: 7,
};

export const mockNewGameDataNoNotes: Game = {
  title: "Game1",
  condition: "Good",
  boxIncluded: true,
  rating: 3,
  igdbId: 21,
  platformId: 7,
};

export const mockNewGameDataAlreadyExists: Game = {
  title: "Exists",
  condition: "Good",
  boxIncluded: true,
  rating: 3,
  igdbId: 21,
  platformId: 7,
};

export const mockIncorrectGameData: Object = {
  name: "Game1",
  notes: "Example",
  isBox: true,
  userRating: 3,
  platform: 1,
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

export const mockResultSearchParam = "Batman"

export const mockSearchByTitleParam = "Halo"

export const mockSearchByTitleParamNoMatch = "No match"

export const mockUnauthorizedSearchParam: object = {
  searchParam: "unauthorized",
}

export const mockUnauthorizedResultsParam = "unauthorized"

export const mockPlatformName = "original_xbox"

export const mockIncorrectPlatformName = "zbox"

export const mockFetchGameIgdbData: object = {
  id: 472,
  name: "The Elder Scrolls V: Skyrim",
  storyline:
    "The Empire of Tamriel is on the edge. The High King of Skyrim has been murdered. Alliances form as claims to the throne are made. In the midst of this conflict, a far more dangerous, ancient evil is awakened. Dragons, long lost to the passages of the Elder Scrolls, have returned to Tamriel. The future of Skyrim, even the Empire itself, hangs in the balance as they wait for the prophesized Dragonborn to come; a hero born with the power of The Voice, and the only one who can stand amongst the dragons.",
  summary:
    "Skyrim reimagines and revolutionizes the open-world fantasy epic, bringing to life a complete virtual world open for you to explore any way you choose. Play any type of character you can imagine, and do whatever you want; the legendary freedom of choice, storytelling, and adventure of The Elder Scrolls is realized like never before.",
  platforms: [
    {
      name: "PlayStation 3",
    },
    {
      name: "PC (Microsoft Windows)",
    },
    {
      name: "Xbox 360",
    },
  ],
  cover: {
    url: "https://images.igdb.com/igdb/image/upload/t_cover_small/co1tnw.jpg",
  },
  videos: [
    {
      url: "https://www.youtube.com/watch?v=2doLV4hNMIg",
    },
    {
      url: "https://www.youtube.com/watch?v=TvrqsDdy2ok",
    },
    {
      url: "https://www.youtube.com/watch?v=6IEoZXM8WZY",
    },
    {
      url: "https://www.youtube.com/watch?v=482QMfHHgcY",
    },
    {
      url: "https://www.youtube.com/watch?v=EIIWmutIT6w",
    },
    {
      url: "https://www.youtube.com/watch?v=3aJ2jG1gt44",
    },
    {
      url: "https://www.youtube.com/watch?v=0mHGygvlKCQ",
    },
    {
      url: "https://www.youtube.com/watch?v=Ft9MNJxky1Y",
    },
    {
      url: "https://www.youtube.com/watch?v=skf7Dim1duI",
    },
  ],
  genres: [
    {
      name: "Role-playing (RPG)",
    },
    {
      name: "Adventure",
    },
  ],
  artworks: [
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/p5nul4inxjpvi05tnn1r.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/snmb2kvu6uz2vr7uzgzp.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/q6d8jv0yflv8hbomthqm.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/c7mid4aolyj7fboecnuu.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/egrcjzat6ssiuymf0pwb.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/dootpbeulmf5yxwqulvx.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/tplycmyhelqc4kx8lxzn.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/ksgt1c400zmgamznhh9h.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/ypfrlwt0ybgkbx6fsprq.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/beb3c77tggywfbygohpg.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/bblukgqk83m8xqimar6h.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/eh5ythnopfxa6hrcmd5v.jpg",
    },
    {
      url: "https://images.igdb.com/igdb/image/upload/t_screenshot_big/ar4n68.jpg",
    },
  ],
  release_dates: [
    {
      date: "8th December 2011",
      region: "Japan",
    },
    {
      date: "10th November 2011",
      region: "Worldwide",
    },
    {
      date: "10th November 2011",
      region: "North America",
    },
    {
      date: "11th November 2011",
      region: "Europe",
    },
  ],
};
