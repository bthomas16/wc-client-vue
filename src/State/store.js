import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const headers = {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('watchJwt')
    }

const fileHeaders = {
    'Content-Type': 'multipart/form-data',
    'authorization': localStorage.getItem('watchJwt')   
}


const axios = require('axios'),
    LOADING = "LOADING",
    NOT_LOADING = "NOT_LOADING",
    AUTHENTICATING = "AUTHENTICATING",
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_FAILURE = "AUTH_FAILURE",
    LOGOUT = "LOGOUT",
    GET_USER = "GET_USER",
    VALIDATE_JWT = "VALIDATE_JWT",
    INVALIDATE_JWT = "INVALIDATE_JWT",
    NAME_COLLECTION = "NAME_COLLECTION",
    SET_COLLECTION = "SET_COLLECTION",
    SET_COLLECTION_LENGTH = "SET_COLLECTION_LENGTH",
    SUBMIT_NEW_WATCH = "SUBMIT_NEW_WATCH",
    SELECT_WATCH = "SELECT_WATCH",
    WATCH_ORDER_UPDATED = "WATCH_ORDER_UPDATED",
    TOGGLE_FAVORITE = "TOGGLE_FAVORITE",
    SET_NUMBER_FSOT = "SET_NUMBER_FSOT",
    FAVORITES_COLLECTION = "FAVORITES_COLLECTION",
    CARD_SIZE_TO_USE = "CARD_SIZE_TO_USE",
    TOGGLE_IS_MANAGING_COLLECTION = "TOGGLE_IS_MANAGING_COLLECTION",
    TOGGLE_IS_SHOW_FLAGS = "TOGGLE_IS_SHOW_FLAGS",
    TOGGLE_IS_SHOW_EDIT_FLAGS = "TOGGLE_IS_SHOW_EDIT_FLAGS",
    SUBMIT_EDIT_WATCH = "SUBMIT_EDIT_WATCH";

const state = 
{
    isLoading: false,
    isAuthorized: false,
    User: {},
    Collection: [],
    CollectionLength: 0,
    CurrentCardSize: 'sm',
    MobileCardSizeToUse: 3,
    DesktopCardSizeToUse: 3,
    Favorites: [],
    NumberFSOT: 0, //array of watch id's
    isManagingCollection: false,
    isShowFlags: true,
    isShowEditFlags: true,
    isUserLoaded: false,
    isCollectionLoaded: false,
    selectedWatch: {}
}

const mutations = 
{
    [LOADING](state) {
        state.isLoading = true;
    },

    [NOT_LOADING] (state) {
        state.isLoading = false;
    },

    [AUTH_SUCCESS] (state, user) 
    {
        state.User = user;        
        state.isAuthorized = true;
        state.isUserLoaded = true;
    },

    [AUTH_FAILURE] (state) 
    {
        state.isAuthorized = false;
        state.isLoading = false;    
    },

    [LOGOUT](state) 
    {
        state.isAuthorized = false;
    },

    [VALIDATE_JWT](state) {
        state.isAuthorized = true;
    },

    [INVALIDATE_JWT](state) {
        state.isAuthorized = false;
    },

    [SUBMIT_NEW_WATCH](state, watch) {
        state.isCollectionLoaded = true;
        state.Collection.push(watch);
    },

    [SUBMIT_EDIT_WATCH](state, watch) {
        let watchToUpdate = state.Collection.find(w => w.id == watch.id);
        watchToUpdate = watch;
    },

    [SET_COLLECTION](state, collection) {
        state.isLoading = false;     
        state.isCollectionLoaded = true;               
        state.Collection = collection;
    },

    [SET_COLLECTION_LENGTH](state, collectionLength) {
        state.collectionLength = collectionLength;
    },

    [SELECT_WATCH](state, watch) {
        state.selectedWatch = watch;
    },

    [WATCH_ORDER_UPDATED](state, reorderedCollection) {
        state.Collection = reorderedCollection;
    },

    [FAVORITES_COLLECTION](state, favorites) {
        if(favorites[0]) {
            let mappedFavorites = favorites.map(watch => {
                 if(watch.isCurrentFavorite == true) return watch;
             });
             state.Favorites = mappedFavorites;
        }
    },

    [SET_NUMBER_FSOT](state, numberFSOT) {
        state.NumberFSOT = numberFSOT;
    },

    [CARD_SIZE_TO_USE](state, size) {
        switch(size) {
            case 'sm':
                state.CurrentCardSize = size;
                state.MobileCardSizeToUse = 3;
                state.DesktopCardSizeToUse = 3;
                break;
            case 'md':
                state.CurrentCardSize = size;            
                state.MobileCardSizeToUse = 4;
                state.DesktopCardSizeToUse = 4;
                break;
            case 'lg':
                state.CurrentCardSize = size;            
                state.MobileCardSizeToUse = 6;
                state.DesktopCardSizeToUse = 6;
                break;
            default:
                state.CurrentCardSize = 'sm';                
                state.MobileCardSizeToUse = 3;
                state.DesktopCardSizeToUse = 3;
        }
    },

    [TOGGLE_FAVORITE](state, favorites) {
        state.Favorites = favorites;
    },

    [TOGGLE_IS_MANAGING_COLLECTION](state) {
        state.isManagingCollection = !state.isManagingCollection;
    },

    [TOGGLE_IS_SHOW_FLAGS](state) {
        state.isShowFlags = !state.isShowFlags;
    },

    [TOGGLE_IS_SHOW_EDIT_FLAGS](state) {
        state.isShowEditFlags = !state.isShowEditFlags;
    }
}

const actions = 
{
    login(context, formData) 
    {
        context.commit(LOADING); // show spinner
        return new Promise((resolve, reject) => {
                axios.post('/api/user/login', formData)
                .then(res => {
                    localStorage.setItem('watchJwt', res.data.token);
                    context.commit(AUTH_SUCCESS, res.data.user);
                    context.commit(NOT_LOADING);
                    resolve(res.data)
                }).catch(err => {
                    context.commit(NOT_LOADING);
                    context.commit(AUTH_FAILURE);
                        reject(err.data);
                })
            }
        )
    },

    register(context, formData) 
    {
        context.commit(LOADING);// show spinner
        return new Promise((resolve, reject) => {
            axios({
                method: 'POST',
                url: '/api/user/register',
                data: formData
            })
            .then(res => {
                localStorage.setItem('watchJwt', res.data.token);
                context.commit(AUTH_SUCCESS, res.data.user);
                context.commit(NOT_LOADING);                
                resolve(res.data)
            })
            .catch(err => {
                this.responseStyle = 'danger';
                this.responseMessage = err.data.message;
                this.form = {}; 
                context.commit(AUTH_FAILURE );  
                context.commit(NOT_LOADING);                   
                reject(res.data)                              
            })
        })
    },

    user(context) {
        context.commit(LOADING);        
        axios({
            method: 'GET',
            url: '/api/user/profile',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            }
        }).then(res => {
            context.commit(AUTH_SUCCESS, res.data.user);
            context.commit(NOT_LOADING);            
        }).catch(err => {
            console.log(err)
            context.commit(NOT_LOADING);
        })
    },

    logout(context) 
    {   
        context.commit(LOADING);        
        localStorage.removeItem('watchJwt');
        context.commit(LOGOUT);
        context.commit(NOT_LOADING);        
    },

    validateJwt(context) {
        context.commit(LOADING);        
         return axios({
                method: 'GET',
                url: '/api/user/validate-jwt/',
                params: {
                    jwt: localStorage.getItem('watchJwt')
                }
            }).then(res => {
                console.log('store responseon', res)
                if (res.data.isSuccess) {
                    context.commit(VALIDATE_JWT);
                    context.commit(NOT_LOADING);                
                    return res;
                }
                else {
                    context.commit(INVALIDATE_JWT);
                    context.commit(NOT_LOADING); 
                    return res;
                }
            }
        ).catch(err => {
            console.log('store responseon', err)            
            context.commit(NOT_LOADING);
            return err
        })
    },

    loadUserCollection(context) {
        context.commit(LOADING);
        axios({
            method: 'GET',
            url: '/api/watch',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            }
        })
        .then(res => {
            context.commit(SET_COLLECTION, res.data.collection);
            context.commit(SET_COLLECTION_LENGTH, res.data.collection.length);
            context.commit(NOT_LOADING);            
        }).catch(err => {
            context.commit(SET_COLLECTION, []);
            context.commit(NOT_LOADING);            
        })
    },

    submitNewWatch(context, watch) {
        context.commit(LOADING);        
            axios({
                method: 'POST',
                url: '/api/watch',
                headers,
                data: watch
            })
            .then((res) => {
                context.commit(SUBMIT_NEW_WATCH, res.data.watch);
                context.commit(NOT_LOADING);
                return res.data.watch.id
            }).catch((err) => {
                context.commit(NOT_LOADING);      
        })
    },

    submitEditWatch(context, watch) {
        context.commit(LOADING);        
            axios({
                method: 'PUT',
                url: '/api/watch/',
                params: {
                    id: watch.id
                },
                headers,
                data: watch
            })
            .then((res) => {
                context.commit(SUBMIT_EDIT_WATCH, res.data.watch);
                context.commit(NOT_LOADING);
                return;
            }).catch((err) => {
                console.log(err);
                context.commit(NOT_LOADING);      
        })
    },

    removeExistingWatch(context, id) {
        axios({
            method: 'PUT',
            url: '/api/watch/remove/',
            headers,
            params: {
                id: id
            },
        })
        .then((res) => {
            console.log('updated that watch!', res.data.watch)
            context.commit(NOT_LOADING);
            return;
        }).catch((err) => { 
            context.commit(NOT_LOADING);      
        })
    },

    createRemoveWatch(context, watchDetails) {
        context.commit(LOADING);  
            axios({
                method: 'POST',
                url: '/api/watch/remove',
                headers,
                data: watchDetails
            })
            .then((res) => {
                console.log('created new watch removed!', res.data.watch)
                context.commit(NOT_LOADING);
            }).catch((err) => {
                console.log(err)
                context.commit(NOT_LOADING);        
        })
    },

    selectWatch(context, watch) {
        if(watch != null) {
            context.commit('SELECT_WATCH', watch);
            return true;
        }
        throw new Error('HOLY SHIT WHAT DID YOU DO?!');
    },

    updateCollectionOrder(context, newCollectionOrder) {
        // NO LOADING NEEDING
        axios({
            method: 'PUT',
            url: '/api/watch/update-order',
            headers,
            data: newCollectionOrder
        }).then(res => {
            console.log(res.data.collection)
            context.commit(SET_COLLECTION, res.data.collection)
        }).catch(err => {
            console.log(err)
        })
    },

    getFavorites(context) { 
        // NO LOADING NEEDING
        axios({
            method: 'GET',
            url: '/api/watch/favorite',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            }
        }).then(res => {
            console.log('favorites be', res.data.favorites)
            context.commit('FAVORITES_COLLECTION', res.data.favorites);
        }).catch(err => {
            console.log(err);
        })
    },

    getNumberFSOT(context) { 
        // NO LOADING NEEDING
        axios({
            method: 'GET',
            url: '/api/watch/number-fsot',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            }
        }).then(res => {
            console.log('okafhb', res.data.numberFSOT)
            context.commit('SET_NUMBER_FSOT', +res.data.numberFSOT);
        }).catch(err => {
            console.log(err);
        })
    },

    sizeCardToUse(context, size) {
        context.commit('CARD_SIZE_TO_USE', size);
    },

    toggleWatchFavorite(context, watchId) {
        // NO LOADING NEEDING        
        axios({
            method: 'POST',
            url: '/api/watch/favorite/',
            params: {
                watchId
            },
            headers
        }).then(res => {
            console.log('toggled', res.data)
            context.commit('TOGGLE_FAVORITE', res.data.favorites);
        }).catch(err => {
            console.log('fuckit', err);
        })
    }, 

    toggleIsManagingCollection(context) {
        // NO LOADING NEEDING        
        context.commit('TOGGLE_IS_MANAGING_COLLECTION');
    }, 

    toggleIsShowFlags(context) {
        // NO LOADING NEEDING        
        context.commit('TOGGLE_IS_SHOW_FLAGS');
    },

    toggleIsShowEditFlags(context) {
        // NO LOADING NEEDED
        context.commit('TOGGLE_IS_SHOW_EDIT_FLAGS');
    },

    getFilteredCollection(context, filterObj) {
        context.commit(LOADING);
        console.log(filterObj)
            axios({
                method: 'GET',
                url: `/api/watch/sort-filter/${filterObj.category}/`,
                params: { option: filterObj.option },
                headers
            })
            .then((res) => {
                let collection = res.data.collection;
                context.commit(SET_COLLECTION, collection);
                context.commit(NOT_LOADING);
            }).catch((err) => {
                console.log(err)
                context.commit(SET_COLLECTION, []);                
                context.commit(NOT_LOADING);      
        })
    },

    getFilteredCollectionBySearchTerm(context, searchTermToFilterBy) {
        context.commit(LOADING);
            axios({
                method: 'GET',
                url: '/api/watch/sort-filter/search/',
                params: { searchTerm: searchTermToFilterBy },
                headers
            })
            .then((res) => {
                let collection = res.data.collection;
                context.commit(SET_COLLECTION, collection);
                context.commit(NOT_LOADING);
            }).catch((err) => {
                console.log(err)
                context.commit(SET_COLLECTION, []);                
                context.commit(NOT_LOADING);       
        })
    },
    

    uploadImagesToAwsS3(context, images) {
        context.commit(LOADING);        
        let imagesFormData = new FormData();
        // for( var i = 0; i < images.length; i++ ){
        //     let image = images[i];
        imagesFormData.append('images[' + 1 + ']', images);
        //   }
            context.commit(LOADING);
            return axios({
                method: 'POST',
                url: '/api/watch/upload',
                headers: { 'Content-Type': 'multipart/form-data', 'authorization': localStorage.getItem('watchJwt') },
                data: imagesFormData
            })
            .then((res) => {
                context.commit(NOT_LOADING);
                return res.data.uploadedImagesData;
            }).catch((err) => {
                console.log(err)               
                context.commit(NOT_LOADING);       
        })
    }
}

const getters = 
{
    getLoadingStatus(state) {
        return state.isLoading;
    },

    getUserLoadStatus(state) {   
        return state.isUserLoaded;
    },

    getCollectionLoadStatus(staste) {
        return state.isCollectionLoaded;
    },

    getCollection(state) {
        return state.Collection;
    },

    getFavorites(State) {
        return state.Favorites;
    },

    getUser(state) {
        return state.User;
    }
}



export default new Vuex.Store
({
    state,
    actions,
    mutations,
    getters
})