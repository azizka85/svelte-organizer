<script lang="ts">
import { onDestroy } from 'svelte';
import { date, dayFormatter } from './stores/date.store';

interface Day {
  value: Date;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

let calendar: Week[];

const dateSubscription = date.subscribe(now => {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const nowDate = new Date(year, month, day);
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month+1, 0);

  startDate.setDate(startDate.getDate() - startDate.getDay());
  endDate.setDate(endDate.getDate() - endDate.getDay() + 6);

  const cur = new Date(startDate);
  cur.setDate(cur.getDate() - 1);

  calendar = [];

  while(cur < endDate) {
    calendar.push({
      days: Array(7)
      .fill(0)
      .map(() => {
        cur.setDate(cur.getDate() + 1);
        const value = new Date(cur);
        const active = currentDate.getTime() === cur.getTime();
        const disabled = nowDate.getMonth() !== cur.getMonth();
        const selected = nowDate.getTime() === cur.getTime();

        return {
          value, active, disabled, selected
        };
      })
    });
  }
});

onDestroy(dateSubscription);

function select(selectDate: Date) {
  date.update(_ => new Date(selectDate));
}
</script>

<style>
table {
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
}  

td, th {
  border: 1px solid var(--table-cell-border-color);
  padding: 0.5rem 1rem;
}

td {
  text-align: center;
  transition: all 0.2s;
}

td.disabled {
  opacity: 0.5;
}

td:hover:not(.disabled) {
  background: var(--table-cell-background-color);
  cursor: pointer;
}

.active {
  color: var(--primary-color);
}

.selected {
  color: var(--text-selected-color);
}
</style>

<table>
  <thead>
    <tr>
      <th>Sun</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>      
    </tr>
  </thead>
  <tbody>
    {#each calendar as week}
      <tr>
        {#each week.days as day}
          <td class:disabled={day.disabled}>
            <span 
              class:selected={day.selected}
              class:active={day.active}     
              on:click={() => select(day.value)}         
            >
              {dayFormatter.format(day.value)}
            </span>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
