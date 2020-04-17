import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        guiData: [],
        guiObject: [],
        guiString: "",
    },
    mutations: {
        /** This Function compiles the randomized gui data into a single string and stores it in the window object for later access */
        'WRITE_GUI_DATA'(state, guiData) {
            state.guiData = guiData;
            let guiObject = [];
            let currentContainer = {
                counter: 0,
                data: Array(3),
            };

            guiData.forEach((cardEntry) => {
                let newRowObject = [];
                let newCardString = "{\n";
                newRowObject.push("md-" + cardEntry.md, "lg-" + cardEntry.lg);

                if (cardEntry.hasHeader === 1) {
                    newCardString += "card-header\ncard-body {\n";
                } else {
                    newCardString += "card-body {\n"
                }
                let cardBodyString = "";
                if (cardEntry.hasTitle === 1) {
                    cardBodyString += "card-title, ";
                }
                if (cardEntry.hasSubtitle === 1) {
                    cardBodyString += "card-subtitle, ";
                }
                cardBodyString += "card-text, ";
                for (let i = 0; i < cardEntry.links; i++) {
                    cardBodyString += "link, ";
                }
                if (cardEntry.button !== "") {
                    cardBodyString += cardEntry.button;
                }

                if (cardBodyString.substring(cardBodyString.length - 2, cardBodyString.length - 1) === ",") {
                    cardBodyString = cardBodyString.substring(0, cardBodyString.length - 2);
                }
                newCardString += cardBodyString + "\n}\n";
                if (cardEntry.hasFooter === 1) {
                    newCardString += "card-footer\n}";
                } else {
                    newCardString += "}";
                }

                if (!Array.isArray(currentContainer.data[cardEntry.position.rowIndex])) {
                    currentContainer.data[cardEntry.position.rowIndex] = [];
                }
                currentContainer.data[cardEntry.position.rowIndex].push({
                    ['col']: {...newRowObject},
                    ['colBody']: {card: newCardString}
                });

            });
            guiObject = currentContainer.data;
            let guiString = "body {\n";
            guiObject.forEach((container) => {
                guiString += "container {\nrow {\n";

                container.forEach((col) => {
                    guiString += "col {\n" + col.col[0] + ", " + col.col[1] + "\n}\ncol-body {\ncard ";
                    guiString += col.colBody.card;
                    guiString += "\n}\n";
                });
                guiString += "}\n}\n";

            });
            guiString += "}";
            state.guiObject = guiObject;

            window.guiString = guiString;
        },
    },
    actions: {
        updateCol({commit, state}, guiData) {
            let storedGuiData = [];
            if (state.guiData.length > 0) {
                storedGuiData = [...state.guiData];
            }
            storedGuiData.push(guiData);
            commit('WRITE_GUI_DATA', storedGuiData);
        }
    }
});


new Vue({
    render: h => h(App),
    store
}).$mount('#app');
