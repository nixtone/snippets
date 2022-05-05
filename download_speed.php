<?
##################################
# Ограничение скорости загурузки #
##################################

// локальный файл, который необходимо отправить
$local_file = 'Blade.avi';

// название файла, который получит пользователь
$download_file = 'your-download-name.zip';

// лимит для скорости (=> 20,5 kb/s)
$download_rate = 20.5;

if(file_exists($local_file) && is_file($local_file)) {

    // отправка заголовков
    header('Cache-control: private');
    header('Content-Type: application/octet-stream');
    header('Content-Length: '.filesize($local_file));
    header('Content-Disposition: filename='.$download_file);

    // очистка буфера
    flush();

    // открытие потока
    $file = fopen($local_file, "r");

    while (!feof($file)) {

        // отправка части файла браузеру
        print fread($file, round($download_rate * 1024));

        flush();

        // засыпаем на секунду
        sleep(1);
    }

    // закрытие потока
    fclose($file);

}
else {
    die('Error: The file '.$local_file.' does not exist!');
}