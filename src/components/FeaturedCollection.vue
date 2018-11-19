
<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="12">
                <b-row no-gutters>
                    <b-col cols="6" md="4" v-for="watch in FeaturedWatches" :key="watch.id" class="pointer p-1 pl-0"  @click="selectWatch(watch)">
                        <b-row align-v="start" align-h="center" class="mb-3 bg-white" no-gutters>
                            <b-col cols="12" class="border p-1 p-md-3 bg-white">
                                <b-img
                                @click="selectWatch(watch)"
                                :src="watch.src" 
                                fluid>
                                </b-img>
                            </b-col>
                            <b-col cols="12 center bg-white-opaque my-0 px-3 pt-1">
                                <b-img id="brandLogo" :src="watch.logoSrc" fluid class="mx-auto p-1 p-md-3 p-lg-4 w-75"></b-img>
                            </b-col>
                            <b-col cols="12" class="mx-auto p-1 bg-white-opaque">
                                <p class="my-0 h5 m-h5">{{watch.brand}}</p>
                                <p class="my-0 h6 m-h4">{{watch.name}}</p>
                                <p class="green mb-0 m-h5">${{watch.value}}</p>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-modal :title="selectedWatch.name" ref="seeFeaturedWatchModal">
            <app-see-more :selectedWatch="selectedWatch"></app-see-more>
            <div slot="modal-footer" class="w-100">
                <b-btn size="" class="float-right" variant="primary" @click="closeFeaturedWatchModel">
                    OK
                </b-btn>
            </div>
        </b-modal>

    </b-container>
</template>

<script>
    import SeeMore from './Profile/Collection/Modals/SeeMoreModal.vue';

    export default {
        
        name: 'featuredCollection',
        components: {
            appSeeMore: SeeMore,
        },

        data () {
            return {
                selectedWatch: {},
                FeaturedWatches: [
                    {
                        src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                        brand: 'Omega',
                        name: 'WatchGuy',
                        value: 375,
                        logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Omega_Logo.svg/200px-Omega_Logo.svg.png',
                        isFeaturedWatch: true
                    },
                    {
                        src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                        brand: 'Omega',
                        name: 'WatchGuy',
                        value: 375,
                        logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Omega_Logo.svg/200px-Omega_Logo.svg.png',
                        isFeaturedWatch: true
                    },
                    {
                        src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                        brand: 'Omega',
                        name: 'WatchGuy',
                        value: 375,
                        logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Omega_Logo.svg/200px-Omega_Logo.svg.png',
                        isFeaturedWatch: true
                    },
                    {
                        src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                        brand: 'Omega',
                        name: 'WatchGuy',
                        value: 375,
                        logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Omega_Logo.svg/200px-Omega_Logo.svg.png',
                        isFeaturedWatch: true
                    },
                    {
                        src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                        brand: 'Omega',
                        name: 'WatchGuy',
                        value: 375,
                        logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Omega_Logo.svg/200px-Omega_Logo.svg.png',
                        isFeaturedWatch: true
                    },
                    {
                        src: 'http://static1.squarespace.com/static/53af7209e4b0911b3009149d/53af7250e4b0f61134967e91/555f5050e4b0b614ae768991/1432327291003/?format=1000w',
                        brand: 'Omega',
                        name: 'WatchGuy',
                        value: 375,
                        logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Omega_Logo.svg/200px-Omega_Logo.svg.png',
                        isFeaturedWatch: true
                    }
                ]
            }
        },

        methods: {
            selectWatch(watch) {
                this.selectedWatch = watch;
                this.$refs.seeFeaturedWatchModal.show();
            },

            closeFeaturedWatchModel() {
                this.$refs.seeFeaturedWatchModal.hide()
            }
        }
    }
</script>

<style>
    
</style>