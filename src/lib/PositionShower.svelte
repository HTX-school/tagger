<script>
    import { onMount } from 'svelte'
    import { socket, player_distances, settings } from '$lib/Connection/socketStore'

    onMount(() => {
        let posErr = false
        navigator.geolocation.watchPosition(SendPosition, (err) => posErr = true, { enableHighAccuracy: false })
        
        if (posErr) return

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
            
            $socket.emit('position', json)
        }
    })
</script>

<div class="server-connection">
    {#if $socket && $socket.connected}
        {#if $player_distances.length > 0}
            <h4>Distance to all players within {$settings.max_distance} meters of you:</h4>
            <div class="player-dists">
                {#each $player_distances as player_dist}
                    <p>{player_dist.name}: {player_dist.distance}m</p>
                {/each}
            </div>
        {/if}
    {:else}
        <p>Connecting to server...</p>
    {/if}
</div>