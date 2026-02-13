<script setup lang="ts">
import Sortable from "./Sortable.vue";
import { computed, ref } from "vue";
import type { SortableOptions } from "sortablejs";
import type { AutoScrollOptions } from "sortablejs/plugins";
import type { ComponentExposed } from "vue-component-type-helpers";

const elements = computed(() => {
  return [
    { id: "1", text: "One", children: [
        { id: "1-1", text: "One-One", children: [
            { id: "1-1-1", text: "One-One-One" },
            { id: "1-1-2", text: "One-One-Two" },
          ],
        },
        { id: "1-2", text: "One-Two" },
      ],
    },
    { id: "2", text: "Two" },
    { id: "3", text: "Three" },
    { id: "4", text: "Four" },
    { id: "5", text: "Five" },
    { id: "6", text: "Six" },
    { id: "7", text: "Seven" },
    { id: "8", text: "Eight" },
    { id: "9", text: "Nine" },
    { id: "10", text: "Ten" },
    { id: "11", text: "Eleven" },
    { id: "12", text: "Twelve" },
    { id: "13", text: "Thirteen" },
    { id: "14", text: "Fourteen" },
    { id: "15", text: "Fifteen" },
    { id: "16", text: "Sixteen" },
    { id: "17", text: "Seventeen" },
    { id: "18", text: "Eighteen" },
    { id: "19", text: "Nineteen" },
    { id: "20", text: "Twenty" },
  ];
});

const sortable = ref<ComponentExposed<typeof Sortable> | null>(null);

const logEvent = (evt: Event, evt2?: Event) => {
  if (evt2) {
    console.log(evt, evt2);
  } else {
    console.log(evt);
  }
};

const logClick = (evt: Event) => {
  if (sortable.value?.isDragging) return;
  logEvent(evt);
};

const options = computed<SortableOptions | AutoScrollOptions>(() => {
  return {
    draggable: ".draggable",
    animation: 200,
    ghostClass: "ghost",
    dragClass: "drag",
    chosenClass: "chosen",
    scroll: true,
    forceFallback: true,
    bubbleScroll: true,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  };
});
</script>

<style lang="css" scoped>
.basic-section {
  margin: 1rem 0;
}

.basic-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.basic-subtitle {
  color: var(--text-muted);
  margin: 0 0 1rem;
  font-size: 0.95rem;
}

.console-hint {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-light);
  color: var(--accent);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.wrapper {
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  padding: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.draggable {
  background: var(--bg);
  padding: 0.75rem 1rem;
  margin: 0.35rem 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: grab;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  user-select: none;
}

.draggable:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
  transform: translateX(4px);
}

.draggable:active {
  cursor: grabbing;
}

/* Nested items */
.draggable .draggable {
  margin-left: 1rem;
  font-size: 0.85rem;
  border-left: 2px solid var(--accent);
  border-radius: 0 8px 8px 0;
}

.ghost {
  opacity: 0.3;
  border-style: dashed;
}

.drag {
  opacity: 0.9;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: rotate(1.5deg);
}

.chosen {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <section class="basic-section">
    <h2>Basic Sortable List</h2>
    <p class="basic-subtitle">
      Drag items to reorder. Supports nested lists with independent sorting.
    </p>
    <p class="console-hint">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
      </svg>
      Open your console to view events
    </p>
    <div class="wrapper">
      <Sortable
        :list="elements"
        item-key="id"
        :options="options"
        @change="logEvent"
        @choose="logEvent"
        @unchoose="logEvent"
        @start="logEvent"
        @end="logEvent"
        @add="logEvent"
        @update="logEvent"
        @sort="logEvent"
        @remove="logEvent"
        @filter="logEvent"
        @move="logEvent"
        @clone="logEvent"
        ref="sortable"
      >
        <template #item="{ element, index }">
          <div class="draggable" :key="element.id" @click="logClick">
            {{ element.text }}
            <Sortable
              v-if="element.children"
              :list="element.children"
              :item-key="(item: any) => item.id"
              :options="options"
              @change="logEvent"
              @choose="logEvent"
              @unchoose="logEvent"
              @start="logEvent"
              @end="logEvent"
              @add="logEvent"
              @update="logEvent"
              @sort="logEvent"
              @remove="logEvent"
              @filter="logEvent"
              @move="logEvent"
              @clone="logEvent"
            >
              <template #item="{ element: child }">
                <div class="draggable" :key="child.id">
                  {{ child.text }}
                  <Sortable
                    v-if="child.children"
                    :list="child.children"
                    :item-key="(item: any) => item.id"
                    :options="options"
                  >
                    <template #item="{ element: grandchild }">
                      <div class="draggable" :key="grandchild.id">
                        {{ grandchild.text }}
                      </div>
                    </template>
                  </Sortable>
                </div>
              </template>
            </Sortable>
          </div>
        </template>
      </Sortable>
    </div>
  </section>
</template>
