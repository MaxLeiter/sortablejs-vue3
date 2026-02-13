<script setup lang="ts">
import Sortable from "./Sortable.vue";
import { reactive, computed, ref, nextTick } from "vue";
import type { SortableEvent, SortableOptions } from "sortablejs";

interface Task {
  id: string;
  text: string;
  priority: "low" | "medium" | "high";
  emoji: string;
}

interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

const columns = reactive<Column[]>([
  {
    id: "todo",
    title: "To Do",
    color: "#6366f1",
    tasks: [
      { id: "t1", text: "Design new landing page", priority: "high", emoji: "🎨" },
      { id: "t2", text: "Write unit tests", priority: "medium", emoji: "🧪" },
      { id: "t3", text: "Update dependencies", priority: "low", emoji: "📦" },
      { id: "t4", text: "Code review PR #42", priority: "medium", emoji: "👀" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    color: "#f59e0b",
    tasks: [
      { id: "t5", text: "Build sortable component", priority: "high", emoji: "🔧" },
      { id: "t6", text: "API integration", priority: "high", emoji: "🔌" },
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "#8b5cf6",
    tasks: [
      { id: "t7", text: "Accessibility audit", priority: "medium", emoji: "♿" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "#10b981",
    tasks: [
      { id: "t8", text: "Setup CI/CD", priority: "high", emoji: "🚀" },
      { id: "t9", text: "Configure linting", priority: "low", emoji: "✅" },
      { id: "t10", text: "Initialize project", priority: "low", emoji: "🏗️" },
    ],
  },
]);

const totalTasks = computed(() => columns.reduce((sum, col) => sum + col.tasks.length, 0));

const newTaskText = ref("");
const showNewTaskInput = ref(false);

function addTask() {
  if (!newTaskText.value.trim()) return;
  columns[0].tasks.push({
    id: `t${Date.now()}`,
    text: newTaskText.value.trim(),
    priority: "medium",
    emoji: "📝",
  });
  newTaskText.value = "";
  showNewTaskInput.value = false;
}

function removeTask(colIndex: number, taskIndex: number) {
  columns[colIndex].tasks.splice(taskIndex, 1);
}

function getOptions(): SortableOptions {
  return {
    group: "kanban",
    animation: 250,
    ghostClass: "kanban-ghost",
    dragClass: "kanban-drag",
    chosenClass: "kanban-chosen",
    draggable: ".kanban-card",
    forceFallback: true,
    fallbackClass: "kanban-fallback",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  };
}

function onEnd(event: SortableEvent, colIndex: number) {
  // Handle cross-column moves
}

function onAdd(event: SortableEvent, colIndex: number) {
  nextTick(() => {
    if (event.newIndex === undefined || event.newIndex === null) return;
    const fromColId = event.from.dataset.colId;
    const fromCol = columns.find((c) => c.id === fromColId);
    if (!fromCol) return;
    // Item was already moved in DOM by SortableJS; sync state
  });
}

function onRemove(event: SortableEvent, colIndex: number) {
  if (event.oldIndex === undefined || event.oldIndex === null) return;
  columns[colIndex].tasks.splice(event.oldIndex, 1);
}

function onUpdate(event: SortableEvent, colIndex: number) {
  if (event.oldIndex === undefined || event.newIndex === undefined) return;
  const item = columns[colIndex].tasks.splice(event.oldIndex, 1)[0];
  columns[colIndex].tasks.splice(event.newIndex, 0, item);
}

const priorityColors: Record<string, string> = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#ef4444",
};
</script>

<template>
  <section class="kanban-section">
    <div class="kanban-header">
      <div>
        <h2>Kanban Board</h2>
        <p class="subtitle">Drag tasks between columns. {{ totalTasks }} tasks total.</p>
      </div>
      <button class="add-btn" @click="showNewTaskInput = !showNewTaskInput">
        <span v-if="!showNewTaskInput">+ Add Task</span>
        <span v-else>Cancel</span>
      </button>
    </div>
    <div v-if="showNewTaskInput" class="new-task-bar">
      <input
        v-model="newTaskText"
        placeholder="What needs to be done?"
        class="new-task-input"
        @keyup.enter="addTask"
        autofocus
      />
      <button class="confirm-btn" @click="addTask">Add</button>
    </div>
    <div class="kanban-board">
      <div v-for="(col, colIndex) in columns" :key="col.id" class="kanban-column">
        <div class="column-header" :style="{ borderColor: col.color }">
          <span class="column-dot" :style="{ background: col.color }"></span>
          <h3>{{ col.title }}</h3>
          <span class="task-count" :style="{ background: col.color + '22', color: col.color }">
            {{ col.tasks.length }}
          </span>
        </div>
        <Sortable
          :list="col.tasks"
          item-key="id"
          :options="getOptions()"
          :data-col-id="col.id"
          class="kanban-list"
          @end="onEnd($event, colIndex)"
          @remove="onRemove($event, colIndex)"
          @update="onUpdate($event, colIndex)"
        >
          <template #item="{ element, index }">
            <div class="kanban-card" :key="element.id">
              <div class="card-top">
                <span class="card-emoji">{{ element.emoji }}</span>
                <button class="delete-btn" @click.stop="removeTask(colIndex, index)" title="Remove task">
                  &times;
                </button>
              </div>
              <p class="card-text">{{ element.text }}</p>
              <span
                class="priority-badge"
                :style="{
                  background: priorityColors[element.priority] + '18',
                  color: priorityColors[element.priority],
                  borderColor: priorityColors[element.priority] + '44',
                }"
              >
                {{ element.priority }}
              </span>
            </div>
          </template>
        </Sortable>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kanban-section {
  margin: 3rem 0;
  max-width: 100%;
  overflow: hidden;
}

.kanban-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.kanban-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

.subtitle {
  color: var(--text-muted);
  margin: 0.25rem 0 0;
  font-size: 0.95rem;
}

.add-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.add-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.new-task-bar {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.new-task-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--surface);
  color: var(--text);
  outline: none;
  transition: border-color 0.2s;
}

.new-task-input:focus {
  border-color: var(--accent);
}

.confirm-btn {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
}

.kanban-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  overflow-x: auto;
}

@media (max-width: 900px) {
  .kanban-board {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .kanban-board {
    grid-template-columns: 1fr;
  }
}

.kanban-column {
  background: var(--surface);
  border-radius: 12px;
  padding: 1rem;
  min-height: 200px;
  border: 1px solid var(--border);
}

.column-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid;
}

.column-header h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  flex: 1;
}

.column-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.task-count {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}

.kanban-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 100px;
}

.kanban-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.75rem;
  cursor: grab;
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.kanban-card:hover {
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.kanban-card:active {
  cursor: grabbing;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.card-emoji {
  font-size: 1.25rem;
}

.delete-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 0.25rem;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.15s, color 0.15s;
}

.kanban-card:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: #ef4444;
}

.card-text {
  margin: 0 0 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
}

.priority-badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  border: 1px solid;
}

/* SortableJS Classes */
.kanban-ghost {
  opacity: 0.3;
}

.kanban-drag {
  opacity: 0.9;
  transform: rotate(2deg);
}

.kanban-chosen {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.kanban-fallback {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  transform: rotate(3deg) scale(1.02);
}
</style>
