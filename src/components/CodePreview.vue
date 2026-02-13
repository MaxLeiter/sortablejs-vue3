<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  code: string;
  title?: string;
}>();

const isOpen = ref(false);
const copied = ref(false);

function copyCode(code: string) {
  navigator.clipboard.writeText(code).then(() => {
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  });
}
</script>

<template>
  <div class="code-preview">
    <button class="toggle-btn" @click="isOpen = !isOpen">
      <svg
        class="code-icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      <span>{{ isOpen ? "Hide" : "View" }} Code{{ title ? ` — ${title}` : "" }}</span>
      <svg
        class="chevron"
        :class="{ open: isOpen }"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
    <Transition name="slide">
      <div v-if="isOpen" class="code-container">
        <button class="copy-btn" @click="copyCode(code)">
          {{ copied ? "Copied!" : "Copy" }}
        </button>
        <pre><code>{{ code }}</code></pre>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.code-preview {
  margin: 1.5rem 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.toggle-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: none;
  color: var(--text);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.15s;
}

.toggle-btn:hover {
  background: var(--border);
}

.code-icon {
  flex-shrink: 0;
}

.chevron {
  margin-left: auto;
  transition: transform 0.25s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.code-container {
  position: relative;
  background: var(--code-bg);
  border-top: 1px solid var(--border);
}

.copy-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.15s;
  z-index: 1;
}

.copy-btn:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.8rem;
  line-height: 1.6;
}

code {
  font-family: "SF Mono", "Fira Code", "Cascadia Code", "JetBrains Mono", monospace;
  color: var(--code-text);
}

/* Slide transition */
.slide-enter-active {
  transition: all 0.25s ease;
  max-height: 500px;
}

.slide-leave-active {
  transition: all 0.2s ease;
  max-height: 500px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
