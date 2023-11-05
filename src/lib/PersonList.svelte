<script lang="ts">
  import Person from './Person.svelte';
  import personNamesRaw from '../assets/person_names.txt?raw';
  import { getContext, onMount } from 'svelte';

  import { month } from '../stores/common';
  import { citizens } from '../stores/citizens';

  // export let startingNumberOfPeople = 5;

  // const personNames = personNamesRaw.split(/\r?\n/);
  // let incomePool = getContext('initialSupply') * getContext('numberOfPeople');
  // const initialSupply: number = getContext('initialSupply');
  // const balance = initialSupply;

  // const people = initPeople();
  console.log('citizens')
  console.log($citizens)
  onMount(() => {

  })


</script>

<div class="card">
  {#each $citizens as stat}
    <Person {...stat} />
  {/each}
</div>

<style>
  .card {
    display: flex;
    flex-wrap: wrap;
  }
</style>
