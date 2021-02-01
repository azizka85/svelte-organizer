<script lang="ts">
import { date, dateFormatter } from './stores/date.store';  

let title = '';
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

  </main>
  <footer>
    <form>
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
