export default function backToTop() {
	document.addEventListener('DOMContentLoaded', () => {
		console.log('backToTop')
		const backToTop = document.querySelector('.back-to-top')

		// показать/скрыть кнопку при прокрутке страницы
		window.addEventListener('scroll', function () {
			if (window.scrollY > 300) {
				backToTop.style.display = 'block'
			} else {
				backToTop.style.display = 'none'
			}
		})
	})
}
