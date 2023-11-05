<script lang="ts">
  import { onMount, setContext } from 'svelte';

  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import PersonList from './lib/PersonList.svelte'
  import personNamesRaw from './assets/person_names.txt?raw';

import type { Citizen } from './stores/citizens';

import { month, initialized } from './stores/common'
import { citizens, emptyCitizen } from './stores/citizens'

  const personNames = personNamesRaw.split(/\r?\n/);
 let initialSupply: number = 100;
 let numberOfPeople = 8;
 let baseSpending: number = 100;
  setContext('initialSupply', initialSupply)
  setContext('numberOfPeople', numberOfPeople)
  setContext('month', $month);

  function generateCitizens() {
    let incomePool = initialSupply * numberOfPeople;
    let citizens: Citizen[] = [];
    const balance = initialSupply;
    const benefit = 0;
    for (let i = 0; i < numberOfPeople; i++) {
      let income = 0;
      const rand = Math.floor(Math.random() * 200);
      if (i !== numberOfPeople - 1) {
        income = 100 + Math.floor((rand - 100) / 5); // powerGap low-mid-high?
        incomePool = incomePool - income;
      } else {
        income = incomePool;
      }
        let spending = income < baseSpending ? income : baseSpending;
      const name = personNames[rand];
      const stat = {
        name,
        income,
        spending,
        benefit,
        balance,
      };
      citizens.push(stat);
    }
    return citizens;
  }

function initialize() {
    console.log('init', initialized);
      const _citizens = generateCitizens();
  citizens.set(_citizens);
    initialized.set(true);
    console.info('INITIALIZED-----', $citizens);
  }
  function forward() {
    if(!initialized) { return; }
    month.update((oldValue) => oldValue + 1)
  updateEconomy()
  }
  function reset() {
   initialized.set(false);
    month.set(0)
    citizens.set([emptyCitizen]);
    initialize();
  }
  function updateEconomy() {
    console.log('$citizens');
    console.log($citizens);
  let sum = {
        income:0,
        spending: 0,
        benefit: 0,
        balance: 0,
  }
  $citizens.forEach((citizen) => {
    sum.income = sum.income +citizen.income;
    sum.spending = sum.spending +citizen.spending;
    sum.balance = sum.balance +citizen.balance;
  })
    $citizens.forEach((citizen, i) => {
      updateCitizen(citizen, i, sum);
    })
    //一旦全て終わってからじゃないとlowestがわからないので改めてやる
        const lowestSpending = Math.min.apply(Math, $citizens.map((citizen) => citizen.spending));
  citizens.update((prev) => {
    prev.forEach((citizen) => {
      const spendingGap = citizen.spending - lowestSpending;
      citizen.spending = lowestSpending + spendingGap * 0.5;
    })
    return prev;
  })

    console.log('updated');
    console.log($citizens);
  }
  function updateCitizen(citizen, i: number, sum: Citizen) {

    citizens.update((prev) => {
      let _c = prev[i];
      const incomeRate = _c.income / sum.income;
      const newIncome = sum.spending * incomeRate;
      _c.balance = _c.balance - _c.spending + newIncome;
      _c.income = newIncome;
      if (_c.spending > _c.income) {
        _c.spending = _c.income;
      }

        console.log('prev');
        console.log(prev);

      return prev;
    })
  }

</script>

<main>
<div class="settings">
  Settings  <br/>
  Initial supply: <input type="number" value={initialSupply} step=10><br/>
  Number of people: <input type="text" bind:value={numberOfPeople}> <br/>
  Base spending: <input type="text" value={baseSpending}> <br/>
</div>


    <button class="start" on:click={initialize}>START</button>
    <button class="forward" on:click={forward}>FORWARD</button>
    <button class="reset" on:click={reset}>RESET</button>
    month: {$month}
    money supply: {Math.round($citizens.map((citizen)=> citizen.balance).reduce((ac, cr)=> ac+ cr))}
    GDP: {Math.round($citizens.map((citizen)=> citizen.income).reduce((ac, cr)=> ac+ cr))}
    {#if $initialized === true}
<PersonList></PersonList>
{/if}

</main>

<style>
.settings {
margin: 36px 12px;

}

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }

  .start {
    background-color: #2a3;
  }
  .forward {
    background-color: #23a;
  }
  .reset {
    background-color: #a23;
  }

</style>
