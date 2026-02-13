<script setup lang="ts">
import Sortable from "./Sortable.vue";
import { reactive, computed, nextTick } from "vue";
import type { SortableEvent, SortableOptions } from "sortablejs";

interface Item {
  id: string;
  name: string;
  icon: string;
}

const lists = reactive({
  available: [
    { id: "f1", name: "TypeScript", icon: "🔷" },
    { id: "f2", name: "Vue 3", icon: "💚" },
    { id: "f3", name: "React", icon: "⚛️" },
    { id: "f4", name: "Svelte", icon: "🔥" },
    { id: "f5", name: "Angular", icon: "🔺" },
    { id: "f6", name: "Solid", icon: "💙" },
    { id: "f7", name: "Astro", icon: "🚀" },
    { id: "f8", name: "Nuxt", icon: "💎" },
  ] as Item[],
  selected: [
    { id: "f9", name: "Next.js", icon: "▲" },
    { id: "f10", name: "Vite", icon: "⚡" },
  ] as Item[],
});

const options = computed<SortableOptions>(() => ({
  group: "transfer",
  animation: 200,
  ghostClass: "transfer-ghost",
  dragClass: "transfer-drag",
  chosenClass: "transfer-chosen",
  draggable: ".transfer-item",
  forceFallback: true,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
}));

function onRemove(event: SortableEvent, group: "available" | "selected") {
  if (event.oldIndex === undefined || event.oldIndex === null) return;
  lists[group].splice(event.oldIndex, 1);
}

function onAdd(event: SortableEvent, group: "available" | "selected") {
  nextTick(() => {
    if (event.newIndex === undefined || event.newIndex === null) return;
    const fromGroup = event.from.dataset.group as "available" | "selected";
    // SortableJS already moved the DOM element. We need to synchronize our data.
    // The item data comes from the old list before removal.
  });
}

function onUpdate(event: SortableEvent, group: "available" | "selected") {
  if (event.oldIndex === undefined || event.newIndex === undefined) return;
  const item = lists[group].splice(event.oldIndex, 1)[0];
  lists[group].splice(event.newIndex, 0, item);
}

function moveAll(from: "available" | "selected", to: "available" | "selected") {
  lists[to].push(...lists[from].splice(0));
}
</script>

<template>
  <section class="transfer-section">
    <h2>Multi-List Transfer</h2>
    <p class="subtitle">Drag items between lists or use the arrow buttons to transfer all.</p>

    <div class="transfer-container">
      <div class="transfer-panel">
        <div class="panel-header">
          <span class="panel-title">Available</span>
          <span class="panel-count">{{ lists.available.length }}</span>
        </div>
        <Sortable
          :list="lists.available"
          item-key="id"
          :options="options"
          data-group="available"
          class="transfer-list"
          @remove="onRemove($event, 'available')"
          @update="onUpdate($event, 'available')"
        >
          <template #item="{ element }">
            <div class="transfer-item" :key="element.id">
              <span class="item-icon">{{ element.icon }}</span>
              <span class="item-name">{{ element.name }}</span>
            </div>
          </template>
        </Sortable>
      </div>

      <div class="transfer-controls">
        <button
          class="transfer-btn"
          @click="moveAll('available', 'selected')"
          :disabled="lists.available.length === 0"
          title="Move all right"
        >
          &raquo;
        </button>
        <button
          class="transfer-btn"
          @click="moveAll('selected', 'available')"
          :disabled="lists.selected.length === 0"
          title="Move all left"
        >
          &laquo;
        </button>
      </div>

      <div class="transfer-panel">
        <div class="panel-header">
          <span class="panel-title">Selected</span>
          <span class="panel-count selected-count">{{ lists.selected.length }}</span>
        </div>
        <Sortable
          :list="lists.selected"
          item-key="id"
          :options="options"
          data-group="selected"
          class="transfer-list"
          @remove="onRemove($event, 'selected')"
          @update="onUpdate($event, 'selected')"
        >
          <template #item="{ element }">
            <div class="transfer-item" :key="element.id">
              <span class="item-icon">{{ element.icon }}</span>
              <span class="item-name">{{ element.name }}</span>
            </div>
          </template>
        </Sortable>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transfer-section {
  margin: 3rem 0;
  max-width: 100%;
  overflow: hidden;
}

.transfer-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.subtitle {
  color: var(--text-muted);
  margin: 0 0 1.5rem;
  font-size: 0.95rem;
}

.transfer-container {
  display: flex;
  gap: 1rem;
  align-items: stretch;
}

@media (max-width: 600px) {
  .transfer-container {
    flex-direction: column;
  }
  .transfer-controls {
    flex-direction: row !important;
  }
}

.transfer-panel {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}

.panel-title {
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.panel-count {
  font-size: 0.75rem;
  font-weight: 700;
  background: var(--accent-light);
  color: var(--accent);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}

.selected-count {
  background: #10b98122;
  color: #10b981;
}

.transfer-list {
  padding: 0.5rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.transfer-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: grab;
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  user-select: none;
}

.transfer-item:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transform: translateX(2px);
}

.transfer-item:active {
  cursor: grabbing;
}

.item-icon {
  font-size: 1.25rem;
}

.item-name {
  font-weight: 500;
  font-size: 0.9rem;
}

.transfer-controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.transfer-btn {
  background: var(--surface);
  border: 2px solid var(--border);
  color: var(--text);
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.transfer-btn:hover:not(:disabled) {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  transform: scale(1.05);
}

.transfer-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* SortableJS Classes */
.transfer-ghost {
  opacity: 0.3;
}

.transfer-drag {
  opacity: 0.9;
}

.transfer-chosen {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
</style>
