export default function validateForm() {
	const submitBtn = document.querySelector('.manual__btn')
	const form = document.querySelector('.manual form')

	let message = document
		.querySelector('.manual__template-message')
		.content.cloneNode(true)

	const hintTemplate = document.querySelector('.manual__template-hint')
	let hintHTML = hintTemplate.content.cloneNode(true)

	let phoneNumber = ''
	let isPromoSend = false

	function validateForm({ target }) {
		const inputText = document.querySelector('.manual__input').value
		const isCheckboxChecked =
			document.querySelector('.manual__checkbox').checked

		let isNumberEnter = false
		let isHintShow = document.querySelector('.manual__hint')
		let isMessageShow = document.querySelector('.manual__message')
		let isError = document.querySelector('.manual__hint_wrong')

		// номер введен полностью c "+7", "8" или не русский
		if (
			(inputText[0] == '+' && inputText.length == 18) ||
			(inputText[0] == '8' && inputText.length == 17) ||
			(inputText[0] != '8' &&
				inputText.length > 11 &&
				inputText[1] != '7' &&
				inputText.length > 11)
		) {
			isNumberEnter = true
		}

		// номер введен и условия приняты
		if (isNumberEnter && isCheckboxChecked) {
			// предупреждение о попытке отправки промокода на тот же номер
			if (isPromoSend && phoneNumber == inputText) {
				const hintWrapper = document.querySelector('.manual__hint')
				const hintIcon = document.querySelector('.manual__hint-icon')
				const errorIcon = document.createElement('div')
				const hintText = document.querySelector('.manual__hint-text')

				const messageIcon = document.querySelector('.manual__bg')
				const messageText = document.querySelector('.manual__text')

				hintWrapper.classList.add('manual__hint_wrong')
				hintText.textContent = 'На этот номер уже выслан промокод'

				// замена галочки на "!" в подсказке
				errorIcon.classList.add('manual__hint-icon')
				errorIcon.textContent = '!'
				hintIcon.replaceWith(errorIcon)

				messageIcon.innerHTML = '<div>!</div>'
				messageIcon.style.backgroundColor = '#ff4d6c'
				messageText.textContent =
					'На этот номер уже выслан промокод, на один номер можно получить один промокод'
			} else {
				if (isHintShow && isMessageShow) {
					document.querySelector('.manual__hint').remove()
					document.querySelector('.manual__message').remove()

					hintHTML = hintTemplate.content.cloneNode(true)
					message = document
						.querySelector('.manual__template-message')
						.content.cloneNode(true)
				}

				hintTemplate.before(hintHTML)
				form.append(message)

				phoneNumber = inputText
				isPromoSend = true
			}
			// не приняты условия соглашения
		} else if (isNumberEnter && !isCheckboxChecked) {
			// удаляем сообщения об удачной отправке промокода
			if (isPromoSend) {
				document.querySelector('.manual__hint').remove()
				document.querySelector('.manual__message').remove()

				isHintShow = false
				isMessageShow = false
			}

			if (!isHintShow && !isMessageShow) {
				let message = document
					.querySelector('.manual__template-message')
					.content.cloneNode(true)

				const hintTemplate = document.querySelector('.manual__template-hint')
				let hintHTML = hintTemplate.content.cloneNode(true)

				const hintWrapper = hintHTML.querySelector('.manual__hint')
				const hintIcon = hintHTML.querySelector('.manual__hint-icon')
				const hintText = hintHTML.querySelector('.manual__hint-text')

				const messageIcon = message.querySelector('.manual__bg')
				const messageText = message.querySelector('.manual__text')

				hintWrapper.classList.add('manual__hint_wrong')
				hintIcon.replaceWith('!')
				hintText.textContent = 'Необходимо принять условия соглашения'

				messageIcon.innerHTML = '!'
				messageIcon.style.backgroundColor = '#ff4d6c'
				messageText.textContent = 'Необходимо принять условия соглашения'

				hintTemplate.before(hintHTML)
				form.append(message)
			} else if (isError) {
				// если уже есть сообщения об ошибке
				const hintText = document.querySelector('.manual__hint-text')
				const messageText = document.querySelector('.manual__text')

				hintText.textContent = 'Необходимо принять условия соглашения'
				messageText.textContent = 'Необходимо принять условия соглашения'
			}
		}
	}

	function cancelReload(event) {
		event.preventDefault()
		submitBtn.blur()
	}

	submitBtn.addEventListener('click', validateForm)
	form.addEventListener('submit', cancelReload)
}
