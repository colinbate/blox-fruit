export type OnlyNumber<T> = {
  [K in keyof T as T[K] extends number ? K : never]: T[K];
};

export interface FruitData {
  name: string;
  rarity: "common" | "uncommon" | "rare" | "legendary" | "mythical";
  chance: number;
}
