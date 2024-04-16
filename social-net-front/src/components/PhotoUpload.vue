<script setup>
import UploadMedia from '../components/LoginRegisterUser.vue'
defineProps({
    uploadPhotoOrVideo: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <UploadMedia :uploadPhotoOrVideo="uploadPhotoOrVideo" />
</template>