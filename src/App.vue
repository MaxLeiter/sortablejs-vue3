<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import KanbanBoard from "./components/KanbanBoard.vue";
import MultiListTransfer from "./components/MultiListTransfer.vue";
import AnimatedCounter from "./components/AnimatedCounter.vue";
import CodePreview from "./components/CodePreview.vue";
import DarkModeToggle from "./components/DarkModeToggle.vue";
import { ref } from "vue";

const activeTab = ref("basic");

const tabs = [
  { id: "basic", label: "Basic List", icon: "list" },
  { id: "kanban", label: "Kanban Board", icon: "columns" },
  { id: "transfer", label: "Multi-List", icon: "shuffle" },
];

const basicCode = `<Sortable
  :list="elements"
  item-key="id"
  :options="options"
  @end="onEnd"
>
  <template #item="{element, index}">
    <div class="draggable" :key="element.id">
      {{ element.name }}
    </div>
  </template>
</Sortable>`;

const kanbanCode = `<!-- Each column is its own Sortable with group: "kanban" -->
<div v-for="col in columns" class="kanban-column">
  <Sortable
    :list="col.tasks"
    item-key="id"
    :options="{ group: 'kanban', animation: 250 }"
    @remove="onRemove"
    @update="onUpdate"
  >
    <template #item="{element}">
      <div class="kanban-card">{{ element.text }}</div>
    </template>
  </Sortable>
</div>`;

const transferCode = `<!-- Two lists sharing the same group -->
<Sortable
  :list="available"
  item-key="id"
  :options="{ group: 'transfer', animation: 200 }"
>
  <template #item="{element}">
    <div class="item">{{ element.name }}</div>
  </template>
</Sortable>

<Sortable
  :list="selected"
  item-key="id"
  :options="{ group: 'transfer', animation: 200 }"
>
  <template #item="{element}">
    <div class="item">{{ element.name }}</div>
  </template>
</Sortable>`;
</script>

<template>
  <div id="app-shell">
    <header class="hero">
      <div class="hero-inner">
        <div class="hero-top">
          <div class="badge-row">
            <a href="https://www.npmjs.com/package/sortablejs-vue3" target="_blank" rel="noreferrer" class="badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              npm
            </a>
            <a href="https://github.com/maxleiter/sortablejs-vue3" target="_blank" rel="noreferrer" class="badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
          <DarkModeToggle />
        </div>

        <h1 class="hero-title">
          <span class="hero-title-sort">Sortable</span><span class="hero-title-js">JS</span>
          <span class="hero-title-vue">Vue3</span>
        </h1>
        <p class="hero-description">
          A thin, TypeScript-first wrapper around
          <a href="https://github.com/SortableJS/Sortable" target="_blank" rel="noreferrer">SortableJS</a>
          for Vue 3. Drag, drop, and sort with full event support, nested lists, and store integration.
        </p>

        <div class="stats-row">
          <AnimatedCounter :value="1500" label="GitHub Stars" suffix="+" />
          <AnimatedCounter :value="25000" label="Weekly Downloads" suffix="+" />
          <AnimatedCounter :value="0" label="Dependencies" />
        </div>

        <div class="install-block">
          <code class="install-cmd">pnpm add sortablejs-vue3 sortablejs</code>
        </div>
      </div>
    </header>

    <main class="main-content">
      <nav class="demo-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </nav>

      <Transition name="tab-fade" mode="out-in">
        <div v-if="activeTab === 'basic'" key="basic">
          <HelloWorld />
          <CodePreview :code="basicCode" title="Basic Sortable List" />
        </div>
        <div v-else-if="activeTab === 'kanban'" key="kanban">
          <KanbanBoard />
          <CodePreview :code="kanbanCode" title="Kanban Board" />
        </div>
        <div v-else-if="activeTab === 'transfer'" key="transfer">
          <MultiListTransfer />
          <CodePreview :code="transferCode" title="Multi-List Transfer" />
        </div>
      </Transition>

      <section class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h3>TypeScript First</h3>
          <p>Full type definitions, generic component support, and strict type safety out of the box.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <h3>Nested Lists</h3>
          <p>Supports deeply nested sortable lists with independent drag-and-drop contexts.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h3>Lightweight</h3>
          <p>Zero dependencies beyond SortableJS itself. Minimal wrapper, maximum flexibility.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h3>All Events</h3>
          <p>Every SortableJS event is exposed as a Vue emit. Listen to choose, start, end, add, update, and more.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
            </svg>
          </div>
          <h3>Store Compatible</h3>
          <p>Works seamlessly with Vuex, Pinia, or any reactive store. No extra configuration needed.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"/>
            </svg>
          </div>
          <h3>Plugin Support</h3>
          <p>Mount SortableJS plugins like Swap, MultiDrag, and AutoScroll before importing.</p>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <p>
        Made by <a href="https://twitter.com/max_leiter" target="_blank" rel="noreferrer">@Max_Leiter</a> &mdash;
        Source on
        <a href="https://github.com/MaxLeiter/sortablejs-vue3" target="_blank" rel="noreferrer">GitHub</a>
      </p>
    </footer>
  </div>
</template>

<style>
/* ===== CSS Custom Properties (Theming) ===== */
:root,
[data-theme="light"] {
  --bg: #ffffff;
  --surface: #f8f9fb;
  --border: #e5e7eb;
  --text: #1a1a2e;
  --text-muted: #6b7280;
  --accent: #6366f1;
  --accent-secondary: #8b5cf6;
  --accent-light: #6366f122;
  --code-bg: #f1f3f5;
  --code-text: #1a1a2e;
  --hero-bg: linear-gradient(135deg, #f8f9fb 0%, #eef0ff 50%, #f0ebff 100%);
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  --link: #6366f1;
}

[data-theme="dark"] {
  --bg: #0f0f1a;
  --surface: #1a1a2e;
  --border: #2a2a44;
  --text: #e5e7eb;
  --text-muted: #9ca3af;
  --accent: #818cf8;
  --accent-secondary: #a78bfa;
  --accent-light: #818cf822;
  --code-bg: #12121f;
  --code-text: #e5e7eb;
  --hero-bg: linear-gradient(135deg, #0f0f1a 0%, #161630 50%, #1a1530 100%);
  --card-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  --link: #818cf8;
}

/* ===== Global Reset ===== */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s ease, color 0.3s ease;
  line-height: 1.6;
}

a {
  color: var(--link);
  text-decoration: none;
  transition: color 0.15s ease;
}

a:hover {
  text-decoration: underline;
}

/* ===== App Shell ===== */
#app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ===== Hero ===== */
.hero {
  background: var(--hero-bg);
  border-bottom: 1px solid var(--border);
  padding: 2rem 1.5rem 3rem;
}

.hero-inner {
  max-width: 900px;
  margin: 0 auto;
}

.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.badge-row {
  display: flex;
  gap: 0.5rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text);
  transition: all 0.15s ease;
}

.badge:hover {
  border-color: var(--accent);
  color: var(--accent);
  text-decoration: none;
  transform: translateY(-1px);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.hero-title-sort {
  color: var(--text);
}

.hero-title-js {
  color: var(--accent);
}

.hero-title-vue {
  display: block;
  font-size: 2rem;
  color: var(--text-muted);
  font-weight: 600;
  margin-top: 0.15rem;
}

.hero-description {
  font-size: 1.15rem;
  color: var(--text-muted);
  max-width: 600px;
  line-height: 1.65;
  margin-bottom: 2rem;
}

.stats-row {
  display: flex;
  gap: 3rem;
  margin-bottom: 2rem;
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-title-vue {
    font-size: 1.5rem;
  }
  .stats-row {
    gap: 1.5rem;
  }
}

.install-block {
  display: inline-flex;
  align-items: center;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.65rem 1.25rem;
}

.install-cmd {
  font-family: "SF Mono", "Fira Code", "Cascadia Code", "JetBrains Mono", monospace;
  font-size: 0.875rem;
  color: var(--accent);
  font-weight: 500;
}

/* ===== Main Content ===== */
.main-content {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  flex: 1;
}

/* ===== Demo Tabs ===== */
.demo-tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 2rem;
  background: var(--surface);
  padding: 0.35rem;
  border-radius: 12px;
  border: 1px solid var(--border);
}

.tab-btn {
  flex: 1;
  padding: 0.6rem 1rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 9px;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  color: var(--text);
  background: var(--border);
}

.tab-btn.active {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}

/* Tab transition */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.2s ease;
}

.tab-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.tab-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ===== Features Grid ===== */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 3rem;
}

@media (max-width: 700px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 450px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.feature-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.08);
}

.feature-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--accent-light);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}

.feature-card h3 {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.feature-card p {
  font-size: 0.825rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* ===== Footer ===== */
.site-footer {
  text-align: center;
  padding: 2rem 1.5rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.875rem;
}

/* ===== HelloWorld Overrides ===== */
#app-shell .instructions {
  font-size: 1rem;
}

#app-shell .instructions code {
  font-size: 0.85rem;
  background: var(--code-bg);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

#app-shell .instructions li {
  margin-bottom: 0.75rem;
}
</style>
