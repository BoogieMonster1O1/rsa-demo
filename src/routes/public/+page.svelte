<script lang="ts">
  import {convertStringToBigInt, stringToBigInt} from "$lib";
  import MathJax from '$lib/components/MathJax.svelte'

  let nText: string = "115"
  let eText: string = "3"
  let plaintextText: string = "7"
  $: n = convertStringToBigInt(nText);
  $: e = convertStringToBigInt(eText);
  $: plaintext = stringToBigIntOrConvert(plaintextText);
  $: ciphertext = modExp(plaintext, e, n);
  $: ciphertextText = ciphertext.toString()
  $: cipherError = ciphertext === -1n

  function calculateCiphertext(plaintext: bigint, e: bigint, n: bigint): bigint {
    try {
      return (plaintext ** e) % n;
    } catch (e) {
      return -1n;
    }
  }

  function modExp(P: bigint, e: bigint, n: bigint): bigint {
    if (n === 1n) return 0n; // If modulus is 1, result is always 0
    let result = 1n;
    P = P % n; // Reduce base if it's larger than modulus
    while (e > 0n) {
      // If exponent is odd, multiply base with result
      if (e % 2n == 1n) result = (result * P) % n;
      // Exponent must be even now
      e = e >> 1n; // Divide exponent by 2
      P = (P * P) % n; // Change base to square of base
    }
    return result;
  }

  function stringToBigIntOrConvert(str: string) {
    if (!str || str == "") return 0n;
    if (/^\d+$/.test(str)) {
      return convertStringToBigInt(str);
    } else {
      return stringToBigInt(str);
    }
  }
  
  let math = "$$C \\equiv P^e \\pmod{n}$$"
</script>

<div class="flex-1 flex flex-col items-center justify-center">
  <h1 class="text-3xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">RSA Encrypt / Verify</h1>

  <div class="w-80 flex flex-col gap-4 text-xl">
    <div class="flex flex-col">
      <label for="n" id="n-label">n = Modulus</label>
      <input type="text" id="n" class="w-full px-3 py-2" bind:value={nText} placeholder="Enter n" />
    </div>

    <div class="flex flex-col">
      <label for="e" id="e-label">e = Exponent</label>
      <input type="text" id="e" class="w-full px-3 py-2" bind:value={eText} placeholder="Enter e" />
    </div>

    <div class="flex flex-col">
      <label for="plaintext" id="plaintext-label">P = Plaintext</label>
      <input type="text" id="plaintext" class="w-full px-3 py-2" bind:value={plaintextText} placeholder="Enter plaintext" />
      {#if plaintext.toString() != plaintextText && plaintextText }
        <p>Actual: {plaintext.toString()}</p>
      {/if}
    </div>

    <div class="flex flex-col">
      <label for="ciphertext" id="ciphertext-label">C = Ciphertext</label>
      <input type="text" id="ciphertext" class="w-full px-3 py-2 mb-4" readonly bind:value={ciphertextText} />
    </div>
  </div>
  {#if cipherError}
    <p class="text-red-500">Overflow Error! Use smaller numbers</p>
  {:else}
    <p class="h-[1.4em]"></p>
  {/if}

  <MathJax {math}></MathJax>
</div>
