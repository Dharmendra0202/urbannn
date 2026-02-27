import { resolveAssetUri } from "./image-utils";

export const imageAssets = {
  salonAtHomeWomen: resolveAssetUri(
    require("../assets/images/salon-at-home-women.jpg")
  ),
  mensSalon: resolveAssetUri(require("../assets/images/mens-salon.jpg")),
  fullBodyMassage: resolveAssetUri(
    require("../assets/images/full-body-massage.jpg")
  ),
  acServiceCleaningPng: resolveAssetUri(
    require("../assets/images/ac-service-cleaning.png")
  ),
  acServiceCleaningJpg: resolveAssetUri(
    require("../assets/images/ac-service-cleaning.jpg")
  ),
  refrigeratorRepair: resolveAssetUri(
    require("../assets/images/refrigerator-repair.png")
  ),
  homeService: resolveAssetUri(require("../assets/images/home-service.jpg")),
  laundry: resolveAssetUri(require("../assets/images/Laundry.jpg")),
  carpetCleaning: resolveAssetUri(
    require("../assets/images/carpet-cleaning.jpg")
  ),
  homeDeepCleaning: resolveAssetUri(
    require("../assets/images/home-deeep-cleaning.jpg")
  ),
  kitchenCleaning: resolveAssetUri(
    require("../assets/images/kitchen-cleaning.jpg")
  ),
  bathroomCleaning: resolveAssetUri(
    require("../assets/images/bathroom-cleaning.jpg")
  ),
  carpentryWork: resolveAssetUri(
    require("../assets/images/carpentry-work.jpg")
  ),
  plumbingFix: resolveAssetUri(require("../assets/images/plumbing-fix.jpg")),
  wallPainting: resolveAssetUri(require("../assets/images/wall-painting.jpg")),
  wallDrilling: resolveAssetUri(require("../assets/images/wall-drilling.jpg")),
  doorLockRepair: resolveAssetUri(
    require("../assets/images/door-lock-repair.jpg")
  ),
} as const;
