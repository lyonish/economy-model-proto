<script lang="ts">
import {getContext, onMount} from 'svelte'
import { month } from '../stores/common'

  export let name: string = '(unknown)'
  export let income: number = 0;
  export let income_supplemental: number = 0;
  export let spending: number = 0;
  export let balance: number = 0;


</script>

<div>
<table>
<tr>
<td> <b>{name} </b></td> <td></td>
</tr>
<tr>
<td> Income</td> <td>{Math.floor(income)}</td>
</tr>
<tr>
<td> Benefit</td> <td>{Math.floor(income_supplemental)}</td>
</tr>
<tr>
<td> Spending</td> <td>{Math.floor(spending)}</td>
</tr>
<tr>
<td>----------- </td> <td></td>
</tr>
<tr>
<td> Balance</td> <td>{Math.floor(balance)}</td>
</tr>
</table>

</div>

<style>
div {
  margin: 0px 16px 24px 16px;
  padding: 8px;
  min-width: 144px;
  background-color: #462;
  border-radius: 8px;
  }
</style>
