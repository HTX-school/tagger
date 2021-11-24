<script>
    import '../app.css'
    import NavigationBarWrapper from '$lib/Navigation/NavigationBarWrapper.svelte'
</script>

<head>
    <title>Tagger</title>
</head>

<main>
    <div class="centered">
        <slot />
    </div>
    <NavigationBarWrapper/>
</main>

<style>
    .centered {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>