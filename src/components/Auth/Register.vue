<template>
    <b-container>
        <b-row no-gutters>            
            <b-col>
                <b-form @submit.prevent="submit">
                    <b-card
                    img-src="http://localhost:8081/api/static-assets/watcheshomecardbg.jpg"
                            img-alt="Card image"
                            
                            class="m-0 relative w-100"
                            >
                        <div class="card-text mx-auto w-100"> 
                            <p class="h4 m-h2">Register -<span class="nowrap"> Manage your collection!</span></p>
                            <b-alert show v-bind:variant="responseStyle" v-if="showAlert" class="p-0">{{responseMessage}}</b-alert> 
                            <!-- <b-row no-gutters class="py-2 pb-3">
                                <b-col cols="12" md="7">
                                    <li>Manage your watch collection</li>
                                    <li>Upload photos of watches</li>
                                    <li>40+ watch attributes</li>
                                </b-col>
                                <b-col cols="12" md="5">
                                    <li>Filter by 20+ traits</li>
                                    <li>Find new piecs</li>
                                    <li>Filter your collection</li>
                                </b-col>
                            </b-row> -->
                            
                            <b-form-group id="credentials"
                                v-if="card == 1"
                                description="We'll never share your email with anyone.">
                                <b-form-input id="email"
                                            type="email"
                                            v-model="form.email"
                                            required
                                            autocomplete="off"
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                            placeholder="Start with an email"
                                            @input="validateEmail(form.email)"
                                            >
                                </b-form-input>
                                <b-form-input id="password"
                                            type="password"
                                            v-model="form.password"
                                            required
                                            autocomplete="off"
                                            placeholder="Create a password"
                                            class="mt-3"
                                            v-if="showPassword"
                                            @input="validatePassword(form.password)">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="names"
                                v-if="card == 2"
                                label-for="First Name">
                                <label for="firstName">First Name:</label>
                                <b-form-input id="firstName"
                                            type="text"
                                            v-model="form.firstName"
                                            required
                                            autocomplete="off"
                                            label="First Name:"
                                            placeholder="First Name">
                                </b-form-input>
                                <label class="mt-2" for="firstName">Last Name:</label>
                                <b-form-input id="password"
                                            type="text"
                                            v-model="form.lastName"
                                            required
                                            autocomplete="off"
                                            placeholder="Last Name"
                                            label="Last Name:"
                                            >
                                </b-form-input>
                            </b-form-group>
                            <h6 class="red thin h7">{{errMsg}}</h6>
                            <b-row align-v="center">
                                <b-col cols="4">
                                    <b-button variant="success" @click="card=2" :disabled="form.password.length <= 4" v-if="card == 1">Continue</b-button>
                                    <b-button variant="success" :disabled="!form.firstName || !form.lastName" type="submit" v-if="card == 2">Finish</b-button>
                                </b-col>
                                <b-col cols="8" class="right-align">
                                    <p class="h8 m-1">Already a user? <span class="link nowrap" @click="toggleAuthChild">Login Here</span></p>
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
        form: {
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        },
        showPassword: false,
        card: 1,
        showAlert: false,
        responseMessage: '',
        responseStyle: 'light',
        showForm: true,
        errMsg: '',
        formValid: true
        }
    },
    methods: {
        submit () 
        {
            this.showAlert = false;
            this.form.email.toLowerCase();
            this.$store.dispatch('register', this.form)
            .then(res => {
                if(res.isSuccess) this.$router.push({path: '/profile'});
                else {
                    this.showAlert = true;
                    this.responseMessage = res.message;
                    this.responseStyle = 'danger';
                }
            }).catch(err => {
                this.showAlert = true;
                this.responseMessage = err.message;
                this.responseStyle = 'danger';
            })
        },

        toggleAuthChild ()
        {
            this.$emit('toggleAuthView')
        },

        validateEmail(email) 
        {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(email)) {
                this.showPassword = true;
                return true;
            }
            else {
                this.showPassword = false;
                this.form.password = '';
                return re.test(email);
            }
        },

        validatePassword(password) 
        {
            if(password.length <= 4) 
            {
                this.errMsg = 'Password must be more than 4 characters';
                return false;
            }
            else {
                this.errMsg = '';
                return true;
            }
        },

        validateNames(first, last) 
        {
            if(first.length && last.length) return true;
            else return false;
        },

        // isDuplicateEmail(email)
        // {
        //     console.log('should check', email)
        //     axios.get('/api/user/isDuplicateEmail?email=' + email).then(res => {
        //         console.log(res)
        //     })
        // }
    }
}
</script>

<style>
.form-control:focus {
    border: none;
    outline: none !important;
}

    #register-wrapper {
        max-width: 60%;
        padding:auto;
    }

    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>