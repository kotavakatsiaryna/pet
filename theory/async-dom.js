/**
 * Async, Event Loop, and DOM for Level 2
 * Topics: Promises, Async/Await, Event Loop, Event Delegation, DOM
 */

// ========== Promises & Async/Await ==========
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUserData(userId) {
  await delay(500);
  if (userId <= 0) throw new Error('Invalid user ID');
  return { id: userId, name: `User${userId}`, role: 'member' };
}

// ========== Event Loop Demo ==========
export function demonstrateEventLoop() {
  console.log('1: sync start');
  setTimeout(() => console.log('4: setTimeout (macrotask)'), 0);
  Promise.resolve()
    .then(() => console.log('3: Promise (microtask)'))
    .then(() => console.log('3b: second microtask'));
  console.log('2: sync end');
  // Output order: 1, 2, 3, 3b, 4
}

// ========== Event Delegation ==========
// Usage: add <div id="menu"> with buttons having data-action attribute
export function setupEventDelegation() {
  const menu = document.getElementById('menu');
  if (!menu) return;
  
  menu.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.getAttribute('data-action');
    console.log(`Action: ${action}`);
    if (action === 'delete') event.stopPropagation();
  });
}

// ========== Stop Propagation Demo ==========
export function setupBubblingDemo() {
  const outer = document.getElementById('outer');
  const inner = document.getElementById('inner');
  
  outer?.addEventListener('click', () => console.log('Outer clicked'));
  inner?.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('Inner clicked - propagation stopped');
  });
}

// ========== Async DOM Update ==========
export async function loadAndRender(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '<div>Loading...</div>';
  try {
    const user = await fetchUserData(42);
    container.innerHTML = `<div>${user.name} (${user.role})</div>`;
  } catch (err) {
    container.innerHTML = `<div style="color:red">Error: ${err.message}</div>`;
  }
}

// ========== SELF-TEST (runs when file is executed directly) ==========
import { fileURLToPath } from 'url';

const isRunningDirectly = process.argv[1] === fileURLToPath(import.meta.url);

if (isRunningDirectly) {
  console.log('\n=== Running async-dom.js tests ===\n');
  
  // Test 1: Event Loop
  console.log('--- Event Loop Demo ---');
  demonstrateEventLoop();
  
  // Test 2: Promise chain
  console.log('\n--- Promise Demo ---');
  fetchUserData(1).then(user => {
    console.log('User fetched:', user.name);
  }).catch(console.error);
  
  // Small delay to see async output
  setTimeout(() => {
    console.log('\n✅ All async-dom.js tests completed');
  }, 1000);
}