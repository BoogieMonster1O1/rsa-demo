<script lang="ts">
    let n: number = 15
    let e: number = 7

    let plaintext: number = 1
    $: ciphertext = Math.pow(e, n) % n
</script>

<div class="flex flex-col items-center justify-center">

</div>
