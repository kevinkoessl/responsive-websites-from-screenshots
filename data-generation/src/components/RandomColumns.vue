<template>
    <b-row>
        <b-col v-for="(column, index) in columnSplit"
               :key="index"
               :md="column.md"
               :lg="column.lg">
            <random-card-content :md="column.md" :lg="column.lg" :rowIndex="parentIndex" :cardIndex="index"/>
        </b-col>
    </b-row>
</template>

<script>
    import {utilities} from '@/utilities/utilities.js'
    import RandomCardContent from "@/components/RandomCardContent";

    export default {
        name: "RandomColumns",
        data() {
            return {
                columnSplit: []
            }
        },
        props: {
            parentIndex: Number
        },
        methods: {
            randomText(type = 'sentence', length = null) {
                return utilities.generateRandomString({type: type, length: length});
            },
            randn_bm(min, max, skew) {
                let u = 0, v = 0;
                while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
                while (v === 0) v = Math.random();
                let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

                num = num / 10.0 + 0.5; // Translate to 0 -> 1
                if (num > 1 || num < 0) num = this.randn_bm(min, max, skew); // resample between 0 and 1 if out of range
                num = Math.pow(num, skew); // Skew
                num *= max - min; // Stretch to fill range
                num += min; // offset to min
                return num;
            },
            calculateRandomColumnLayout(numberOfViewPorts) {
                let numberOfColumns = Math.floor(this.randn_bm(0, 1, 1) * 6) + 1;
                let layouts = [];

                for (let viewPort = 0; viewPort < numberOfViewPorts; viewPort++) {
                    let viewPortLayout = [];
                    let remainingColumns = numberOfColumns;
                    let safetyCounter = 100;
                    while (remainingColumns > 0) {
                        if (--safetyCounter === 0) {
                            console.log('Stopped Execution after ' + safetyCounter + ' Iterations.');
                            remainingColumns = 0;
                            break;
                        }
                        let rowSplit = [];
                        if (remainingColumns > 1) {
                            rowSplit = this.calculateSplit(12, Math.floor(this.randn_bm(0, 1, 1) * remainingColumns));
                        } else {
                            rowSplit.push(12);
                        }
                        viewPortLayout = viewPortLayout.concat(rowSplit);
                        remainingColumns -= (rowSplit.length);
                    }
                    layouts.push(viewPortLayout);
                }
                for (let i = 0; i < numberOfColumns; i++) {
                    this.columnSplit[i] = {
                        md: layouts[0][i],
                        lg: layouts[1][i],
                    }
                }
            },
            calculateSplit(length, numberOfSplits) {
                if (numberOfSplits === 0) {
                    return [length];
                } else {
                    let splitPoints = Array(numberOfSplits);

                    for (let i = 0; i < numberOfSplits; i++) {
                        let randomSplitPoint = Math.floor(this.randn_bm(0, 1, 1) * (length - 1)) + 1;
                        let maxCounter = 10;

                        while (splitPoints.includes(randomSplitPoint) && maxCounter > 0) {
                            randomSplitPoint = Math.floor(Math.random() * 10) + 1;
                            if (maxCounter-- === 1) {
                                for (let j = 1; j < numberOfSplits; j++) {
                                    if (!splitPoints.includes(j)) {
                                        randomSplitPoint = j;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        splitPoints[i] = randomSplitPoint;
                    }
                    splitPoints.sort(function (a, b) {
                        return a - b
                    });

                    let position = 0;
                    let split = [];
                    for (let i = 0; i < splitPoints.length + 1; i++) {
                        let columnWidth = splitPoints[i] ? splitPoints[i] - position : 12 - position;
                        position = splitPoints[i];
                        split.push(columnWidth);
                    }

                    return split;
                }
            }
        },
        created() {
            this.calculateRandomColumnLayout(2);
        },
        components: {
            RandomCardContent
        }
    }
</script>