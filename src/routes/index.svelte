<script>
    import { onMount } from 'svelte'
    import * as io from "socket.io-client"

    import ChatField from '../lib/ChatField.svelte'
    import LoadingScreen from '$lib/LoadingScreen.svelte'
    
    const address = import.meta.env.VITE_HOST || 'https://catcher-nodejs.herokuapp.com'
    
    let settings = undefined
    
    let player_name = ''
    
    let player_count = 0
    let player_distances = {}
    let received_messages = []

    let id = undefined

    let socket = undefined
    onMount(() => {        
        let posErr = false
        navigator.geolocation.watchPosition(SendPosition, (err) => posErr = true, { enableHighAccuracy: false })

        if (posErr) return

        socket = io.connect(address)

        socket.on('join', identity => {
            console.log('Your identity is', identity)
            id = identity.player_id
            settings = identity.settings
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

</script>

<div class="main">
    <h1>Welcome to Tagger</h1>
    <div class="details">
        <div class="name-sel">
            <p>Name:<input type="text" bind:value={player_name} on:change={() => socket.emit('name_change', player_name)}></p>
        </div>
    </div>
    
    {#if socket && socket.connected}
        <div class="server-details">
            <p>Identity: {id ?? ''}</p>
            <p>Players: {player_count}</p>
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
        font-family: 'Courier New', Courier, monospace;
    }

    .name-sel {
        display: flex;
    }
</style>