<script setup>
import { ref } from "vue";
import IconUploadVideo from "@/components/icons/IconUploadVideo.vue";
import IconUploadPhoto from "@/components/icons/IconUploadPhoto.vue";
import IconBack from "@/components/icons/IconBack.vue";
const items = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' }
]);
</script>
<template>
    <div class="media-menu">
        <RouterLink to="/uploadMedia" style="border-radius: 50%;">
            <a class="tab">
                <IconUploadVideo />
                <span class="tooltip">Subir Video</span>
            </a>
        </RouterLink>
        <RouterLink to="/uploadMedia" style="border-radius: 50%;">
            <a class="tab">
                <IconUploadPhoto />
                <span class="tooltip">Subir Foto</span>
            </a>
        </RouterLink>
        <RouterLink to="/" style="border-radius: 50%;">
            <a class="tab">
                <IconBack />
                <span class="tooltip" to="/">Volver</span>
            </a>
        </RouterLink>
    </div>
</template>
<style scoped>
/* Tabs */
.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
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

/* media menu */
.media-menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
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