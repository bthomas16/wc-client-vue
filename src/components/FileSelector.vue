<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="11" class="mx-auto center bg-white p-0 m-0" v-if="isPreviewBox">

                <label class="file-select">
                    <!-- We can't use a normal button element here, as it would become the target of the label. -->
                    <div class="select-button pointer bg-white p-1">
                    <!-- Display the filename if a file has been selected. -->
                        <b-img src="http://localhost:8081/api/static-assets/add-img-icon.png" fluid></b-img>
                    </div>
                    <!-- Now, the file input that we hide. -->
                    <input type="file" @change="uploadImagesToAwsS3()"/>
                </label>
            </b-col>
           <b-col cols="8" md="6" class="mx-auto center" v-else>

                <label class="file-select">
                    <!-- We can't use a normal button element here, as it would become the target of the label. -->
                    <div class="select-button pointer">
                    <!-- Display the filename if a file has been selected. -->
                    <span v-if="value">Selected Files: {{value.name}}</span>
                    <span v-else>Select Images</span>
                    </div>
                    <!-- Now, the file input that we hide. -->
                    <input type="file" @change="uploadImagesToAwsS3()"/>
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
                console.log(event.target.files[0])
                let files = event.target.files[0]
                this.$store.dispatch('uploadImagesToAwsS3', files)
                .then(data => {
                    console.log('omg', data[0])
                    this.$emit('setImages', data[0]);
                }).catch(err => console.log(err));
            }
        }

    }
</script>

<style>
    .file-select > .select-button {
        padding: 1rem;

        color: white;
        background-color: #2EA169;

        border-radius: .3rem;

        text-align: center;
        font-weight: bold;
    }

    /* Don't forget to hide the original file input! */
    .file-select > input[type="file"] {
    display: none;
    }
</style>

