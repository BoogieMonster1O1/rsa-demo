<script lang="ts">

 import {generateTwoPrimes, isPrime, modInverse} from "$lib";

 interface KeySize {
     min: bigint;
     max: bigint;
 }

 function size(min: bigint, max: bigint): KeySize {
     return {min, max};
 }

 const keySizes: { [key: string]: KeySize } = {};
 keySizes["Yocto"] = size(1n, 25n);
 keySizes["Zepto"] = size(26n, 100n);
 keySizes["Atto"]  = size(101n, 1000n);
 keySizes["Femto"] = size(1001n, 10000n);
 keySizes["Pico"]  = size(10001n, 100000n);
 keySizes["Nano"]  = size(100001n, 1000000n);
 keySizes["Micro"] = size(1000000n, 10000000n);

 let selectedKeySize = "Zepto";
 $: [min, max] = [keySizes[selectedKeySize].min, keySizes[selectedKeySize].max];
 $: [p, q] = genPrimes(min, max);
 $: n = p * q;
 $: phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);
 $: e = max > 50000 ? 65537n : 3n;
 $: d = modInverse(e, phi);

 function genPrimes(min: bigint, max: bigint) {
     while (true) {
	 let [a, b] = generateTwoPrimes(min, max);
	 d = modInverse(3n, (a - 1n) * (b - 1n));
	 if (d !== null) {
	     return [a, b];
	 }
     }
 }
 
 function reset() {
     [p, q] = genPrimes(min, max);
 }

</script>

<div class="flex flex-col flex-1 items-center justify-center">
  <h1 class="text-3xl mb-4 bg-gradient-to-r from-purple-500 to-sky-600 text-transparent bg-clip-text">Generate Key Pair
  </h1>

  <div class="w-80 lg:text-xl flex flex-col gap-2">
    <label for="size" id="size-label">Key size</label>
    <select id="size" bind:value={selectedKeySize} class="p-2 mb-4">
      {#each Object.keys(keySizes) as key}
        <option value={key}>{key}</option>
      {/each}
    </select>

	  <p>p = {p}</p>
	  <p>q = {q}</p>
	  <p>n = p * q = {n}</p>
	  <p>φ(n) = (p - 1) * (q - 1) = {phi}</p>
	  <p>e = {e}</p>
	  <p>d = modInverse(e, φ(n)) = {d}</p>

	  <p>Public key: (n, e) = ({n}, {e})</p>
	  <p>Private key: (n, d) = ({n}, {d})</p>

	  <button class="p-2 bg-blue-500 text-white rounded" on:click={reset}>Generate new key pair</button>
  </div>
</div>
