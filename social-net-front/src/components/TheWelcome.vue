<script setup>
import { ref, onMounted } from "vue";
import { VideoService } from "@/services/VideoService";
import Carousel from 'primevue/carousel';
import IconStar from '@/components/icons/IconStar.vue';

const service = new VideoService();
const videos = ref([]);

async function fetchVideos() {
  try {
    const allVideos = await service.getAllVideos();
    if (allVideos.data.length < 3) {
      videos.value = noVideos;
    } else {
      videos.value = allVideos.data;
      console.log(videos.value)
    }


  } catch (error) {
    console.error('mensaje del error', error.response.data);

  }

};
window.onload = function () {
  const videoPlayer = document.getElementById("videoPlayer");

  if (videoPlayer) {
    videoPlayer.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "https://www.otra-pagina.com";
    });
  }
};
async function fetchVideoById(id) {
  try {
    const video = await service.getVideoById(id);
    console.log('Video encontrado:', video);
  } catch (error) {
    console.error('mensaje del error', error.response.data);

  }
}
const images = ref([
  {
    name: "IMG1",
    url: 'src/assets/images/games_images/valorant.jpg',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "IMG2",
    url: 'src/assets/images/games_images/hl2.jpg',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "IMG3",
    url: 'src/assets/images/games_images/Fornite.jpg',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "IMG4",
    url: 'src/assets/images/games_images/banner.jpg',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
]);
const streamers = ([
  {
    id: "01",
    name: "PuKyNeT",
    avatarUrl: 'src/assets/images/avatares/av1.jpg',
    status: 'Online',
    streamCategory: 'LifeStile',
  },
  {
    id: "02",
    name: "Yolanda_Life",
    avatarUrl: 'src/assets/images/avatares/av2.jpg',
    status: 'Online',
    streamCategory: 'JustChat',
  },
  {
    id: "03",
    name: "Sniper_killer",
    avatarUrl: 'src/assets/images/avatares/av3.jpg',
    status: 'Offline',
    streamCategory: 'Games',
  },
  {
    id: "04",
    name: "Chukuturt",
    avatarUrl: 'src/assets/images/avatares/av4.jpg',
    status: 'Offline',
    streamCategory: 'VrChat',
  },
  {
    id: "05",
    name: "RetroGames",
    avatarUrl: 'src/assets/images/avatares/av5.jpg',
    status: 'Online',
    streamCategory: 'Games',
  },
]);

const noVideos = ([
  {
    id: "01",
    title: "No videos available",
    description: "Try again later.",

  },
  {
    id: "02",
    title: "No videos available",
    description: "Try again later.",

  },
  {
    id: "03",
    title: "No videos available",
    description: "Try again later.",

  },
])


onMounted(fetchVideos);
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
      <div class="loader" v-for="streamer in streamers" :key="streamer.id">
        <div class="position">{{ streamer.id }}</div>
        <div class="avatar"><img :src="streamer.avatarUrl" :alt="streamer.name" class="streamer-avatar"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms" controls="false" /></div>
        <div class="info">
          <p class="name">{{ streamer.name }}</p>
          <p class="category">{{ streamer.streamCategory }}</p>
        </div>
        <div :class="['status', streamer.status === 'Online' ? 'status-online' : 'status-offline']">{{ streamer.status
          }}</div>
      </div>
    </div>
  </div>
  <div class="spacer">
    <div class="trending">
      <div class="title-spacer title">#Trending</div>
      <div class="subtitle">Juega con tus amigos</div>
    </div>
  </div>
  <div class="videos">
    <div class="card" v-for="video in videos" :key="video.id">
      <div class="card-image-container">
        <template v-if="video.title === 'No videos available'">
          <img src="../assets/images/no_video.jpg" alt="No signal" class="video-image" />
        </template>
        <!--   Mostrar el iframe si video.url es una URL de video válida -->
        <template v-else>
          <iframe id="videoPlayer" :src="video.url" :title="video.title" class="video-iframe" loading="lazy"
            name="Video Frame"></iframe>
        </template>
      </div>
      <p class="card-title">{{ video.title }}</p>
      <p class="card-des">{{ video.description }}</p>
      <div class="card-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 384 512" stroke-width="0"
          fill="currentColor" stroke="currentColor">
          <path
            d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z">
          </path>
        </svg>
        <span class="card-btn-text">Ver Video</span>
      </div>
    </div>
  </div>


</template>
<style scoped>
.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0;
}

.top_streamers {
  background-color: #6a6a70;
  padding: 1em;
  border-radius: 15px;
  margin-left: 1em;
  flex: 1;
  max-width: 35%;
  min-height: 400px;
  max-height: 600px;
  box-shadow: 20px 30px 20px 1px rgb(0 0 0 /60%);
}

.loader {
  display: flex;
  flex-direction: row;
  height: 4em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 10px;
  transition: .4s ease-in-out;
  box-shadow: 1px 1px 1px 3px rgb(0 0 0 / 5%);
}

.loader:hover {
  background-color: lightgray;
}

.icon {
  display: flex;
  margin: 1em;
}

.star-icon {
  width: 25px;
  height: 25px;
  margin-right: 0.6em;
  rotate: 43deg;
}

.title {
  text-align: left;
  color: white;
  font-weight: 700;
  font-size: 20px;
}

.position {
  position: relative;
  height: 1.6em;
  width: 1.6em;
  align-self: center;
  margin-top: 0.3em;
  justify-self: center;
  font-size: 20px;
  font-weight: 500;
  color: aliceblue;
  text-shadow: 2px 2px 5px #000000;
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

.status {
  margin-right: 1em;
  align-self: center;
  font-size: 1em;
  background-color: rgb(51, 50, 50);
  border-radius: 15px;
  width: 100px;
  text-align: center;
  font-weight: 700;
  box-shadow: 2px 3px 2px 1px rgb(0 0 0 /60%);
}

.status-online {
  color: #16bb3a;
}

.status-offline {
  color: #d38c07;
}

/* carousel */
.carousel-container {
  flex: 1;
  max-width: 60%;
  border-radius: 10px;
  background-color: #a5a5b0;
  box-shadow: 20px 30px 20px 1px rgb(0 0 0 /60%);
}


.carousel-image {
  top: 0px;
  width: 100%;
  min-height: 200px;
  max-height: 300px;
  border-radius: 10px;
  z-index: 0;
}

.carousel-item {
  text-align: center;
}



.videos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 0;
}

/* Estilos para el iframe de video */
.video-iframe {
  width: 100%;
  height: 200px;
  border: none;

}

/* Estilos para la imagen de 'no signal' */
.video-image {
  top: 3px;
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
}


/* estilos para el video */
.card {
  flex: 0 0 calc(30% - 20px);
  margin: 10px;
  max-width: 340px;
  flex-direction: column;

  height: 390px;
  max-height: 400px;
  background-color: var(--color-heading);
  border-radius: 10px;
  box-shadow: 20px 30px 20px 1px rgb(0 0 0 /60%);
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1),
    -4px -4px 12px rgba(0, 0, 0, 0.08);
}

.card-image-container {
  width: 100%;
  height: 64%;
  border-radius: 10px;
  margin-bottom: 12px;
  overflow: hidden;
  background-color: rgb(165, 165, 165);
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-icon {
  font-size: 40px;
}

.card-title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: var(--color-background);
  cursor: default;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
}

.card-des {
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  margin: 0;
  font-size: 13px;
  color: var(--color-background);
  cursor: default;
}

.card-btn {
  font-size: 15px;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #12bde7;
  width: 25px;
  height: 25px;
  max-height: 25px;
  border-radius: 10px;
  overflow: hidden;
  transition: all ease-in-out 0.5s;
  gap: 1px;
  box-sizing: border-box;
  padding-left: 5px;
  margin-top: 8px;
}

.card-btn:hover {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.06);
  width: 100%;
  border-radius: 8px;
  height: 30px;
  gap: 10px;
  padding: 0;
}

.card-btn-text {
  opacity: 0;
  font-size: 1px;
  font-weight: 500;
  transition: all ease-in-out 0.5s;
}

.card-btn:hover>.card-btn-text {
  opacity: 1;
  font-size: 15px;
}

@media (min-width: 1024px) {}
</style>