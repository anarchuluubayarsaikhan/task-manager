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
      <button @click="saveEdit(taskCopy.id)" class="save-button">Save</button>
      <button @click="cancelEdit" class="cancel-button">Cancel</button>
    </div>
    <div v-else>
      <h4 @click="editTask" class="card-title">{{ task.name }}</h4>
      <p class="card-details">About: {{ task.description }}</p>
      <p class="card-details">Due: {{ task.duedate }}</p>
      <p class="card-details">Priority: {{ task.priority }}</p>
      <div class="card-actions">
        <button @click="editTask()" class="edit-button">Edit</button>
        <button @click="deleteTask(task.id)" class="delete-button">Delete</button>
        <button @click="shareTask()" class="share-button">Share</button>
      </div>
      <div class="email-share-container" v-if="inputVisible">
        <input type="email" placeholder="Enter the email to share with" class="email-share" v-model="sharedtoUser"
          required />
        <div class="share-buttons-container">
          <button @click="closeInput()" id="close-button">Close</button>
          <button @click="confirmSharingTask(task.id, task.participants)" id="confirm-button">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { arrayUnion } from "firebase/firestore";
import { updateDoc, doc, db, deleteDoc, auth } from "../firebase"
export default {
  props: {
    task: Object,
  },
  data() {
    return {
      isEditing: false,
      taskCopy: { ...this.task },
      inputVisible: false,
      sharingEmail: "",
      sharedtoUser: ""
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
        this.$toast.success("Successfully updated your task!");
      } catch (error) {
        this.$toast.error("There was an error editing your task!");
        console.log(error)
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
    },
    shareTask() {
      this.inputVisible = true
    },
    closeInput() {
      this.inputVisible = false
    },
    async confirmSharingTask(id, participants) {
      try {
        if (this.sharedtoUser.length < 3 && !this.sharedtoUser.includes("@")) {
          this.$toast.error("Invalid email.");
        }
        else if (participants.includes(this.sharedtoUser)) {
          this.$toast.error("Already shared to this email!");
          this.sharedtoUser = ""
        }
        else {
          await updateDoc(doc(db, "task", id), {
            participants: arrayUnion(this.sharedtoUser)
          })
          this.$toast.success(`Task successfully shared to ${this.sharedtoUser}!`);
          this.sharedtoUser = ""
        }
      }
      catch (error) {
        this.$toast.error("There was an error sharing the task.");
        console.log(error)
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

.share-button:hover {
  background-color: grey;
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
  gap: 6px;
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

.share-buttons-container {
  display: flex;
  gap: 4px;
  align-self: self-end;
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
  background-color: green;
  color: black;
}

button.delete-button:hover {
  background-color: #e31e17;
  color: white;
}

.email-share-container {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.email-share {
  width: 90%;
  padding: 12px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box
}

#confirm-button {
  background-color: grey;
}

#confirm-button:hover {
  background-color: green;
  color: white;
}

#close-button:hover {
  background-color: gainsboro;
  color: white;
}

input:focus,
select:focus {
  border-color: #3f51b5;
  outline: none;
}
</style>
