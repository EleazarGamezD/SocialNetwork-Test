<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import ToolbarView from './views/ToolbarView.vue'
import IconHome from './components/icons/IconHome.vue'
import IconUser from './components/icons/IconUser.vue'
import IconNight from './components/icons/IconNight.vue'
import IconLight from './components/icons/IconLight.vue'
import IconAddVideo from './components/icons/IconAddVideo.vue'
import IconAddPhoto from './components/icons/IconAddPhoto.vue'
import IconMenuDots from './components/icons/IconMenuDots.vue'
// Escuchar el evento 'userLoggedIn' y actualizar el estado según sea necesario
const isLoggedUser = ref(false);
onMounted(() => {
  isLoggedUser.value = localStorage.getItem('isLoggedUser') === 'true';
  window.addEventListener('userLoggedIn', () => {
    isLoggedUser.value = true;
  });
  return { isLoggedUser };
});
/* seccion para tema  */
const isDark = useDark(
  {
    selector: 'body',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
  }
);
const toggleDark = useToggle(isDark);

/* seccion para dropdown menu  */
const isDropdownOpen = ref(false);

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

// Cerrar el menú desplegable si se hace clic fuera de él
onMounted(() => {
  document.addEventListener('click', closeDropdown);
  return () => {
    document.removeEventListener('click', closeDropdown);
  };
});

function closeDropdown(event) {
  if (!event.target.closest('.navigation-card')) {
    isDropdownOpen.value = false;
  }
}
</script>

<template>
  <img alt="logo" class="logo" src="@/assets/Logo.png" width="120" height="120" />
  <div class="navbar">
    <ToolbarView />
  </div>

  <div class="sidebar-right">
    <nav class="nav">
      <!-- navigation -->
      <div class="navigation-card sidenav">
        <RouterLink to="/">RIGHT<a class="tab">
            <!-- Icon Home -->
            <IconHome />
          </a>
        </RouterLink>

        <RouterLink to="/login">About
          <a class="tab">
            <!-- UserIcon -->
            <IconUser />
          </a>
        </RouterLink>

      </div>

    </nav>
  </div>
  <div class="sidebar-left">
    <!-- navigation -->
    <nav class="nav">
      <div class="navigation-card sidenav" v-if="isLoggedUser">
        <a @click="toggleDropdown" class="tab">
          <IconMenuDots />
          <span class="tooltip">Menu</span>
        </a>
        <div class="dropdown-content" :class="{ 'show': isDropdownOpen }">
          <RouterLink style="border-radius: 50%;" to="/videosGallery">
            <a class="tab">
              <IconAddVideo />
              <span class="tooltip" id="menu">Tus Videos</span>
            </a>
          </RouterLink>

          <RouterLink style="border-radius: 50%;" to="/photosGallery">
            <a class="tab">
              <IconAddPhoto />
              <span class="tooltip" id="menu">Tus Fotos</span>
            </a>
          </RouterLink>
        </div>
      </div>

      <!-- switch theme -->
      <div class="switch">
        <label class="container" @click="toggleDark()" title="Cambiar tema">
          <IconLight v-if="!isDark" />
          <IconNight v-if="isDark" />
          <span class="tooltip">Cambiar tema</span>
        </label>
      </div>
    </nav>
  </div>
  <!-- fin de navigation -->
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped>
.logo {
  max-width: 120px;
}

.spacer {
  flex: 1 1 auto;
}

.sidebar-left {
  width: 90px;
  margin-left: 15px;
}

.sidebar-right {
  width: 90px;
}

.nav {
  display: flex;
  justify-content: center;
  border-radius: 60px;
  width: 90px;

}

.navigation-card {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 15px 20px;
  border-radius: 50px;
}

.navigation-card.sidenav {
  writing-mode: vertical-lr;
  max-width: 120px;
}

.user-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 50px;
  overflow: hidden;
  padding: 15px;
  border-radius: 5%;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}

/* icons */
.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  overflow: hidden;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s;
}


.tab:hover {
  background-color: rgb(233, 87, 87);
  visibility: visible;
  opacity: 1;
}

.navbar {
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* dark light mode  */
.switch {
  width: 120px;
  position: absolute;
  justify-content: center;
  bottom: 50px;
  margin-bottom: 20px;
}

.container {
  --color: #a5a5b0;
  --size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: var(--size);
  fill: var(--color);
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

}

/* menu dropdown */
.dropdown-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 70px;
  transition: opacity 0.5s ease;
  opacity: 0;
}

.dropdown-content.tab {
  cursor: crosshair;
}

.show {
  opacity: 1;
  background-color: #a5a5b0;
  border-radius: 50px;
  transition: opacity 0.5s ease;
}


/* tootips */
.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  visibility: hidden;
  opacity: 0;
  margin-left: 100px;
  transition: opacity 0.3s ease;
  rotate: -90deg;
  text-align: center;
}

.tab:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

#menu {
  margin-left: 160px;

}
</style>
