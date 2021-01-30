<script lang="ts">
import { date } from './stores/date.store'

const formatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  year: 'numeric'
});

function goToMonth(dir: number) {
  date.update(current => {
    current.setMonth(current.getMonth() + dir);
    return current;
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
  <span>{formatter.format($date)}</span>
  <i class="material-icons" on:click={nextMonth}>arrow_right</i>
</p>
