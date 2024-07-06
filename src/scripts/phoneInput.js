export default function phoneInput() {
	const phoneInput = document.querySelector('.manual__input')

	// убираем все символы кроме цифр
	function getInputNumbersValue(input) {
		return input.value.replace(/\D/g, '')
	}

	// форматирование номера
	function formatInput(firstSymbol, inputNumbersValue) {
		let formattedInputValue = ''

		if (inputNumbersValue.length > 0)
			formattedInputValue +=
				firstSymbol + ' (' + inputNumbersValue.substring(1, 4)
		if (inputNumbersValue.length > 4)
			formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
		if (inputNumbersValue.length > 7)
			formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
		if (inputNumbersValue.length > 9)
			formattedInputValue += '-' + inputNumbersValue.substring(9, 11)

		return formattedInputValue
	}

	// форматирование при вводе
	function onPhoneInput({ target, data }) {
		const input = target
		let inputNumbersValue = getInputNumbersValue(input)
		const selectionStart = input.selectionStart

		// можно вводить только цифры, иначе будет пуста строка
		if (!inputNumbersValue) {
			return (input.value = '')
		}

		// чтобы каретка не прыгала в конец строки при редактировании
		if (input.value.length != selectionStart) {
			if (data && /\D/g.test(data)) {
				input.value = inputNumbersValue
			}

			return
		}

		// маски под набор с "7", "8", "9" или не русский формат
		if (
			inputNumbersValue[0] == '7' ||
			inputNumbersValue[0] == '8' ||
			inputNumbersValue[0] == '9'
		) {
			if (inputNumbersValue[0] == '9') {
				inputNumbersValue = '7' + inputNumbersValue
			}

			const firstSymbol = inputNumbersValue[0] == '8' ? '8' : '+7'

			input.value = formatInput(firstSymbol, inputNumbersValue)
		} else {
			input.value = '+' + inputNumbersValue
		}
	}

	// чтобы можно было стирать "+7" и "8"
	function onPhoneKeyDown({ keyCode, target }) {
		const input = target

		if (keyCode == 8 && getInputNumbersValue(input).length == 1) {
			input.value = ''
		}
	}

	// валидация при вставке текста
	function onPhonePaste({ clipboardData, target }) {
		const pasted = clipboardData || window.Clipboard
		const input = target
		const inputNumbersValue = getInputNumbersValue(input)

		if (pasted) {
			const pastedText = pasted.getData('Text')
			if (/\D/g.test(pastedText)) {
				input.value = inputNumbersValue
			}
		}
	}

	phoneInput.addEventListener('input', onPhoneInput)
	phoneInput.addEventListener('keydown', onPhoneKeyDown)
	phoneInput.addEventListener('paste', onPhonePaste)
}
