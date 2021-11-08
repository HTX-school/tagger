<script>
    import { onMount } from 'svelte'
    import * as io from "socket.io-client"
    
    onMount(() => {
        let conStr = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 'localhost' : '192.168.68.120'
        const socket = io.connect(`ws://${conStr}:5000`, { secure: true })

        let options = {
            enableHighAccuracy: true
        }

        navigator.geolocation.watchPosition(SendPosition, error, options)
    
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

        function error(err) {

        }

    })

</script>

<h1>Welcome to Tagger</h1>
