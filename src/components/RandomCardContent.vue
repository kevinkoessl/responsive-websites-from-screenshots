<template>
    <b-card :title="hasHeader ? false : randomText('word')"
            :header="hasHeader ? false : randomText('sentence', 3)"
            :footer="hasFooter ? false : randomText('sentence')"
            :bg-variant="cardVariant.bgVariant"
            :text-variant="cardVariant.textVariant"
            :sub-title="hasSubtitle ? randomText('sentence', Math.floor(Math.random() * 3) + 1) : ''">
        <b-card-text>
            {{ randomText('paragraph')}}
        </b-card-text>
        <template v-if="buttonLinksOrNothing === 0">
            <b-button :variant="randomVariant(true)">
                {{ randomText('word')}}
            </b-button>
        </template>
        <template v-if="buttonLinksOrNothing === 1">
            <b-link v-for="index in Math.ceil(Math.random() * 2)" :key="index">
                {{ randomText('word')}}
            </b-link>
        </template>
    </b-card>
</template>

<script>
    import {utilities} from "@/utilities/utilities";

    export default {
        name: "RandomCardContent",
        data() {
            return {
                hasHeader: Math.round(utilities.boxMuellerTransform(0, 1, 0.7)),
                hasSubtitle: Math.round(utilities.boxMuellerTransform(0, 1, 1)),
                hasFooter: Math.round(utilities.boxMuellerTransform(0, 1, 0.7)),
                hasText: Math.round(utilities.boxMuellerTransform(0, 1, 1)),
                buttonLinksOrNothing: (Math.floor(Math.random() * 3)),
            }
        }, computed: {
            cardVariant() {
                let bgVariant = false;
                let textVariant = false;
                if (Math.floor(Math.random() * 50) === 0) {
                    bgVariant = this.randomVariant(false);
                }
                if (bgVariant && bgVariant !== 'light') {
                    textVariant = 'white'
                }

                return {
                    bgVariant,
                    textVariant
                }
            },
        },
        methods: {
            randomText(type = 'sentence', length = null) {
                return utilities.generateRandomString({type: type, length: length});
            },
            randomVariant(chanceForOutline) {
                let variant = Math.floor(Math.random() * 8);
                let outline = Math.round(utilities.boxMuellerTransform(0, 1, 0.7)) === 0;
                let result = '';
                if (chanceForOutline && outline) {
                    result += 'outline-';
                }
                switch (variant) {
                    case 0 :
                        result += 'primary';
                        break;
                    case 1 :
                        result += 'secondary';
                        break;
                    case 2 :
                        result += 'success';
                        break;
                    case 3 :
                        result += 'danger';
                        break;
                    case 4 :
                        result += 'warning';
                        break;
                    case 5 :
                        result += 'info';
                        break;
                    case 6 :
                        result += 'light';
                        break;
                    case 7 :
                        result += 'dark';
                        break;
                }
                return result;
            }
        }
    }
</script>

<style>

</style>