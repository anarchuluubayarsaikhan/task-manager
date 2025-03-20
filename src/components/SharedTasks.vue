<template>
    <div>
        <div class="board" v-if="tasks.length<=0">
            No shared tasks yet
        </div>
            <div class="kanban-column"  v-if="tasks.length>0">
                <div class="kanban-card" v-for="task in tasks" :key="task.id">
                    <div v-if="isEditingTask === task.id" class="task-edit">
                        <input v-model="taskCopy.name" placeholder="Task Name" class="input-field" />
                        <input v-model="taskCopy.description" placeholder="Description" class="input-field" />
                        <input v-model="taskCopy.duedate" type="date" class="input-field" />
                        <select v-model="taskCopy.status" class="input-field">
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <select v-model="taskCopy.priority" class="input-field" required>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <button @click="saveEdit(task.id)" class="save-button">Save</button>
                        <button @click="cancelEdit" class="cancel-button">Cancel</button>
                    </div>
                    <div v-else>
                        <div>
                            <h4 @click="editTask(task.id)" class="card-title">{{ task.name }}</h4>
                            <p class="card-details">About: {{ task.description }}</p>
                            <p class="card-details">Due: {{ task.duedate }}</p>
                            <p class="card-details">Priority: {{ task.priority }}</p>
                            <p class="card-details">Owner: {{ task.owner }}</p>
                            <div class="card-actions">
                                <button @click="editTask(task.id)" class="edit-button">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    </div>
</template>

<script>
import { updateDoc, doc, collection, db, auth, onSnapshot, query, where } from '../firebase';

export default {
    data() {
        return {
            tasks: [],
            isEditingTask: null,
            taskCopy: {} 
        };
    },
    async created() {
        await this.getTasks();
    },

    methods: {
        async getTasks() {
            const user = auth.currentUser;
            const tasksCollection = collection(db, "task");
            const tasksQuery = query(tasksCollection, where("participants", "array-contains", user.email));
            return new Promise((resolve, reject) => {
                onSnapshot(tasksQuery, (snapshot) => {
                    this.tasks = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    resolve();
                }, (error) => {
                    reject(error);
                    console.log(error);
                });
            });
        },
        editTask(taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            this.isEditingTask = taskId; 
            this.taskCopy = { ...task }; 
        },
        async saveEdit(id) {
            this.isEditingTask = null; 
            try {
                auth.currentUser;
                await updateDoc(doc(db, "task", id), {
                    name: this.taskCopy.name,
                    description: this.taskCopy.description,
                    duedate: this.taskCopy.duedate,
                    priority: this.taskCopy.priority,
                    status: this.taskCopy.status,
                });
                this.$toast.success("Successfully updated your task!");
            } catch (error) {
                this.$toast.error("There was an error editing your task!");
                console.log(error);
            }
        },
        cancelEdit() {
            this.isEditingTask = null; 
            this.taskCopy = {}; 
        }
    }
};
</script>
<style scoped>
.kanban-column {
    width: 90%;
    margin: auto;
    padding: 20px;
    background-color: #f1f1f1;
    border-radius: 10px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

.kanban-column:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.kanban-card {
    max-width: 300px;
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
    gap: 6px;
    align-items: center;
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
    justify-self: end;
}

button.edit-button:hover {
    background-color: green;
    color: black;
}

input:focus,
select:focus {
    border-color: #3f51b5;
    outline: none;
}

@media(max-width:1000px) {
    .kanban-board {
        display: grid;
        gap: 40px;
        grid-column: 1fr;
    }
}
</style>