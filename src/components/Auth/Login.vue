<template>
    <b-container class="m-0 p-0">
        <b-row>            
            <b-col cols="12" class="mx-auto" align-h="center">
                <b-alert v-if="showAlert" v-bind:variant="responseStyle">{{responseMessage}}</b-alert>
                <b-form @submit.prevent="onSubmit">
                    <b-card
                    img-src="https://blog.propertyroom.com/wp-content/uploads/2015/07/Watch-Collect.jpg"
                            img-alt="Card image"
                            
                            class="m-0 relative"
                            >
                        <div class="card-text mx-auto"> 
                            <h4>Login to manage your collection!</h4>
                            <b-alert show v-bind:variant="responseStyle" v-if="showAlert">{{responseMessage}}</b-alert> 
                            <b-form-group id="exampleInputGroup1"
                            label="Email address:"
                            label-for="email">
                                <b-form-input id="email"
                                            type="email"
                                            v-model="form.email"
                                            required
                                            autocomplete="off"
                                            placeholder="Enter email">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="exampleInputGroup2"
                                            label="Your Password:"
                                            label-for="password">
                                <b-form-input id="password"
                                            type="password"
                                            v-model="form.password"
                                            required
                                            autocomplete="off"
                                            placeholder="Enter name">
                                </b-form-input>
                            </b-form-group>
                            <b-row align-v="center">
                                <b-col cols="4">
                                    <b-button type="submit" variant="success">Submit</b-button>
                                </b-col>
                                <b-col cols="8" class="right-align">
                                    <p class="h8 m-1 ">Not a user? <span class="link nowrap" @click="toggleAuthChild">Register Here</span></p>
                                </b-col>
                            </b-row>
                        </div>
                    </b-card>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import axios from 'axios';
    export default {
    data () {
        return {
            form: 
            {
                email: '',
                password: ''
            },
                showAlert: false,
                responseMessage: 'Login Here!',
                responseStyle: 'light'
        }
    },
    methods: {
        onSubmit () 
        {
            console.log('submitting', this.form)
            this.$store.dispatch('login', this.form).then(res => {
                if(res.isSuccess)
                    this.$router.push({ path: '/profile'}); 
                else {
                    this.showAlert = true;
                    this.responseStyle = 'danger';
                    this.responseMessage = res.message
                }
                })
        },

        toggleAuthChild ()
        {
            this.$emit('toggleAuthView')
        }
    }
}
</script>

<style>
    #register-wrapper {
        max-width: 60%;
        padding:auto;
    }
  
</style>