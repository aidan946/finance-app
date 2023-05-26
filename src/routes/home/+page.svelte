<script lang="ts">
	import {
		AppBar,
		Avatar,
		ConicGradient,
		Modal,
		modalStore,
		Table,
		tableMapperValues
	} from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, TableSource } from '@skeletonlabs/skeleton';
	import { currentUser } from '$lib/pocketbase';
	import ModalForm from '$lib/modals/ModalForm.svelte';

	const conicStops: ConicStop[] = [
		{ label: 'One', color: 'rgba(255,255,255,1)', start: 0, end: 10 },
		{ label: 'Two', color: 'rgba(255,255,255,0.5)', start: 10, end: 35 },
		{ label: 'Three', color: 'rgba(255,255,255,0.25)', start: 35, end: 100 }
	];

	const modalComponent: ModalComponent = {
		// Pass a reference to your custom component
		ref: ModalForm,
		// Add the component properties as key/value pairs
		props: { background: 'bg-red-500' },
		// Provide a template literal for the default component slot
		slot: '<p>Skeleton</p>'
	};

	function modalPrompt(): void {
		const modal: ModalSettings = {
			type: 'component',
			// Pass the component directly:
			component: modalComponent
		};
		modalStore.trigger(modal);
	}

	const sourceData = [
		{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
		{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
		{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
	];

	const tableSimple: TableSource = {
		head: ['Transaction', 'Tag', 'Amount'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['name', 'symbol', 'weight']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['position', 'name', 'symbol', 'weight'])
	};
</script>

{#if $currentUser}
	<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
		<svelte:fragment slot="lead">
			<a>Button for Pages</a>
		</svelte:fragment>
		<h2 class="text-xl">Save It!</h2>
		<svelte:fragment slot="trail">
			{#if $currentUser.avitar}
				<Avatar src={$currentUser.avatar} width="w-12" rounded="rounded-full" />
			{:else}
				<Avatar src="" width="w-12" rounded="rounded-full" />
			{/if}
		</svelte:fragment>
	</AppBar>
	<div class="flex p-4 w-full">
		<div class="card card-hover p-4 w-1/3">
			<ConicGradient stops={conicStops} legend
				><p class="text-bold">Monthly Spending</p></ConicGradient
			>
		</div>
		<div class="card card-hover p-4 ml-4 w-2/3 flex">
			<div class="mx-auto my-auto">
				<h2 class="text-4xl">Current Balance: ${$currentUser.amount}</h2>
			</div>
		</div>
	</div>
	<div class="p-4">
		<div class="card card-hover p-4 w-full">
			<div class="card-header flex">
				<h3 class="text-lg">Transaction History</h3>
				<button
					on:click={modalPrompt}
					href=""
					class="mr-0 ml-auto text-white btn bg-gradient-to-br variant-gradient-primary-secondary"
					>Add Transaction</button
				>
			</div>
			<div class="shadow-black mt-4">
				<Table interactive={true} source={tableSimple} />
			</div>
		</div>
	</div>
	<Modal />
{/if}
