<script>
    import '../app.css'
    import NavigationBarWrapper from '$lib/NavigationBarWrapper.svelte'
</script>

<head>
    <title>Tagger</title>
</head>

<main>
    <slot />
    <NavigationBarWrapper/>
</main>