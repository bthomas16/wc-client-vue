<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="10" class="mx-auto center bg-white p-0 mt-2 mt-sm-2 mt-md-4 mt-lg-0" v-if="isPreviewBox">
                <label class="file-select">
                    <!-- We can't use a normal button element here, as it would become the target of the label. -->
                    <div class="select-button pointer bg-white">
                    <!-- Display the filename if a file has been selected. -->
                        <b-img class="" src="http://localhost:8081/api/static-assets/add-img-icon.png" fluid></b-img>
                    </div>
                    <!-- Now, the file input that we hide. -->
                    <input type="file" @change="uploadImagesToAwsS3()" multiple/>
                </label>
            </b-col>
           <b-col cols="8" md="6" class="mx-auto center" v-else>
                <label class="file-select">
                    <!-- We can't use a normal button element here, as it would become the target of the label. -->
                    <div class="select-button pointer">
                    <!-- Display the filename if a file has been selected. -->
                    <span class="m-h2">Select Images</span>
                    </div>
                    <!-- Now, the file input that we hide. -->
                    <input type="file" @change="uploadImagesToAwsS3()" multiple/>
                </label>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {
        name: 'fileSelector',
        props: {
            value: File,
            isPreviewBox: Boolean
        },

        methods: {
            uploadImagesToAwsS3(e) {
                let files = event.target.files
                console.log('foos', files)
                this.$store.dispatch('uploadImagesToAwsS3', files)
                .then(data => {
                    console.log('omg', data)
                    this.$emit('setImagesOnAddWatch', data);
                }).catch(err => console.log(err));
            }
        }

    }
</script>

<style>
    .file-select > .select-button {
        padding: 1rem;

        color: white;
        background-color: #56A3A6;

        border-radius: .3rem;

        text-align: center;
        font-weight: bold;
    }

    /* Don't forget to hide the original file input! */
    .file-select > input[type="file"] {
        display: none;
    }
</style>

