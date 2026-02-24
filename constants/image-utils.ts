import { Image } from "react-native";

export const resolveAssetUri = (assetModule: number) =>
  Image.resolveAssetSource(assetModule)?.uri ?? "";

export const withImage = <T extends { image: string }>(
  image: string,
  items: Array<Omit<T, "image">>
): T[] => items.map((item) => ({ ...item, image } as T));
