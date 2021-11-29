<script>
    import Chat from '$lib/Connection/Chat/Chat.svelte'
    import ServerDetails from '$lib/Connection/Details/ServerDetails.svelte'
    import PositionShower from '$lib/PositionShower.svelte'
</script>

<div class="root">
    <div class="container">
        <div class="server-details">
            <ServerDetails/>
        </div>
        <Chat/>
        <PositionShower/>
    </div>
</div>

<style>
    .root {
        width: 100%;
        max-width: 800px;
    }

    .container {
        padding: 0 20px 0 20px;
    }

    .server-details {
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>