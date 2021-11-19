<script>
    import { onMount } from 'svelte'
    import * as io from "socket.io-client"

    import TitleLogo from '$lib/TitleLogo.svelte'
    import NavigationBar from '$lib/NavigationBar.svelte'

    import ChatField from '../lib/ChatField.svelte'
    
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
    <div class="resize-container">
        <TitleLogo/>
    
        <div class="front">
            <img id="earth" src="/Earth.png" alt="earth"/>
        </div>  
    </div>
    <div class="navbar">
        <NavigationBar/>
    </div>
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        font-family: 'Courier New', Courier, monospace;
        color: white;
    }

    .navbar {
        overflow: hidden;
        position: fixed;
        width: 100%;
        bottom: 0;
    }

    .resize-container {
        max-width: 400px;
    }

    #earth {
        max-width: 100%;

        -webkit-mask-image: -webkit-linear-gradient(top, rgb(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 80%);
        mask-image: linear-gradient(90deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 70%);
    }
</style>