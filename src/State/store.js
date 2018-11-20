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
    SERVER_VALIDATION_ERROR = "SERVER_VALIDATION_ERROR",
    FILTERING = "FILTERING",
    SUBMIT_EDIT_WATCH = "SUBMIT_EDIT_WATCH";

const state = 
{
    isLoading: false,
    isAuthorized: false,
    User: {},
    Collection: [],
    CurrentCardSize: 'sm',
    MobileCardSizeToUse: 3,
    DesktopCardSizeToUse: 3,
    Favorites: [],
    NumberFSOT: 0, //array of watch id's
    isManagingCollection: false,
    isFilteringCollection: false,
    isShowFlags: true,
    isShowEditFlags: true,
    isUserLoaded: false,
    isCollectionLoaded: false,
    selectedWatch: {},
    isServerValidationError: false,
    serverValidationError: null
}

const mutations = 
{
    [LOADING](state) {
        console.log('loading is true')
        state.isLoading = true;
    },

    [NOT_LOADING] (state) {
        console.log('loading is false')
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

    [TOGGLE_IS_SHOW_EDIT_FLAGS](state, value) {
        state.isShowEditFlags = value;
    },

    [FILTERING](state, value) {
        state.isFilteringCollection = value;
    },

    [SERVER_VALIDATION_ERROR](state, err) {
        
        switch (err) {
            case'jsonwebtoken': 
                state.isServerValidationError = true;
                state.serverValidationError = "Your session has expired. Please login and try again."
                break;
            default:
                state.isServerValidationError = true;
                state.serverValidationError = "Your session has expired. Please login and try again."
        }
        console.log('should be doing shit via server validation error', state.isServerValidationError)
    }
}

const actions = 
{
    login(context, formData) 
    {
        context.commit(LOADING); 
        return axios.post('/api/user/login', formData)
            .then(res => {
                console.log('should login', res.data.isSuccess)
                if (!res.data.isSuccess) {
                    console.log(res.data, 'ok mostly fuck with me')
                    context.commit(NOT_LOADING);
                    context.commit(AUTH_FAILURE);
                    return res.data;
                }
                localStorage.setItem('watchJwt', res.data.token);
                    context.commit(AUTH_SUCCESS, res.data.user);
                    context.commit(NOT_LOADING);
                    console.log(res.data, 'ok fuck with me')
                    return res.data;
            }).catch(err => {
                console.log(err.data, 'ok srsly fuck with me')
                context.commit(NOT_LOADING);
                context.commit(AUTH_FAILURE);
                return err.data;
        });
    },

    register(context, formData) 
    {
    context.commit(LOADING);
    return axios({
            method: 'POST',
            url: '/api/user/register',
            data: formData
        })
        .then(res => {
            localStorage.setItem('watchJwt', res.data.token);
            context.commit(AUTH_SUCCESS, res.data.user);
            context.commit(NOT_LOADING);                
            return res.data;
        })
        .catch(err => {
            this.responseStyle = 'danger';
            this.responseMessage = err.data.message;
            this.form = {}; 
            context.commit(AUTH_FAILURE );  
            context.commit(NOT_LOADING);                   
            return res.data;                            
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
            context.commit(INVALIDATE_JWT);
            context.commit(SERVER_VALIDATION_ERROR);
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
            context.commit(NOT_LOADING);    
            return err
        })
    },

    loadUserCollection(context) {
        context.commit(LOADING);
        context.commit(FILTERING, false);
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
            context.commit(NOT_LOADING);            
        }).catch(err => {
            context.commit(NOT_LOADING);     
            context.commit(INVALIDATE_JWT);
            // context.commit(SERVER_VALIDATION_ERROR);
            return err;       
        })
    },

    submitNewWatch(context, watch) {
        console.log('it likes this new shit', localStorage.getItem('watchJwt'))        
        context.commit(LOADING);        
            axios({
                method: 'POST',
                url: '/api/watch',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('watchJwt')
                },
                data: watch
            })
            .then((res) => {
                context.commit(SUBMIT_NEW_WATCH, res.data.watch);
                context.commit(NOT_LOADING);
                return res.data.watch.id
            }).catch((err) => {
                context.commit(NOT_LOADING);   
                context.commit(INVALIDATE_JWT);
                context.commit(SERVER_VALIDATION_ERROR);
                return err;   
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
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('watchJwt')
                },
                data: watch
            })
            .then((res) => {
                context.commit(SUBMIT_EDIT_WATCH, res.data.watch);
                context.commit(NOT_LOADING);
                return res;
            }).catch((err) => {
                context.commit(NOT_LOADING); 
                context.commit(INVALIDATE_JWT);
                context.commit(SERVER_VALIDATION_ERROR);
                return err;     
        })
    },

    removeExistingWatch(context, id) {
        axios({
            method: 'PUT',
            url: '/api/watch/remove/',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            },
            params: {
                id: id
            }
        })
        .then((res) => {
            context.commit(NOT_LOADING);
            return res;
        }).catch((err) => { 
            context.commit(NOT_LOADING); 
            context.commit(INVALIDATE_JWT);
            context.commit(SERVER_VALIDATION_ERROR); 
            return err;    
        })
    },

    createRemoveWatch(context, watchDetails) {
        context.commit(LOADING);  
            axios({
                method: 'POST',
                url: '/api/watch/remove',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('watchJwt')
                },
                data: watchDetails
            })
            .then((res) => {
                context.commit(NOT_LOADING);
            }).catch((err) => {
                context.commit(NOT_LOADING);
                context.commit(INVALIDATE_JWT);
                context.commit(SERVER_VALIDATION_ERROR);      
                return err;
        })
    },

    selectWatch(context, watch) {
        context.commit('SELECT_WATCH', watch);
        return true;
    },

    updateCollectionOrder(context, newCollectionOrder) {
        // NO LOADING NEEDING
        axios({
            method: 'PUT',
            url: '/api/watch/update-order',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            },
            data: newCollectionOrder
        }).then(res => {
            console.log(res.data.collection)
            context.commit(SET_COLLECTION, res.data.collection)
        }).catch(err => {
            context.commit(INVALIDATE_JWT);
            context.commit(SERVER_VALIDATION_ERROR);
            return err;
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
            context.commit('FAVORITES_COLLECTION', res.data.favorites);
        }).catch(err => {
            context.commit(INVALIDATE_JWT);
            context.commit(SERVER_VALIDATION_ERROR);
            return err;
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
            context.commit('SET_NUMBER_FSOT', +res.data.numberFSOT);
        }).catch(err => {
            context.commit(INVALIDATE_JWT);
            context.commit(SERVER_VALIDATION_ERROR);
            return err;
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
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('watchJwt')
            }
        }).then(res => {
            console.log('toggled', res.data)
            context.commit('TOGGLE_FAVORITE', res.data.favorites);
        }).catch(err => {
            context.commit(INVALIDATE_JWT);
            context.commit(SERVER_VALIDATION_ERROR);
            return err;
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

    toggleIsShowEditFlags(context, value) {
        // NO LOADING NEEDED
        context.commit('TOGGLE_IS_SHOW_EDIT_FLAGS', value);
    },

    getFilteredCollection(context, filterObj) {
        context.commit(LOADING);
        context.commit(FILTERING, true);
        console.log(filterObj)
            axios({
                method: 'GET',
                url: `/api/watch/sort-filter/${filterObj.category}/`,
                params: { option: filterObj.option },
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('watchJwt')
                }
            })
            .then((res) => {
                let collection = res.data.collection;
                context.commit(SET_COLLECTION, collection);
                context.commit(NOT_LOADING);
            }).catch((err) => {
                console.log(err)
                context.commit(NOT_LOADING);      
                context.commit(INVALIDATE_JWT);
                context.commit(SERVER_VALIDATION_ERROR);  
                return err;             
        })
    },

    getFilteredCollectionBySearchTerm(context, searchTermToFilterBy) {
        context.commit(LOADING);
        context.commit(FILTERING, true);
            axios({
                method: 'GET',
                url: '/api/watch/sort-filter/search/',
                params: { searchTerm: searchTermToFilterBy },
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('watchJwt')
                }
            })
            .then((res) => {
                let collection = res.data.collection;
                context.commit(SET_COLLECTION, collection);
                context.commit(NOT_LOADING);
            }).catch((err) => {
                context.commit(NOT_LOADING);
                context.commit(INVALIDATE_JWT);
                context.commit(SERVER_VALIDATION_ERROR);      
                return err;
        })
    },
    

    uploadImagesToAwsS3(context, images) {
        // context.commit(LOADING);        
        let imagesFormData = new FormData();
        for( var i = 0; i < images.length; i++ ) {
            let image = images[i];
            imagesFormData.append('images[' + i + ']', image);
          }
            context.commit(LOADING);
            return axios({
                method: 'POST',
                url: '/api/upload/watch-images',
                headers: { 
                    'Content-Type': 'multipart/form-data',
                     'authorization': localStorage.getItem('watchJwt')
                },
                data: imagesFormData
            })
            .then((res) => {
                context.commit(NOT_LOADING);
                return res.data.uploadedImages;
            }).catch((err) => {
                context.commit(INVALIDATE_JWT);               
                context.commit(SERVER_VALIDATION_ERROR);   
                return err;  
        })
    },

    uploadProfileImageToAwsS3(context, image) {     
        let imageFormData = new FormData();
        imageFormData.append('image[' + 1 + ']', image);
            context.commit(LOADING);
            return axios({
                method: 'PUT',
                url: '/api/upload/profile-image',
                headers: { 
                    'Content-Type': 'multipart/form-data',
                     'authorization': localStorage.getItem('watchJwt')
                },
                data: imageFormData
            })
            .then((res) => {
                context.commit(NOT_LOADING);
                return res.data.data;
            }).catch((err) => {
                context.commit(NOT_LOADING);
                context.commit(INVALIDATE_JWT);               
                context.commit(SERVER_VALIDATION_ERROR);   
                return err;  
        })
    },

    editUserProfile(context, formData) {
        context.commit(LOADING);
        return axios({
            method: 'PUT',
            url: '/api/user/edit',
            headers: { 
                'Content-Type': 'application/json',
                 'authorization': localStorage.getItem('watchJwt')
            },
            data: formData
        })
        .then((res) => {
            context.commit(NOT_LOADING);
            return res.data;
        }).catch((err) => {
            context.commit(NOT_LOADING);
            context.commit(INVALIDATE_JWT);               
            context.commit(SERVER_VALIDATION_ERROR);   
            return err;  
    })

    },

    serverValidationError(context, err) {
        context.commit(SERVER_VALIDATION_ERROR, err);
    },

    getWatchInfoById(context, watchInfoId) {
        console.log('howdy', watchInfoId)
    return axios({
        method: 'GET',
        url: '/api/discover/watch-info',
        params: {
            watchInfoId: watchInfoId
        }
        }).then(res => {
            console.log('res from store', res)
            return res.data.watchInfo;
        }).catch(err => {
            console.log(err);
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

    getCollectionLoadStatus(state) {
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