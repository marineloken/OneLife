<script>
	let title = 'OneLife';
	let links = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<header class="h-20 bg-gray-950 px-4 text-white shadow-md">
	<nav class="flex h-full items-center p-4">
		<div class="container mx-auto flex items-center justify-between">
			<a href="/" class="text-xl font-semibold hover:text-gray-300">{title}</a>
			<ul class="flex space-x-4">
				{#each links as link}
					<li>
						<a href={link.href} class="transition-colors duration-200 hover:text-gray-300"
							>{link.name}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</header>
