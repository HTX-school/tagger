<script>
    import Chat from '$lib/Connection/Chat/Chat.svelte'
    import ServerDetails from '$lib/Connection/Details/ServerDetails.svelte'
</script>

<div class="root">
    <div class="main">
        <div class="server-details">
            <ServerDetails/>
        </div>
        <div class="chat">
            <Chat/>
        </div>
    </div>
</div>

<style>
    .root {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .main {
        display: flex;
        align-items: center;
        justify-content: center;

        flex-direction: column;

        width: 600px;
    }

    .server-details {
        width: 500px;
        margin-bottom: 15px;
    }

    .chat {
        width: 500px;
    }
</style>