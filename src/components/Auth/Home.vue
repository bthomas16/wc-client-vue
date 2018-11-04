<template>
    <b-container fluid>
        <b-row align-v="center" align-h="center" class="p-0 p-md-2 p-lg-0 mx-auto">
            <b-col cols="12" md="5" order="2" order-md="1" class="mt-3 mx-auto">
                <b-row no-gutters>
                    <h2 class="border-bottom pt-0 px-1 pb-3 white mx-auto mt-3 my-1 mt-md-0 mx-md-0 Poppins"><strong>Featured Collection</strong></h2>
                    <b-col cols="12" lg="11" class="mt-3">
                        <b-form-row class="mx-auto">
                            <b-col cols="4" v-for="watch in FeaturedWatches" :key="watch.id" class="pointer"  @click="selectWatch(watch)">
                                <b-row align-v="start" align-h="center" class="mb-3 bg-white" no-gutters>
                                    <b-col cols="12" class="border py-1 py-md-3 bg-white">
                                        <b-img
                                        @click="selectWatch(watch)"
                                        :src="watch.src" 
                                        fluid>
                                        </b-img>
                                    </b-col>
                                    <b-col cols="12 center bg-white-opaque my-0 px-3 pt-1">
                                        <b-img id="brandLogo" :src="watch.logoSrc" fluid class="mx-auto p-3"></b-img>
                                    </b-col>
                                    <b-col cols="12" class="mx-auto p-1 bg-white-opaque">
                                        <p class="my-0 h5">{{watch.brand}}</p>
                                        <p class="my-0 h6 m-h3">{{watch.name}}</p>
                                        <p class="green mb-0 m-h3">${{watch.value}}</p>
                                    </b-col>
                            </b-row>
                        </b-col>
                    </b-form-row>
                </b-col>
            </b-row>
        </b-col> 
        <b-col cols="12" md="7" class="mt-3 mt-md-0 mx-auto">
            <b-row no-gutters align-h="center">
                <!-- <b-alert v-if="isValidToken" show class="w-75" variant="danger">Your session has expired. Please login again</b-alert>  -->
                <b-col cols="12" lg="8" class="mx-auto">
                    <span v-if="showLogin">
                        <app-login @toggleAuthView="toggleAuthParent"></app-login>
                    </span>
                    <span v-else>
                        <app-register @toggleAuthView="toggleAuthParent"></app-register>
                    </span>  
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
import Register from './Register.vue';
import Login from './Login.vue';
import SeeMore from '../Profile/Collection/Modals/SeeMoreModal.vue';


export default {
    components: {
      appRegister: Register,
      appLogin: Login,
      appSeeMore: SeeMore 
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
            ],
        showLogin: false
        }
    },
    methods: {
        toggleAuthParent: function() {
            return this.showLogin = !this.showLogin;
        },

        selectWatch(watch) {
            this.selectedWatch = watch;
            this.$refs.seeFeaturedWatchModal.show();
        },

        closeFeaturedWatchModel() {
            this.$refs.seeFeaturedWatchModal.hide()
        },

        isValidToken() {
            return this.$store.state.isAuthorized;
        }
    }
}
</script>

<style scoped>

.container-fluid {
    height: 100vh;
}

.container-fluid {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://topwatch.vn/upload_images/images/topwatch-huong-dan-su-dung-va-bao-quan-dong-ho(1).jpg");
  height: 92.95vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

#watch-collection {
    /* background: rgba(40,40,40,.2   ); */
    overflow-y: scroll;
}


.outline {
    -webkit-text-stroke: 1px black;
}

#brandLogo {
    max-height: 75px;
}

@media(max-height: 768px) {
    .container-fluid {
        overflow-y: scroll !important;
        /* height: auto; */
    }
}
</style>

<!-- b-form-1.vue -->

