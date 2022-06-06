<script setup lang="ts">
import Sortable from "./Sortable.vue";
import { computed } from 'vue'
import type { SortableOptions } from "sortablejs";

const elements = computed(() => {
    return [
        {
            id: '1',
            text: 'One',
            children: [
                {
                    id: '1-1',
                    text: 'One-One',
                    children: [
                        {
                            id: '1-1-1',
                            text: 'One-One-One',
                        },
                        {
                            id: '1-1-2',
                            text: 'One-One-Two',
                        },
                    ],
                },
                {
                    id: '1-2',
                    text: 'One-Two',
                },
            ],
        },
        {
            id: '2',
            text: 'Two'
        },
        {
            id: '3',
            text: 'Three'
        }
    ]
})

const logEvent = (evt: Event, evt2?: Event) => {
    if (evt2) {
        console.log(evt, evt2);
    } else {
        console.log(evt);
    }
}

const options = computed(() => {
  return {
    draggable: '.draggable',
    animation: 150,
    ghostClass: 'ghost',
    dragClass: 'drag',
  } as SortableOptions
})
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
</style>

<template>
  <main>
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
    >
      <template #item="{element, index}">
        <div class="draggable" :key="element.id">
          {{ element.text }}
          <Sortable
            v-if="element.children"
            :list="element.children"
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
          >
            <template #item="{element, index}">
              <div class="draggable" :key="element.id">
                {{ element.text }}
              </div>
            </template>
          </Sortable>
        </div>
      </template>
    </Sortable>
  </main>
</template>

<style scoped>

</style>
