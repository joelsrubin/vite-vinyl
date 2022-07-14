export const omittedBasicInformation = [
  "cover_image",
  "id",
  "master_id",
  "master_url",
  "resource_url",
  "thumb",
];

export function getMobileStyle(isMobile: boolean) {
  if (isMobile) {
    return "w-1/2";
  } else {
    return "w-1/4";
  }
}
