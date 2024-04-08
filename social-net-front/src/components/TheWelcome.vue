<script setup>
import { ref } from "vue";
import { VideoService } from "@/services/VideoService";
import Carousel from 'primevue/carousel';

import IconStar from '@/components/icons/IconStar.vue';
const service = new VideoService();
const videos = service.getVideos();

async function fetchVideos() {
  const allvid = await service.getAllVideos();
  console.log(allvid);
};



const images = ref([
  {
    name: "IMG1",
    url: 'src/assets/imgages/games_images/valorant.jpg',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "IMG2",
    url: 'src/assets/imgages/games_images/hl2.jpg',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "IMG3",
    url: 'src/assets/imgages/games_images/Fornite.jpg',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "IMG4",
    url: 'src/assets/imgages/games_images/banner.jpg',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
]);

const streamer = ([
  {
    id: "01",
    name: "PuKyNeT",
    avatarUrl: 'src/assets/imgages/avatares/av1.jpg',
    status: 'Online',
    streamCategory: 'LifeStile',
  },
  {
    id: "02",
    name: "Yolanda_Life",
    avatarUrl: 'src/assets/imgages/avatares/av2.jpg',
    status: 'Online',
    streamCategory: 'JustChat',
  },
  {
    id: "03",
    name: "Sniper_killer",
    avatarUrl: 'src/assets/imgages/avatares/av3.jpg',
    status: 'Offline',
    streamCategory: 'Games',
  },
  {
    id: "04",
    name: "Chukuturt",
    avatarUrl: 'src/assets/imgages/avatares/av4.jpg',
    status: 'Offline',
    streamCategory: 'VrChat',
  },
  {
    id: "05",
    name: "RetroGames",
    avatarUrl: 'src/assets/imgages/avatares/av5.jpg',
    status: 'Online',
    streamCategory: 'Games',
  },
])



</script>
<template>
  <div class="welcome-content">
    <div class="carousel-container">
      <Carousel :value="images" :numVisible="1" circular :autoplayInterval="3000">
        <template #item="{ data }">
          <div class="carousel-item">
            <img :src="data.url" :alt="data.name" class="carousel-image" />
          </div>
        </template>
      </Carousel>
    </div>
    <div class="top_streamers">
      <div class="icon">
        <IconStar />
        <p class="title">Top Streamers</p>
      </div>

      <div class="loader" v-for="streamer in streamer" :key="streamer.id">
        <div class="position">{{ streamer.id }}</div>
        <div class="avatar"><img :src="streamer.avatarUrl" :alt="streamer.name" class="streamer-avatar" /></div>
        <div class="info">
          <p class="name">{{ streamer.name }}</p>
          <p class="category">{{ streamer.streamCategory }}</p>
        </div>
        <div class="status">{{ streamer.status }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.top_streamers {
  background-color: #a5a5b0;
  padding: 1em;
  padding-bottom: 1.1em;
  border-radius: 15px;
  margin: 1em;
  box-shadow: 20px 30px 20px 1px rgb(0 0 0 /60%);
}

.loader {
  display: flex;
  flex-direction: row;
  height: 4em;
  padding-left: 1em;
  padding-right: 1em;
  justify-content: left;
  border-radius: 10px;
  transition: .4s ease-in-out;
  box-shadow: 1px 1px 1px 3px rgb(0 0 0 / 5%);
}

.loader:hover {
  cursor: pointer;
  background-color: lightgray;
}

.icon {
  display: flex;
  margin: 1em;
}

.star-icon {
  width: 50px;
  height: 50px;
  margin-right: 0.6em;
}

.title {
  text-align: left;
  color: white;
  font-weight: 700;
  font-size: 30px;
}

.position {
  position: relative;
  height: 1.6em;
  width: 1.6em;
  align-self: center;
  margin-top: 0.3em;
  justify-self: center;
}

.streamer-avatar {
  width: 35px;
  height: 35px;
  margin-top: 0.2em;
  margin-left: 0.2em;
  border-radius: 50%;
  align-content: center;
}

.avatar {
  margin-right: 1em;
  height: 40px;
  width: 40px;
  background-color: rgb(233, 232, 232);
  align-self: center;
  border-radius: 5px;
}

.info {
  position: relative;
  margin-right: 1em;
  color: black;
  align-self: center;
}

.name {
  color: yellow;
  font-weight: 700;
  font-size: 1em;
  font-style: bold;
}

.category {
  font-size: 0.9em;
}

.welcome-content {
  display: grid;
  grid-template-columns: 2fr 3fr;
  justify-content: space-between;
  align-items: center;
}



.carousel-container {
  width: 700px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: #a5a5b0;
  box-shadow: 20px 30px 20px 1px rgb(0 0 0 /60%);
}


.carousel-image {
  width: 100%;
  height: 300px;
  border-radius: 10px;
}

.carousel-item {
  text-align: center;
}

@media (min-width: 1024px) {}
</style>