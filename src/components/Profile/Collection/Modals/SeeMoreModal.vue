<template>
    <b-container>
        <b-row align-h="center" v-if="selectedWatch.src">
            <b-col cols="8" class="mx-auto pb-3 border-bottom">
                <b-img :src="selectedWatch.src" fluid></b-img>
            </b-col>
        </b-row>
        <b-row align-h="start">
            <b-col class="mt-0 mt-md-1" cols="12">
                <b-row align-v="center">
                    <b-col cols="6">
                        <h5 class="m-0 p-0 underline">Specs:</h5>
                    </b-col>
                    <b-col cols="6" class="nowrap right-align px-0" v-if="!selectedWatch.isFeaturedWatch">
                        <strong class="relative">Condition:</strong><span class="brown nowrap"> {{selectedWatch.condition || 0}}/10</span> 
                        <p class="absolute nowrap h8 r0 pt-1 underline gray pointer" v-if="isShowDetails" @click="isShowDetails = false"><em>Hide Details</em></p>
                    </b-col>
                    <b-col cols="5" class="nowrap p-2" v-if="selectedWatch.isFeaturedWatch">
                        <a class="brown ml-4 link" href="https://www.ebay.com">Shop {{selectedWatch.name}}</a>
                    </b-col>
                </b-row>
                <ul class="mt-0 p-0 m-0">
                    <li v-if="selectedWatch.brand">
                        <strong>Brand:</strong>
                        <span> {{titleCase(selectedWatch.brand)}}</span>
                    </li>
                    <li v-if="selectedWatch.name">
                        <strong>Name:</strong>
                        <span> {{titleCase(selectedWatch.name)}}</span>
                    </li>

                    <li class="italic gray pointer underline" v-if="!isShowDetails"><p @click="isShowDetails = true"><em>Show Details</em></p></li>

                    <span v-if="isShowDetails">
                        <li v-if="selectedWatch.value">
                        <strong>Value:</strong>
                        <strong class="green">${{selectedWatch.value}}</strong>
                        </li>
                        <li v-if="selectedWatch.movementType">
                            <strong>Movement Type:</strong>
                            <span> {{selectedWatch.movementType}}</span>   
                        </li>
                        <li v-if="selectedWatch.movement">
                            <strong>Movement:</strong>
                            <span> {{selectedWatch.movement}}</span>   
                        </li>
                         <li v-if="selectedWatch.watchStyle">
                            <strong>Style:</strong>
                            <span> {{watchStyleDisplayName(selectedWatch.watchStyle)}}</span>   
                        </li>
                        <li v-if="selectedWatch.sizeWidth && selectedWatch.sizeHeight">
                            <strong>Size:</strong>
                            <span> {{selectedWatch.sizeWidth}} x {{selectedWatch.sizeHeight}}</span>
                        </li>
                        <li v-if="selectedWatch.crystal">
                            <strong>Crystal:</strong>
                            <span> {{selectedWatch.crystal}}</span>   
                        </li>
                        <li v-if="selectedWatch.isFullKit">
                            <strong>Full Kit:</strong>
                            <span> {{selectedWatch.isFullKit ? 'Yes' : 'No'}}</span>   
                        </li>
                        <li v-if="selectedWatch.band">
                            <strong>Band:</strong>
                            <span> {{selectedWatch.band}}</span>   
                        </li>
                        <li v-if="selectedWatch.model">
                            <strong>Model #:</strong>
                            <span> {{selectedWatch.model}}</span>
                        </li>
                        <li v-if="selectedWatch.ref">
                            <strong>Ref #:</strong>
                            <span> {{selectedWatch.ref}}</span>
                        </li>
                        <li v-if="selectedWatch.accuracy">
                            <strong>Accuracy:</strong>
                            <span>{{selectedWatch.accuracy}} seconds</span>
                        </li>
                        <li v-if="selectedWatch.forSalePrice">
                            <strong>For Sale Price:</strong>
                            <span class="green">${{selectedWatch.forSalePrice}}</span>
                        </li>
                        <li v-if="selectedWatch.forTradeValue">
                            <strong>For Trade Value:</strong>
                            <span class="brown">${{selectedWatch.forTradeValue}}</span>
                        </li>
                    </span>
                    
                </ul>
                <h5 v-if="selectedWatch.descriptionNotes">{{selectedWatch.descriptionNotes}}</h5>
                
            </b-col>

            
            <b-col class="mt-3" cols="12" v-if="isUsersWatch">
            <h6 class="lightgray mx-auto mt-2">This section is only visible to you</h6>                        
            <b-col v-if="!isEdit" cols="8" class="border-bottom mx-auto"></b-col>
                <b-row align-v="center">
                    <b-col cols="6">
                        <h5>Keeping House:</h5>
                    </b-col>
                    <b-col cols="5" class="border p-2">
                        <strong>Turnaround:</strong><span class="green ml-4"> ${{selectedWatch.lowestOfferAccepting - selectedWatch.acquiredFor}}</span> 
                    </b-col>
                </b-row>
                <ul>
                    <li>
                        <strong>Acuired For:</strong>
                        <span class="red"> -${{selectedWatch.acquiredFor}}</span>
                    </li>
                    <li>
                        <strong>Lowest Offer Accepting:</strong>
                        <span class="brown"> ${{selectedWatch.lowestOfferAccepting}}</span>
                    </li>
                    <li>
                        <strong>Date Acquired:</strong>
                        <span> {{selectedWatch.dateAcquired}}</span>
                    </li>
                </ul>
                <b-form-textarea id="ownerNotes"
                    placeholder="Description Notes"
                    :rows="3"
                    :max-rows="6"
                    :value="selectedWatch.ownerNotes">
                </b-form-textarea>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';

export default {
    name: 'seeMoreModal',
    props: ['selectedWatch', 'isEdit'],

    data () {
        return {
            isUsersWatch: false,
            isShowDetails: false
        }
        
    },
    methods: {
        watchStyleDisplayName(style) {
            return style.charAt(0).toUpperCase() + style.substr(1)
        }  ,

        titleCase(str) {
            var splitStr = str.toLowerCase().split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
            }
            return splitStr.join(' '); 
        }   
    }
}
</script>

<style>

li {
    list-style: none;
}


</style>

