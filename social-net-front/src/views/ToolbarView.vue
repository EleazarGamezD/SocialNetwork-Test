<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue';
import { AuthService } from '@/services/AuthService'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconOptions from '@/components/icons/IconOptions.vue'
import IconBell from '@//components/icons/IconBell.vue'
import IconMenu from '@/components/icons/IconMenu.vue'
const authService = new AuthService();
const isLoggedUser = ref(false);
const userName = ref('Invitado');

function logout() {
    authService.logout();
    isLoggedUser.value = false;
    userName.value = 'Invitado';
}
onMounted(() => {
    isLoggedUser.value = localStorage.getItem('isLoggedUser') === 'true';
    userName.value = localStorage.getItem('userName');
    // Escuchar el evento 'userLoggedIn' y actualizar el estado según sea necesario
    window.addEventListener('userLoggedIn', () => {
        console.log('El usuario ha iniciado sesión');
        isLoggedUser.value = true;
        userName.value = localStorage.getItem('userName');
    });
    return { isLoggedUser, userName };
});

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
    <div class="navigation-card">
        <input type="text" placeholder="Search.." class="input_search_bar"><a href="#" class="tab">
            <IconSearch />
        </a></input>
        <span class="spacer"></span>
        |
        <a class="tab">
            <IconOptions />
            <span class="tooltip">No Implementado</span>
        </a> <a class="tab">
            <IconBell />
            <span class="tooltip">No Implementado</span>
        </a>
        |
        <span class="avatar"><img src="/src/assets/images/avatar.png" alt="avatar"></span>
        <nav class="nav">
            <div class="nav_container">
                <h3>{{ userName }} </h3>
                <h3>{{ isLoggedUser ? 'Online' : '' }}</h3>
            </div>
        </nav>
        <div class="dropdown" @click="toggleDropdown">
            <button class="dropbtn">
                <IconMenu />
            </button>
            <div class="dropdown-content" :class="{ 'show': isDropdownOpen }">
                <RouterLink v-if="!isLoggedUser" class="routerbtn" to="/login"><a></a>Iniciar Sesión</RouterLink>
                <RouterLink v-if="!isLoggedUser" class="routerbtn" to="/register"><a></a>Registrarse</RouterLink>
                <div v-else class="routerbtn" @click="logout"><a></a>Cerrar Sesión</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
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

.navbar {
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* search bar  */
.navbar .input_search_bar {
    width: 400px;
}

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
}

.input_search_bar {
    height: 50px;
    border-radius: 50px;
    border: none;
    outline: none;
    box-shadow: 3px 2px 4px 1px rgb(214, 214, 214);
    padding: 10px 20px;
}

/* search bar  */
.navbar .input_search_bar {
    width: 400px;
}

/* avatar */
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar img {
    width: 100%;
    height: auto;
}



/* The dropdown container */
.dropdown {
    float: right;
    overflow: hidden;
}

/* Dropdown button */
.dropdown .dropbtn {
    width: 50px;
    height: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 15px;
    margin: 0;

}

.navbar a:hover,
.dropdown:hover .dropbtn {
    background-color: rgb(233, 87, 87);

}

/* Dropdown content (oculto por defecto) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: rgb(223, 223, 223);
    min-width: 160px;
    box-shadow: 0px 8px 16px 1px rgba(83, 83, 83, 0.2);
    z-index: 1;
    border-radius: 20px;
    translate: -110px 20px;

}

/* Links inside the dropdown */
.dropdown-content .routerbtn {
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    border-radius: 20px;
}

/* background-color del dropdown menu Toolbar */
.dropdown-content a:hover {
    background-color: #ddd;
}

.dropdown-content.show {
    display: block;
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
    margin-top: 90px;
    transition: opacity 0.3s ease;
    text-align: center;
    z-index: 100;
}

#menu {
    margin-left: 14%;

}

.tab:hover .tooltip {
    visibility: visible;
    opacity: 1;
}
</style>