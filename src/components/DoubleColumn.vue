<template>
    <b-row>
        <b-col v-for="index in 2" v-bind:key="index" col-xs="12" md="6">
            <div class="custom-card" v-bind:class="className()" :style="{'background-color': customStyle.color.light}">
                <h2 :style="{'color': customStyle.color.primary, 'font-size': customStyle.fontSize[2]}">Heading of the custom card!</h2>
                <p :style="{'color': customStyle.color.primary, 'font-size': customStyle.fontSize[3]}">Hey I'm a double card!</p>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: "DoubleColumn",
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
        }, props: {
            customStyle: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>