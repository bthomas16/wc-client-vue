<template>
    <b-container>
        
            <!-- Add Img Row -->

            <b-row align-h="center" align-v="center" :class="addWatchCount == 1 ? '' : 'hidden'" no-gutters>
                <b-col cols="12" class="mx-auto p-2 m-0">
                    <b-row align-h="start" no-gutters>

                        <draggable @start="startDrag" @end="endDrag" v-model="watchImages" clas="p-0 m-0">
                            <transition-group name="swap-list" class="row">
                                <b-col cols="6" class="relative p-1" v-for="image in addWatch.src.images" :key="image.src">
                                    <div class="absolute t-0 white bg-red r0 p-1 h8 pointer white border-radius-qtr" @click="removeWatchImage(index)" v-if="addWatch.src.images.length > 1">X</div>
                                    <b-img  :src="image.src" fluid class="w-100"></b-img>
                                </b-col>
                            </transition-group>
                        </draggable>

                        <b-col cols="5" md="3" class="border box-shadow p-0 m-1 addWatchContainer imgTile" v-if="!addWatch.src.images.length">
                            <file-selector id="fileSelector" :isPreviewBox="true" v-model="file" v-on:setImagesOnAddWatch="setImagesOnAddWatch"></file-selector>
                        </b-col>
                    </b-row>
                </b-col>
                <file-selector id="fileSelector" :isPreviewBox="false" v-model="file" v-on:setImagesOnAddWatch="setImagesOnAddWatch" class="mt-4"></file-selector>
                <b-col cols="12"><h6 cols="12" class="center mt-3" >Add Some Images</h6></b-col>     
            </b-row>

            <!-- Add Specs Row -->

            <b-row align-h="between" id="add-specs" :class="addWatchCount == 2 ? '' : 'hidden'" no-gutters>
                <b-col cols="12">

                    <b-row align-v="center" align-h="end" no-gutters>
                        <b-col cols="5">
                            <h4><strong>Specs:</strong> </h4>
                        </b-col>
                        <b-col cols="7" class="right right-align">
                            <b-row align-h="end" align-v="center">
                                <b-col class="d-none d-sm-inline-block right-align">Condition:</b-col>
                                <b-col cols="3" md="2" class="right-align p-0 m-0 red bold">
                                    <b-form-input 
                                        v-model="addWatch.condition"
                                        type="number"
                                        class="condition w-100 p-0 m-0 center formBorder"
                                        :class="addWatch.condition ? 'yesValue' : 'formBorder'"
                                        placeholder="N/A"
                                        max="10"
                                        description="Provide a condition for the watch"
                                        label="Watch Condition">
                                    </b-form-input>
                                </b-col>
                                <b-col cols="3" md="2" class="nowrap m-0 left-align p-0">/ 10</b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <b-row align-h="center">
                        <b-col cols="12">
                            <ul class="mt-3 mx-auto">
                                <li>
                                    <b-row align-v="center">
                                        <b-col cols="4" >
                                            <strong>Brand:</strong>  
                                        </b-col>
                                        <b-col cols="8">
                                            <b-form-input v-model="addWatch.brand"
                                                type="text"
                                                placeholder="Watch Brand"
                                                
                                                :class="addWatch.brand ? 'yesValue' : 'formBorder'"
                                                description="Provide a brand for the watch"
                                                label="Watch Brand">
                                            </b-form-input>
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>
                                    <b-row align-v="center">
                                        <b-col cols="4" >
                                            <strong>*Name:</strong>  
                                        </b-col>
                                        <b-col cols="8">
                                            <b-form-input 
                                                v-model="addWatch.name"
                                                type="text"
                                                required
                                                :class="addWatch.name ? 'yesValue' : 'formBorder'"
                                                placeholder="Watch Name"
                                                description="Provide a name for the watch"
                                                label="Watch Name">
                                            </b-form-input>
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>
                                    <b-row align-v="center">
                                        <b-col cols="4" >
                                            <strong>Watch Style:</strong>  
                                        </b-col>
                                        <b-col cols="8">
                                            <b-form-select 
                                            type="text"
                                            
                                            :class="addWatch.watchStyle ? 'yesValue' : 'formBorder'"
                                            :options="styleOptions" 
                                            v-model="addWatch.watchStyle" 
                                            />
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>
                                    <b-row align-v="center" class="mt-0 mt-md-3">
                                        <b-col cols="12" md="4">
                                            <strong>Movement Type:</strong>  
                                        </b-col>
                                        <b-col cols="12" md="8" class="mt-1 md-md-0">
                                            <b-form-group class="my-0">
                                                <b-form-radio-group v-model="addWatch.movementType" name="radioSubComponent" type="text">
                                                    <b-row align-v="center" no-gutters>
                                                        <b-col cols="7" md="6">
                                                            <b-form-radio value="automatic" :class="addWatch.movementType == 'Automatic' ? 'yesValue' : ''">Automatic</b-form-radio>
                                                        </b-col>
                                                        <b-col cols="5" md="6">
                                                            <b-form-radio value="manual" :class="addWatch.movementType == 'Manual' ? 'yesValue' : ''">Manual</b-form-radio>
                                                        </b-col>
                                                    </b-row>
                                                    <b-row align-v="center" no-gutters class="pt-1 pt-md-2">
                                                        <b-col cols="7" md="6">
                                                            <b-form-radio value="quartz" :class="addWatch.movementType == 'Quartz' ? 'yesValue' : ''">Quartz</b-form-radio>
                                                        </b-col>
                                                        <b-col cols="5" md="6">
                                                            <b-form-radio value="solar" :class="addWatch.movementType == 'Solar' ? 'yesValue' : ''">Solar</b-form-radio>
                                                        </b-col>
                                                    </b-row>
                                                </b-form-radio-group>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>
                                    <b-row align-v="center">
                                        <b-col cols="12" sm="4" >
                                            <strong>Movement:</strong>  
                                        </b-col>
                                        <b-col cols="12" sm="8">
                                            <b-form-select :class="addWatch.movement ? 'yesValue' : 'formBorder'" :options="movementOptions" v-model="addWatch.movement" type="text"/>
                                        </b-col>
                                    </b-row>   
                                </li>
                                <li>
                                    <b-row align-v="center">
                                        <b-col cols="12" md="4">
                                            <strong>Size (Lug to Lug):</strong>  
                                        </b-col>
                                        <b-col cols="12" md="8">
                                            <b-form-select :class="addWatch.sizeLugToLug ? 'yesValue' : 'formBorder'" :options="sizeLugToLugOptions" v-model="addWatch.sizeLugToLug" type="text"/>
                                        </b-col>
                                    </b-row>   
                                </li>
                                <li>
                                    <b-row align-v="center">
                                        <b-col cols="12" md="4">
                                            <strong>Size:</strong>  
                                        </b-col>
                                        <b-col cols="12" md="8" class="">
                                            <b-row no-gutters align-v="baseline">
                                                <b-col class="px-1">
                                                    <b-form-select :class="addWatch.sizeWidth ? 'yesValue' : 'formBorder'" :options="sizeWidthOptions" v-model="addWatch.sizeWidth" type="number"/> 
                                                    <p class="center h8 p-0 m-0"><em>Width</em></p>
                                                </b-col>
                                                <h6 class="p-2">X</h6>
                                                <b-col class="px-1">
                                                    <b-form-select :class="addWatch.sizeHeight ? 'yesValue' : 'formBorder'" :options="sizeHeightOptions" v-model="addWatch.sizeHeight" type="number"/> 
                                                    <p class="center h8 p-0 m-0"><em>Height</em></p>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                </li>
                                <li>
                                    <b-row align-v="center">
                                        <b-col cols="12" md="4" >
                                            <strong>Crystal:</strong>  
                                        </b-col>
                                        <b-col cols="12" md="8">
                                            <b-form-group class="my-auto">
                                                <b-form-radio-group v-model="addWatch.crystal" name="crystal"  type="text">
                                                    <b-row align-h="start">
                                                        <b-col cols="5">
                                                            <b-form-radio value="Sapphire" class="m-1" :class="addWatch.crystal == 'Sapphire' ? 'yesValue' : ''">Sapphire</b-form-radio>
                                                        </b-col>
                                                        <b-col cols="7">
                                                            <b-form-radio value="Domed-Sapphire" class="m-1 nowrap" :class="addWatch.crystal == 'Domed-Sapphire' ? 'yesValue' : ''">Domed-Sapphire</b-form-radio>
                                                        </b-col>
                                                    </b-row>
                                                    <b-row>
                                                        <b-col cols="5">
                                                            <b-form-radio value="Mineral" class="m-1" :class="addWatch.crystal == 'Mineral' ? 'yesValue' : ''">Mineral</b-form-radio>
                                                        </b-col>
                                                        <b-col cols="7">
                                                            <b-form-radio value="Domed-Mineral" class="m-1 nowrap" :class="addWatch.crystal == 'Domed-Mineral' ? 'yesValue' : ''">Domed-Mineral</b-form-radio>
                                                        </b-col>
                                                    </b-row>
                                                </b-form-radio-group>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>   
                                </li>
                            </ul>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <!-- SPECS PART 2 -->

            <b-row :class="addWatchCount == 3 ? '' : 'hidden'" align-h="center" align-v="center" no-gutters>
                <b-col cols="12">
                    <h4><strong>Specs Continued:</strong> </h4>
                </b-col>
                <ul class="m-0 p-0 w-100 mx-auto">
                    <li class="border bg-lightgray left-align m-center pt-3 px-md-2 p-0">
                        <b-row align-v="start">
                            <b-col cols="5" class="m-h2 left-align pl-4 pt-1">
                                <strong>Full Kit:</strong>  
                            </b-col>
                            <b-col cols="7">
                                <b-form-group>
                                    <b-form-radio-group v-model="addWatch.isFullKit" name="isFullKit" class="mt-0 nowrap">
                                        <b-form-radio value="true">Yes</b-form-radio>
                                        <b-form-radio value="false">No</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>
                            </b-col>
                        </b-row>  
                        <b-row align-v="start">
                            <b-col cols="5" class="m-h2 left-align pl-4 pt-1">
                                <strong>For Sale:</strong>  
                            </b-col>
                            <b-col cols="7">
                                <b-form-group>
                                    <b-form-radio-group v-model="addWatch.isForSale" name="isForSale" class="mt-0 nowrap">
                                        <b-form-radio value="true">Yes</b-form-radio>
                                        <b-form-radio value="false">No</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>
                            </b-col>
                        </b-row>   
                        <b-row align-v="start">
                            <b-col cols="5" class="m-h2 left-align pl-4 pt-1">
                                <strong>For Trade:</strong>  
                            </b-col>
                            <b-col cols="7">
                                <b-form-group>
                                    <b-form-radio-group v-model="addWatch.isForTrade" name="isForTrade" class="mt-0 nowrap">
                                        <b-form-radio value="true">Yes</b-form-radio>
                                        <b-form-radio value="false">No</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>
                            </b-col>
                        </b-row>    
                    </li>
                    <li class="my-2">
                        <b-row align-v="center">
                            <b-col cols="4" >
                                <strong>Band:</strong>  
                            </b-col>
                            <b-col cols="8">
                                <b-form-input v-model="addWatch.band"
                                    type="text"
                                    :class="addWatch.band ? 'yesValue' : 'formBorder'"
                                    placeholder="Watch Band"
                                    description="Provide band details for this watch"
                                    label="Watch Band">
                                </b-form-input>
                            </b-col>
                        </b-row>   
                    </li>
                    <li class="my-2">
                        <b-row align-v="center">
                            <b-col cols="4" class="nowrap">
                                <strong>Model #:</strong>  
                            </b-col>
                            <b-col cols="8">
                                <b-form-input v-model="addWatch.model"
                                    type="text"
                                    :class="addWatch.model ? 'yesValue' : 'formBorder'"
                                    placeholder="L.367"
                                    description="Provide a model number for this watch"
                                    label="Watch Model Number">
                                </b-form-input>
                            </b-col>
                        </b-row>   
                    </li>
                    <li class="my-2">
                        <b-row align-v="center">
                            <b-col cols="4" >
                                <strong>Ref #:</strong>  
                            </b-col>
                            <b-col cols="8">
                                <b-form-input v-model="addWatch.ref"
                                    type="text"
                                    :class="addWatch.ref ? 'yesValue' : 'formBorder'"
                                    placeholder="mk148l009"
                                    description="Provide a reference number for this watch"
                                    label="Watch Reference Number">
                                </b-form-input>
                            </b-col>
                        </b-row>   
                    </li>
                    <li class="my-2">
                        <b-row align-v="center">
                            <b-col cols="4" class="m-h2">
                                <strong>Accuracy:</strong>  
                            </b-col>
                            <b-col cols="8" class="red">
                                <b-form-select 
                                type="text"
                                class="m-h2" 
                                :class="addWatch.accuracy ? 'yesValue' : 'formBorder'" 
                                :options="accuracyOptions" 
                                v-model="addWatch.accuracy"/>
                            </b-col>
                        </b-row>   
                    </li>
                    <li class="my-2">
                        <b-row align-v="center">
                            <b-col cols="4" class="nowrap m-h2" >
                                <strong>Sale Prize:</strong>  
                            </b-col>
                            <b-col cols="8" class="relative">
                                <p class="absolute mt-2 h5 green dollarSign">$</p>
                                <b-form-input 
                                    v-model="addWatch.forSalePrice"
                                    :value=" addWatch.forSalePrice"
                                    type="number"
                                    :class="addWatch.forSalePrice ? 'yesValue' : 'formBorder'"
                                    placeholder="100"
                                    description="Provide a sale prthis watch"
                                    label="Watch Sale Price">
                                </b-form-input>
                            </b-col>
                        </b-row>   
                    </li>
                    <li>
                        <b-row align-v="center">
                            <b-col cols="4" class="nowrap m-h3">
                                <strong>Trade Value:</strong>  
                            </b-col>
                            <b-col cols="8">
                                <p class="absolute mt-2 h5 green dollarSign">$</p>
                                
                                <b-form-input v-model="addWatch.forTradeValue"
                                    type="number"
                                    :class="addWatch.forTradeValue ? 'yesValue' : 'formBorder'"
                                    placeholder="150"
                                    description="Provide a trade value for this watch"
                                    label="Watch Trade Value">
                                </b-form-input>
                            </b-col>
                        </b-row>   
                    </li>
                </ul>
            </b-row>

            <!-- Keeping House -->

            <b-row id="add-keeping-house" :class="addWatchCount == 4 ? '' : 'hidden'" align-h="center" no-gutters>
                <!-- <b-col cols="8" v-if="!isEditMode" class="border-bottom mx-auto"></b-col> -->

                <p class="gray center mt-2 border-bottom m-h2 nowrap">This section is only visible to you</p>                        
                
                <b-col class="mt-3" cols="12">
                    <b-row align-v="center">
                        <b-col cols="6" class="h3 m-h2">
                            <strong>Keeping House:</strong>
                        </b-col>
                        <b-col cols="5" class="m-h2 nowrap">
                            <strong>Turnaround:</strong><span class="green ml-0 ml-md-4"> ${{addWatch.marketValue - addWatch.acquiredFor || 0}}</span> 
                        </b-col>
                    </b-row>
                    <ul>
                        <li>
                            <b-row>
                                <b-col cols="4" class="m-h2">
                                    <strong>Acuired For:</strong>
                                </b-col>
                                <b-col cols="8">
                                    <b-form-input v-model="addWatch.acquiredFor"
                                        type="number"
                                        :class="addWatch.acquiredFor ? 'yesValue' : 'formBorder'"
                                        placeholder="$250"
                                        description="Provide the price you acquired this piece for"
                                        label="Watch Price Acquired For">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row>
                                <b-col cols="4" class="m-h3">
                                    <strong>Market Value:</strong>
                                </b-col>
                                <b-col cols="8">
                                    <b-form-input v-model="addWatch.marketValue"
                                        type="number"
                                        :class="addWatch.marketValue ? 'yesValue' : 'formBorder'"
                                        placeholder="$200"
                                        description="Provide the fair makret value"
                                        label="Market Value">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row>
                                <b-col cols="4" class="m-h3">
                                    <strong>Date Acquired:</strong>
                                </b-col>
                                <b-col cols="8">
                                    <b-form-input v-model="addWatch.dateAcquired"
                                        type="text"
                                        :class="addWatch.dateAcquired ? 'yesValue' : 'formBorder'"
                                        placeholder="4/20/2018"
                                        description="Provide the date you acquired this watch"
                                        label="Watch Price Acquired For">
                                    </b-form-input>
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                    <b-form-textarea id="ownerNotes"
                        class="mt-3"
                        type="text"
                        placeholder="Description Notes"
                        :rows="3"
                        :max-rows="6"
                        v-model="addWatch.ownerNotes">
                    </b-form-textarea>
                </b-col>
            </b-row>
            
        </b-container>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import FileSelector from '../FileSelector.vue';

export default {
    components: {
        draggable,
        fileSelector: FileSelector
    },
    name: 'addWatchModal',
    props: {
        addWatch: { 
            src: Array,
        },
        addWatchCount: Number
    },

    data () {
        return {
            file: null,
            addWatchTitle: "Add your first watch!",
            styleOptions: [
                { value: null, text: 'Select a Style', disabled: true},
                { value: 'diver', text: 'Diver'},
                { value: 'dress', text: 'Dress'},
                { value: 'chronograph', text: 'Chronograph'},
                { value: 'tourbillon', text: 'Tourbillon'},
                { value: 'black tie', text: 'Black Tie'},
                { value: 'sport', text: 'Sport'},
                { value: 'smart', text: 'Smart'},
                { value: 'apple', text: 'Apple'},
                { value: 'casual', text: 'Casual'},
                { value: 'orienteering', text: 'Orienteering'},
            ],

            accuracyOptions: 
            [
                {value: null, text: 'Select Accuracy' },
                { value: '-6 -', text: '-6 seconds or less'},
                { value: '-5', text: '-5 seconds' },
                { value: '-4', text: '-4 seconds' },
                { value: '-3', text: '-3 seconds' },
                { value: '-2', text: '-2 seconds' },
                { value: '-1', text: '-1 seconds' },
                { value: '0', text: '0 seconds' },
                { value: '+1', text: '+1 seconds' },
                { value: '+2', text: '+2 seconds' },
                { value: '+3', text: '+3 seconds' },
                { value: '+4', text: '+4 seconds' },
                { value: '+5', text: '+5 seconds' },
                { value: '+6', text: '+6 seconds' },
                { value: '+6 +', text: '+6 seconds or more'}
            ],

            movementOptions: 
            [
                { value: null, text: 'Select a Movement' },
                { value: 'Swiss - ETA 2824-2', text: 'Swiss - ETA 2824-2'},
                { value: 'Swiss - ETA 2824-2', text: 'Swiss - ETA 2824-2'},
                { value: 'Swiss - ETA 2824-2', text: 'Swiss - ETA 2824-2'},
                { value: 'Swiss - ETA 2824-2', text: 'Swiss - ETA 2824-2'},
                { value: 'Swiss - ETA 2824-2', text: 'Swiss - ETA 2824-2'},
                { value: 'Swiss - ETA 2824-2', text: 'Swiss - ETA 2824-2'},
                { value: 'Swiss - ETA 2824-2', text: 'Swiss - ETA 2824-2'},
                { value: 'Swiss - ETA 2824-2', text: 'Swiss - ETA 2824-2'}
            ],

            sizeLugToLugOptions: 
            [
                { value: null, text: 'Select a Lug to Lug Size', disabled: true},
                { value: '15mm', text: 'Under 16mm wide' },
                { value: '16mm', text: '16mm' },
                { value: '17mm', text: '17mm' },
                { value: '18mm', text: '18mm' },
                { value: '19mm', text: '19mm' },
                { value: '20mm', text: '20mm' },
                { value: '21mm', text: '21mm' },
                { value: '22mm', text: '22mm' },
                { value: '23mm', text: '23mm' },
                { value: '24mm', text: '24mm' },
                { value: '25mm', text: '25mm' },
                { value: '26mm', text: '26mm' },
                { value: '27mm', text: '27mm' },
                { value: '28mm', text: '28mm' },
                { value: '29mm', text: '29mm' },
                { value: '30mm', text: '30mm' },
                { value: '31mm', text: '31mm' },
                { value: '32mm', text: '32mm' },
                { value: '33mm', text: '33mm' },
                { value: '34mm', text: '34mm' },
                { value: '35mm', text: '35mm' },
                { value: '36mm', text: 'Over 35mm wide' }
            ],
            
            sizeWidthOptions: 
            [
                { value: null, text: 'Width', disabled: true},
                { value: '27mm', text: 'Under 28mm wide' },
                { value: '28mm', text: '28mm' },
                { value: '29mm', text: '29mm' },
                { value: '30mm', text: '30mm' },
                { value: '31mm', text: '31mm' },
                { value: '32mm', text: '32mm' },
                { value: '33mm', text: '33mm' },
                { value: '34mm', text: '34mm' },
                { value: '35mm', text: '35mm' },
                { value: '36mm', text: '36mm' },
                { value: '37mm', text: '37mm' },
                { value: '38mm', text: '38mm' },
                { value: '39mm', text: '39mm' },
                { value: '40mm', text: '40mm' },
                { value: '41mm', text: '41mm' },
                { value: '42mm', text: '42mm' },
                { value: '43mm', text: '43mm' },
                { value: '44mm', text: '44mm' },
                { value: '45mm', text: '45mm' },
                { value: '46mm', text: '46mm' },
                { value: '47mm', text: '47mm' },
                { value: '48mm', text: '48mm' },
                { value: '49mm', text: '49mm' },
                { value: '50mm', text: '50mm' },
                { value: '51mm', text: '51mm' },
                { value: '52mm', text: '52mm' },
                { value: '53mm', text: '53mm' },
                { value: '54mm', text: '54mm' },
                { value: '55mm', text: '55mm' },
                { value: '56mm', text: '56mm' },
                { value: '57mm', text: '57mm' },
                { value: '58mm', text: '58mm' },
                { value: '59mm', text: '59mm' },
                { value: '60mm', text: 'Over 59mm wide' }
            ],

            sizeHeightOptions: 
            [
                { value: null, text: 'Height', disabled: true},
                { value: '6mm', text: 'Under 7mm Height' },
                { value: '7mm', text: '7mm' },
                { value: '8mm', text: '8mm' },
                { value: '9mm', text: '9mm' },
                { value: '10mm', text: '10mm' },
                { value: '11mm', text: '11mm' },
                { value: '12mm', text: '12mm' },
                { value: '13mm', text: '13mm' },
                { value: '14mm', text: '14mm' },
                { value: '15mm', text: '15mm' },
                { value: '16mm', text: '16mm' },
                { value: '17mm', text: '17mm' },
                { value: '18mm', text: '18mm' },
                { value: '19mm', text: '19mm' },
                { value: '20mm', text: '20mm' },
                { value: '21mm', text: '21mm' },
                { value: '22mm', text: '22mm' },
                { value: '23mm', text: '23mm' },
                { value: '24mm', text: '24mm' },
                { value: '25mm', text: '25mm' },
                { value: '26mm', text: '26mm' },
                { value: '27mm', text: '27mm' },
                { value: '28mm', text: '28mm' },
                { value: '29mm', text: '29mm' },
                { value: '30mm', text: 'Over 29mm Height'}
            ],
            drag: false,
            draggingId: '',
        }
        
    },
    methods: {
        addWatchSpecs(specs) {
            this.isEditMode = true;            
            this.addWatch.specs = 
            localStorage.setItem('addWatch', specs);
        },

        setImagesOnAddWatch(images) {
            console.log(images, 'das it')
            images.forEach(image => {
                let imageObjToPush = {
                    src: image.Location,
                    order: image.order
                };
                this.addWatch.src.images.push(imageObjToPush)
            })
        },

        removeWatchImage(indexToRemove) {
            if (this.addWatch.src.images.length > 1) {
                this.addWatch.src.images.splice(indexToRemove, 1);
            } else {
                return false;
            }
        },

        startDrag(e) {
            this.drag = true;
            this.draggingId = e.item.id;
        },

        endDrag(e) {
            this.drag = false;
        }
    },

    computed: {
        addWatchAccuracy() {
            this.addWatch.accuracy = null;
        },

        watchImages: {
            set(newImagesOrder) {
                // console.log('yayyyy im updating the image order', newImagesOrder)
                console.log(newImagesOrder, 'dicke')
                this.addWatch.src.images = newImagesOrder;
                },
            get() {
               return this.addWatch.src.images
            }
        },
    }
}
</script>

<style scoped>
    .imgTile {
       width: 100%;
       height:auto; 
    }

    .addWatchContainer {
        width: 100%;
        height: 100%;
    }

    .previewBox {
        width: 10rem;
        height: 7rem;
        overflow: hidden;
    }

    .formBorder {
        border: none;
        border-bottom: 2px solid lightgray;
    }

    .modal-body {
        padding: .5rem;
    }

    #add-img-div {
        min-width: 100px;
        min-height: 100px;
    }

    ul {
        margin: 0;
        padding: 0;
        max-width: 90%;
    }

    li {
        text-decoration: none;
        list-style-type: none;
        margin: .5em 0 .5em 0;
    }

    li .form-control, .condition {
        border-radius: 0;
        background-clip: none;
    }

    .yesValue {
        color: black;
        font-weight: bolder;
        border:none;
        border-bottom: lightgreen .25px solid;
    }

    .noValue {
        color: black;
        font-weight: lighter;
        border: lightgoldenrodyellow .25px solid;
    }

    .form-control:focus {
        border-color: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .dollarSign {
        margin-left: -.25em;
    }
    
    @media(max-width: 761px) {
        ul {
        max-width: 100%;
        }

        .imgTile {
        width: 100%;
        min-height: 6rem; 
        }
    }


    /* ANIMATIONS */

    .swap-list-move {
        transition: transform .75s;
    }
</style>

