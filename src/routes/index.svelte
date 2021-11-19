<script>
    import { onMount } from 'svelte'
    import * as io from "socket.io-client"
    
    const address = import.meta.env.VITE_HOST || 'https://catcher-server.herokuapp.com'
    
    let settings = undefined
    
    let old_name
    let player_name = ''
    
    let player_count = 0
    let player_distances = {}
    let received_messages = []

    let id = undefined

    var socket = undefined

    onMount(() => {
        player_name = localStorage.getItem('player.name') || ''
        old_name = player_name

        let posErr = false
        navigator.geolocation.watchPosition(SendPosition, (err) => posErr = true, { enableHighAccuracy: false })
        
        if (posErr) return
        
        socket = io.connect(address)
        
        socket.on('join', identity => {
            id = identity.player_id
            settings = identity.settings
            if (player_name) socket.emit('player.name.change', player_name)
        })
        
        socket.on('players.distance', players_dists => {
            player_distances = players_dists
        })

        socket.on('players.count', count => {
            player_count = count
        })

        socket.on('chat.message.received', messageObject => {
            received_messages = [...received_messages, messageObject]
        })

        function SendPosition(data) {
            let { coords } = data
            let json = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                altidude: coords.altidude,

                accuracy: coords.accuracy,
                altitudeAccuracy: coords.altitudeAccuracy,

                heading: coords.heading,
                speed: coords.speed
            }
            
            socket.emit('position', json)
        }
    })

    function changeName() {
        if (player_name < 1 || player_name > 25) return;

        socket.emit('player.name.change', player_name)
        localStorage.setItem('player.name', player_name)
        old_name = player_name
    }

</script>

<div class="main">
    <h1>Welcome to Tagger</h1>
    <div class="details">
        <div class="name-sel">
            <p>
                Name:
                <input type="text" bind:value={player_name}>
                <button on:click={changeName} disabled={player_name.length < 1 || player_name.length > 25}>Apply</button>
            </p>
            {#if old_name != player_name}
                <p>Unapplied name. Apply the name to make it visible to others.</p>
            {:else if player_name.length < 1}
                <p>Name is too short.</p>
            {:else if player_name.length > 25}
                <p>Name is too long.</p>
            {:else}
                <br/>
            {/if}
        </div>
    </div>
    
    {#if socket && socket.connected}
        <div class="server-details">
            <h3>Server details</h3>
            <p>Your identity: {id ?? ''}</p>
            <p>Players online: {player_count}</p>
        </div>


        <h4>Distance to all players within {settings.max_distance} meters of you:</h4>
        <div class="player-dists">
            {#each Object.entries(player_distances) as [name, value]}
                <p>{name}: {value}m</p>
            {/each}
        </div>
    {:else}
        <p>Connecting to {address}</p>
    {/if}
</div>

<style>
    .main {
        margin: 0;
        color: white;
        font-family: 'Courier New', Courier, monospace;
    }

    .name-sel {
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
    }   

    .name-sel p {
        margin: 0;
        padding: 0;
    }

    .server-details {
        padding: 1px 0 1px 20px;
        border-radius: 5px;
        background-color: #3f4646;
        width: 100%;
    }
</style>