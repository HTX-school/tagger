<script>
    import { beforeUpdate, afterUpdate } from 'svelte'

    export let messages = []

    // Autoscroll with text.
    let div
    let autoscroll
    beforeUpdate(() => {
        autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
    })

    afterUpdate(() => {
        if (autoscroll) div.scrollTo(0, div.scrollHeight);
    })
</script>

<div class="root" bind:this={div}>
    {#each messages as message}
        <div class="message">
            <p>{message.sender}: {message.message}</p>
        </div>
    {/each}
</div>

<style>
    .root {
        display: flex;
        flex-direction: column;

        width: 100%;
        min-height: 30px;
        height: 250px;
        background-color:whitesmoke;

        overflow-y: auto;
        overflow-x: hidden;

        background-color: #333333;

        border-radius: 5px 5px 0 0;
    }

    .message {
        word-break: break-word;
        white-space: normal;

        width: calc(100% - 20px);
    }
</style>