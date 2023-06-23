<template>
<div class="container">
    <br>
    <center>
        <h2 class="title">Git Profile</h2>
    </center>
    <br>
    <div class="input-search">
        <b-field :message="errorMessage" :type="errorType">
            <b-input v-model="usernameSearch" placeholder="Search..." type="search" icon="magnify"></b-input>
            <p class="control">
                <b-button type="is-success" label="Search" @click="searchGit" />
            </p>
        </b-field>
    </div>
    <br>
    <b-notification :closable="false" v-if="showGitInfo">
        <div class="user-profile">
            <div class="avatar">
                <img :src="userAvatar" alt="Avatar del usuario">
            </div>
            <div class="user-info">
                <h2 class="username">
                    <b-icon icon="account" size="is-small"></b-icon> {{ userName }}
                </h2>
                <p class="name">{{ fullName }}</p>
                <p class="location">
                    <b-icon icon="map-marker" size="is-small"></b-icon>{{ location }}
                </p>
                <p class="bio">
                    <b-icon icon="book" size="is-small"></b-icon>{{ bio }}
                </p>
                <div class="social-links">
                    <a :href="githubProfileURL" target="_blank" rel="noopener noreferrer">
                        <b-icon icon="github" size="is-small" class="fab"></b-icon>
                        {{githubProfileURL}}

                    </a>
                </div>
            </div>
        </div>
        <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
    </b-notification>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            usernameSearch: "",
            userAvatar: '',
            userName: "",
            fullName: "",
            location: "",
            bio: "",
            githubProfileURL: "",
            isLoading: false,
            isFullPage: false,
            errorMessage: "",
            errorType: null,
            showGitInfo: false
        };
    },
    methods: {
        searchGit() {
            this.isLoading = true;
            axios.get('https://api.github.com/users/' + this.usernameSearch)
                .then(response => {
                    this.showGitInfo = true;
                    this.errorMessage = '';
                    this.errorType = null;
                    const userData = response.data;

                    this.userAvatar = userData.avatar_url;
                    this.userName = userData.login
                    this.fullName = userData.name;
                    this.githubProfileURL = userData.html_url
                    this.location = userData.location ? userData.location : "The user has not added a location";
                    this.bio = userData.bio ? userData.bio : "The user has not added a biography";
                })
                .catch(error => {

                    this.errorMessage = 'That user does not exist, please re-enter the user';
                    this.errorType = 'is-danger';

                    console.log(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }
};
</script>

<style scoped>
.user-profile {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: #f0f0f0;
}

.avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.username {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
}

.name {
    font-size: 18px;
    color: #666;
    margin-bottom: 10px;
}

.location {
    font-size: 16px;
    color: #888;
    margin-bottom: 10px;
}

.bio {
    margin-bottom: 15px;
}

.social-links a {
    color: #333;
    font-size: 20px;
    margin-right: 10px;
}

.social-links a:hover {
    color: #007bff;
}

.input-search {
    display: flex;
    justify-content: center;
}
</style>
