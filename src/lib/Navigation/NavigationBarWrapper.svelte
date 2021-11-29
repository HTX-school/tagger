<script>
    import NavigationBar from "./NavigationBar.svelte";
</script>

<div class="navbar">
    <NavigationBar/>
</div>

<div class="nav-bar-filler"></div>

<style>
    .nav-bar-filler {
        width: 100%;
        height: 92.8px;
    }

    .navbar {
        overflow: hidden;
        position: fixed;
        width: 100%;
        bottom: 0;
    }
</style>