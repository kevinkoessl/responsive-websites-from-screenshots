<template>
    <section>
        <b-container v-for="index in 1" v-bind:key="index" style="margin-bottom: 2rem;" :fluid="true">
            <random-columns :parentIndex="index - 1"/>
        </b-container>
    </section>
</template>

<script>
    import RandomColumns from "@/components/RandomColumns";

    export default {
        name: 'SiteGenerator',
        components: {
            RandomColumns
        }
    }
</script>


<style lang="scss">
    .card {
        max-height: 500px;
        overflow: hidden;

        .card-footer {
            max-height: 100px;
            overflow: hidden;
        }
    }
</style>
