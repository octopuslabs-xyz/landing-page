<script lang="ts">
	import type { Demo } from '../../types/demo';

	const demos: Demo[] = [
		{
			id: 'sentiment-analysis',
			name: 'Sentiment analysis',
			description:
				'A dynamic chart visualization with real-time data updates and interactive elements.',
			link: '/console/demo/sentiment-analysis'
		},
		// {
		// 	id: 'drag-drop',
		// 	name: 'Draw to text',
		// 	description: 'Showcase of smooth drag and drop functionality with beautiful animations.',
		// 	link: '/demo/drag-drop'
		// },
	];
</script>

<div class="max-w-5xl mx-auto">
	<div class="grid gap-6">
		{#each demos as demo (demo.id)}
			<div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
				<div class="flex items-start justify-between">
					<div>
						<h2 class="text-xl font-semibold text-gray-900 mb-2">
							{demo.name}
						</h2>
						<p class="text-gray-600 mb-4">{demo.description}</p>
						<a
							href={demo.link}
							class="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
						>
							View Demo
						</a>
					</div>
					<!-- <a href={demo.link} class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        coucou
					</a> -->
				</div>
			</div>
		{/each}
	</div>
</div>
