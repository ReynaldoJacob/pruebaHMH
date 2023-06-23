<template>
<div class="form">
    <div class=" loginForm">
        <section>
            <img src="https://www.hmhsistemas.com.mx/img/logoHmh.svg">
            <b-field label="Name">
                <b-input v-model="username"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input type="password" v-model="password" password-reveal>
                </b-input>
            </b-field>
            <b-field class="button-login">
                <b-button type="is-primary is-light" @click="login">Log in</b-button>
            </b-field>
        </section>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            name: 'John Silver'
        }
    }
}
</script><script>
import axios from 'axios';
import md5 from 'md5';

export default {
    data() {
        return {
            isLoggedIn: false,
            username: '',
            password: '',
            isActive: false
        };
    },
    methods: {
        login: function () {
            let bind = this;

            axios.get('https://mocki.io/v1/3e408794-39ed-4c75-bb6e-c49c578de293')
                .then(function (response) {
                    console.log(response.data);
                    var pass = md5(bind.password)
                    console.log(md5(bind.password));
                    if (bind.username == response.data.userName && pass == response.data.password) {
                        bind.$cookies.set('sessionToken', 'tokenValue', '1h');
                        bind.$router.push('/todolist');
                    } else {
                        bind.$buefy.toast.open({
                            duration: 5000,
                            message: `User name or password does not match`,
                            position: 'is-bottom',
                            type: 'is-danger'
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};
</script>

<style>
.form {
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    height: 100vh;
    background-color: #2980B9
}

.loginForm {
    border-radius: 19px;
    background: #2980B9;
    box-shadow: 20px 20px 60px #236d9d,
        -20px -20px 60px #2f93d5;
    width: 71vh;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    padding: 13px;
}

.button-login {
    display: flex;
    justify-content: center;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>
