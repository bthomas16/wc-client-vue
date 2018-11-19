<template>
    <b-container fluid>
         <b-row v-if="!errorObj.isSuccess" class="mb-1">
            <b-col>
                <b-alert show variant="danger" class="py-1">{{errorObj.message}}</b-alert>
            </b-col>
        </b-row>
        <b-row no-gutters align-h="center">
            <b-col cols="8" class="center mb-3 imgSelect">
                <b-img id="profileImgEditModal" class="box-shadow-light mb-2 center ml-0" fluid :src="userProfileEditing.imgSrc || 'http://localhost:8081/api/static-assets/blankprofpic.png'"></b-img>
                <label class="file-select w-100 mw-100">
                    <!-- We can't use a normal button element here, as it would become the target of the label. -->
                    <div class="select-button pointer py-2 mt-2 bg">
                    <!-- Display the filename if a file has been selected. -->
                    <span>Select Images</span>
                    </div>
                    <!-- Now, the file input that we hide. -->
                    <input class="my-2 left-align w-100 center mx-auto" value="Upload Photo" type="file" @change="uploadProfileImageToAwsS3()"/>
                </label>
            </b-col>
            <b-col cols="12">
                <b-form @submit.prevent="submitEditProfile">
                <b-row no-gutters>
                    <b-col cols="6">
                        <input required class="no-border border-bottom-only" type="text" v-model="userProfileEditing.firstName">
                        <p class="h8">First Name</p>
                    </b-col>
                    <b-col cols="6">
                        <input class="no-border border-bottom-only" type="text" v-model="userProfileEditing.lastName">
                        <p class="h8">Last Name</p>
                    </b-col>
                    <b-col cols="12">
                        <input required class="no-border border-bottom-only" type="email" v-model="userProfileEditing.email">
                        <p class="h8">Email Address</p>
                    </b-col>
                </b-row>
                <b-row no-gutters align-h="between">
                    <b-col cols="12">
                        <input class="no-border border-bottom-only" type="password" v-model="userProfileEditing.oldPassword">
                        <p class="h8">Old Password</p>
                    </b-col>
                    <b-col cols="6">
                        <input class="no-border border-bottom-only" type="password" v-model="userProfileEditing.newPassword">
                        <p class="h8">New Password</p>
                    </b-col>
                    <b-col cols="6">
                        <input class="no-border border-bottom-only" type="password" v-model="userProfileEditing.confirmNewPassword">
                        <p class="h8">Confirm Password</p>
                    </b-col>
                </b-row>
            </b-form>
        </b-col>
    </b-row>
    </b-container>
</template>

<script>

    export default {
    name: 'editProfileModal',
    props: ['userProfileEditing', 'errorObj'],

    data () {
        return {
            newPassword: ''
        }
    },
    methods:{
        uploadProfileImageToAwsS3(e) {
                console.log(event.target.files[0])
                let files = event.target.files[0];
                this.$store.dispatch('uploadProfileImageToAwsS3', files).then((data) => {
                    console.log('returned this dickle', data)
                    this.userProfileEditing.imgSrc = data.Location;                    
                })
            },
    },

    computed: {
        User() {
            return this.$store.state.User;
        }
    }
        
}
</script>

<style scoped>
    .imgSelect > input[type="file"] {
        display: none;
    }

    .border-bottom-only {
        border-bottom: 1px solid gray !important;
        width: 95%;
    }

    #profileImgEditModal {
        min-height: 150px;
        height: auto;
        max-height: 275px;
    }
</style>

