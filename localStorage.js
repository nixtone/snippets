// LocalStorage

//создадим объект
var obj = {
	item1: 1,
	item2: [123, "two", 3.0],
	item3:"hello"
};

var serialObj = JSON.stringify(obj); //сериализуем его

localStorage.setItem("myKey", serialObj); //запишем его в хранилище по ключу "myKey"

var returnObj = JSON.parse(localStorage.getItem("myKey")) //спарсим его обратно объект

// браузеры выделяют 5мб под localStorage, если вы его превысите — получите исключение QUOTA_EXCEEDED_ERR

// Кстати, c его помощью можно проверять есть ли в вашем хранилище еще место.
try {
  localStorage.setItem('ключ', 'значение');
} catch (e) {
  if (e == QUOTA_EXCEEDED_ERR) {
   alert('Превышен лимит');
  }
}

// Localstorage имеет ещё и handler на изменение данных тем самым изменяя данные во вкладке можно узнавать об их изменениях на другой вкладке(где пригодится? На приложения которые должны работать на двух мониторах к примеру призентации)