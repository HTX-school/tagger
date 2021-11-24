<script>
    import { socket, received_messages } from "$lib/Connection/socketStore";

    import InputField from "$lib/Connection/Chat/InputField.svelte";
    import MessageField from "./MessageField.svelte";

    function sendMessage(event) {
        $socket.emit('chat.message.send', event.detail.value)
    }
    
</script>

<div class="chat">
    <MessageField bind:messages={$received_messages}/>
    <InputField on:message={sendMessage}/>
</div>

<style>
    .chat {
        width: 100%;
    }
</style>