<template>
  <div id="home">
    <div v-if="user" class="headercontainer">
      <h3>Welcome, {{ user.email.split('@')[0] }}</h3>
      <button @click="signOut" id="signout">Sign Out</button>
    </div>
    <div class="tasks-container">
      <div class="sidebar">
        <label class="sidebar-label">
          <input type="checkbox" v-model="isPriorityChecked">
          Priority
        </label>
        <div v-if="isPriorityChecked">
          <label class="sidebar-label">
            <input type="checkbox" v-model="priorityLevels.low">
            Low
          </label>
          <label class="sidebar-label">
            <input type="checkbox" v-model="priorityLevels.medium">
            Medium
          </label>
          <label class="sidebar-label">
            <input type="checkbox" v-model="priorityLevels.high">
            High
          </label>
        </div>

        <label class="sidebar-label">
          <input type="checkbox" v-model="isDuedateChecked">
          Duedate
        </label>

        <div v-if="isDuedateChecked">
          <label class="sidebar-label">
            <input type="checkbox" v-model="duedateOptions.upcoming">
            Upcoming
          </label>
          <label class="sidebar-label">
            <input type="checkbox" v-model="duedateOptions.today">
            Today
          </label>
          <label class="sidebar-label">
            <input type="checkbox" v-model="duedateOptions.overdue">
            Overdue
          </label>
        </div>
      </div>
      <KanbanBoard :priorityLevels="priorityLevels" :duedateOptions="duedateOptions"/>
    </div>
  </div>
</template>

<script>
import KanbanBoard from '@/components/KanbanBoard.vue';
import { signOut, auth } from '../firebase'
export default {
  components: {
    KanbanBoard
  },
  data() {
    return {
      isPriorityChecked: false, 
      priorityLevels: {        
        low: false,
        medium: false,
        high: false
      },
      isDuedateChecked: false, 
      duedateOptions: {         
        upcoming: false,
        today: false,
        overdue: false,
      },
    };
  },
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

#home {
  width: 100%;
}

.headercontainer {
  max-width: 1200px;
  margin: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}

.sidebar {
  background-color: #f4f7fb;
  width: 22%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.sidebar:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.sidebar-label {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.sidebar-label:hover {
  background-color: #e6f7ff;
  transform: translateX(5px);
}

input[type="checkbox"] {
  margin-right: 10px;
  accent-color: #4CAF50;
}
input[type="checkbox"]:hover{
  cursor: pointer
}

.tasks-container {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: auto;
  font-size: 18px;
}

.sidebar > div {
  padding-left: 15px; 
}
</style>
