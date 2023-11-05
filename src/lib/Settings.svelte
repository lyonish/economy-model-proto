
<script lang="ts">
	import {getContext, setContext} from 'svelte';

export let initialSupply: number = 100;
export let numberOfPeople: number = 5;
  console.log(77);
  setContext('initialSupply', initialSupply)
  setContext('numberOfPeople', numberOfPeople)

</script>



<style>
.wrapper {
margin: 12px;
}

</style>