
<template>
    <b-container fluid>
        <b-row no-gutters align-h="center">
            <b-col cols="12" md="5" class="bg-black white op-4 p-4 order-2 order-md-1">
                <b-row no-gutters>
                    <p class="ml-1 h4 w-100">Learn About Our Featured Brands</p>
                    <b-col>
                        <button class="btn m-1" rounded @click="getWatchInfoById(1)">Ocean Crawler</button>
                        <button class="btn m-1" rounded @click="getWatchInfoById(2)">Aragon</button>
                        <button class="btn m-1" rounded @click="getWatchInfoById(3)">Omega</button>
                    </b-col>
                </b-row>
                <b-row class="p-3">
                    <b-col class="p-0">
                        <p class="h3">{{currentWatchInfo.brand}}</p>
                        <p v-if="currentWatchInfo.siteLink"><a target="_blank" class="pointer" :href="currentWatchInfo.siteLink">Shop {{currentWatchInfo.brand}} here</a></p>
                        <p class="h5 m-h5">{{currentWatchInfo.text}}</p>
                        <p class="m-h6 h6 pointer" v-if="currentWatchInfo.siteLink"><a :href="currentWatchInfo.siteLink">Learn More</a></p>
                        <b-row align-h="center" v-if="currentWatchInfo.logoSrc">
                            <b-col class="mx-auto mt-3" cols="4">
                                <b-img fluid :src="currentWatchInfo.logoSrc"></b-img>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="10" md="7" class="order-1 order-md-2 p-0 p-md-3 mt-2 mt-md-0">
                <featured-collection></featured-collection>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import FeaturedCollection from './FeaturedCollection.vue';

    export default {
        
        name: 'discoverWatches',
        components: {
            featuredCollection: FeaturedCollection
        },

        data: function() {
            return {
                currentWatchInfo: {
                    brand: "Micro - Mega",
                    text: "From micro brands up to the most prestigious watch brands today, we aim to offer the the background, reasoning and devotion that goes into the created of the timepieces in our Featured Collection."
                }
            }
        },

        methods: {
            getWatchInfoById(watchInfoId) {
                this.$store.dispatch('getWatchInfoById', watchInfoId).then(res => {
                    console.log('res', res)
                    this.currentWatchInfo = res;
                })
            }
        }
    }
</script>

<style scoped>
    .container-fluid {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("http://localhost:8081/api/static-assets/tablebg.jpg");
        /* min-height: 100%; */
        height: auto;
        /* background-position: center; */
        background-repeat:repeat;
        background-size: cover;
        /* position: relative; */
    }
    
</style>