<template>
  <div class="kanban-column">
    <h3 class="column-title">Column name</h3>
    <div class="kanban-cards">
      <KanbanCard />
    </div>
    <div class="kanban-card">
        <div class="task-add">
          <input placeholder="Task Name" class="input-field" v-model="task.name" required/>
          <textarea placeholder="Description" v-model="task.description" required></textarea>
          <input type="date" class="input-field" v-model="task.duedate" required/>
          <select class="input-field" v-model="task.status" required>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div id="button-container">
            <button class="cancel-button">Cancel</button>
            <button @click="saveTask" class="save-button">Add</button>
          </div>
        </div>
      </div>
    <button class="add-task-button">+ Add Task</button>
  </div>
</template>

<script>
import { addDoc, collection, db, auth } from '../firebase';
import KanbanCard from './KanbanCard.vue';
export default {
  components: {
    KanbanCard
  },
  data() {
    return {
      task: {
        name: "",
        description: "",
        duedate: "",
        status: ""
      }
    }
  },
  methods: {
    async saveTask() {
  try {
    const user = auth.currentUser;
    if (user) {
      console.log(this.task.name, this.task.description, this.task.duedate, this.task.status, user.uid);
      await addDoc(collection(db, "task"), {
        name: this.task.name,
        description: this.task.description,
        duedate: this.task.duedate,
        status: this.task.status,
        user: user.uid
      });
      this.task={}
      this.$toast.success('Successfully added task');
    }
  } catch (error) {
    console.log(error);
    this.$toast.error(`Could not add task! ${error}`);
  }
},
    updateTask() {
      console.log("update task")
    },
    deleteTask() {
      console.log("delete task")
    }
  }
};
</script>

<style scoped>
#button-container {
  display: flex;
  gap: 6px;
}

.kanban-card {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  cursor: grab;
}

.kanban-column {
  width: 300px;
  margin: 0 15px;
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.kanban-column:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.column-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #444;
}

.kanban-cards {
  max-height: 500px;
  overflow-y: auto;
}

.add-task-button {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.task-add input,
.task-add select,
.task-add textarea {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.save-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 6px;
}

.save-button:hover {
  background-color: green;
  cursor: pointer;
  transform: translateY(-2px);
}

.cancel-button:hover {
  background-color: red;
  cursor: pointer;
  transform: translateY(-2px);
}

.cancel-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 6px;
  border-radius: 6px;
}

.add-task-button:hover {
  background-color: #2c387e;
}
</style>