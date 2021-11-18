<script>
    export let list = []
</script>

<ul>
    {#each list as obj}
        <li>{obj}</li>
    {/each}
</ul>