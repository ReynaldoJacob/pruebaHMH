<template>
<b-navbar class="navbar-menu">
    <template #brand>
        <b-navbar-item>
            <img class="img-logo" src="https://www.hmhsistemas.com.mx/img/logoHmh.svg" alt="Lightweight UI components for Vue.js based on Bulma">
        </b-navbar-item>
    </template>
    <template #start>
        <b-navbar-item @click="todoList">
            Todo List
        </b-navbar-item>
        <b-navbar-item @click="timerView">
            Timer
        </b-navbar-item>
        <b-navbar-item @click="gitView">
            Git profile
        </b-navbar-item>
    </template>

    <template #end>
        <b-navbar-item class="buttons-log" >
            <div class="buttons">
                <a class="button is-success">
                    {{username}}
                </a>
                <a class="button is-light" @click="logout">
                    Log in
                </a>
            </div>
        </b-navbar-item>
    </template>
</b-navbar>
</template>

<script>
import VueCookies from 'vue-cookies';

export default {
    data() {
        return {
            isLoggedIn: false,
            username: ''
        };
    },
    created() {
        const sessionToken = VueCookies.get('sessionToken');
        console.log(sessionToken);
        if (sessionToken) {
            // El usuario tiene un token de sesión válido, por lo que se considera que ha iniciado sesión
            this.isLoggedIn = true;
            this.username = 'HMHuser'; // Obtén el nombre de usuario del token de sesión o de otra fuente
        } else {
            // El usuario no ha iniciado sesión
            this.isLoggedIn = false;
            this.username = '';
        }
    },
    methods: {
        logout() {
            // Eliminar el token de sesión
            VueCookies.remove('sessionToken');

            window.location.reload();
        },

        todoList: function () {
            this.$router.push('/todolist');
        },

        timerView: function () {
            this.$router.push('/timercomponent');
        },
        gitView: function () {
            this.$router.push('/gitcomponent');
        }
    }
};
</script>

<style>
.navbar-menu {
    background-color: #2980B9;
    color: white;
}

.navbar-brand {
    background-color: #2980B9;
    color: White;
}

.img-logo {
    width: 142px;
}

.navbar-item {
    color: white !important;
}

.buttons-log .navbar-item::hover{
    color: transparent !important;
}


.navbar-item:hover {
    background-color: white !important;
    color: blue !important;
    transition: all 1s ease;
}
</style>
