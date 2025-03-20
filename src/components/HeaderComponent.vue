<template>
    <div v-if="user" class="headercontainer">
        <h3>Welcome, {{ user.email.split('@')[0] }}</h3>
        <button @click="signOut" id="signout">Sign Out</button>
    </div>
</template>
<script>
import { signOut, auth } from '../firebase'
export default {
    computed: {
        user() {
            const user = this.$store.getters.user;
            return user;
        },
    },
    methods: {
        async signOut() {
            try {
                await signOut(auth);
                localStorage.removeItem("reminded");
            } catch (error) {
                this.$toast.error(`Error occurred! ${error}`);
            }
        },
    }
}
</script>
<style>
#signout {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 12px;
    padding-right: 12px;
    margin: 10px 0;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    width: 8%;
}

#signout:hover {
    transform: translateY(-2px);
    background-color: grey;
}

h3 {
    font-size: 26px;
    color: grey
}

#signout:active {
    transform: translateY(0);
}
</style>