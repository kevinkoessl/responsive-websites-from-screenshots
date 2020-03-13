<template>
    <div id="app">
        <site-generator/>
    </div>
</template>

<script>
    import SiteGenerator from './gloal/SiteGenerator'

    export default {
        name: 'app',
        components: {
            SiteGenerator
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
