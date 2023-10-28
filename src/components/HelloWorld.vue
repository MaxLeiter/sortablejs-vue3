<script setup lang="ts">
import Sortable from "./Sortable.vue";
import { computed, nextTick, ref } from "vue";
import type { SortableOptions } from "sortablejs";
import type { AutoScrollOptions } from "sortablejs/plugins";
import { defineStore } from "pinia";

const store = defineStore({
  id: "demo",
  state: () => ({
    elements: {
      items: [
        {
          id: "1",
          text: "One",
        },
        ...Array.from({ length: 10 }, (_, i) => ({
          id: `${i + 2}`,
          text: `Item ${i + 2}`,
        })),
      ],
      fruits: [
        {
          id: "a",
          text: "Apple",
        },
        ...Array.from({ length: 10 }, (_, i) => ({
          id: `${String.fromCharCode(98 + i)}`,
          text: `Fruit ${String.fromCharCode(98 + i)}`,
        })),
      ],
    },
  }),
  getters: {},
  actions: {},
})();

const elements = computed(() => {
  return store.elements.items;
});

const fruits = computed(() => {
  return store.elements.fruits;
});

const sortable = ref<InstanceType<typeof Sortable> | null>(null);

const logEvent = (evt: Event, evt2?: Event) => {
  if (evt2) {
    console.log(evt, evt2);
  } else {
    console.log(evt);
  }
};

const removeItemFromArray = (array: string, from: number) => {
  store.elements[array].splice(from, 1)[0];
};
function onRemove(event, array) {
  removeItemFromArray(array, event.oldIndex);
  // event.item.remove(); // Hack to remove phantom DOM element :(
}
const addItemToArray = (array: string, item: object, to: number) => {
  store.elements[array].splice(to, 0, item);
};
function onAdd(event, array) {
  // temporary hardcoded fake item - TODO: get correct item from store
  let item = {
    id: "t",
    text: "test",
  };
  nextTick(() => addItemToArray(array, item, event.newIndex));
}
const moveItemInArray = (array: string, from: number, to: number) => {
  const item = store.elements[array].splice(from, 1)[0];
  store.elements[array].splice(to, 0, item);
};
function onUpdate(event, array) {
  moveItemInArray(array, event.oldIndex, event.newIndex);
}


const options = computed<SortableOptions | AutoScrollOptions>(() => {
  return {
    draggable: ".draggable",
    animation: 150,
    ghostClass: "ghost",
    dragClass: "drag",
    group: "testgroup",
    scroll: true,
    forceFallback: true,
    bubbleScroll: true,

  };
});

</script>

<template>
  <main>
    <div class="wrapper">
      <Sortable ref="sortable" :list="elements" item-key="id" :options="options" @change="logEvent" @choose="logEvent"
        @unchoose="logEvent" @start="logEvent" @end="logEvent" @add="onAdd($event, 'items')"
        @update="onUpdate($event, 'items')" @sort="logEvent" @remove="onRemove($event, 'items')" @filter="logEvent"
        @move="logEvent" @clone="logEvent">
        <template #item="{ element }">
          <div :key="element.id" class="draggable">
            {{ element.text }}
          </div>
        </template>
      </Sortable>
      <Sortable :list="fruits" item-key="id" :options="options" @change="logEvent" @choose="logEvent" @unchoose="logEvent"
        @start="logEvent" @end="logEvent" @add="onAdd($event, 'fruits')" @update="onUpdate($event, 'fruits')"
        @sort="logEvent" @remove="onRemove($event, 'fruits')" @filter="logEvent" @move="logEvent" @clone="logEvent">
        <template #item="{ element }">
          <div :key="element.id" class="draggable">
            {{ element.text }} </div>
        </template>
      </Sortable>
    </div>
  </main>
</template>

<style lang="css" scoped>
main {
  max-width: 800px;
  margin: 0 auto;
}

.draggable {
  background: #fff;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  cursor: move;
}

.ghost {
  opacity: 0.5;
  background: #fff;
  border: 1px dashed #ccc;
}

.drag {
  background: #f5f5f5;
}

.wrapper {
  max-height: 400px;
  overflow-y: auto;
}

.settings {
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
}

.settings .range {
  display: flex;
  flex-direction: column;
}

.settings .range p {
  margin: 0;
}
</style>
