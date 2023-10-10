<script lang="ts">
	import {
		AppBar,
		Avatar,
		ConicGradient,
		getModalStore,
		Table,
		tableMapperValues
	} from '@skeletonlabs/skeleton';
	import type { ConicStop, ModalSettings, TableSource } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	export let data;
	export let form;

	let { session, supabase, profile, transactions } = data;

	let ammount: number = profile?.amount ?? 0.0;

	const conicStops: ConicStop[] = [
		{ label: 'One', color: 'rgba(255,255,255,1)', start: 0, end: 10 },
		{ label: 'Two', color: 'rgba(255,255,255,0.5)', start: 10, end: 35 },
		{ label: 'Three', color: 'rgba(255,255,255,0.25)', start: 35, end: 100 }
	];

	function modalPrompt(): void {
		const modal: ModalSettings = {
			type: 'component',
			component: 'modalForm'
		};
		modalStore.trigger(modal);
	}

	const tableSimple: TableSource = {
		head: ['Transaction', 'Category', 'Amount'],
		body: tableMapperValues(transactions, ['name', 'category', 'amount']),
		meta: tableMapperValues(transactions, ['name', 'category', 'amount'])
	};
</script>

{#if session.user}
	<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
		<svelte:fragment slot="lead">
			<p>Button for Pages</p>
		</svelte:fragment>
		<h2 class="text-xl">Save It!</h2>
		<svelte:fragment slot="trail">
			<Avatar src="" width="w-12" rounded="rounded-full" />
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
				<h2 class="text-4xl">Current Balance: ${ammount}</h2>
			</div>
		</div>
	</div>
	<div class="p-4">
		<div class="card card-hover p-4 w-full">
			<div class="card-header flex">
				<h3 class="text-lg">Transaction History</h3>
				<button
					on:click={modalPrompt}
					class="mr-0 ml-auto text-white btn bg-gradient-to-br variant-gradient-primary-secondary"
				>
					Add Transaction
				</button>
			</div>
			<div class="shadow-black mt-4">
				<Table interactive={true} source={tableSimple} />
			</div>
		</div>
	</div>
{/if}
