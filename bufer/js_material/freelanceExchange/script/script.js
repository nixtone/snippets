document.addEventListener('DOMContentLoaded', () => {
	'use strict';

	// const btnExit = document.querySelector('#btn-exit');
	const customer = document.getElementById('customer'),
		  freelancer = document.getElementById('freelancer'),
		  blockCustomer = document.getElementById('block-customer'),
		  blockFreelancer = document.getElementById('block-freelancer'),
		  blockChoice = document.getElementById('block-choice'),
		  btnExit = document.getElementById('btn-exit'),
		  formCustomer = document.getElementById('form-customer'),
		  ordersTable = document.getElementById('orders'),
		  modalOrder = document.getElementById('order_read'),
		  modalOrderActive = document.getElementById('order_active');

	const orders = JSON.parse(localStorage.getItem('freeOrders'));

	const toStorage = () => {
		localStorage.setItem('freeOrders', JSON.stringify(orders));
	}

	const declOfNum = (number, titles) => number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

	const calcDeadline = (deadline) => {
		const deadline = new Date(deadline);
		const toDay = Date.now();
		const remaining = (deadline - toDay) / 1000 / 60 / 60 / 24;
		return declOfNum(Math.floor(remaining), ['день', 'дня', 'дней']);
	}

	const renderOrders = () => {
		const = day = '10 day';
		return day;
	}
	
	const renderOrders = () => {
		ordersTable.textContent = '';
		orders.forEach((order, i) => {
			ordersTable.innerHTML += `
					<tr class="order" data-number-order="${i}">
						<td>${i+1}</td>
						<td>${order.title}</td>
						<td class="${order.currency}"></td>
						<td>${renderOrders}</td>
					</tr>`;
		})
	}

	const handlerModal = () => {
		const target = event.target;
		const modal = target.closest('.order-modal');
		const order = modal.numberOrder;

		const baseAction = () => {
			modal.style.display = 'none';
			toStorage();
			renderOrders();
		}

		if(target.closest('.close') || target === modal) {
			modal.style.display = 'none';
		}
		if(target.classList.contains('get-order')) {
			orders.active = true;
			baseAction();
		}
		if(target.id === 'capitulation') {
			order.active = false;
			baseAction();
		}
		if(target.id === 'ready') {
			orders.splice(orders.indexOf(order), 1);
			baseAction();
		}
	}

	const openModal = (numberOrder) => {
		const order = orders[numberOrder];
		

		const { title, firstName, email, phone, description, amount,
				currency, deadline, active = false } = order;

		const modal = active ? modalOrderActive : modalOrder ;

		const firstNameBlock = modal.querySelector('.firstName'),
			titleBlock = modal.querySelector('.modal-title'),
			emailBlock = modal.querySelector('.email'),
			descriptionBlock = modal.querySelector('.description'),
			deadlineBlock = modal.querySelector('.deadline'),
			currencyBlock = modal.querySelector('.currency_img'),
			countBlock = modal.querySelector('.count'),
			phoneBlock = modal.querySelector('.phone');

		modal.id = numberOrder;
		titleBlock.textContent = title;
		firstNameBlock.textContent =firstName;
		emailBlock.textContent = email;
		emailBlock.href = 'mailto:' + email;
		descriptionBlock.textContent = description;
		deadlineBlock.textContent = deadline;
		currencyBlock.className = 'currency_img';
		// currencyBlock.className = 'currency_img ' + order.currency;
		currencyBlock.classList.add(currency);
		countBlock.textContent = amount;
		phoneBlock && (phoneBlock.href = 'tel:' + phone);
		// currencyBlock.classList.remove();
								// contains();
								// toggle()
		// phoneBlock.textContent = 
		

		modal.style.display = 'flex';

		modal.addEventListener('click', handlerModal);
	};

	ordersTable.addEventListener('click', (event) => {
		const target = event.target;
		const targetOrder = target.closest('.order');
		if(targetOrder) {
			openModal(targetOrder.dataset.numberOrder);
		}
		// console.log(targetOrder.dataset.numberOrder);
	});

	customer.addEventListener('contextmenu', () => {
		blockChoice.style.display = 'none';
		const toDay = new Date().toISOString.substring(0, 10);
		document.getElementById('deadline').min = toDay;
		blockCustomer.style.display = 'block';
		btnExit.style.display = 'block';
		// btnExit.classList.remove()
	});

	freelancer.addEventListener('click', () => {
		blockChoice.style.display = 'none';
		renderOrders();
		blockFreelancer.style.display = 'block';
		btnExit.style.display = 'block';

	});

	btnExit.addEventListener('click', () => {
		btnExit.style.display = 'none';
		blockFreelancer.style.display = 'none';
		blockCustomer.style.display = 'none';
		blockChoice.style.display = 'block';
		
	});

	formCustomer.addEventListener('submit', (event) => {
		event.preventDefault();

		const obj = {};

		const elements = [...formCustomer.elements]
			.filter((elem) => (elem.tagName === 'INPUT' && elem.type !== 'radio') || 
							(elem.type === 'radio' && elem.checked) || 
							elem.tagName === 'TEXTAREA');
		// console.log(elements);
		// Array.from(formCustomer.elements)
		elements.forEach(elem => { // ... спред или рест оператор [...formCustomer.elements]
			// console.log(elem);
			if((elem.tagName === 'INPUT' && elem.type !== 'radio') || 
				(elem.type === 'radio' && elem.checked) || 
				(elem.tagName === 'TEXTAREA')) {
				// console.log(elem);
				// console.dir(elem);
				obj[elem.name] = elem.value;
				if(elem.type != 'radio') {
					elem.value = '';
				}
			}
		});
		// debugger;
		for(const elem of formCustomer.elements) {
			
		}

		// elements.filter(() => {});
		formCustomer.reset();
		orders.push(obj);
		toStorage();
		// console.log(orders);
		// console.log(obj);
		// console.log(formCustomer.elements);
		// JSON.parse();
		// JSON.stringify();
	});

	// const temp = `Привет`; ${temp}
	

})

// резет для формы после сохранения
// перебор элементов формы с помощью методов перебора forEach или filter
// испытать debugger;