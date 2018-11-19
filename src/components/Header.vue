<template>
  <b-navbar toggleable="lg" type="dark" class="bg-header">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>


  <b-navbar-brand><router-link class="white rubik" :to="isAuthorized ? '/profile' : '/'">Watch Collection</router-link></b-navbar-brand>

  <b-collapse is-nav id="nav_collapse" class="rubik">  

    <b-navbar-nav class="mt1 white ml-0 ml-md-5 ">
        <b-nav-item v-if="!isAuthorized"><router-link to="/">Home</router-link></b-nav-item>
        <b-nav-item v-if="isAuthorized"><router-link to="/profile">My Profile</router-link></b-nav-item>
        <!-- <b-nav-item class="ml-0 ml-lg-4 oswlad" v-if="isAuthorized">Buy | Sell | Trade</b-nav-item> -->
        <b-nav-item><router-link to="/discover">Discover</router-link></b-nav-item>
        <b-nav-item>Watch News</b-nav-item> 
        <b-nav-item @click="logout" class="relative mobile-only" v-if="isAuthorized">Logout</b-nav-item>     
    </b-navbar-nav>

    <b-nav-item @click="logout" class="d-absolute r0 mr-md-4 my-0 d-xs-none desktop-only white" v-if="isAuthorized" right>Logout</b-nav-item>      

  </b-collapse>

  
</b-navbar>

</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        location.reload();
      })
    }
  },
  
  computed: {
    isAuthorized: function() {
      return this.$store.state.isAuthorized;
    }
  }
  
  
}
</script>

<style>

.bg-header {
  background-color: rgba(86, 163, 166, .85)
}

li a {
  color: white;
}

li a:hover, .navbar-brand:hover {
  color: white;
  text-decoration: underline
}

.absolute {
  position: absolute;
}
.r0 {
  right: 0;
}
.container-fluid {
  padding: 0;
}
.navbar-brand {
  font-size: 1.75em;
}

.navbar-nav {
  margin-left:4em;
}

.navbar-dark .navbar-nav .nav-link {
  color:white;
}

li.nav-item a {
  font-family: 'Rubik';
}

#ads .img-fluid {
    max-width: 75%;
  }

  .navbar-brand {
      font-size: 1.5em;
  }
  
  .navbar-toggler, .navbar-toggler:focus {
      border:none;
      outline: none;
  }

@media(max-width: 575px) {
  .navbar-collapse {
    background-color: rgba(2,36,95,.1);
    padding: 1em;
  }

 #ads .img-fluid {
    max-width: 60%;
  }

}

@media(max-width: 500px) {
  .navbar-collapse {
    background-color: rgba(2,36,95,.1);
    padding: 1em;
  }

 #ads .img-fluid {
    max-width: 75%;
  }

}

@media(max-width: 350px) {
  #ads .img-fluid {
    max-width: 100%;
  }
}

</style>

