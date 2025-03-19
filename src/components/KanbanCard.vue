<template>
  <div class="kanban-card">
    <div v-if="isEditing" class="task-edit">
      <input placeholder="Task Name" class="input-field" v-model="taskCopy.name" />
      <input placeholder="Description" class="input-field" v-model="taskCopy.description" />
      <input type="date" class="input-field" v-model="taskCopy.duedate" />
      <select class="input-field" v-model="taskCopy.status">
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select class="input-field" v-model="taskCopy.priority" required>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button @click="saveEdit(taskCopy.id)" class="button save-button">Save</button>
      <button @click="cancelEdit" class="button cancel-button">Cancel</button>
    </div>
    <div v-else>
      <h4 @click="editTask" class="card-title">{{ task.name }}</h4>
      <p class="card-details">About: {{ task.description }}</p>
      <p class="card-details">Due: {{ task.duedate }}</p>
      <p class="card-details">Priority: {{ task.priority }}</p>
      <div class="card-actions">
        <button @click="editTask()" class="button edit-button">Edit</button>
        <button @click="deleteTask(task.id)" class="button delete-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { updateDoc, doc, db, deleteDoc, auth } from "../firebase"
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      isEditing: false,
      taskCopy: { ...this.task },
    };
  },
  methods: {
    async editTask() {
      this.isEditing = true;
      this.taskCopy = { ...this.task };
    },
    async saveEdit(id) {
      this.isEditing = false;
      this.$emit('update-task', this.taskCopy);
      try {
        const user = auth.currentUser;
        await updateDoc(doc(db, "task", id), {
          name: this.taskCopy.name,
          description: this.taskCopy.description,
          duedate: this.taskCopy.duedate,
          priority: this.taskCopy.priority,
          status: this.taskCopy.status,
          user: user.uid
        });
        this.$toast.success("Successfully updated your recipe!");
      } catch (error) {
        this.$toast.error("There was an error editing your recipe!");
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.taskCopy = { ...this.task };
    },
    async deleteTask(id) {
      this.$emit('delete-task', this.task.id);
      try {
        await deleteDoc(doc(db, "task", id));
        this.$toast.success("Successfully deleted task!");
      } catch (error) {
        this.$toast.error("Could not delete task!");
      }

    }
  }
};
</script>

<style scoped>
.kanban-card {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  cursor: grab;
}

.kanban-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.task-edit input,
.task-edit select {
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.card-actions {
  display: flex;
  gap: 6px
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.card-details {
  font-size: 14px;
  color: #888;
}

button {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.8;
}

.save-button {
  background-color: #4caf50;
  color: white;
  border: none;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  border: none;
}

.edit-button {
  background-color: transparent;
  border: 2px solid #E6E6E4;
  color: black;
}

.delete-button {
  background-color: #E6E6E4;
  color: black;
  border: none;
}

button.edit-button:hover {
  background-color: #ffe6e6;
  color: black
}

button.delete-button:hover {
  background-color: #e31e17;
  color: white
}

input:focus,
select:focus {
  border-color: #3f51b5;
  outline: none;
}
</style>