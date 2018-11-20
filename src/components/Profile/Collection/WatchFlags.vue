<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="12" class="p-0 m-0">
                <b-row no-gutters>
                    <p class="w-100 h5 m-h7 p-0 m-0 d-md-none nowrap"><strong>{{truncatedWatchName(titleCase(watch.name), 8)}}</strong></p>
                </b-row>
                <b-row no-gutters v-if="isShowFlags && !isManagingCollection">
                    <!-- FSOT STATUS -->
                    <b-col cols="6" class="bg-red" v-if="(watch.isForSale && !watch.isForTrade)">
                        <p id="forSaleIcon" class=" center pointer z4 flag m-0 white broder-right-white" >Sale</p>
                    </b-col>
                    <b-col cols="6" class="bg-blue" v-if="(!watch.isForSale && watch.isForTrade)">
                        <p id="forTradeIcon" class=" pointer z4 flag m-0 white broder-right-white center">Trade</p>
                    </b-col>
                    <b-col cols="6" v-if="(!watch.isForSale && !watch.isForTrade)" class="bg-blue">
                        <p id="keeperIcon" class=" pointer z4 flag m-0 white broder-right-white center">Keeper</p>
                    </b-col>
                    <b-col cols="6" v-if="(watch.isForSale && watch.isForTrade)" class="bg-blue">
                        <p id="fsotIcon" class=" pointer z4 flag m-0 white broder-right-white center fsot">FSOT</p>
                    </b-col>
                    <!-- MOVEMENT TYPE -->
                    <b-col cols="6" v-if="watch.movementType" class="bg-red">
                        <p id="movementTypeIcon" class=" center pointer z4 white flag m-0" :class="GetAbbreviatedWatchType(watch.movementType).length > 5 ? 'fitText' : ''">{{GetAbbreviatedWatchType(watch.movementType)}}</p>
                    </b-col>
                </b-row>
                <b-row no-gutters v-if="isManagingCollection && isShowEditFlags">
                    <b-col cols="6" md="4" v-if="isManagingCollection"  class="p-0 m-0 nowrap bg-red">
                        <p id="removeIcon" class="h6 center p-1 pointer z4 white" @click="removeWatchModal(watch)"><strong class="h6 mb-0">X</strong></p>
                    </b-col>
                    <b-col cols="6" md="4" v-if="isManagingCollection"  class="p-0 m-0 nowrap bg-blue">
                        <p id="editIcon" class="h6 center p-1 pointer z4 white" @click="editWatch(watch)"></p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
    
</template>

<script>
export default {
    name: 'watchFlags',
    props: ['watch', 'isShowFlags', 'isShowEditFlags', 'isManagingCollection'],
    data () {
        return {
        }
    },
    methods: {
        removeWatchModal(watch){
            this.$emit('removeWatchModal', watch)
        },

        editWatch(watch){
            console.log('duck')
            this.$emit('editWatch', watch)
        },

        truncatedWatchName(name, lengthToTruncate) {
            if(name.length > lengthToTruncate) {
                return name.substring(0, lengthToTruncate) + '...';
            }
            else 
                return name;
        },

         titleCase(str) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
            }
            return splitStr.join(' '); 
        },

        GetAbbreviatedWatchType(fullName) {
            switch(fullName) {
                case "automatic":
                    return "Auto";
                    break;
                case "solar":
                    return "Solar";
                    break;
                case "quartz":
                    return "Quartz";
                    break;  
                case "manual":
                    return "Manual";
                    break; 
            }
        },
    }
}
</script>
<style scoped>
    .detailsIcon{
        border-radius: 5%;
        background-position: center;
        background-repeat:no-repeat;
        width: 2em;
        height: 2em;
        margin-top: -1.1em;
    }

    #editIcon, #removeIcon {
        height: 1.75em;
    }

    #editIcon {
        background-image: url('http://localhost:8081/api/static-assets/editIcon1.png');  
        background-position: center;   
        background-repeat: no-repeat;  
        background-size: 1.5em;           
     }

     .flag {
        padding: .35em 0 !important;
        font-size: .75em;
    }

    .p-half {
        padding: .5rem;
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
        background-size: 1.25rem;              
        }

        .flag {
            font-size: .6rem;
            padding: .3em !important;
            
        }
    }

    @media(max-width: 374px) {
        #searchRef, #seeMore {
            font-size: .65rem;
        }

        .flag {
            font-size: 7.5px;
            padding: .25em;
        }
    }
</style>


