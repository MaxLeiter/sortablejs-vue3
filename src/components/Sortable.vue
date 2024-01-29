<script setup lang="ts" generic="T">
import Sortable, { SortableOptions } from "sortablejs";
import type { AutoScrollOptions } from "sortablejs/plugins";
import { Ref, computed, onUnmounted, ref, useAttrs, watch } from "vue";

type SortableOptionsProp = Omit<
  SortableOptions | AutoScrollOptions,
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
>;

type ExposedProps = {
  containerRef: Ref<HTMLDivElement | null>;
  sortable: Ref<Sortable | null>;
  isDragging: Ref<boolean>;
};

const props = defineProps<{
  options?: SortableOptionsProp;
  list: T[];
  itemKey: keyof T;
  tag?: string;
}>();

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

const attrs = useAttrs();

const isDragging = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const sortable = ref<Sortable | null>(null);
const getKey = computed(() => {
  if (typeof props.itemKey === "string")
    return (item: any) => item[props.itemKey as string];
  return props.itemKey;
});

defineExpose({
  containerRef,
  sortable,
  isDragging,
} as ExposedProps);

watch(containerRef, (newDraggable) => {
  if (newDraggable) {
    sortable.value = new Sortable(newDraggable, {
      ...props.options,
      onChoose: (event) => emit("choose", event),
      onUnchoose: (event) => emit("unchoose", event),
      onStart: (event) => {
        isDragging.value = true;
        emit("start", event);
      },
      onEnd: (event) => {
        // This is a hack to move the event to the end of the event queue.
        // cf this issue: https://github.com/SortableJS/Sortable/issues/1184
        setTimeout(() => {
          isDragging.value = false;
          emit("end", event);
        });
      },
      onAdd: (event) => emit("add", event),
      onUpdate: (event) => emit("update", event),
      onSort: (event) => emit("sort", event),
      onRemove: (event) => emit("remove", event),
      onFilter: (event) => emit("filter", event),
      // See https://github.com/MaxLeiter/sortablejs-vue3/pull/56 for context on `attrs`.
      onMove: (event, originalEvent) =>
        "onMoveCapture" in attrs
          ? /**  eslint-disable-next-line */
            (<(event: Sortable.MoveEvent, originalEvent: Event) => void>(
              attrs.onMoveCapture
            ))(event, originalEvent)
          : emit("move", event, originalEvent),
      onClone: (event) => emit("clone", event),
      onChange: (event) => emit("change", event),
    });
  }
});

watch(
  () => props.options,
  (options) => {
    if (options && sortable?.value) {
      for (const property in options) {
        sortable.value.option(
          property as keyof SortableOptionsProp,
          options[property as keyof SortableOptionsProp],
        );
      }
    }
  },
);

onUnmounted(() => {
  if (sortable.value) {
    sortable.value.destroy();
    containerRef.value = null;
    sortable.value = null;
  }
});
</script>

<template>
  <component ref="containerRef" :is="$props.tag" :class="$props.class">
    <slot name="header"></slot>
    <slot
      v-for="(item, index) of list"
      :key="item[props.itemKey]"
      :element="item"
      :index="index"
      name="item"
    ></slot>
    <slot name="footer"></slot>
  </component>
</template>
