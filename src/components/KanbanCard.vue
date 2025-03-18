<template>
  <div class="kanban-card">
    <div v-if="isEditing" class="task-edit">
      <input  placeholder="Task Name" class="input-field" />
      <input  type="date" class="input-field" />
      <select class="input-field">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button @click="saveEdit" class="button save-button">Save</button>
      <button @click="cancelEdit" class="button cancel-button">Cancel</button>
    </div>
    <div v-else>
      <h4 @click="editTask" class="card-title">Name</h4>
      <p class="card-details">Due: Due date</p>
      <p class="card-details">Priority</p>
      <div class="card-actions">
        <button @click="editTask" class="button edit-button">Edit</button>
        <button @click="deleteTask" class="button delete-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    editTask() {
      this.isEditing = true;
    },
    saveEdit() {
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    deleteTask() {
      console.log('delete')
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
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}
.card-actions{
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