<script setup>
import { ref, defineProps, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { AuthService } from '@/services/AuthService'
import IconUser from '@/components/icons/IconUser.vue'
import IconArroba from './icons/IconArroba.vue';
const service = new AuthService();

const props = defineProps({
    isRegisterMode: {
        type: Boolean,
    },
});
const isLoading = ref(false);
const formData = ref({
    email: '',
    userName: '',
    password: '',
})
const errorMessage = ref('');
const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
// validacion de campos del formulario
const isFormValid = computed(() => {
    return formData.value.email.trim() !== '' && formData.value.password.trim() !== '';
});
async function registerUser() {
    // Validar la contraseña
    if (!passwordPattern.test(this.formData.password)) {
        this.errorMessage = "La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.";
        return;
    }
    let { email, userName, password } = formData.value
    const userData = { email, userName, password }
    isLoading.value = true
    try {
        const response = await service.register(userData);
        const user = response.data
        const { token } = user
        const { userName } = user.user
        localStorage.setItem('token', token)
        localStorage.setItem('userName', userName)
        localStorage.setItem('isLoggedUser', true)
        window.dispatchEvent(new CustomEvent('userLoggedIn'));
        window.location.href = '/';
    } catch (error) {
        errorMessage.value = error
        console.log(this.errorMessage)
        isLoading.value = false
    }
}
async function loginUser() {
    // Validar la contraseña
    if (!passwordPattern.test(this.formData.password)) {
        this.errorMessage = "La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial.";
        return;
    }
    let { email, password } = formData.value
    const userData = { email, password }
    isLoading.value = true
    try {
        const response = await service.login(userData);
        console.log(response)
        const user = response.data;
        const { token } = user;
        const { userName } = user.user;
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        localStorage.setItem('isLoggedUser', true);
        window.dispatchEvent(new CustomEvent('userLoggedIn'));
        window.location.href = '/';

    } catch (error) {
        errorMessage.value = error.response.data
        console.error(this.errorMessage)
        isLoading.value = false
    }
}


</script>


<template>

    <form class="form">
        <p class="form-title" v-if="isRegisterMode">Registra Tu Cuenta</p>
        <p class="form-title" v-if="!isRegisterMode">Accede a tu Cuenta</p>
        <br>
        <div class="input-container">
            <input required v-model="formData.email" placeholder="Ingresa tu Email" type="email">
            <span>
                <IconArroba />
            </span>
        </div>
        <div class="input-container" v-if="isRegisterMode">
            <input v-model="formData.userName" placeholder="Ingresa tu nombre" type="text">
            <span>
                <IconUser />
            </span>
        </div>
        <div class="input-container">
            <input required v-model="formData.password" placeholder="Ingresa tu Contraseña" type="password">
            <span>
                <!-- eye Icon -->
            </span>
        </div>
        <button v-if="isRegisterMode" class="submit" type="submit" @click.prevent="registerUser()"
            :disabled="!isFormValid" :class="{ 'disabled-button': !isFormValid }">
            Crear Cuenta
        </button>
        <button v-else class="submit" type="submit" @click.prevent="loginUser()" :disabled="!isFormValid"
            :class="{ 'disabled-button': !isFormValid }">
            Ingresar a tu Cuenta
        </button>

        <p class="signup-link" v-if="isRegisterMode">
            ya tienes una cuenta?
            <RouterLink to="/login">Ingresa</RouterLink>
        </p>
        <p class="signup-link" v-else>
            No tienes cuenta?
            <RouterLink to="/register">Regístrate</RouterLink>
        </p>
        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
        <section v-if="isLoading" class="dots-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </section>
    </form>


</template>

<style scoped>
.form {
    background-color: #d8d8d8;
    display: block;
    padding: 1rem;
    max-width: 350px;
    border-radius: 0.5rem;
    box-shadow: 15px 20px 25px 5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.form-title {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    text-align: center;
    color: #000;
}

.input-container {
    position: relative;
}

.input-container input,
.form button {
    outline: none;
    border: 1px solid #e5e7eb;
    margin: 8px 0;
}

.input-container input {
    background-color: #fff;
    padding: 1rem;
    padding-right: 3rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    width: 300px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.input-container span {
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    padding-left: 1rem;
    padding-right: 1rem;
    place-content: center;
}

.input-container span svg {
    color: #9CA3AF;
    width: 1rem;
    height: 1rem;
}

.submit {
    display: block;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    background-color: rgb(233, 87, 87);
    color: #ffffff;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
    cursor: pointer;
}

.disabled-button {
    background-color: #5e5d5d;
    cursor: not-allowed;
}

.error-message {
    color: red;
    justify-content: center;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
}

.signup-link {
    color: #6B7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
    cursor: pointer;
}

.signup-link a {
    text-decoration: underline;
}

/* loading animation zone */

.dots-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
}

.dot {
    height: 20px;
    width: 20px;
    margin-right: 10px;
    border-radius: 10px;
    background-color: #d87b7b;
    animation: pulse 1.5s infinite ease-in-out;
}

.dot:last-child {
    margin-right: 0;
}

.dot:nth-child(1) {
    animation-delay: -0.3s;
}

.dot:nth-child(2) {
    animation-delay: -0.1s;
}

.dot:nth-child(3) {
    animation-delay: 0.1s;
}

@keyframes pulse {
    0% {
        transform: scale(0.8);
        background-color: #df9393;
        box-shadow: 0 0 0 0 rgba(209, 138, 138, 0.7);
    }

    50% {
        transform: scale(1.2);
        background-color: #fb6767;
        box-shadow: 0 0 0 10px rgba(252, 178, 178, 0);
    }

    100% {
        transform: scale(0.8);
        background-color: #fcb3b3;
        box-shadow: 0 0 0 0 rgba(252, 178, 178, 0.7);
    }
}
</style>