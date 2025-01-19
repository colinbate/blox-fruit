<script lang="ts">
  import type { FruitData } from "./types";
  import { rarityColor } from "./data";
  let {
    name,
    rarity,
    img,
    percentage,
    type,
  }: FruitData & { percentage: string; type: string } = $props();
  const src = $derived(
    img
      ? `/${type}/${img}`
      : type === "fruit"
        ? `/${type}/${name}Fruit.webp`
        : `/${type}/${name}.webp`
  );
  const color = $derived(rarityColor[rarity]);
</script>

<div
  class=" w-72 divide-y overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow dark:shadow-lg dark:shadow-white/20 border-4 {color}"
>
  <div
    class="px-4 py-5 sm:p-6 flex flex-col items-center justify-center box-content size-[200px] mx-auto"
  >
    <img {src} alt={`${name} fruit icon`} />
  </div>
  <div
    class="px-4 py-4 sm:px-6 flex flex-col gap-2 items-center justify-center"
  >
    <div class="text-xl font-bold">{name}</div>
    <div class="text-gray-600 dark:text-gray-400">({rarity})</div>
    <div class="text-gray-600 dark:text-gray-400 font-bold">{percentage}</div>
  </div>
</div>
