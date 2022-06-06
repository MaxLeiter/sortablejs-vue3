# SortableJS-vue3

This is a thin wrapper around the great [SortableJS](https://github.com/SortableJS/Sortable) library. I had many issues migration from Vue.Draggable to vue.draggable.next, and after briefly investigating I decided that it was too complicated and a smaller solution was the answer. This wrapper tries to keep you as close to Sortable and vanilla JS as possible.

## Usage
1. `yarn add sortablejs-vue3 sortablejs` or `npm install sortablejs-vue3 sortablejs`
2. Import the component in your `<script setup>`: `import { Sortable } from 'sortablejs-vue'`
3. Use the component:

```typescript
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
          {{ element.name }}
        </div>
      </template>
    </Sortable>
</template>
```

4. The `list` and `item-key` props are necessary. The `options` prop is an object that can contain any SortableJS option. You can find a full list of them here: https://github.com/SortableJS/Sortable#options

## Development
1. Run `yarn`
2. `yarn dev` will start a web server with live reloading
3. `yarn build` will build the production files

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
