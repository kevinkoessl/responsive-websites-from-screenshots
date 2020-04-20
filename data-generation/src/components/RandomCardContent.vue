<template>
    <b-card :title="hasTitle ? randomText('word') : null"
            :header="hasHeader ? randomText('sentence', 3) : null"
            :footer="hasFooter ? randomText('sentence') : null"
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
            <b-link v-for="index in numberOfLinks()" :key="index">
                {{ randomText('word')}}
            </b-link>
        </template>
    </b-card>
</template>

<script>
    import {utilities} from "@/utilities/utilities";

    /** This component fills a bootstrap card with randomized content */
    export default {
        name: "RandomCardContent",
        data() {
            return {
                hasHeader: Math.round(utilities.boxMuellerTransform(0, 1, 1.5)),
                hasTitle: Math.round(utilities.boxMuellerTransform(0, 1, 1)),
                hasSubtitle: Math.round(utilities.boxMuellerTransform(0, 1, 1)),
                hasFooter: Math.round(utilities.boxMuellerTransform(0, 1, 1.5)),
                hasText: Math.round(utilities.boxMuellerTransform(0, 1, 1)),
                buttonLinksOrNothing: (Math.floor(Math.random() * 3)),
                links: 0,
                button: '',
            }
        },
        props: {
            rowIndex: Number,
            cardIndex: Number,
            md: Number,
            lg: Number,
        },
        mounted() {
            this.$store.dispatch("updateCol", {
                position: {
                    rowIndex: this.rowIndex,
                    colIndex: this.cardIndex
                },
                lg: this.lg,
                md: this.md,
                hasHeader: this.hasHeader,
                hasTitle: this.hasTitle,
                hasSubtitle: this.hasSubtitle,
                hasFooter: this.hasFooter,
                links: this.links,
                button: this.button,
            });
        },
        methods: {
            randomText(type = 'sentence', length = null) {
                return utilities.generateRandomString({type: type, length: length});
            },
            randomVariant(chanceForOutline) {
                let variant = Math.floor(Math.random() * 4);
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
                        result += 'warning';
                        break;
                }
                this.button = "btn-" + result;
                return result;
            },
            numberOfLinks() {
                let numberOfLinks = Math.ceil(Math.random() * 2);
                this.links = numberOfLinks;
                return numberOfLinks;
            }
        }
    }
</script>