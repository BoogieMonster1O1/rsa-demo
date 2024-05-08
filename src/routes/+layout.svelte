<script>
  import "../app.css";
</script>

<svelte:head>
    <title>RSA Demo</title>
</svelte:head>

<div class="flex flex-col min-h-screen items-center">
    <div class="flex flex-row justify-center gap-8 text-xl p-4">
        <a href="/">Key Pair</a>
        <a href="/public" target="_blank">Encrypt</a>
        <a href="/private" target="_blank">Decrypt</a>
    </div>

    <slot />
</div>
