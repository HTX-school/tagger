<script>
    import { socket, player_name } from '$lib/Connection/socketStore'
    import { onMount } from 'svelte'

    let old_name

    onMount(() => {
        $player_name = localStorage.getItem('player.name') || ''
        old_name = $player_name

        $socket.emit('player.name.change', $player_name)
    })

    function changeName() {
        if (player_name < 1 || player_name > 25) return;

        $socket.emit('player.name.change', $player_name)
        localStorage.setItem('player.name', $player_name)
        old_name = $player_name
    }

    function changeNameField(event) {
        if (event.key !== 'Enter' || $player_name.trim() === '') return;
        changeName()
    }
</script>

<div class="name-sel">
    <div class="input">
        <p>Nickname:</p>
        <input type="text" bind:value={$player_name} on:keydown={changeNameField}>
    </div>
    
    {#if old_name != $player_name}
        <p>Unapplied name.</p>
    {:else if $player_name.length < 1}
        <p>Name is too short.</p>
        {:else if $player_name.length > 25}
        <p>Name is too long.</p>
    {:else}
        <br/>
    {/if}
        
    <button on:click={changeName} disabled={$player_name.length < 1 || $player_name.length > 25 || old_name == $player_name}>Apply</button>
</div>

<style>
    .input {
        display: flex;
        flex-wrap: wrap;
    }

    .input input {
        width: 100%;
    }

    .name-sel {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        
        padding: 0;
        margin: 0 0 15px 0;
    }   

    .name-sel p {
        margin: 0;
        padding: 0;
    }
</style>