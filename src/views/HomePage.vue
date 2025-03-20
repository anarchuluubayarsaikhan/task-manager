<template>
  <div id="home">
    <HeaderComponent/>
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
      <div>
        <KanbanBoard :priorityLevels="priorityLevels" :duedateOptions="duedateOptions"/>
        <div>
          <h4> TASKS SHARED WITH YOU:</h4>
          <SharedTasks/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import KanbanBoard from '@/components/KanbanBoard.vue';
import SharedTasks from '@/components/SharedTasks.vue';
export default {
  components: {
    KanbanBoard,
    HeaderComponent,
    SharedTasks
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
}
</script>

<style>

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
h4{
  margin-left: 32px;
  font-size: 18px;
  color: grey
}

.sidebar {
  background-color: #f4f7fb;
  width: 25%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  max-height:80vh;
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
  gap: 16px;
  max-width: 1200px;
  margin: auto;
  font-size: 18px;
}

.sidebar > div {
  padding-left: 15px; 
}


@media (max-width: 768px) {
  .headercontainer {
    flex-direction: column; 
    align-items: flex-start;
  }

  h4 {
    font-size: 16px; 
  }

  .sidebar {
    max-width: 60%;
    padding: 12px;
    margin:auto
  }

  .tasks-container {
    flex-direction: column; 
    gap: 10px;
  }

  .tasks-container > div {
    width: 100%;
    padding: 8px;
  }

  .sidebar-label {
    font-size: 14px; 
    padding: 8px;
  }
}

</style>
