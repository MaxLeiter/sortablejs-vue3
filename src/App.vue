<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <h1>SortableJS-vue3 demo</h1>
  <ol class="instructions">
    <li>First run <code>yarn add sortablejs-vue3 sortablejs</code></li>
    <li>
      Then add
      <pre><code>import Sortable from "sortablejs-vue3"</code></pre>
      in your <code>&lt;script setup&gt;</code>
    </li>
    <li>
      Finally use the component:
      <pre>
{{ `<Sortable
  :list="list"
  :itemKey="itemKey"
  options="options"
  @choose="(event) => console.log(event)"
  @end="(event) => console.log(event)">
      <template #item="{element, index}">
        <div class="draggable" :key="element.id">
          &#123;&#123; element.name &#125;&#125;
        </div>
      </template>
</Sortable>` }}
      </pre>
    </li>
  </ol>
  <details>
    <summary>Props</summary>
    <ul>
      <li>
        <strong><code>options</code></strong
        >: An object supporting all SortedJS options. See Sortable on GitHub
        <a
          href="https://github.com/SortableJS/Sortable#options"
          rel="noreferrer"
          target="_blank"
          >for a full list</a
        >.
      </li>
      <li>
        <strong><code>list</code></strong
        >: An array-like object of elements to be made draggable.
      </li>
      <li>
        <strong><code>itemKey</code></strong
        >: A key to index the elements of the list.
      </li>
    </ul>
  </details>
  <details>
    <summary>Code for the below demo</summary>
    <pre>
{{ `<script setup lang="ts">
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
          &#123;&#123; element.text &#125;&#125;
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
               &#123;&#123; element.text &#125;&#125;
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
`}}
  </pre>
  </details>
  <p>
    Open your console to view the events being logged while you interact with
    the list below.
  </p>

  <HelloWorld />
</template>

<style>
#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0 auto;
  max-width: 800px;
}

#app .instructions {
  font-size: 1.1rem;
}

#app .instructions code {
  font-size: .9rem;
}

#app .instructions li {
  margin-bottom: .5rem;
}

#app details {
  margin: 20px 0;
  max-width: 800px;
  padding: 8px 10px;
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

#app pre {
  font-size: 14px;
  padding: 10px;
  margin: 0 auto;
  max-width: 800px;
  text-align: left;
  overflow-x: scroll;
  max-height: 500px;
}

#app ul {
  list-style: none;
  padding: 0;
  text-align: left;
  max-width: 800px;
  margin: 8px auto;
}

#app .draggable {
  border-radius: 4px;
}

#app summary::after {
  content: " (click to expand)";
}
</style>
