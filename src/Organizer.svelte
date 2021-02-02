<script lang="ts">
import { onDestroy } from 'svelte';

import { date, dateFormatter } from './stores/date.store';  

import firebase from 'firebase/app';
import 'firebase/database';

interface Task {
  id?: string,
  title: string,
  date?: string
}

let tasks: Task[] = [];

let title = '';

let tasksRef: firebase.database.Reference = null;

const dateSubscription = date.subscribe(now => {
  tasksRef?.off();
  tasksRef = firebase.database().ref(`tasks/${formatDate(now)}`)
  tasksRef.on('value', updateTasksList);
});

function formatDate(date: Date): string {
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  return day + '-' + month + '-' + date.getFullYear();
}

function updateTasksList(snapshot: firebase.database.DataSnapshot) {  
  tasks = [];
  snapshot.forEach(childSnapshot => {
    tasks.push({...childSnapshot.val(), id: childSnapshot.key});
  });
}

function addTask() {
  const task: Task = {
    title,
    date: formatDate($date)
  };
  tasksRef.push(task, error => title = '');
}

function deleteTask(id: string) {
  firebase.database().ref(`tasks/${formatDate($date)}/${id}`).remove();
}

onDestroy(dateSubscription);
onDestroy(() => tasksRef?.off());
</script>

<style>
section {
  border: 1px solid #000;
  padding: 1rem;
}

section header {
  margin-bottom: 1rem;
}

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  margin-bottom: 0.5rem;
}
</style>

<section>
  <header>
    Organizer: 
    <strong>
      {dateFormatter.format($date)}
    </strong>
    <hr>
  </header>
  <main>
    {#if tasks.length}
      <ul>
        {#each tasks as task, i}
          <li class="task">
            <span>
              <strong>{i+1}</strong>
              {task.title}
            </span>
            <button class="btn btn-primary" on:click={() => deleteTask(task.id)}>Remove</button>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-center">No tasks yet...</p>
    {/if}
  </main>
  <footer>
    <form on:submit|preventDefault={addTask}>
      <input type="text" bind:value={title}>
      <button 
        type="submit"
        class="btn btn-primary btn-block"
        disabled={!title.trim()}        
      >
        Add
      </button>
    </form>
  </footer>
</section>
