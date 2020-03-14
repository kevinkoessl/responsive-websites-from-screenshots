<template>
    <section>
        <b-container v-for="index in 3" v-bind:key="index" style="margin-bottom: 2rem">
            <component :is="component()"/>
        </b-container>
    </section>
</template>

<script>
    import RandomColumns from "@/components/RandomColumns";

    export default {
        name: 'SiteGenerator',
        data() {
            return {
                componentNames: [
                    'random-columns'
                ]
            }
        },
        computed: {
            colorScheme() {
                /** This function returns a randomly generated color scheme which somewhat models what an actual designer might do */
                let primaryHue = Math.trunc(Math.random() * 360);
                let secondaryHue = 0;
                do {
                    secondaryHue = Math.trunc(Math.random() * 360);
                } while (Math.abs(primaryHue - secondaryHue) < 50);

                return {
                    primary: this.randomColor(100, 50, primaryHue),
                    secondary: this.randomColor(100, 50, secondaryHue),
                    light: this.randomColor(0, Math.trunc(Math.random() * 25 + 75)),
                    dark: this.randomColor(0, Math.trunc(Math.random() * 25)),
                    neutral: this.randomColor(10, 50)
                }
            }, style() {
                return {
                    color: this.colorScheme,
                    fontSize: {
                        1: 3 + (Math.random() - 0.5) + 'rem',
                        2: 2.5 + (Math.random() - 0.5) * 0.5 + 'rem',
                        3: 2 + (Math.random() - 0.5) * 0.25 + 'rem',
                        4: 1.5 + (Math.random() - 0.5) * 0.125 + 'rem',
                        5: 1.25 + (Math.random() - 0.5) * 0.0625 + 'rem',
                        6: 0.75 + (Math.random() - 0.5) * 0.0625 + 'rem',
                    },
                    borderRadius: Math.random() * 2 + 'rem',
                }
            }
        },
        methods: {
            randomColor(saturation, lightness, hue = null) {
                hue = hue ? hue : Math.trunc(Math.random() * 360);

                return (`hsla(${hue},${saturation}%,${lightness}%,1)`)
            },
            component() {
                return 'random-columns';
                //return this.componentNames[Math.floor(Math.random() * this.componentNames.length)];
            }
        },
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

    .custom-card {
        min-height: 100px;
        border-radius: .5rem;
        overflow: hidden;
        padding: .5rem;
        color: #ffffff;
        margin: .5rem 0;
        text-align: left;

        &.card--outline {
            margin: 0;
            max-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            border: 1px solid white;
            padding: 0.3rem;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 2rem;
        }
    }

    .bg-red {
        background-color: #d69286;
    }

    .bg-grey {
        background-color: #373737;
    }

    .bg-green {
        background-color: #73c687;
    }

    .bg-blue {
        background-color: #9986d6;
    }

    .palette-color {
        height: 100px;
        width: 100px;
        border: 1px solid grey;
        margin: 5px
    }
</style>
