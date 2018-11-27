<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="8" class="mx-auto">

            </b-col>
            <b-img src="" fluid></b-img>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'watchNews',

        data: function() {
            return {
                articles: []
            }
        },

        methods: {
            truncatedText(text) {
                if (text.length >= 400)
                    return text.substr(0, 400);
                return text;
            },

            routeToArticle(articleId) {
                this.$router.push({path: '/watch-news/' + articleId})
            }
        },

        computed: {
            
        },

        created() {
            this.$store.dispatch('getWatchNewsArticles').then(articles => {
                this.articles = articles;
            })
        }

    }
</script>

<style>
    
</style>

