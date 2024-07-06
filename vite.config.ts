import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'

export default {
	base: '/tele2/',
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist('>= 0.25%')),
		},
	},
	build: {
		cssMinify: 'lightningcss',
	},
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, 'src/components/pages/home'),
		}),
	],
}
