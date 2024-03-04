import type { OnlyNumber } from "./types";

let values: Uint32Array | undefined;
const MAX = 32;
let count = MAX;
const LARGEST = 4294967296;

export function getRandomInt(upper: number) {
  if (values == null || count === 0) {
    values = new Uint32Array(MAX);
    crypto.getRandomValues(values);
    count = MAX;
  }
  count -= 1;
  const rnd = values[count] / LARGEST;
  return Math.floor(upper * rnd);
}

export default function weightedRandom<T, K extends keyof OnlyNumber<T>>(
  items: T[],
  weightProp: K
) {
  if (!items.length) {
    throw new Error("Items must not be empty");
  }
  const cumulativeWeights: number[] = [];
  for (let i = 0; i < items.length; i += 1) {
    cumulativeWeights[i] =
      (items[i][weightProp] as number) + (cumulativeWeights[i - 1] || 0);
  }
  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = getRandomInt(maxCumulativeWeight);
  for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return {
        item: items[itemIndex],
        index: itemIndex,
      };
    }
  }
}
