<script lang="ts">
	let message: string = '';
	let result: any = null;
	let loading = false;
	let error: string | null = null;

	async function analyzeSentiment() {
		loading = true;
		error = null;
		try {
			const response = await fetch('/api/demo/sentiment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ text: message })
			});

            console.log(response)

			if (!response.ok) {
				throw new Error('Failed to analyze sentiment');
			}

			result = await response.json();
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}
</script>

<div class="max-w-3xl mx-auto">
	<div class="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
		<div class="mb-6">
			<label for="message" class="block text-sm font-medium text-gray-300 mb-2">
				Enter your message
			</label>
			<textarea
				id="message"
				bind:value={message}
				rows="4"
				class="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
				placeholder="Type your message here..."
			></textarea>
		</div>

		<button
			on:click={analyzeSentiment}
			disabled={loading || !message}
			class="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{loading ? 'Analyzing...' : 'Analyze Sentiment'}
		</button>

		{#if error}
			<div class="mt-4 p-4 bg-red-900/50 text-red-200 rounded-md border border-red-700">
				{error}
			</div>
		{/if}

		{#if result}
			<div class="mt-6">
				<h3 class="text-lg font-semibold text-gray-200 mb-3">Analysis Result</h3>
				<pre class="bg-gray-700 text-gray-200 p-4 rounded-md overflow-auto border border-gray-600">
              {JSON.stringify(result, null, 2)}
            </pre>
			</div>
		{/if}
	</div>
</div>
