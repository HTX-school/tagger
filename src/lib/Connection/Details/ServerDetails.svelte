<script>
    import { player_count } from '$lib/Connection/socketStore'
</script>

<div class="server-details-background">
    <div class="server-details">
        <h3>Server details</h3>
        <p>Players online: {$player_count}</p>
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