
<template>
    <b-container fluid>
        <b-row no-gutters align-h="center">
            <b-col cols="10" md="8">
                <featured-collection></featured-collection>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import FeaturedCollection from './FeaturedCollection.vue';

    export default {
        
        name: 'discoverWatches',
        components: {
            featuredCollection: FeaturedCollection,
        },
    }
</script>

<style>
    
</style>