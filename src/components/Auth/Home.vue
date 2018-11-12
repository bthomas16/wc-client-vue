<template>
    <b-container fluid>
        <b-row align-v="center" align-h="center" no-gutters>
            <b-col cols="11" lg="5" order="2" order-lg="1" class="p-0 p-md-0 mt-0 mx-auto">
                <!-- <p class="white h2 m-h1 ml-1 nowrap my-0 mt-2"><strong>Featured Collection</strong></p>
                <p class="border-bottom pt-0 px-1 pb-3 white ml-1 my-0 Poppins w-75 d-block d-md-none"></p>
                <p class="border-bottom pt-0 px-1 pb-3 white ml-1 my-0 Poppins w-50 d-none d-md-block"></p> -->
                <featured-collection></featured-collection>
            </b-col> 
            <b-col cols="12" lg="6" class="mx-auto">
                <b-row no-gutters align-v="center" align-h="center" class="mx-auto">
                    <b-col cols="12" md="12" class="p-2 p-md-0 mt-3 mt-md-0">
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
        
    </b-container>
</template>

<script>
import Register from './Register.vue';
import Login from './Login.vue';

import FeaturedCollection from '../FeaturedCollection.vue';


export default {
    components: {
      appRegister: Register,
      appLogin: Login,
      featuredCollection: FeaturedCollection
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("http://localhost:8081/api/static-assets/tablebg.jpg");
  min-height: 100vh;
  height: auto;
  background-position: center;
  background-repeat:repeat-y;
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
</style>

<!-- b-form-1.vue -->

