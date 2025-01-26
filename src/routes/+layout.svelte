<script>
	// @ts-nocheck

	import '../styles/global.css';
	import logo from '../assets/octo.png';
</script>

<div class="h-screen w-screen flex flex-col bg-black text-white">
	<!-- Header -->
	<header class="h-[5%] shadow-sm flex items-center justify-between px-8 my-5">
		<div class="flex items-center gap-2">
			<a href="/">
				<img src={logo} alt="Logo" class="h-24" />
			</a>
		</div>
		<nav class="flex gap-6">
			<a
				href="https://blog.octopus-labs.xyz"
				target="_blank"
				class="text-gray-200 hover:text-gray-600">Blog</a
			>
			<a
				href="https://github.com/octopuslabs-xyz"
				target="_blank"
				class="text-gray-200 hover:text-gray-600">Github</a
			>
			<a href="/console" class="text-gray-200 hover:text-gray-400">Console</a>
		</nav>
	</header>

	<!-- Main -->
	<main class="h-[90%] flex items-center justify-center p-8">
		<slot />
	</main>

	<!-- Footer -->
	<footer class="h-[5%] flex items-center justify-between px-8">
		<p class="text-sm">© 2025 Octopus Labs.</p>
		<!-- <div class="flex gap-4">
			<a href="/" class="text-gray-300 hover:text-white">Privacy Policy</a>
			<a href="/" class="text-gray-300 hover:text-white">Terms of Service</a>
		</div> -->
	</footer>
</div>
