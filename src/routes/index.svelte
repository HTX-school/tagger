<script>
    import HomePage from '$lib/Pages/HomePage.svelte';
    import ChatPage from '$lib/Pages/ChatPage.svelte';

    import { page } from '$lib/Navigation/pageStore'

    import { socket } from '$lib/Connection/socketStore'

    $: keepingSocketAlive = $socket
</script>

{#if $page === 'home'}
    <HomePage/>
{:else if $page === 'chat'}
    <ChatPage/>
{/if}
