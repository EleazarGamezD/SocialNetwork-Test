<script setup>
import { defineComponent } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
</script>
<template>
    <video-player src="/your-path/video.mp4" poster="/your-path/poster.jpg" controls :loop="true" :volume="0.6"
        @mounted="" @ready="" @play="" @pause="" @ended="" @seeking="" />
</template>
