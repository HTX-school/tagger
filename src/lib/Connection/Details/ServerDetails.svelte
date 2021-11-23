<script>
    import { player_count } from '$lib/socketStore'
    export let players = $player_count
</script>

<div class="server-details-background">
    <div class="server-details">
        <h3>Server details</h3>
        <p>Players online: {players}</p>
    </div>
</div>

<style>
    .server-details-background {
        border-radius: 5px;
        background-color: #3f4646;
        width: 100%;
    }

    .server-details {
        padding: 1px 20px 1px 20px;
    }
</style>