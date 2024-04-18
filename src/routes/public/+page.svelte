<script lang="ts">
    import {convertStringToBigInt} from "$lib";

    let nText: string = "15"
    let eText: string = "7"
    let plaintextText: string = "18"
    $: n = convertStringToBigInt(nText);
    $: e = convertStringToBigInt(eText);
    $: plaintext = convertStringToBigInt(plaintextText);
    $: ciphertext = calculateCiphertext(plaintext, e, n);
    $: ciphertextText = ciphertext.toString()
    $: cipherError = ciphertext === -1n

    function calculateCiphertext(plaintext: bigint, e: bigint, n: bigint): bigint {
        try {
            return (plaintext ** e) % n;
        } catch (e) {
            return -1n;
        }
    }
</script>

<div class="flex-1 flex flex-col items-center justify-center">
    <h1 class="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">RSA Public Key Demo</h1>

    <div class="w-80 flex-col gap-2">
        <label for="n" id="n-label">Value of n:</label>
        <input type="text" id="n" class="w-full px-3 py-2 mb-4" bind:value={nText} placeholder="Enter n" />

        <label for="e" id="e-label">Value of e:</label>
        <input type="text" id="e" class="w-full px-3 py-2 mb-4" bind:value={eText} placeholder="Enter e" />

        <label for="plaintext" id="plaintext-label">Plaintext:</label>
        <input type="text" id="plaintext" class="w-full px-3 py-2 mb-4" bind:value={plaintextText} placeholder="Enter plaintext" />

        <label for="ciphertext" id="ciphertext-label">Ciphertext:</label>
        <input type="text" id="ciphertext" class="w-full px-3 py-2 mb-4" readonly bind:value={ciphertextText} />
    </div>
    {#if cipherError}
        <p class="text-red-500">Overflow Error! Use smaller numbers</p>
    {:else}
        <p class="h-[1.4em]"></p>
    {/if}
</div>
