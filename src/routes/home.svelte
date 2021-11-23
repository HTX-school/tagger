<script>
    import TitleLogo from '$lib/TitleLogo.svelte'
</script>

<div class="main">
    <div class="resize-container">
        <TitleLogo/>
    
        <div class="front">
            <img id="earth" src="/Earth.png" alt="earth"/>
        </div>  
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

    .resize-container {
        max-width: 400px;
    }

    #earth {
        max-width: 100%;

        -webkit-mask-image: -webkit-linear-gradient(top, rgb(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 80%);
        mask-image: linear-gradient(90deg, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 70%);
    }
</style>