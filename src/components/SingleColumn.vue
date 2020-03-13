<template>
    <b-row>
        <b-col>
            <div class="custom-card" v-bind:class="className()" v-bind:style="randomStyle()">
               Hey I'm a single div
            </div>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: "SingleColumn",
        data() {
            return {
                className() {
                    let randomNumber = Math.floor(Math.floor(Math.random() * 3));
                    return {
                        "bg-red": randomNumber === 0,
                        "bg-green": randomNumber === 1,
                        "bg-blue": randomNumber === 2
                    }
                },
                randomStyle() {
                    return {
                        backgroundColor: '#' + Math.random().toString(16).substr(2, 6),
                        borderRadius: Math.random() * 2 + 'rem',
                        fontSize: Math.floor(Math.random() * 30) + 10 + 'px'
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>