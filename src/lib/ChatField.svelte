<script>
    import { afterUpdate, beforeUpdate } from "svelte";

    export let messages = []
    export let socket

    let input = ''

    let div
    let autoscroll 

    function onChatMessageInput(event) {
        if (event.key !== 'Enter' || input.trim() === '') return;
        socket.emit('chat.message.send', input)
        input = ''
    }

    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
    })

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    })
</script>

<div class="chat-root">
    <div class="message-container" bind:this={div}>
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
        display: flex;
        flex-direction: column;

        width: 100%;
        min-height: 30px;
        height: 500px;
        background-color:whitesmoke;

        overflow-y: auto;
    }

    .message {
        height: 35px;
    }

    .input {
        width: 100%;
        height: 35px;
    }
</style>