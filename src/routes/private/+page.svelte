<script lang="ts">
    let n: bigint = 15n
    let d: bigint = 13n

    let ciphertext: bigint = 1n
    $: plaintext = (ciphertext ** d) % n
</script>

<div class="flex-1 flex flex-col items-center justify-center">
    <h1 class="text-3xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">RSA Private Key Demo</h1>

    <div class="w-80 flex-col gap-2">
        <label for="n" id="n-label">Value of n:</label>
        <input type="number" id="n" class="w-full px-3 py-2 mb-4" bind:value={n} placeholder="Enter n" />

        <label for="d" id="d-label">Value of d:</label>
        <input type="number" id="d" class="w-full px-3 py-2 mb-4" bind:value={d} placeholder="Enter d" />

        <label for="ciphertext" id="ciphertext-label">Plaintext:</label>
        <input type="number" id="ciphertext" class="w-full px-3 py-2 mb-4" bind:value={ciphertext} placeholder="Enter ciphertext" />

        <label for="plaintext" id="plaintext-label">Ciphertext:</label>
        <input type="number" id="plaintext" class="w-full px-3 py-2 mb-4 bg-gray-200 cursor-not-allowed" readonly value={plaintext} />
    </div>
</div>
