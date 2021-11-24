<script>
    import { createEventDispatcher } from 'svelte'
    export let value = ''
    export let clearOnSend = true

    const dispatch = createEventDispatcher()

    function sendMessage(event) {
        if (event.key !== 'Enter' || value.trim() === '') return;
        dispatch('message', { value })
        if (clearOnSend) value = ''
    }
</script>

<input bind:value={value} type="text" on:keydown={sendMessage}>

<style>
    input {
        width: 100%;
        height: 30px;

        box-sizing: border-box;
    }
</style>