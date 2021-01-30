<script lang="ts">
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
      <th>Wen</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>      
    </tr>
  </thead>
  <tbody>
    
  </tbody>
</table>
