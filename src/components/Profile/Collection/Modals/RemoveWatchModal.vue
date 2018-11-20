<template>
    <b-container fluid>
        <p class="h3 w-100">How did you move this piece?</p>
        <b-row no-gutters align-h="center">
            <button block class="btn btn-primary mx-auto my-md-2 my-1 w-100" variant="primary" @click="reasonsWatchMoved.typeMoved = 'sale'" :class="reasonsWatchMoved.typeMoved == 'sale' ? 'bg-green white' : ''">Sale</button>
            <button block class="btn btn-primary mx-auto my-md-2 my-1 w-100" variant="primary" @click="reasonsWatchMoved.typeMoved = 'trade'" :class="reasonsWatchMoved.typeMoved == 'trade' ? 'bg-green white' : ''">Trade</button>
            <button block class="btn btn-primary mx-auto my-md-2 my-1 w-100" variant="primary" @click="reasonsWatchMoved.typeMoved = 'trade_cash'" :class="reasonsWatchMoved.typeMoved == 'trade_cash' ? 'bg-green white' : ''">Trade + Cash</button>
            <button block class="btn btn-primary mx-auto my-md-2 my-1 w-100" variant="primary" @click="reasonsWatchMoved.typeMoved = 'gifted'" :class="reasonsWatchMoved.typeMoved == 'gifted' ? 'bg-green white' : ''">Gifted</button>
            <button block class="btn btn-primary mx-auto my-md-2 my-1 w-100" variant="primary" @click="reasonsWatchMoved.typeMoved = 'charity'" :class="reasonsWatchMoved.typeMoved == 'charity' ? 'bg-green white' : ''">Charity</button>
        </b-row>

        <b-form-row v-if="reasonsWatchMoved.typeMoved == 'sale'" class="mt-2 mt-md-4 w-100 mw-100">
            <b-form-group id=""
                horizontal
                :label-cols="5"
                breakpoint="md"
                class="w-100 px-2 my-0"
                label="Who did you sell this watch to?"
                label-for="inputHorizontal">
                <b-form-input placeholder="Johnny Cash" v-model="reasonsWatchMoved.receivedBy"></b-form-input>
            </b-form-group>
            <b-form-group id=""
                horizontal
                :label-cols="5"
                breakpoint="md"
                class="w-100 px-2 my-0"
                label="How much did you sell this watch for?"
                label-for="inputHorizontal">
                <b-form-input placeholder="$200" v-model="reasonsWatchMoved.value"></b-form-input>
            </b-form-group>
        </b-form-row>

        <b-row no-gutters v-if="reasonsWatchMoved.typeMoved == 'trade'" class="mt-2 mt-md-4">
            <b-form-group id=""
                horizontal
                :label-cols="5"
                breakpoint="md"
                class="w-100 px-2 my-0"
                label="Who did you trade this watch for?"
                label-for="inputHorizontal">
                <b-form-input placeholder="John Smith" v-model="reasonsWatchMoved.receivedBy"></b-form-input>
            </b-form-group>
            <b-form-group id=""
                horizontal
                :label-cols="5"
                breakpoint="md"
                class="w-100 px-2 my-0"
                label="What value did you trade this watch at?"
                label-for="inputHorizontal">
                <b-form-input placeholder="Orienteering" v-model="reasonsWatchMoved.value"></b-form-input>
            </b-form-group>
            <b-form-group id=""
                horizontal
                :label-cols="5"
                breakpoint="md"
                class="w-100 px-2 my-0 mb-0"
                label="Watch traded for:"
                label-for="inputHorizontal">
                <b-row v-if="reasonsWatchMoved.trades.length" class="mb-2 pl-1 bg-lightgray b-0 w-100 d-block d-md-none" no-gutters order="2">
                    <ul class="p-1 m-0">
                        <li v-for="(w, index) in reasonsWatchMoved.trades" :key="w.id">{{index + 1}}. {{w}}</li>
                    </ul>
                </b-row>
                <b-row no-gutters>
                    <b-col class="pr-1">
                         <b-form-input  placeholder="Brand" v-model="watchTradedForBrand"></b-form-input>
                    </b-col>
                    <b-col class="pl-1">
                         <b-form-input  placeholder="Name" v-model="watchTradedForName"></b-form-input>
                    </b-col>
                </b-row>
                <button class="btn btn-info right mt-2" @click="addWatchTraded">Add Watch</button>
            </b-form-group>
            <b-row v-if="reasonsWatchMoved.trades.length" class="tradedWatchList bg-lightgray b-0 w-65 d-none d-md-block" no-gutters order="2">
                <ul class="p-1 m-0">
                    <li v-for="(w, index) in reasonsWatchMoved.trades" :key="w.id">{{index + 1}}. {{w}}</li>
                </ul>
            </b-row>
        </b-row>

        <b-row no-gutters v-if="reasonsWatchMoved.typeMoved == 'trade_cash'" class="mt-2 mt-md-4">
            <b-form-group id=""
                horizontal
                :label-cols="5"
                breakpoint="md"
                class="w-100 px-2 my-0"
                label="How much money did you receive?"
                label-for="inputHorizontal">
                <b-form-input placeholder="Orienteering"></b-form-input>
            </b-form-group>
            <b-form-group id=""
                horizontal
                :label-cols="5"
                breakpoint="md"
                class="w-100 px-2 my-0"
                label="Who did you trade this watch to?"
                label-for="inputHorizontal">
                <b-form-input placeholder="John Smith"></b-form-input>
            </b-form-group>
            <b-form-group id=""
                horizontal
                :label-cols="4"
                breakpoint="md"
                class="w-100 px-2 my-0 mb-0 relative"
                label="Watch traded for:"
                label-for="inputHorizontal"
                order="1">
                <b-row v-if="reasonsWatchMoved.trades.length" class="mb-2 pl-1 bg-lightgray b-0 w-100 d-block d-md-none" no-gutters order="2">
                    <ul class="p-1 m-0">
                        <li v-for="(w, index) in reasonsWatchMoved.trades" :key="w.id">{{index + 1}}. {{w}}</li>
                    </ul>
                </b-row>
                <b-row no-gutters order="3">
                    <b-col class="pr-1 relative">
                         <b-form-input  placeholder="Brand" v-model="watchTradedForBrand"></b-form-input>
                    </b-col>
                    <b-col class="pl-1">
                         <b-form-input  placeholder="Name" v-model="watchTradedForName"></b-form-input>
                    </b-col>
                </b-row>
                <button class="btn btn-info right mt-2" @click="addWatchTraded" :disabled="!watchTradedForName">Add Watch</button>
            </b-form-group>
            <b-row v-if="reasonsWatchMoved.trades.length" class="tradedWatchList bg-lightgray b-0 w-65 d-none d-md-block" no-gutters order="2">
                <ul class="p-1 m-0">
                    <li v-for="(w, index) in reasonsWatchMoved.trades" :key="w.id">{{index + 1}}. {{w}}</li>
                </ul>
            </b-row>
        </b-row>

        <b-row no-gutters v-if="reasonsWatchMoved.typeMoved == 'gifted'" class="mt-2 mt-md-4">
            <b-form-group id=""
                horizontal
                :label-cols="6"
                breakpoint="md"
                class="w-100 px-2 my-0"
                label="Who did you gift this watch to?"
                label-for="inputHorizontal">
                <b-form-input placeholder="John Smith"></b-form-input>
            </b-form-group>
        </b-row>

        <b-row no-gutters v-if="reasonsWatchMoved.typeMoved == 'charity'" class="mt-2 mt-md-4">
            <b-form-group id=""
                horizontal
                :label-cols="6"
                breakpoint="md"
                class="w-100 px-2 my-0"
                label="Which Charity did you donate this watch to?"
                label-for="inputHorizontal">
                <b-form-input placeholder="John Smith"></b-form-input>
            </b-form-group>
            <b-form-group id=""
                horizontal
                :label-cols="6"
                breakpoint="md"
                class="w-100 px-2 my-0"
                label="What value did this watch hold?"
                label-for="inputHorizontal">
                <b-form-input placeholder="John Smith"></b-form-input>
            </b-form-group>
        </b-row>
    </b-container>
</template>

<script>

    export default {
    name: 'removeWatchModal',
    props: ['reasonsWatchMoved', 'removeWatchCount'],

    data () {
        return {
            watchId: 0,
            watchTradedForBrand: null,
            watchTradedForName: null,
            watchTradedFor: '',
            watchesTradedFor: []
        }
    },
    methods:{
        addWatchTraded() {
            this.watchTradedFor = this.watchTradedForBrand + ' - ' + this.watchTradedForName;
            this.reasonsWatchMoved.trades.push(this.watchTradedFor);
            this.watchTradedForBrand = null;
            this.watchTradedForName = null;
        }
    }
        
}
</script>

<style scoped>
    .b-form-group, .form-group {
        padding: .5em;
    }

    .tradedWatchList {
        margin-top: -2.85em;
        padding-left: .5em;
    }

    @media(max-width:766px) {

    .mw-100 {
        width: 100% !important;
        }

    .b-form-group, .form-group {
        padding: 0em;
    }   

}

</style>

