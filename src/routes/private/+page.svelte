<script lang="ts">
  import {bigIntToString, convertStringToBigInt, stringToBigInt} from "$lib";
  import MathJax from "$lib/components/MathJax.svelte";

  let nText: string = "115"
  let dText: string = "59"
  let ciphertextText: string = "113"
  let decodeText: boolean = false
  $: n = convertStringToBigInt(nText);
  $: d = convertStringToBigInt(dText);
  $: ciphertext = convertStringToBigInt(ciphertextText);
  $: plaintext = modExp(ciphertext, d, n);
  $: plaintextText = bigIntToStringOrConvert(plaintext)
  $: plaintextAct = decodeText ? bigIntToStringOrConvert(plaintext) : plaintext.toString()
  $: plainError = plaintext === -1n

  function calculatePlaintext(ciphertext: bigint, d: bigint, n: bigint): bigint {
    try {
      return (ciphertext ** d) % n;
    } catch (e) {
      return -1n;
    }
  }

  function modExp(C: bigint, d: bigint, n: bigint): bigint {
    if (n === 1n) return 0n; // If modulus is 1, result is always 0
    let result = 1n;
    C = C % n; // Reduce base if it's larger than modulus
    while (d > 0n) {
      // If exponent is odd, multiply base with result
      if (d % 2n == 1n) result = (result * C) % n;
      // Exponent must be even now
      d = d >> 1n; // Divide exponent by 2
      C = (C * C) % n; // Change base to square of base
    }
    return result;
  }

  function bigIntToStringOrConvert(bigInt: bigint) {
    const str = bigIntToString(bigInt);

    if (/^[0-9a-zA-Z]+$/.test(str)) {
      return str.split('').reverse().join('');
    } else {
      return bigInt.toString();
    }
  }

  let math = "$$P \\equiv C^d \\pmod{n}$$"
</script>

<div class="flex-1 flex flex-col items-center justify-center">
    <h1 class="text-3xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">RSA Decrypt / Sign</h1>

    <div class="w-80 flex flex-col gap-4 text-xl">
      
      <div class="flex flex-col">
        <label for="n" id="n-label">n = Modulus</label>
        <input type="text" id="n" class="w-full px-3 py-2" bind:value={nText} placeholder="Enter n" />
      </div>

      <div class="flex flex-col">
        <label for="e" id="e-label">d = Exponent</label>
        <input type="text" id="e" class="w-full px-3 py-2" bind:value={dText} placeholder="Enter d" />
      </div>

      <div class="flex flex-col">
        <label for="ciphertext" id="ciphertext-label">C = Ciphertext</label>
        <input type="text" id="ciphertext" class="w-full px-3 py-2" bind:value={ciphertextText} placeholder="Enter ciphertext" />
      </div>

      <div class="flex flex-col">
        <label for="plaintext" id="plaintext-label">P = Plaintext</label>
        <input type="text" id="plaintext" class="w-full px-3 py-2" readonly bind:value={plaintextAct} />
      </div>

      <div class="flex flex-row justify-begin items-baseline gap-2">
        <input type="checkbox" bind:checked={decodeText} /> Decode to Text
      </div>
    </div>
    {#if plainError}
        <p class="text-red-500">Overflow Error! Use smaller numbers</p>
    {:else}
        <p class="h-[1.4em]"></p>
    {/if}

    <MathJax {math} />
</div>
