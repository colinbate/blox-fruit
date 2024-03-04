<script lang="ts">
  import type { FruitData } from "./types";
  import { rarityColor } from "./data";
  let { name, rarity } = $props<FruitData>();
  const src = $derived(`/fruit/${name}Fruit.png`);
  const color = $derived(rarityColor[rarity]);
</script>
<div class="w-max divide-y divide-gray-200 dark:divide-gray-600 overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow dark:shadow-lg dark:shadow-white/20 border-4 {color}">
  <div class="px-4 py-5 sm:p-6">
    <img {src} alt={`${name} fruit icon`} width="200" height="200">
  </div>
  <div class="px-4 py-4 sm:px-6 flex flex-col gap-2 items-center justify-center">
    <div class="text-xl font-bold">{name}</div>
    <div class="text-gray-600 dark:text-gray-400">({rarity})</div>
  </div>
</div>