<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
	import type { ModalComponent } from '@skeletonlabs/skeleton';
	import ModalForm from '$lib/modals/ModalForm.svelte';

	initializeStores();

	const modalComponentRegistry: Record<string, ModalComponent> = {
		modalForm: {
			ref: ModalForm,
			props: { background: 'bg-red-500' },
			slot: '<p>Skeleton</p>'
		}
	};

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="max-w-full mx-auto">
	<Modal components={modalComponentRegistry} />
	<slot />
</div>
