<script>
    import Chat from '$lib/Connection/Chat/Chat.svelte'
    import ServerDetails from '$lib/Connection/Details/ServerDetails.svelte'
    import NameSelection from '$lib/Connection/Chat/NameSelection.svelte';
    import PositionShower from '$lib/PositionShower.svelte'
</script>

<div class="root">
    <div class="container">
        <div class="server-details">
            <ServerDetails/>
        </div>
        <div class="name-sel">
            <NameSelection/>
        </div>
        <div class="chat">
            <Chat/>
        </div>
        <PositionShower/>
    </div>
</div>

<style>
    .root {
        display: flex;
        align-items: center;
        justify-content: center;

        flex-direction: column;

        width: 100%;
    }

    .name-sel {
        width: 100%;
    }

    .container {
        max-width: 1000px;
        min-width: 150px;
        width: 400px;
    }

    .server-details {
        margin-top: 15px;
        margin-bottom: 15px;
    }
</style>