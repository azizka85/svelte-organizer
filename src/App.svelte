<script lang="ts">
import Calendar from "./Calendar.svelte";
import Organizer from "./Organizer.svelte";
import Selector from "./Selector.svelte";
</script>

<style>
header {
    padding: 1rem 2rem;
}	
</style>

<div class="container">
	<header>
		<Selector/>
	</header>
	<main>
		<Calendar/>
	</main>
	<div>
		<Organizer/>
	</div>
</div>
