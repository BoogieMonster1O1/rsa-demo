<script lang="ts">
    import {isPrime, modInverse} from "$lib";

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
    keySizes["Atto"] = size(101n, 1000n);
    keySizes["Femto"] = size(1001n, 10000n);
    keySizes["Pico"] = size(10001n, 100000n);
    keySizes["Nano"] = size(100001n, 1000000n);
    keySizes["Micro"] = size(1000000n, 10000000n);

    let selectedKeySize = "Zepto";
    $: [min, max] = [keySizes[selectedKeySize].min, keySizes[selectedKeySize].max];

    let p: number = 3;
    $: pPrime = isPrime(p);
    let q: number = 5;
    $: qPrime = isPrime(q);
    $: n = p * q;
    let e: number = 7;
    $: phi = (p - 1) * (q - 1);
    $: d = modInverse(e, phi);
    let cipherText: number = 0;
    let plainText: number = 0;
</script>

<div class="flex flex-col min-h-screen items-center justify-center">
    <h1 class="text-3xl mb-4 bg-gradient-to-r from-purple-500 to-sky-600 text-transparent bg-clip-text">RSA Key Pair Demo</h1>

    <div class="w-80 flex flex-col gap-2">
        <label for="size" id="size-label">Key size</label>
        <select id="size" bind:value={selectedKeySize} class="p-2 mb-4">
            {#each Object.keys(keySizes) as key}
                <option value={key}>{key}</option>
            {/each}
        </select>
    </div>

    <button>

    </button>
</div>
