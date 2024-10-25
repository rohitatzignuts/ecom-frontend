<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types';
import axiosInstance from '@/axios';
import router from '@/router';
import axios from 'axios';

const tab = ref('1')
const loginForm = ref(null)
const registerForm = ref(null)
const loginUser = ref<User>({
    username: '',
    password: ''
})
const signupUser = ref<User>({
    username: '',
    password: '',
    email: ""
})
// Method
const handleLogin = async () => {
    try {
        const response = await axiosInstance.post("auth/login/", loginUser.value)
        if (response.data) {
            localStorage.setItem("authToken", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            router.push("/")
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Extract error details from the API response
            const errorData = error.response.data;
            const errorMessage = Object.values(errorData)
                .flat()
                .join(', ');
            alert(errorMessage)
        } else {
            alert('An unexpected error occurred.')
        }
        console.log("Error while Login: ", error);
    }
}

const handleSignup = async () => {
    try {
        const response = await axiosInstance.post("auth/signup/", signupUser.value)
        if (response.data) {
            localStorage.setItem("authToken", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            router.push("/")
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Extract error details from the API response
            const errorData = error.response.data;
            const errorMessage = Object.values(errorData)
                .flat()
                .join(', ');
            alert(errorMessage)
        } else {
            alert('An unexpected error occurred.')
        }
        console.log("Error while Signup: ", error);
    }
}
</script>

<template>
    <div>
        <main>
            <v-card width="450">
                <v-toolbar color="primary" title="Welcome...👋">
                </v-toolbar>

                <div>
                    <v-tabs v-model="tab" grow color="primary">
                        <v-tab text="Login" value="1"></v-tab>
                        <v-tab text="Register" value="2"></v-tab>
                    </v-tabs>

                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item value="1">
                            <VCardItem>
                                <VForm ref="loginForm" class="my-4" @submit.prevent="handleLogin">
                                    <VTextField v-model="loginUser.username" label="Username" variant="outlined"
                                        required />
                                    <VTextField v-model="loginUser.password" type="password" label="Password"
                                        variant="outlined" required />
                                    <VBtn block variant="tonal" type="submit">Login</VBtn>
                                </VForm>
                            </VCardItem>
                        </v-tabs-window-item>

                        <v-tabs-window-item value="2">
                            <VCardItem>
                                <VForm ref="registerForm" class="my-4" @submit.prevent="handleSignup">
                                    <VTextField v-model="signupUser.username" label="Username" variant="outlined"
                                        required />
                                    <VTextField v-model="signupUser.email" type="email" label="Email" variant="outlined"
                                        required />
                                    <VTextField v-model="signupUser.password" type="password" label="Password"
                                        variant="outlined" required />
                                    <VBtn block variant="tonal" type="submit">Register</VBtn>
                                </VForm>
                            </VCardItem>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </div>
            </v-card>
        </main>
    </div>
</template>

<style scoped>
main {
    height: 100vh;
    display: grid;
    place-items: center;
}
</style>