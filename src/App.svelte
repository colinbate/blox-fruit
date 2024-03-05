<script lang="ts">
	import Fruit from './lib/Fruit.svelte';
	import ModeSwitcher from './lib/ModeSwitcher.svelte';
	import { blox } from './lib/data';
  import weightedRandom from './lib/random';
  import type { FruitData } from './lib/types';

	let randomFruit: FruitData | undefined = $state(undefined);
	let waiting = $state(false);
 let count = $state(0);

	async function wait(ms: number) {
		return new Promise(r => setTimeout(r, ms));
	}

	async function pickFruit() {
		randomFruit = undefined;
		waiting = true;
		await wait(800);
		count += 1;
		const fruit = weightedRandom(blox, 'chance');
		if (fruit && fruit.item) {
			randomFruit = fruit.item;
		}
	}
</script>

<ModeSwitcher />
<main class="p-4 mx-auto text-center max-w-xl">
	<h1 class="uppercase text-6xl leading-normal font-thin text-svelte">Blox Fruit Picker!</h1>
	<div class="flex items-center justify-center flex-col gap-6 mt-8">
		<button onclick={pickFruit} type="button" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Random Fruit</button>
		{#if randomFruit}
			<Fruit {...randomFruit}/>
   <div class="text-xl font-bold text-gray-500">{count}</div>
		{:else if waiting}
			<div class="flex items-center justify-center p-8">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" class="animate-spin size-12"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
			</div>
		{/if}
	</div>
</main>
