import * as io from "socket.io-client"
import { readable, writable } from "svelte/store";

export let player_count = writable(0)
export let player_distances = writable({})
export let received_messages = writable([])
export let settings = writable({})
export let id = writable(0)
export let player_name = writable('')

export const socketStore = readable({}, set => {
    const address = import.meta.env.VITE_HOST || 'https://catcher-server.herokuapp.com'
    const socket = io.connect(address)

    socket.on('join', identity => {
        id.set(identity.player_id)
        settings.set(identity.settings)
    })
    
    socket.on('players.distance', players_dists => {
        player_distances.set(players_dists)
    })

    socket.on('players.count', count => {
        player_count.set(count)
    })

    socket.on('chat.message.received', messageObject => {
        received_messages.set([...received_messages, messageObject])
    })

    set(socket)

    return () => { socket.close() };
});