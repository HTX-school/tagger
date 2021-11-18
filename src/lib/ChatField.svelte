<script>
    export let messages = []
    let input = ''

    export let socket

    function onChatMessageInput(event) {
        if (event.key !== 'Enter') return;
        socket.emit('chat.message.send', input)
        input = ''
    }
</script>

<div class="chat-root">
    <div class="message-container">
        {#each messages as message}
            <div class="message">
                <p>{message.sender}: {message.message}</p>
            </div>
        {/each}
    </div>
    <input class="input" bind:value={input} type="text" on:keydown={onChatMessageInput}>
</div>


<style>
    .chat-root {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
    }

    .message-container {
        width: 100%;
        height: 500px;
        background-color:whitesmoke;
    }

    .message {
        height: 35px;
    }

    .input {
        width: 100%;
        height: 35px;
    }
</style>