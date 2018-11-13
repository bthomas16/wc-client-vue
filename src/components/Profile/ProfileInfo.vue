<template>
    <b-container>
        <b-row align-v="center" align-h="center" class="py-3 relative border    ">
            <b-col class="absolute t-0 right-align">
                <b-img fluid src="http://localhost:8081/api/static-assets/settings.png" v-b-modal.editProfileModal id="settingIcon"></b-img>
            </b-col>
            <b-col cols="5" sm="4" md="12" class="m-0 mx-auto center pt-lg-1">
                <b-img :src="profPic" fluid style="height: auto; max-height: 125px;" class="profPic mx-auto box-shadow" rounded="circle"></b-img>
            </b-col>
            <b-col cols="7" sm="7" md="12" class="left mx-auto p-0 pl-2 mt-2" >
                <p class="p-0 my-1 ml-1 h5 m-h2 bold"><strong>{{User.firstName}} {{User.lastName}}</strong></p>
                <p class="p-0 my-1 mt-2 ml-1 m-h2 h7"><strong>({{Collection.length || 0}})</strong> Watches Total</p>
                <p class="p-0 my-1 ml-1 m-h2 h7"><strong>({{watchesFSOT}})</strong> Watches FSOT</p>
                <p class="p-0 my-1 ml-1 m-h2 h7"><strong>({{Favorites || 0}})</strong> Watches Favorited</p>
            </b-col>

            <b-row no-gutters>
                <b-modal id="editProfileModal" ref="editProfileModal">
                    <edit-profile :userProfile="userProfile"></edit-profile>
                </b-modal>
            </b-row>
            
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios';
    import EditProfile from './Collection/Modals/EditProfileModal.vue';
    
    export default {

    components: {
        editProfile: EditProfile  
    },

    data () {
        return {
            userProfile: {},
            profPic: ""
        }
    },
    methods: {
        
    },
    computed: {
        User() {
            return this.$store.state.User
        },

        Collection() {
            return this.$store.state.Collection;
        },

        watchesFSOT() {
            return this.$store.state.NumberFSOT;
        },

        Favorites() {
            return this.$store.state.Favorites.length;
        }
    },

    created: function() {
        this.$store.dispatch('getNumberFSOT');
    }
}
</script>

<style scoped>

.profPic {
    border: 2px solid lightgray;
}

#settingIcon{
    right: 0;
    top: 0;
    width: 1.15em; 
}

@media(max-width:350px){
    .profPic {
        height:140px;
    }

}
  
</style>