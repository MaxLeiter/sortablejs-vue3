# SortableJS-vue3

[Demo](https://sortablejs-vue3.maxleiter.com)
[!GIF of the demo being used](/readme/demo.gif)

This is a thin wrapper around the great [SortableJS](https://github.com/SortableJS/Sortable) library. I had many issues migrating from Vue.Draggable to vue.draggable.next, and after briefly investigating I decided that it was too complicated and a smaller solution was the answer. This wrapper tries to keep you as close to Sortable as possible (wrapper libaries seem to re-implement or unnecessarily wrap a lot of code).

Note that this library is small enough (see [Sortable.vue](https://github.com/MaxLeiter/sortablejs-vue3/blob/main/src/components/Sortable.vue) for what you really need) that I recommend including it in your project without using npm and importing it as a local component. All you need is the linked file.

### Why not use \<other library\>?

- `Vue.Draggable` only supports Vue 2
- `vue.draggable.next` uses the Options API, has multiple open (and afaict useful) pull requests, and had weird bugs/side-effects when I tried and used it
- `shopify/draggable` and [`vue-shopify-dragable`](https://github.com/zjffun/vue-shopify-draggable) seemed promising but they don't supported nested components

## Usage
You can see a demo with more complete code at [https://sortablejs-vue3.maxleiter.com](https://sortablejs-vue3.maxleiter.com).

1. Install the package:

  ```bash
  yarn add sortablejs-vue3 sortablejs
  ```

  or

  ```bash
  npm install sortablejs-vue3 sortablejs
  ```

2. Import the component in your `<script setup>` (or `<script>`):
```typescript
import { Sortable } from 'sortablejs-vue'
```

3. Use the component:

```typescript
<template>
  <main>
    <Sortable
      :list="elements"
      item-key="id"
      :options="options"
    >
      <template #item="{element, index}">
        <div class="draggable" :key="element.id">
          {{ element.name }}
        </div>
      </template>
    </Sortable>
</template>
```

4. The `list` and `item-key` props are necessary. The `options` prop is an object that can contain any SortableJS option. You can find a full list of them here: https://github.com/SortableJS/Sortable#options

### Events
You can listen to Sortable events by adding the listeners to the `Sortable` component. For example:

```typescript
<Sortable
  :list="elements"
  item-key="id"
  @change="(event: Sortable.SortableEvent) => void"
  @choose="(event: Sortable.SortableEvent) => void"
  @unchoose="(event: Sortable.SortableEvent) => void"
  @start="(event: Sortable.SortableEvent) => void"
  @end="(event: Sortable.SortableEvent) => void"
  @add="(event: Sortable.SortableEvent) => void"
  @update="(event: Sortable.SortableEvent) => void"
  @sort="(event: Sortable.SortableEvent) => void"
  @remove="(event: Sortable.SortableEvent) => void"
  @filter="(event: Sortable.SortableEvent) => void"
  @move="(event: Sortable.MoveEvent, event2: Event) => void"
  @clone="(event: Sortable.SortableEvent) => void"
>
```

### Vuex
No changes are necessary to work with Vuex. Just pass `store.state.item` as your list. To modify your data you need to manually listen to the events and calculate the new position with `event.oldIndex` and `event.newIndex` with something like the following:

```typescript
const moveItemInArray = <T>(array: T[], from: number, to: number) => {
  const item = array.splice(from, 1)[0];
  array.splice(to, 0, item);
};

onEnd(event) { moveItemInArray(store.state.items, event.oldIndex, event.newIndex }
```
## Development
1. Run `yarn` to install dependencies
2. `yarn dev` will start a web server with live reloading
3. `yarn build` will build the production library files
4. `yarn build:site` will build the demo website

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
