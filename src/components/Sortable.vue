<script setup lang="ts">
import { ref, PropType, watch, onUnmounted, Prop } from "vue";
import Sortable, { SortableOptions } from "sortablejs";

let sortable: Sortable | null = null;
const props = defineProps({
  options: {
    type: Object as PropType<
      Omit<
        SortableOptions,
        | "onUnchoose"
        | "onChoose"
        | "onStart"
        | "onEnd"
        | "onAdd"
        | "onUpdate"
        | "onSort"
        | "onRemove"
        | "onFilter"
        | "onMove"
        | "onClone"
        | "onChange"
      >
    >,
    default: null,
    required: false,
  },
  list: {
    type: Array as PropType<any[]>,
    default: [],
    required: true,
  },
  itemKey: {
    type: String as PropType<string>,
    default: "",
    required: true,
  },
});

const emit = defineEmits<{
  (eventName: "choose", evt: Sortable.SortableEvent): void;
  (eventName: "unchoose", evt: Sortable.SortableEvent): void;
  (eventName: "start", evt: Sortable.SortableEvent): void;
  (eventName: "end", evt: Sortable.SortableEvent): void;
  (eventName: "add", evt: Sortable.SortableEvent): void;
  (eventName: "update", evt: Sortable.SortableEvent): void;
  (eventName: "sort", evt: Sortable.SortableEvent): void;
  (eventName: "remove", evt: Sortable.SortableEvent): void;
  (eventName: "filter", evt: Sortable.SortableEvent): void;
  (eventName: "move", evt: Sortable.MoveEvent, originalEvent: Event): void;
  (eventName: "clone", evt: Sortable.SortableEvent): void;
  (eventName: "change", evt: Sortable.SortableEvent): void;
}>();

const containerRef = ref<HTMLElement | null>(null);

watch(containerRef, (newDraggable) => {
  if (newDraggable) {
    sortable = new Sortable(newDraggable, {
      ...props.options,
      onChoose: (event) => emit("choose", event),
      onUnchoose: (event) => emit("unchoose", event),
      onStart: (event) => emit("start", event),
      onEnd: (event) => emit("end", event),
      onAdd: (event) => emit("add", event),
      onUpdate: (event) => emit("update", event),
      onSort: (event) => emit("sort", event),
      onRemove: (event) => emit("remove", event),
      onFilter: (event) => emit("filter", event),
      onMove: (event, originalEvent) => emit("move", event, originalEvent),
      onClone: (event) => emit("clone", event),
      onChange: (event) => emit("change", event),
    });
  }
});

onUnmounted(() => {
  if (sortable) {
    sortable.destroy();
    containerRef.value = null;
  }
});
</script>

<template>
  <div ref="containerRef" :class="$props.class">
    <slot
      v-for="(item, index) of list"
      :key="item[$props.itemKey!]"
      :element="item"
      :index="index"
      name="item"
    ></slot>
  </div>
</template>
