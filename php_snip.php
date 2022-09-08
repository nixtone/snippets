<?
# Определить дату через определенное кол-во дней? (2 способа)
echo (new DateTime('+5 Day'))->format("d.m.Y");
echo date("d-m-Y", strtotime('5 days'));

# Разница дат
$date = "09.07.2020 10:57:00"; // Старая дата
$date2 = DateTime::createFromFormat('d.m.Y H:i:s', $date); // Преобразовываем дату в необходимый формат
$date1 = new DateTime(); // Сейчас
$dayDiff = $date2->diff($date1)->format('%s'); // %a - разница дней, %ы - разница в секундах. %d.%m.%Y %H:%i:%s
echo $dayDiff;

# Делает из "8 (987) 906-00-86" в "+79879060086"
function phoneDigitPlus7($sourcePhone) {
	preg_match_all("/\d+/", $sourcePhone, $m);
	$phoneDigit = implode('', $m[0]);
	switch (substr($phoneDigit, 0, 1)) {
		case 7: $phoneDigit = str_pad($phoneDigit, 12, "+", STR_PAD_LEFT); break;
		case 8: $phoneDigit = substr_replace($phoneDigit, "+7", 0, 1); break;
	}
	return $phoneDigit;
}

# Достать только цифры из строки
preg_match("/\d+/", $price, $m);
preg_replace("/[^0-9]/", '', $CURRENT['SITE']['phone1'])

# Обрезание текста
$text = "По словам может сильно разниться обьём текста. ";
print preg_match("/((\S+[\s-]+){3})/s", $text, $m)? rtrim($m[1]). '...' : $text; // 3 количество слов
$length = 12; // 12 символов
print preg_replace('/\s[^\s]+$/', '', mb_substr($text, 0, $length, 'UTF-8'));

# Получаем содержимое всех тегов span
$text = "It rain <span>cats</span> and <span>dogs</span>";
$text = preg_match("~<span>(.*?)</span>~", $text, $m);
echo $text."<br>";
print_r($m);

# regexp выделить зничение между кавычек 
/*
\"(.*?)\"
# regexp выделить зничение между скобками
\((.*?)\)
# regexp выделить зничение между c скобками
\(.*?\)
*/

# Откликаться будет ТОЛЬКО на ajax запросы
if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {}

# Полный адрес
'http:#'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

# Поменять первый пробел на 'br'
$line = substr_replace($level2_item['NAME'], "
", strpos($level2_item['NAME'], " "), 1);

# Дата час:мин:cек/день.мес.год
date("H:i:s/d.m.Y");

# Удалить последний символ строки
substr($url,0,-1);

# Получить последний символ строки
substr($url, -1);

# Код ответа страницы 404
header("HTTP/1.1 404 Not Found");
header("Status: 404 Not Found");