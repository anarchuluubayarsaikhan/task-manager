<template>
  <div class="kanban-board">
    <KanbanColumn />
  </div>
</template>
<script>
import KanbanColumn from './KanbanColumn.vue';
export default {
  components: {
    KanbanColumn
  },
  data() {
    return {
    };
  },
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