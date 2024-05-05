<script>
  import { browser } from '$app/environment';
	import { createEventDispatcher, onMount } from 'svelte';

	export let math;
	let mathContent ='';
	if (browser) {
    const dispatch = createEventDispatcher();
	  
	  onMount(() => {
		  let script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js";
      document.head.append(script);
		  
		  script.onload = () => {
        MathJax = {
          tex: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
          svg: {fontCache: 'global'}
        };
      };
	  });
  }
</script>

<p>
	{math}
</p>
