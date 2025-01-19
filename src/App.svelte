<script lang="ts">
  import { tick } from "svelte";
  import Fruit from "./lib/Fruit.svelte";
  import ModeSwitcher from "./lib/ModeSwitcher.svelte";
  import { blox, battleground } from "./lib/data";
  import weightedRandom from "./lib/random";
  import type { FruitData } from "./lib/types";

  const percentageFmt = new Intl.NumberFormat("en", {
    style: "percent",
    minimumFractionDigits: 2,
  });

  const dataSets = {
    fruit: blox,
    battleground,
  } as const;

  let chosenSet: keyof typeof dataSets | undefined = $state();
  let randomFruit: FruitData | undefined = $state(undefined);
  let percentage: string | undefined = $state();
  let btn: HTMLButtonElement | undefined;
  let waiting = $state(false);
  let count = $state(0);
  let disabled = $state(false);
  let mythicalTracker: Record<string, number> = $state({});
  let data = $derived(chosenSet && dataSets[chosenSet]);

  $effect(() => btn?.focus());

  async function wait(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async function pickFruit() {
    if (waiting || !data) return;
    randomFruit = undefined;
    waiting = true;
    await wait(210);
    count += 1;
    const fruit = weightedRandom(data, "chance");
    if (fruit && fruit.item) {
      randomFruit = fruit.item;
      percentage = percentageFmt.format(fruit.item.chance / fruit.maxWeight);
      waiting = false;
      if (fruit.item.rarity === "mythical") {
        disabled = true;
        mythicalTracker[fruit.item.name] =
          (mythicalTracker[fruit.item.name] ?? 0) + 1;
        await wait(2000);
        disabled = false;
        await tick();
        btn?.focus();
      }
    }
  }
</script>

<ModeSwitcher />
<main class="p-4 mx-auto text-center max-w-2xl">
  <h1
    class="  select-none uppercase text-3xl sm:text-6xl leading-tight sm:leading-normal font-thin text-svelte"
  >
    Fruit Picker!
  </h1>
  <div class="flex items-center justify-center flex-col gap-6 mt-8">
    {#if !data}
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onclick={() => (chosenSet = "fruit")}
          type="button"
          class={[
            "rounded-md bg-indigo-600 px-3.5 py-2.5 w-44 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-40",
          ]}>Blox Fruit</button
        >
        <button
          onclick={() => (chosenSet = "battleground")}
          type="button"
          class={[
            "rounded-md bg-indigo-600 px-3.5 py-2.5 w-44 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-40",
          ]}>Fruit Battlegrounds</button
        >
      </div>
    {/if}
    <button
      bind:this={btn}
      onclick={pickFruit}
      {disabled}
      type="button"
      class={[
        !data && "hidden",
        "rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-40",
      ]}>Random Fruit</button
    >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div class="min-h-96">
        {#if randomFruit && percentage && chosenSet}
          <Fruit {...randomFruit} {percentage} type={chosenSet} />
        {:else if waiting}
          <div class="flex items-center justify-center pt-24 w-72">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
              class="animate-spin size-12"
              ><path
                d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
              /></svg
            >
          </div>
        {/if}
      </div>
      {#if randomFruit || waiting}
        <div class="flex flex-col gap-4">
          <div class="text-xl font-bold text-gray-500">Total: {count}</div>
          <div
            class="border border-gray-600 dark:border-gray-400 rounded-md p-4"
          >
            {#each Object.entries(mythicalTracker) as [name, count]}
              <div class="flex items-center gap-4 justify-between">
                <span>{name}</span><span>{count}</span>
              </div>
            {:else}
              <p class="text-xl font-bold text-gray-500">
                No mythical fruit found.
              </p>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>
