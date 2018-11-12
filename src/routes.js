import Home from './components/Auth/Home.vue';
import Profile from './components/Profile/Profile.vue';
import Collection from './components/Profile/Profile.vue';
import DiscoverWatches from './components/DiscoverWatches.vue';
import store from './State/store.js';

export const routes = [
    { 
        path: '', 
        name: 'home',
        component: Home,
        beforeEnter: disallowAuth    
    },
    { 
        path: '/profile',
        name: 'profile',
        component: Profile,
        beforeEnter: requireAuth    
    },
    { 
        path: '/discover',
        name: 'discover',
        component: DiscoverWatches   
    },
    { 
        path: '/*',
        name: 'wildcard',
        component: Home,
        beforeEnter: returnHome    
    }
];

    function returnHome(to, from, next) {
        next('/')
    }

    function getJwt() {
        return localStorage.getItem('watchJwt');
    }

    function requireAuth(to, from, next) {
        if (!getJwt()) {
            next('/')
            return;
        }
        store.dispatch('validateJwt').then(res => {
        console.log('fis')
            console.log('data required', res.data)
            if (res.data.isSuccess) {
                next()
                return
            }
                next('/');
                return
        });
    }

    function disallowAuth(to, from, next) {
        if (!getJwt()) {
            next()
            return;
        } 
        store.dispatch('validateJwt').then(res => {
            console.log('data disallow', res.data)
            if (res.data.isSuccess) {
                next('/profile')
                return
            }
        console.log('fic')
                next()
                return
        });
}