<script>
    import { onMount } from 'svelte'
    import * as io from "socket.io-client"

    import ListObjects from '../lib/ListObjects.svelte'
    
    const address = 'https://catcher-nodejs.herokuapp.com'
    
    let settings = {}

    let player_count = 0

    let near_players_list = []
    let close_players_list = []

    let player_name = ''

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
            settings = identity.server_settings
        })

        socket.on('near_player', near_players => {
            near_players_list = near_players
        })
        
        socket.on('close_player', close_players => {
            close_players_list = close_players
        })

        socket.on('player-count', count => {
            player_count = count
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
    <p>Connecting to {address}</p>
    <div class="name-sel">
        <p>Name: </p>
        <input type="text" bind:value={player_name} on:change={(change) => socket.emit('name_change', player_name)}>
    </div>
    <p>Identity: {id ?? ''}</p>
    <p>Players: {player_count}</p>
        
    {#if near_players_list.length > 0}
        <div class="near">
            <p>There's players within {settings.long_distance} meters to you:</p>
            <ListObjects list={near_players_list}/>
        </div>
    {/if}

    {#if close_players_list.length > 0}
        <div class="close">
            <p>These's players within {settings.short_distance} meters to you:</p>
            <ListObjects list={close_players_list}/>
        </div>
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