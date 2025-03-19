<template>
  <div class="kanban-board">
    <KanbanColumn :columnTitle="'Not Started'" :tasks="notStartedTasks" @taskUpdated="getTasks"
      :priorityLevels="priorityLevels" :duedateOptions="duedateOptions" />
    <KanbanColumn :columnTitle="'In Progress'" :tasks="inProgressTasks" @taskUpdated="getTasks"
      :priorityLevels="priorityLevels" :duedateOptions="duedateOptions" />
    <KanbanColumn :columnTitle="'Completed'" :tasks="completedTasks" @taskUpdated="getTasks"
      :priorityLevels="priorityLevels" :duedateOptions="duedateOptions" />
  </div>
</template>
<script>
import KanbanColumn from './KanbanColumn.vue';
import { addDoc, collection, db, auth, onSnapshot, query, where, } from '../firebase';
export default {
  data() {
    return {
      tasks: [],
      alreadyReminded: false,
    }
  },
  components: {
    KanbanColumn
  },
  props: {
    priorityLevels: Object,
    duedateOptions: Object
  },
  async created() {
    try {
      await this.getTasks(); 
      this.checkReminderStatus();  
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },
  computed: {
    notStartedTasks() {
      return this.tasks.filter((task) => task.status == "Not Started")
    },
    inProgressTasks() {
      return this.tasks.filter((task) => task.status == "In Progress")
    },
    completedTasks() {
      return this.tasks.filter((task) => task.status == "Completed")
    },
    formattedDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
  },

  methods: {
    async saveTask() {
      try {
        const user = auth.currentUser;
        if (user) {
          await addDoc(collection(db, "task"), {
            name: this.task.name,
            description: this.task.description,
            duedate: this.task.duedate,
            status: this.task.status,
            user: user.uid
          });
          this.task = {}
          this.$toast.success('Successfully added task');
        }
      } catch (error) {
        console.log(error);
        this.$toast.error(`Could not add task! ${error}`);
      }
    },
    async getTasks() {
    const user = auth.currentUser;
    const tasksCollection = collection(db, "task");
    const tasksQuery = query(tasksCollection, where("user", "==", user.uid));

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
    checkReminderStatus() {
      this.alreadyReminded = localStorage.getItem("reminded");
      if (this.alreadyReminded === null || this.alreadyReminded === "false") {
        localStorage.setItem("reminded", "false");
        if (this.tasks.length > 0) {
          this.tasks.forEach(task => {
            const dueDate = task.duedate;

            if (dueDate === this.formattedDate) {
              this.$toast.success(`Reminder: today is due date for task: ${task.name}!`);
              localStorage.setItem("reminded", "true");
            }
          });
        } else {
          console.log("No tasks to process.");
        }
      } else {
        console.log("Already reminded or reminder has already been triggered.");
      }
    }

  }
};
</script>

<style scoped>
.kanban-board {
  display: flex;
  overflow-x: auto;
  padding: 20px;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
}
</style>