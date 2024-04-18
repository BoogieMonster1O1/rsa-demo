<script lang="ts">
    import {isPrime, modInverse} from "$lib";

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
    <h1 class="text-3xl text-semibold">RSA Demo</h1>

    <div class="flex-1">

    </div>
</div>
