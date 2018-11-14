<template>
    <b-container>
        <b-row align-v="center" align-h="center" class="py-3 relative border">
            <b-col class="absolute t-0 right-align">
                <b-img fluid src="http://localhost:8081/api/static-assets/settings.png" v-b-modal.editProfileModal id="settingIcon" class="pointer"></b-img>
            </b-col>
            <b-col cols="5" sm="4" md="12" class="m-0 mx-auto center pt-lg-1">
                <b-img :src="User.imgSrc || 'http://localhost:8081/api/static-assets/blankprofpic.png'" fluid style="height: auto; max-height: 125px;" class="profPic mx-auto box-shadow-light" rounded></b-img>
            </b-col>
            <b-col cols="7" sm="7" md="12" class="left mx-auto p-0 pl-2 mt-2" >
                <p class="p-0 my-1 ml-1 h5 m-h2 bold"><strong>{{User.firstName}} {{User.lastName}}</strong></p>
                <p class="p-0 my-1 mt-2 ml-1 m-h2 h7"><strong>({{Collection.length || 0}})</strong> Watches Total</p>
                <p class="p-0 my-1 ml-1 m-h2 h7"><strong>({{watchesFSOT}})</strong> Watches FSOT</p>
                <p class="p-0 my-1 ml-1 m-h2 h7"><strong>({{Favorites || 0}})</strong> Watches Favorited</p>
            </b-col>
            <b-row no-gutters>
                <b-modal id="editProfileModal" ref="editProfileModal">
                    <div slot="modal-title">
                        Editing: {{userProfileEditing.firstName}}
                    </div>
                    <edit-profile :userProfileEditing="userProfileEditing"></edit-profile>
                    <div slot="modal-footer" class="w-100 mt-0 p-0">
                        <b-row no-gutters align-v="center">
                            <b-col cols="9" class="mt-3" v-if="userProfileEditing.newPassword && userProfileEditing.confirmNewPassword">
                                <p class="red m-h3 nowrap" v-if="!userProfileEditing.email">Must provide an email address</p>
                                <p class="red m-h3 nowrap" v-if="!userProfileEditing.firstName">Must provide a first name</p>
                                <p class="red m-h3 nowrap" v-if="userProfileEditing.newPassword.length < 4 && userProfileEditing.newPassword != ''">Password must have 4 characters</p>
                                <p class="red m-h3 nowrap" v-if="(userProfileEditing.newPassword != userProfileEditing.confirmNewPassword) && (userProfileEditing.newPassword.length >= 4)">New Password does not match</p>


                                <p class="blue m-h3 nowrap" v-if="userProfileEditing.email && userProfileEditing.firstName && (userProfileEditing.newPassword.length >= 4) && (userProfileEditing.newPassword == userProfileEditing.confirmNewPassword) && (userProfileEditing.oldPassword) && (userProfileEditing.newPassword)">Ready to Submit!</p>


                                <p class="red m-h3 nowrap" v-if="(userProfileEditing.newPassword.length >= 4 ) && (userProfileEditing.confirmNewPassword.length >= 4) && (!userProfileEditing.oldPassword) && (userProfileEditing.newPassword)">Please provide your old password</p>
                            </b-col>
                            <b-col>
                                <b-btn class="float-right" variant="info"
                                    @click="submitEditProfile"
                                    :disabled="
                                    (!userProfileEditing.email) || (!userProfileEditing.firstName) ||
                                    (userProfileEditing.newPassword != userProfileEditing.confirmNewPassword) ||
                                    (
                                        (userProfileEditing.oldPassword == '') && (userProfileEditing.newPassword != '')
                                    )">
                                    Submit
                                </b-btn>
                            </b-col>
                        </b-row>
                    </div>
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
            userProfileEditing: {},
        }
    },
    methods: {
        submitEditProfile() {
            this.$store.dispatch('editUserProfile', this.userProfileEditing).then((data) => { //edit profile
            console.log('got this fuck back', data)
                this.$store.dispatch('user'); //reload user
            })
        }
    },
    computed: {
        User() {
            let u = this.$store.state.User
            this.userProfileEditing = u;
            this.userProfileEditing.oldPassword
            this.userProfileEditing.newPassword
            this.userProfileEditing.confirmNewPassword
            return u;
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