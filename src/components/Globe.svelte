<script lang="ts">
    import { onMount } from 'svelte';
    import GlobeCanvas from '$lib/GlobeCanvas.js';  // Import the GlobeCanvas class
  
    let canvas: HTMLCanvasElement;
  
    onMount(() => {
      new GlobeCanvas(canvas);
    });
  </script>
  
    <canvas bind:this={canvas} id="scene"></canvas>
  
  <style>
    canvas {
      width: 100%;
      height: 100%;
      /* display: block; Removes any extra space below the canvas */
    }
  </style>
  