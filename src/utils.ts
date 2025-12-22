import { RawExternalGameDetails, ExternalGameDetails, IGDBGame, RawIGDBGame } from "./models/igdbGame.js";
import { Request } from "express";
import * as enums from "./enums.js"
import { Pagination } from "./models/pagination.js";

export function mapExternalGameDetails(data: object[]): ExternalGameDetails {
  const raw = data[0] as RawExternalGameDetails;

  return {
    id: raw.id,
    name: raw.name,
    storyline: raw.storyline ?? null,
    summary: raw.summary ?? null,
    platforms: raw.platforms?.map((p) => ({ name: p.name })) ?? null,
    cover: raw.cover ? { url: mapImageIdToUrl(raw.cover.image_id, enums.ImageSize.cover_small) } : null,
    videos: raw.videos?.map((v) => ({ url: mapVideoIdToUrl(v.video_id) })) ?? null,
    genres: raw.genres?.map((g) => ({ name: g.name })) ?? null,
    artworks:
      raw.artworks?.map((a) => ({ url: mapImageIdToUrl(a.image_id, enums.ImageSize.screenshot_big) })) ?? null,
    release_dates: (() => {
      const filtered = filterRepeatedReleaseDates(raw.release_dates);
      return (
        filtered?.map((r) => ({
          date: convertUnixTimestamp(r.date),
          region: r.release_region?.region ? mapRegionName(r.release_region.region) : null,
        })) ?? null
      );
    })(),
  };
}

// Return array of release dates with no repeated regions and 
// with only the earliest release dates for each region
export function filterRepeatedReleaseDates(
  releaseDates?: RawExternalGameDetails["release_dates"],
): RawExternalGameDetails["release_dates"] | undefined {
  // If there are no release dates or only one, return the original array
  if (!releaseDates || releaseDates.length <= 1) {
    return releaseDates ?? undefined;
  }

  // Create map (key/value pair) with the earliest date per region
  // String | undefined = key
  // (typeof releaseDates)[number] = value
  // [number] effectively saying return one releaseDates object from array
  const earliestByRegion = new Map<string | undefined, (typeof releaseDates)[number]>();

  // Iterate over the array of release dates and update the map with the earliest date per region
  for (const release of releaseDates) {
    if (!release?.date) continue; // Continue moves onto next value in loop

    // Get region key and check if there is already a value for this region
    const regionKey = release.release_region?.region;
    const current = earliestByRegion.get(regionKey);

    // Check if current is truthy, if so then convert current.date
    // to a number, if not then set it to undefined
    const currentTimestamp = current ? Number(current.date) : undefined;
    const newTimestamp = Number(release.date);

    if (Number.isNaN(newTimestamp)) continue;

    // If region doesn't have a current timestamp OR new timestamp is earlier than current
    if (currentTimestamp === undefined || newTimestamp < currentTimestamp) {
      earliestByRegion.set(regionKey, release);
    }
  }

  // Creates array from iterable object - earliestByRegion
  // .values() returns the values of the key/value pairs
  return Array.from(earliestByRegion.values())
}

export function mapExternalGame(data: object[]): IGDBGame[] {
  const rawList = data as RawIGDBGame[];

  return rawList.map((raw) => ({
    id: raw.id,
    name: raw.name,
    cover: raw.cover ? { url: mapImageIdToUrl(raw.cover.image_id, enums.ImageSize.r_1080p) } : null,
  }));
}

export function mapImageIdToUrl(imageId: string, imageSize: enums.ImageSize): string {
  switch (imageSize) {
    case enums.ImageSize.cover_small:
      break;
    case enums.ImageSize.screenshot_med:
      break;
    case enums.ImageSize.cover_big:
      break;
    case enums.ImageSize.logo_med:
      break;
    case enums.ImageSize.screenshot_big:
      break;
    case enums.ImageSize.thumb:
      break;
    case enums.ImageSize.micro:
      break;
    case enums.ImageSize.r_720p:
      break;
    case enums.ImageSize.r_1080p:
      break;
    default:
      imageSize = enums.ImageSize.thumb;
  }

  const imageUrl = `https://images.igdb.com/igdb/image/upload/t_${imageSize}/${imageId}.jpg`;

  return imageUrl;
}

export function mapVideoIdToUrl(videoId: string): string {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return videoUrl;
}

export function mapRegionName(regionName: string): string {
  switch (regionName) {
    case enums.RegionName.asia:
      return "Asia";
    case enums.RegionName.europe:
      return "Europe";
    case enums.RegionName.north_america:
      return "North America";
    case enums.RegionName.australia:
      return "Australia";
    case enums.RegionName.brazil:
      return "Brazil";
    case enums.RegionName.china:
      return "China";
    case enums.RegionName.japan:
      return "Japan";
    case enums.RegionName.korea:
      return "Korea";
    case enums.RegionName.new_zealand:
      return "New Zealand";
    case enums.RegionName.worldwide:
      return "Worldwide";
    default:
      return "N/A";
  }
}

export function convertUnixTimestamp(timestamp: number): string {
  const unixSeconds = Number(timestamp);
  if (Number.isNaN(unixSeconds)) {
    throw new Error("Invalid timestamp");
  }
  const date = new Date(unixSeconds * 1000);
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const monthIndex = date.getUTCMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getOrdinalSuffix = (d: number): string => {
    if (d >= 11 && d <= 13) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
  const monthName = months[monthIndex];
  return `${dayWithSuffix} ${monthName} ${year}`;
}

export function getPlatformApiId(platformName: string): number | undefined {
  switch (platformName) {
    case enums.PlatformName.ps1:
      return enums.PlatformApiId.ps1;
    case enums.PlatformName.ps2:
      return enums.PlatformApiId.ps2;
    case enums.PlatformName.ps3:
      return enums.PlatformApiId.ps3;
    case enums.PlatformName.ps4:
      return enums.PlatformApiId.ps4;
    case enums.PlatformName.ps5:
      return enums.PlatformApiId.ps5;
    case enums.PlatformName.psp:
      return enums.PlatformApiId.psp;
    case enums.PlatformName.ps_vita:
      return enums.PlatformApiId.ps_vita;
    case enums.PlatformName.original_xbox:
      return enums.PlatformApiId.original_xbox;
    case enums.PlatformName.xbox_360:
      return enums.PlatformApiId.xbox_360;
    case enums.PlatformName.xbox_one:
      return enums.PlatformApiId.xbox_one;
    case enums.PlatformName.xbox_series_x_s:
      return enums.PlatformApiId.xbox_series_x_s;
    case enums.PlatformName.sega_mega_drive:
      return enums.PlatformApiId.sega_mega_drive;
    case enums.PlatformName.wii:
      return enums.PlatformApiId.wii;
    case enums.PlatformName.switch:
      return enums.PlatformApiId.switch;
    case enums.PlatformName.nes:
      return enums.PlatformApiId.nes;
    case enums.PlatformName.ds:
      return enums.PlatformApiId.ds;
    case enums.PlatformName.pc:
      return enums.PlatformApiId.pc;
    default:
      return undefined;
  }
}

// TODO: definetly a better way to do this without repeating getPlatformApiId
export function getPlatformId(platformName: string): number | undefined {
  switch (platformName) {
    case enums.PlatformName.ps1:
      return enums.PlatformId.ps1;
    case enums.PlatformName.ps2:
      return enums.PlatformId.ps2;
    case enums.PlatformName.ps3:
      return enums.PlatformId.ps3;
    case enums.PlatformName.ps4:
      return enums.PlatformId.ps4;
    case enums.PlatformName.ps5:
      return enums.PlatformId.ps5;
    case enums.PlatformName.psp:
      return enums.PlatformId.psp;
    case enums.PlatformName.ps_vita:
      return enums.PlatformId.ps_vita;
    case enums.PlatformName.original_xbox:
      return enums.PlatformId.original_xbox;
    case enums.PlatformName.xbox_360:
      return enums.PlatformId.xbox_360;
    case enums.PlatformName.xbox_one:
      return enums.PlatformId.xbox_one;
    case enums.PlatformName.xbox_series_x_s:
      return enums.PlatformId.xbox_series_x_s;
    case enums.PlatformName.sega_mega_drive:
      return enums.PlatformId.sega_mega_drive;
    case enums.PlatformName.wii:
      return enums.PlatformId.wii;
    case enums.PlatformName.switch:
      return enums.PlatformId.switch;
    case enums.PlatformName.nes:
      return enums.PlatformId.nes;
    case enums.PlatformName.ds:
      return enums.PlatformId.ds;
    case enums.PlatformName.pc:
      return enums.PlatformId.pc;
    default:
      return undefined;
  }
}

export function getPagination(req: Request) {
  const page = Math.max(Number(req.query.page) || 1, 1) // Ensure page is at least 1
  const limit = Math.min(Number(req.query.limit) || 10, 30) // Ensure page defaults to 10 and has a max of 30 
  const offset = (page - 1) * limit; // Offset for SQL query, example if page is 2 and limit is 10, offset would be 10
  
  const pagination: Pagination = {
    limit,
    offset
  }

  return pagination;
}