<template>
    <b-container fluid>
        <b-row no-gutters>
            <p class="h2 pt-3 pl-3">Latest Watch News</p>
        </b-row>
        <b-col cols="12">
            <b-row no-gutters v-for="article in articles" :key="article.id" class="my-2 border p-1" @click="routeToArticle(article.id)">
                <b-col cols="12" md="2">
                    <b-img class="p-2" src="http://localhost:8081/api/static-assets/blankprofpic.png" fluid></b-img>
                </b-col>
                <b-col cols="12" md="10" class="p-2">
                    <p class="h3">{{article.title}}</p>
                    <p>{{truncatedText(article.text)}}...</p>
                </b-col>
            </b-row>
        </b-col>
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

