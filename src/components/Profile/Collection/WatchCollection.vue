<template>
    <b-container fluid>

            <draggable  v-model="Collection" @start="startDrag" @end="endDrag" class="py-2" :options="addWatchDragOptions">
    
                <transition-group name="swap-list">
                    <b-col :cols="smSizeCard" :md="mdSizeCard" class="dropdzone left p-half" v-for="watch in Collection" :key="watch.id" :id="watch.id">
                        <b-row align-v="start" align-h="around" class="watch mb-1 something-i-need-to-animate" :class="drag && (draggingId  != watch.id) ? 'bg-light-green' : ''" no-gutters>
                            <watch-flags 
                                :watch="watch" 
                                :isShowFlags="isShowFlags" 
                                :isShowEditFlags="isShowEditFlags" 
                                :isManagingCollection="isManagingCollection"
                                v-on:editWatch="editWatch"
                                v-on:removeWatchModal="removeWatchModal">
                            </watch-flags>

                            <b-col cols="12" class="something-i-need-to-animate watch-wrapper order-1 border box-shadow"> 
                                <b-row aling-h="center" align-v="center" no-gutters class="relative">
                                    <b-col cols="12" xl="12" class="mx-auto p-xl-1">
                                        <b-img
                                        v-if="watch.src.images[0]"
                                        @click="selectWatch(watch)"
                                        :src="watch.src.images[0].src"
                                        fluid class="watchImg pointer p-xl-1 border-xl mx-auto">
                                        </b-img>
                                    </b-col>
                                    <b-col cols="12" class="absolute p-0 m-1 m-lg-3 b-0 r0 " >
                                        <b-img :src="isFavoriteWatch(watch.id) ? fullHeart : emptyHeart" class="heartIcon pointer right" @click="favoriteToggle(watch.id)"></b-img> 
                                    </b-col>
                                </b-row>
                            </b-col>

                        </b-row>
                    </b-col>
                </transition-group>
                
            </draggable>  

        <b-modal id="remove-watch-modal"
            ref="removeWatchModal"
            size="lg">
            <b-row slot="modal-title" no-gutters v-if="watchToRemove">Removing &nbsp; <strong>{{ titleCase(watchToRemove.name)}}</strong></b-row>
            <div slot="modal-header-close" class="w-100 m-h2 mt-2 mt-md-1" @click="resetReasonsWatchMoved">X</div>
            <remove-watch-modal :watchToRemove="watchToRemove" :reasonsWatchMoved="reasonsWatchMoved"></remove-watch-modal>
            <b-row slot="modal-footer" class="p-2" no-gutters>
                <button class="btn btn-warning white mx-2" variant="warning" :disabled="reasonsWatchMoved.typeMoved == null" @click="submitRemoveWatchForm">Remove Watch from Collection</button>
            </b-row>
        </b-modal>

    </b-container>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import RemoveWatchModal from './Modals/RemoveWatchModal.vue';
import WatchFlags from './WatchFlags.vue';


export default {
    name: 'watchCollection',
    components: {
        draggable,
        removeWatchModal: RemoveWatchModal,
        watchFlags: WatchFlags
    },

    data () {
        return {
            addWatchDragOptions: {
                dropzoneSelector: '.dropzone',
                draggableSelector: '.watch',
                showDropzoneAreas: true,
            },
            drag: false,
            emptyHeart: "http://localhost:8081/api/static-assets/empty-heart.png",
            fullHeart: "http://localhost:8081/api/static-assets/full-heart.png",
            showFlags: true,
            // DRAGABLE PROPERTIES

            watchToRemove: null,
            reasonsWatchMoved: {
                receivedBy: null,
                typeMoved: null,
                value: null,
                trades: []
            },

            draggingId: '',
            isAnimate: true,
            TestArray: [
                'option1',
                'option2',
                'option3',
                'option4',
            ]
        }
    },
    methods: {
        smSizeCardUse() {
            this.smSizeCard = 4
            this.mdSizeCard = 3
        },

        mdSizeCardUse() {
            this.smSizeCard = 6
            this.mdSizeCard = 6
        },

        lgSizeCardUse() {
            this.smSizeCard = 12
            this.mdSizeCard = 12
        },

        startDrag(e) {
            this.drag = true;
            console.log(e.item.id, 'okayy', e.item)
            this.draggingId = e.item.id;
            console.log(this.draggingId, 'its done')
        },

        endDrag(e) {
            this.drag = false;
            this.isAnimate = false;
            setTimeout(() => {
                this.isAnimate = true;
            }, 400)
        },

        orderChanged() {
            this.$emit('orderChanged')
        },

        resetReasonsWatchMoved() {
            this.reasonsWatchMoved = {
                receivedBy: null,
                typeMoved: null,
                value: null,
                trades: [] 
            }
        },

        selectWatch(watch) {
            this.$emit('selectWatch', watch)
        },

        editWatch(watch) {
            console.log('fuc')
            this.$emit('editWatchModal', watch);
        },

        removeWatchModal(watch) {
            this.watchToRemove = watch;
            this.$refs.removeWatchModal.show();
        },

        submitRemoveWatchForm() {
            let watchDetails = { watchToRemove: this.watchToRemove, reasonsWatchMoved: this.reasonsWatchMoved }
            this.$store.dispatch('createRemoveWatch', watchDetails);
            this.$store.dispatch('removeExistingWatch', this.watchToRemove.id).then(() => {
                // TODO: NOT THIS
                setTimeout(() => {
                    this.$store.dispatch('getNumberFSOT');
                    this.$store.dispatch('loadUserCollection');
                    this.resetReasonsWatchMoved();
                    this.$refs.removeWatchModal.hide();
                }, 1)       
            })   
        },

        favoriteToggle(watchId) {
            this.$store.dispatch('toggleWatchFavorite', watchId);
        },

        isFavoriteWatch(watchId) {
            if(this.Favorites) {
             let found = this.Favorites.find((w) => {
                    return w.watch_id == watchId
                })
                if(found) return true
                else return false
            }
        },   

        // truncatedWatchName(name, lengthToTruncate) {
        //     if(name.length > lengthToTruncate) {
        //         return name.substring(0, lengthToTruncate) + '...';
        //     }
        //     else 
        //         return name;
        // },

         titleCase(str) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
            }
            return splitStr.join(' '); 
        }
    },

    computed: {
        Favorites() {
            return this.$store.state.Favorites;
        },

        Collection: {
            set(newCollectionOrder) {
               return this.$store.dispatch('updateCollectionOrder', newCollectionOrder)
            },
            get() {
                return this.$store.state.Collection;
            }
        },

        isManagingCollection() {
            return this.$store.state.isManagingCollection;
        },

        isShowFlags() {
            return this.$store.state.isShowFlags;
        },

        isShowEditFlags() {
            return this.$store.state.isShowEditFlags;
        },

        smSizeCard() {
            return this.$store.state.MobileCardSizeToUse;
        },

        mdSizeCard() {
            return this.$store.state.DesktopCardSizeToUse;
        }
    }
}
</script>

<style scoped>


    #watchName {
        font-size: .80em;
    }

    #seeMore {
        font-size: .70em;
    }

    #searchRef {
        font-size: .60em;
    }

    .btn {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .right {
        float: right;
    }

    .left {
        float: left;
    }

        
    .flag {
        padding: .35em 0 !important;
        font-size: .75em;
    }

    .p-half {
        padding: .5rem;
    }

    .border-xl {
        border: 1px solid lightgray;
    }

    .watchImg {
            width: 100%;
            height: auto;
            /* max-height: 10rem; */
        }

    .tallWatchImg {
        width: auto;
        /* max-height: 25rem; */
    }

    .heartIcon {
        width: 42.5px;
    }

    .swap-list-move {
        transition: transform .75s;
    }


    @media(max-width: 1000px) {
        .border-xl{
            border: none;
        }

        .watchImg {
            /* height: 10rem; */
        }
    }

    @media(min-width: 768px) and (max-width: 1000px) {
        #searchRef, #seeMore {
            font-size: .6em;
        }

        #watchName {
            font-size: .65em;
        } 

        .heartIcon {
            width: 20px;
        }
    }

    @media(max-width: 600px) {
        #editIcon {
        background-size: 1.25em;              
        }

        .flag {
            font-size: .85rem;
            padding: .1em !important;
            
        }

        .watchImg {
            /* height: 5rem; */
            width: 100%
        }

        .heartIcon {
            width: 28px;
        }
    }

    @media(max-width: 415px) {
        #searchRef, #seeMore {
            font-size: .65rem;
        }

        .flag {
            font-size: 10.5px;
            padding: .2em !important;
        }

        .heartIcon {
            width: 22.5px;
        }
    }



/* ANIMATIONS */

/* .bounce {
  animation: pulse .5s;
}

@keyframes pulse {
  100% {
    transform: scale(1.2);
  }
} */



    .dropZone[aria-dropeffect="move"]  {
        border-color:#68b;
        background-color: red;
    }
      .dropZone[aria-dropeffect="move"] .watch-wrapper {
        background-color: #C0D8E0;
    }
     .dropZone[aria-dropeffect="move"]:focus,
    .dropZone[aria-dropeffect="move"].dragover
    {
    outline:none;
    box-shadow:0 0 0 1px #fff, 0 0 0 3px #68b;
    }
     .watch[aria-grabbed="true"] .watch-wrapper
    {
    background:lightgreen;
    color:#fff;
    }


</style>

