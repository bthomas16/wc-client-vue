<template>
    <b-container ref="profileRef" v-if="isUserLoaded" class="p-0">
        {{isServerValidationError}}
        <b-row no-gutters class="box-shadow bg-red z-4" v-if="isServerValidationError"> 
            IT"S ALL FUCKED
            <button @click="fuckIt">Reload Session</button>
        </b-row>
       <b-row no-gutters v-else>
            <b-col lg="2" md="3" cols="12" class="border bg-lightgray mx-auto">
               <app-profile-info></app-profile-info>
               <b-row class="d-none d-md-block" no-gutters style="min-height: 62vh;">
                    <b-col class="mx-auto" cols="12" ><app-sidebar></app-sidebar></b-col>
               </b-row>
            </b-col>
            <b-col lg="10" md="9" cols="12">
                <app-collection></app-collection>
            </b-col>
       </b-row>
       <!-- <b-row class="mr-0">
           <b-col cols="12" md="9"><app-feed></app-feed></b-col>
       </b-row> -->
    </b-container>
</template>

<script>
import axios from 'axios';
import ProfileInfo from './ProfileInfo.vue';
import Collection from './Collection/Collection.vue';
import Sidebar from './Sidebar.vue';
import Feed from './Feed/Feed.vue';
import store from '../../State/store';


export default {
    components: {
        appProfileInfo: ProfileInfo,
        appCollection: Collection,
        appSidebar: Sidebar,
        appFeed: Feed
    },

    methods: {
        fuckIt() {
            location.reload();
        }
    },

    computed: {
        isUserLoaded() {
            return this.$store.state.isUserLoaded
        },

        isCollectionLoaded() {
            return this.$store.getters.getCollectionLoadStatus;
        },

        isServerValidationError() {
            return this.$store.state.isServerValidationError;
        }
    },

    created: function() {
        this.$store.dispatch('user');
    }
}
</script>

<style scoped>
.container {
    max-width: 100%;
    background: white;
}
.mt-50 {
    margin-top: 20em;
}
</style>

