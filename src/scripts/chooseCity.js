export default function chooseCity() {
	console.log('chooseCity')
	const locationBtn = document.querySelector('.header__btn')
	const dialog = document.querySelector('.dialog')
	const confirmBtn = document.querySelector('.dialog__confirm')
	const changeBtn = document.querySelector('.dialog__change')
	const cityText = document.querySelector('.header__text')

	function openDialog() {
		dialog.showModal()
		document.body.classList.add('scroll-lock')

		// вставка города ил localStorage в dialog
		const dialogText = document.querySelector('.dialog__city')
		const city = localStorage.getItem('city')
		if (city) dialogText.textContent = city

		// закрытие dialog по клику на backdrop
		dialog.addEventListener('click', ({ currentTarget, target }) => {
			const dialog = currentTarget
			const isClickedOnBackDrop = target === dialog

			if (isClickedOnBackDrop) closeDialog()
		})
	}

	function closeDialog() {
		dialog.close()
		locationBtn.blur()
		document.body.classList.remove('scroll-lock')
	}

	function choice() {
		const main = document.querySelector('.main')
		const headerBtn = document.querySelector('.header__btn')
		const template = document
			.querySelector('.city__template')
			.content.cloneNode(true)

		dialog.close()
		headerBtn.disabled = true

		main.prepend(template)

		const table = document.querySelector('.city__table')

		// цикличный фокус по списку городов
		const lastCity = document.querySelectorAll('.city__item')
		lastCity[lastCity.length - 1].onblur = () => lastCity[0].focus()

		// выбор города и закрытие модального окна
		table.addEventListener('click', ({ target }) => {
			if (target.tagName == 'BUTTON') {
				localStorage.setItem('city', target.textContent)
				cityText.textContent = localStorage.getItem('city')

				document.querySelector('.city').remove()
				document.body.classList.remove('scroll-lock')
				headerBtn.disabled = false
			}
		})
	}

	// при загрузке страницы подставлять город из localStorage
	document.addEventListener('DOMContentLoaded', () => {
		const city = localStorage.getItem('city')

		if (city) cityText.textContent = city
	})

	locationBtn.addEventListener('click', openDialog)
	confirmBtn.addEventListener('click', closeDialog)
	changeBtn.addEventListener('click', choice)
}
