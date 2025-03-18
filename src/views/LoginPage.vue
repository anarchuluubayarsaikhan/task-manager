<template>
  <div class="login">
    <h2 v-if="!user">Sign In</h2>
    <div v-if="!user" class="login-input">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button class="sign-in-btn" @click="signIn" :disabled="isLoading">
        <span v-if="isLoading" class="loading-spinner"></span>
        <span v-else>Sign In</span>
      </button>
      <router-link to="/">
        <button class="sign-up-btn">Sign Up</button>
      </router-link>
    
      <button @click="resetPassword">Reset Password</button>
    </div>
    <div v-if="user">
      <h3>Welcome, {{ user.email }}</h3>
      <button @click="signOut">Sign Out</button>
      <button v-if="!user.emailVerified" @click="sendEmailVerification">Send Verification Email</button>
    </div>
  </div>
</template>
<script>
import { auth, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, signOut } from "@/firebase"; 

export default {
  data() {
    return {
      email: "",
      password: "",
      user: null,
      isLoading: false,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  methods: {
    async signIn() {
      this.isLoading = true; 
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        window.location.href = '/home'
      } catch (error) {
        this.$toast.error(`Could not sign in! ${error}`);
      } finally {
        this.isLoading = false; 
      }
    },

    async sendEmailVerification() {
      if (this.user && !this.user.emailVerified) {
        try {
          await sendEmailVerification(this.user);
          alert("Verification email sent.");
        } catch (error) {
          this.$toast.error(`Could not send email! ${error}`);
        }
      }
    },

    async resetPassword() {
      try {
        await sendPasswordResetEmail(auth, this.email);
        alert("Password reset email sent.");
      } catch (error) {
        this.$toast.error(`Could not reset password! ${error}`);
      }
    },

    async signOut() {
      try {
        await signOut(auth);
      } catch (error) {
        this.$toast.error(`Error occurred! ${error}`);
      }
    },
  },
};
</script>
<style scoped>
.login {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 350px; 
  margin: auto;
  margin-top: 50px; 
  background-color: #f9f9f9; 
  border-radius: 8px;  
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

h3 {
  color: #333;
  margin-bottom: 30px;
}

.login-input {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input {
  margin: 10px 0;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
}

button {
  padding: 12px;
  margin: 10px 0;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  width: 100%;
}

button:hover {
  transform: translateY(-2px);  
}

button:active {
  transform: translateY(0);
}

.sign-in-btn {
  background-color: #483C32; 
  color: white;
  position: relative;
}

.sign-up-btn {
  background-color: white; 
  color: black;
  font-size: 14px; 
}

.loading-spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -10px;
  margin-top: -10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
