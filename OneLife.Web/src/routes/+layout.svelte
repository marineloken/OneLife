<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex h-full flex-col">
	<Header />

	{@render children()}

	<Footer />
</div>
