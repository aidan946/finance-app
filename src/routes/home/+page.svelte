<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { currentUser, pb } from '$lib/pocketbase';
</script>

{#if $currentUser}
	<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
		<svelte:fragment slot="lead">(icon)</svelte:fragment>
		(title)
		<svelte:fragment slot="trail">(actions)</svelte:fragment>
	</AppBar>
	<h1>You are home {$currentUser.email}!</h1>
{/if}
