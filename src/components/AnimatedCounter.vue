<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps<{
  value: number;
  label: string;
  suffix?: string;
}>();

const displayed = ref(0);

function animateTo(target: number) {
  const start = displayed.value;
  const diff = target - start;
  const duration = 600;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    displayed.value = Math.round(start + diff * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

onMounted(() => animateTo(props.value));
watch(() => props.value, (val) => animateTo(val));
</script>

<template>
  <div class="counter">
    <span class="counter-value">{{ displayed }}{{ suffix || '' }}</span>
    <span class="counter-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.counter-value {
  font-size: 2rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.counter-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}
</style>
