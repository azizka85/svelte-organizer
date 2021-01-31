<script lang="ts">
import { date, monthFormatter } from './stores/date.store';

function goToMonth(dir: number) {
  date.update(current => {
    const newMonth = current.getMonth() + dir;    
    const newDate = new Date(current.getFullYear(), newMonth, current.getDate());
    const newEndDate = new Date(current.getFullYear(), newMonth + 1, 0);
    return newDate < newEndDate ? newDate : newEndDate;
  });
}

function prevMonth() {
  goToMonth(-1);
}

function nextMonth() {
  goToMonth(1);
}
</script>

<style>
p {
  display: flex;
  align-items: center;
  justify-content: center;
}

p span {
  margin: 0 2rem;
  text-align: center;
  width: 200px;
}

p i {
  cursor: pointer;
}
</style>

<p>
  <i class="material-icons" on:click={prevMonth}>arrow_left</i>
  <span>{monthFormatter.format($date)}</span>
  <i class="material-icons" on:click={nextMonth}>arrow_right</i>
</p>
