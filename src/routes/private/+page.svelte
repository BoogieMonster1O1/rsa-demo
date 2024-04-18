<script lang="ts">
    import {convertStringToBigInt} from "$lib";

    let nText: string = "15"
    let dText: string = "13"
    let ciphertextText: string = "18"
    $: n = convertStringToBigInt(nText);
    $: d = convertStringToBigInt(dText);
    $: ciphertext = convertStringToBigInt(ciphertextText);
    $: plaintext = calculatePlaintext(ciphertext, d, n);
    $: plaintextText = plaintext.toString()
    $: plainError = plaintext === -1n

    function calculatePlaintext(ciphertext: bigint, d: bigint, n: bigint): bigint {
        try {
            return (ciphertext ** d) % n;
        } catch (e) {
            return -1n;
        }
    }
</script>

<div class="flex-1 flex flex-col items-center justify-center">
    <h1 class="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">RSA Private Key Demo</h1>

    <div class="w-80 flex-col gap-2">
        <label for="n" id="n-label">Value of n:</label>
        <input type="text" id="n" class="w-full px-3 py-2 mb-4" bind:value={nText} placeholder="Enter n" />

        <label for="e" id="e-label">Value of d:</label>
        <input type="text" id="e" class="w-full px-3 py-2 mb-4" bind:value={dText} placeholder="Enter d" />

        <label for="ciphertext" id="ciphertext-label">Plaintext:</label>
        <input type="text" id="ciphertext" class="w-full px-3 py-2 mb-4" bind:value={ciphertextText} placeholder="Enter ciphertext" />

        <label for="plaintext" id="plaintext-label">Ciphertext:</label>
        <input type="text" id="plaintext" class="w-full px-3 py-2 mb-4" readonly bind:value={plaintextText} />
    </div>
    {#if plainError}
        <p class="text-red-500">Overflow Error! Use smaller numbers</p>
    {:else}
        <p class="h-[1.4em]"></p>
    {/if}
</div>
