<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Add Transaction</header>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Transaction Name</span>
				<input class="input" type="text" placeholder="Enter name..." />
			</label>
			<label class="label">
				<span>Category</span>
				<select class="select">
					<option value="1">Food</option>
					<option value="2">Shopping</option>
					<option value="3">Other</option>
				</select>
			</label>
			<label class="label">
				<span>Amount</span>
				<input class="input" type="number" placeholder="Enter the ammount.." />
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
    </footer>
	</div>
{/if}
