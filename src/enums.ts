import { IgdbPlatformId } from "./models/platform.js"

export enum ImageSize {
  cover_small = "cover_small",
  screenshot_med = "screenshot_med",
  cover_big = "cover_big",
  logo_med = "logo_med",
  screenshot_big = "screenshot_big",
  thumb = "thumb",
  micro = "micro",
  r_720p = "720p",
  r_1080p = "1080p",
}

export enum RegionName {
  north_america = "north_america",
  australia = "australia",
  europe = "europe",
  new_zealand = "new_zealand",
  japan = "japan",
  china = "china",
  korea = "korea",
  brazil = "brazil",
  asia = "asia",
  worldwide = "worldwide",
}

const platformIds: IgdbPlatformId[] = [
  { igdbId: 1, name: "ps1" },
  { igdbId: 2, name: "ps2" },
  { igdbId: 3, name: "ps3" },
  { igdbId: 4, name: "ps4" },
  { igdbId: 5, name: "ps5" },
  { igdbId: 6, name: "psp" },
  { igdbId: 7, name: "ps_vita" },
  { igdbId: 8, name: "original_xbox" },
  { igdbId: 9, name: "xbox_360" },
  { igdbId: 10, name: "xbox_one" },
  { igdbId: 11, name: "xbox_series_x_s" },
  { igdbId: 12, name: "sega_mega_drive" },
  { igdbId: 13, name: "wii" },
  { igdbId: 14, name: "switch" },
  { igdbId: 15, name: "nes" },
  { igdbId: 16, name: "ds" },
  { igdbId: 17, name: "pc" },
];

export enum PlatformApiId {
    ps1 = platformIds[0].igdbId,
    ps2 = platformIds[1].igdbId,
    ps3 = platformIds[2].igdbId,
    ps4 = platformIds[3].igdbId,
    ps5 = platformIds[4].igdbId,
    psp = platformIds[5].igdbId,
    ps_vita = platformIds[6].igdbId,
    original_xbox = platformIds[7].igdbId,
    xbox_360 = platformIds[8].igdbId,
    xbox_one = platformIds[9].igdbId,
    xbox_series_x_s = platformIds[10].igdbId,
    sega_mega_drive = platformIds[11].igdbId,
    wii = platformIds[12].igdbId,
    switch = platformIds[13].igdbId,
    nes = platformIds[14].igdbId,
    ds = platformIds[15].igdbId,
    pc = platformIds[16].igdbId,
}

export enum PlatformName {
    ps1 = "ps1",
    ps2 = "ps2",
    ps3 = "ps3",
    ps4 = "ps4",
    ps5 = "ps5",
    psp = "psp",
    ps_vita = "ps_vita",
    original_xbox = "original_xbox",
    xbox_360 = "xbox_360",
    xbox_one = "xbox_one",
    xbox_series_x_s = "xbox_series_x_s",
    sega_mega_drive = "sega_mega_drive",
    wii = "wii",
    switch = "switch",
    nes = "nes",
    ds = "ds",
    pc = "pc"
}