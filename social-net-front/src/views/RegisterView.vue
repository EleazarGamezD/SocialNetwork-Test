<script setup>
import LoginRegisterUser from '../components/LoginRegisterUser.vue'
defineProps({
    isRegisterMode: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <LoginRegisterUser :isRegisterMode="isRegisterMode" />
</template>