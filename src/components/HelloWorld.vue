<script setup lang="ts">
import Sortable from "./Sortable.vue";
import { computed, ref } from "vue";
import type { SortableOptions } from "sortablejs";
import type { AutoScrollOptions } from "sortablejs/plugins";
import type { ComponentExposed } from "vue-component-type-helpers"
const elements = computed(() => {
  return [
    {
      id: "1",
      text: "One",
      children: [
        {
          id: "1-1",
          text: "One-One",
          children: [
            {
              id: "1-1-1",
              text: "One-One-One",
            },
            {
              id: "1-1-2",
              text: "One-One-Two",
            },
          ],
        },
        {
          id: "1-2",
          text: "One-Two",
        },
      ],
    },
    {
      id: "2",
      text: "Two",
    },
    {
      id: "3",
      text: "Three",
    },
    {
      id: "4",
      text: "Four",
    },
    {
      id: "5",
      text: "Five",
    },
    {
      id: "6",
      text: "Six",
    },
    {
      id: "7",
      text: "Seven",
    },
    {
      id: "8",
      text: "Eight",
    },
    {
      id: "9",
      text: "Nine",
    },
    {
      id: "10",
      text: "Ten",
    },
    {
      id: "11",
      text: "Eleven",
    },
    {
      id: "12",
      text: "Twelve",
    },
    {
      id: "13",
      text: "Thirteen",
    },
    {
      id: "14",
      text: "Fourteen",
    },
    {
      id: "15",
      text: "Fifteen",
    },
    {
      id: "16",
      text: "Sixteen",
    },
    {
      id: "17",
      text: "Seventeen",
    },
    {
      id: "18",
      text: "Eighteen",
    },
    {
      id: "19",
      text: "Nineteen",
    },
    {
      id: "20",
      text: "Twenty",
    },
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
    animation: 150,
    ghostClass: "ghost",
    dragClass: "drag",
    scroll: true,
    forceFallback: true,
    bubbleScroll: true,
  };
});
</script>

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

<template>
  <main>
    <div class="wrapper">
      <Sortable :list="elements" item-key="id" :options="options" @change="logEvent" @choose="logEvent"
        @unchoose="logEvent" @start="logEvent" @end="logEvent" @add="logEvent" @update="logEvent" @sort="logEvent"
        @remove="logEvent" @filter="logEvent" @move="logEvent" @clone="logEvent" ref="sortable">
        <template #item="{ element, index }">
          <div class="draggable" :key="element.id" @click="logClick">
            {{ element.text }}
            <Sortable v-if="element.children" :list="element.children" :item-key="(item) => item.id" :options="options"
              @change="logEvent" @choose="logEvent" @unchoose="logEvent" @start="logEvent" @end="logEvent" @add="logEvent"
              @update="logEvent" @sort="logEvent" @remove="logEvent" @filter="logEvent" @move="logEvent"
              @clone="logEvent">
              <template #item="{ element, index }">
                <div class="draggable" :key="element.id">
                  {{ element.text }}
                </div>
              </template>
            </Sortable>
          </div>
        </template>
      </Sortable>
    </div>
  </main>
</template>
