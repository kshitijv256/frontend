import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageRatio = (media?: string) => {
  if (!media) return;
  const image = new Image();
  image.src = media;
  const ratio = image.width / image.height;

  if (Math.abs(ratio - 16 / 9) <= 0.1) {
    return 16 / 9;
  } else if (Math.abs(ratio - 1.91 / 1) <= 0.1) {
    return 1.91 / 1;
  } else if (Math.abs(ratio - 1 / 1) <= 0.1) {
    return 1 / 1;
  } else if (Math.abs(ratio - 9 / 16) <= 0.1) {
    return 9 / 16;
  } else {
    return 3 / 2; // default ratio
  }
};
