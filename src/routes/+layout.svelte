<script>
	import '../styles/global.css';

	import logo from '../assets/octo.png';
</script>

<div class="h-screen flex flex-col overflow-hidden">
	<!-- Navbar -->
	<div class="flex flex-col h-screen overflow-hidden">
		<div class="h-10vh text-white p-4 fixed w-full z-10 top-0">
			<div class="container mx-auto flex items-center justify-between">
				<!-- Logo on the left -->
				<div class="flex">
					<img src={logo} alt="Logo" class="h-24" />
				</div>

				<!-- Menu on the right with 3 buttons -->
				<div class="flex space-x-6">
					<button
						class="bg-transparent text-white hover:bg-gray-600 px-4 py-2 rounded-md transition-all"
						>Blog</button
					>
					<button
						class="bg-transparent text-white hover:bg-gray-600 px-4 py-2 rounded-md transition-all"
						>Github</button
					>
					<button
						class="bg-transparent text-white hover:bg-gray-600 px-4 py-2 rounded-md transition-all"
						>Console</button
					>
				</div>
			</div>
		</div>
	</div>

	<!-- Main -->
	<div class="h-80vh">
		<slot></slot>
	</div>

	<!-- Footer -->
	<footer class="h-10vh text-white py-4 mt-auto">
		<div class="container mx-auto flex items-center justify-start">
			<div class="flex items-center">
				<!-- <img src="/assets/logo.png" alt="Logo" class="h-6 mr-2"> Logo -->
				<span class="text-sm">© 2025 Octopus Labs</span>
			</div>
		</div>
	</footer>
</div>

<style>
</style>
