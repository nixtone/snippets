<?
require_once 'pclzip.lib.php';
$archive = new PclZip('archive.zip');

$archive->extract(PCLZIP_OPT_PATH, 'folder', PCLZIP_CB_PRE_EXTRACT, 'preExtractCallback');

// функция будет вызвана перед распаковкой очередного файла
function preExtractCallback($p_event, &$p_header)
{
    // если файл уже существует, то удаляем его
    if (file_exists($p_header['filename'])) {
        unlink($p_header['filename']);
    }
    return 1;
}
?>