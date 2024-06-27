import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'

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
}
