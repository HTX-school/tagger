<script>
    import { page } from '$lib/Navigation/pageStore'
</script>

<div class="navbar">
    <button on:click={() => $page = 'chat'}><img class="icon-size" src="/Chat.png" alt="Chat"></button>
    <button on:click={() => $page = 'home'}><img class="icon-size" src="/Globa.png" alt="Globe"></button>
    <!-- <button on:click={() => goto('/game')}><img class="icon-size" src="/Group.png" alt="Group"></button> -->
    <!-- <button on:click={() => goto('/settings')}><img class="icon-size" src="/Settings.svg" alt="Settings"></button> -->
</div>

<style>
    .navbar {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 25px;
        background-color: #333;

        gap: 10px;
        
        padding: 10px 0 10px 0;
    }

    .navbar button {
        display: block;
        float: left;

        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;

        background-color: rgb(41, 41, 41);
        
        border-radius: 25%;
        border: none;

        transition: 0.15s;
    }

    .navbar button:hover {
        background: #8f8f8f;
    }

    .icon-size {
        width: 40px;
        height: 40px;
    }
</style>