import adapter from '@sveltejs/adapter-node'


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#root',
		adapter: adapter({
			out: 'build',
			env: {
				host: 'HOST',
				port: 'PORT'
			}
		}),
	}
};

export default config;
