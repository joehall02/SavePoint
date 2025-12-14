import { RawExternalGameDetails, ExternalGameDetails, IGDBGame, RawIGDBGame } from "./models/igdbGame.js";

enum ImageSize {
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

enum RegionName {
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

export function mapExternalGameDetails(data: object[]): ExternalGameDetails {
  const raw = data[0] as RawExternalGameDetails;

  return {
    id: raw.id,
    name: raw.name,
    storyline: raw.storyline ?? null,
    summary: raw.summary ?? null,
    platforms: raw.platforms?.map((p) => ({ name: p.name })) ?? null,
    cover: raw.cover ? { url: mapImageIdToUrl(raw.cover.image_id, ImageSize.cover_small) } : null,
    videos: raw.videos?.map((v) => ({ url: mapVideoIdToUrl(v.video_id) })) ?? null,
    genres: raw.genres?.map((g) => ({ name: g.name })) ?? null,
    artworks:
      raw.artworks?.map((a) => ({ url: mapImageIdToUrl(a.image_id, ImageSize.screenshot_big) })) ?? null,
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
    cover: raw.cover ? { url: mapImageIdToUrl(raw.cover.image_id, ImageSize.r_1080p) } : null,
  }));
}

export function mapImageIdToUrl(imageId: string, imageSize: ImageSize): string {
  switch (imageSize) {
    case ImageSize.cover_small:
      break;
    case ImageSize.screenshot_med:
      break;
    case ImageSize.cover_big:
      break;
    case ImageSize.logo_med:
      break;
    case ImageSize.screenshot_big:
      break;
    case ImageSize.thumb:
      break;
    case ImageSize.micro:
      break;
    case ImageSize.r_720p:
      break;
    case ImageSize.r_1080p:
      break;
    default:
      imageSize = ImageSize.thumb;
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
    case RegionName.asia:
      return "Asia";
    case RegionName.europe:
      return "Europe";
    case RegionName.north_america:
      return "North America";
    case RegionName.australia:
      return "Australia";
    case RegionName.brazil:
      return "Brazil";
    case RegionName.china:
      return "China";
    case RegionName.japan:
      return "Japan";
    case RegionName.korea:
      return "Korea";
    case RegionName.new_zealand:
      return "New Zealand";
    case RegionName.worldwide:
      return "Worldwide";
    default:
      return "N/A";
  }
}

export function convertUnixTimestamp(timestamp: string): string {
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
