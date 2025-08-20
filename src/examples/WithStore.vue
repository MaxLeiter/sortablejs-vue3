<script setup lang="ts">
import Sortable from "../components/Sortable.vue";
import { computed, nextTick, ref } from "vue";
import type { SortableEvent, SortableOptions } from "sortablejs";
import type { AutoScrollOptions } from "sortablejs/plugins";
import { ComponentExposed } from "vue-component-type-helpers";

const store = {
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
        ] as { id: string; text: string }[],
        fruits: [
            {
                id: "a",
                text: "Apple",
            },
            ...Array.from({ length: 10 }, (_, i) => ({
                id: `${String.fromCharCode(98 + i)}`,
                text: `Fruit ${String.fromCharCode(98 + i)}`,
            })),
        ] as { id: string; text: string }[],
    },
}

const elements = computed(() => {
    return store.elements.items;
});

const fruits = computed(() => {
    return store.elements.fruits;
});

const sortable = ref<ComponentExposed<typeof Sortable> | null>(null);

const logEvent = (evt: Event, evt2?: Event) => {
    if (evt2) {
        console.log(evt, evt2);
    } else {
        console.log(evt);
    }
};

const removeItemFromArray = (group: keyof typeof store.elements, from: number) => {
    store.elements[group].splice(from, 1)[0];
};

function onRemove(event: SortableEvent, group: keyof typeof store.elements) {
    if (!event.oldIndex) return;
    removeItemFromArray(group, event.oldIndex);
}

const addItemToGroup = (group: keyof typeof store.elements, item: { id: string; text: string }, to: number) => {
    store.elements[group].splice(to, 0, item);
};

function onAdd(event: SortableEvent, group: keyof typeof store.elements) {
    nextTick(() => {
        if (!event.newIndex) return;
        let item = {
            id: "new",
            text: "New Item",
        };

        addItemToGroup(group, item, event.newIndex)
    });
}

const moveItemInArray = (group: keyof typeof store.elements, from: number, to: number) => {
    const item = store.elements[group].splice(from, 1)[0];
    store.elements[group].splice(to, 0, item);
};

function onUpdate(event: SortableEvent, group: keyof typeof store.elements): void {
    if (!event.oldIndex || !event.newIndex) return;
    moveItemInArray(group, event.oldIndex, event.newIndex);
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
            <Sortable :list="fruits" item-key="id" :options="options" @change="logEvent" @choose="logEvent"
                @unchoose="logEvent" @start="logEvent" @end="logEvent" @add="onAdd($event, 'fruits')"
                @update="onUpdate($event, 'fruits')" @sort="logEvent" @remove="onRemove($event, 'fruits')"
                @filter="logEvent" @move="logEvent" @clone="logEvent">
                <template #item="{ element }">
                    <div :key="element.id" class="draggable">
                        {{ element.text }}
                    </div>
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
