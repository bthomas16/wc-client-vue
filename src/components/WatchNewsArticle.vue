<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="10" class="mx-auto my-2">
                <b-img :src="article.articleImg" fluid></b-img>
            </b-col>
            <b-col cols="12 mx-auto px-2">
                <p class="h2 p-1">{{article.title}}</p>
                <p class="bg-lightgray p-2">{{article.text}}</p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'watchNews',
        
        data: function() {
            return {
                article: ''
            }
        },

        methods: {

        },

        computed: {

        },

        created() {
            let id = this.$route.params.id;
            this.$store.dispatch('getWatchNewsArticleById', id).then(article => {
                this.article = article;
            })
        }
    }
</script>

<style>
    
</style>

