<style>
    h1, h2, h3, h4 {line-height: .5em; font-weight: 400; font-family: Helvetica, Arial, sans-serif;}
    h1 span, h2 span, h3 span, h4 span {font-weight: 700;}
    h1 b {color: orange;}
    h1 {font-size: 16px;}
    h2 {font-size: 14px; padding-left: 2em;}
    h2 b {color: orange;}
    h3 {font-size: 12px; padding-left: 4em;}
    h4 {font-size: 11px; padding-left: 4em;}
    h4.count {font-size: 11px; padding-left: 7em; color: grey;}
    error {color: red;}
    success {color: green;}
    info {color: blue;}
    input[type="text"], select {min-width: 200px;}
    input[type="submit"] {clear: both;}
    .dobackup {border: 1px solid red; background: yellow; width: 190px; padding: 5px;}
</style>

<?php
header("Content-Type: text/html; charset=utf-8");

ini_set("display_errors", 1);
error_reporting(E_ALL ^ E_NOTICE);
?>

<form action="" method="post">
    <p class="user"><label for="user">Имя пользователя</label><br />
        <?php info('Не проверяется!'); ?><br />
        <input type="text" id="user" name="user" value="<?php if ($_POST['user'] == 'admin' || empty($_POST['user']))
            echo 'admin';
        else
            echo $_POST['user'];
        ?>" /></p>
    <p class="newpassword"><label for="newpassword">Новый пароль</label><br />
        <input type="text" id="newpassword" name="newpassword" value="<?php if ($_POST['newpassword'] == 'password321' || empty($_POST['newpassword']))
            echo 'password321';
        else
            echo $_POST['newpassword'];
        ?>" /></p>
    <p class="dobackup"><label for="dobackup">Сделать бэкап?</label>
        <input type="checkbox" id="dobackup" name="dobackup" checked /></p>

    <select size="1" name="cms">
        <option selected="selected" value="none">Выберите CMS</option>
        <option value="Wordpress">Wordpress</option>
        <option value="Joomla">Joomla</option>
        <option value="MODX Evolution">MODX Evolution</option>
        <option value="MODX Revolution">MODX Revolution</option>
        <option value="Drupal 5-6">Drupal 5-6</option>
        <option value="Drupal 7">Drupal 7</option>
        <option value="OpenCart">OpenCart</option>
    </select>

    <br /><input type="submit" id="submit" name="submit" value="Поехали!" />
</form>

<?php
if (empty($_POST)) {
    die;
} elseif (trim($_POST['cms']) == 'none') {
    error('<p>Выберите CMS</p>');
    die;
}

$user = (empty($_POST['user']) ? 'admin' : trim($_POST['user']));
$newpassword = (empty($_POST['newpassword']) ? 'password321' : trim($_POST['newpassword']));

if (trim($_POST['cms']) == 'Wordpress') {
    /* WORDPRESS */
    if (file_exists('wp-config.php')) {
        require_once( 'wp-config.php' );
        define('DB_NAME', DB_NAME);
        define('DB_USER', DB_USER);
        define('DB_PASSWORD', DB_PASSWORD);
        define('DB_HOST', DB_HOST);
        define('DB_CHARSET', DB_CHARSET);
        define('QUERY_UPDATE', 'UPDATE `wp_users` SET `user_pass` = MD5(\'' . $newpassword . '\') WHERE user_login = \'' . $user . '\';');
        $mysqli = dbConnect();
        recover($mysqli);
        $mysqli->close();
    } else {
        error('<p>Не вижу конфиг <strong>wp-config.php</strong></p>');
    }
}

if (trim($_POST['cms']) == 'Joomla') {
    /* JOOMLA */
    if (file_exists('configuration.php')) {
        require_once( 'configuration.php' );
        $config = new JConfig;
        define('DB_NAME', $config->db);
        define('DB_USER', $config->user);
        define('DB_PASSWORD', $config->password);
        define('DB_HOST', $config->host);
        define('DB_CHARSET', 'utf8');
        define('QUERY_UPDATE', 'UPDATE `' . $config->dbprefix . 'users` SET `password` = MD5(\'' . $newpassword . '\'),`block` = 0 WHERE username = \'' . $user . '\';');
        $mysqli = dbConnect();
        recover($mysqli);
        $mysqli->close();
    } else {
        error('<p>Не вижу конфиг <strong>configuration.php</strong></p>');
    }
}

if (trim($_POST['cms']) == 'MODX Evolution') {
    /* MODX EVO */
    if (file_exists('manager/includes/config.inc.php')) {
        require_once( 'manager/includes/config.inc.php' );
        define('DB_NAME', $dbase);
        define('DB_USER', $database_user);
        define('DB_PASSWORD', $database_password);
        define('DB_HOST', $database_server);
        define('DB_CHARSET', $database_connection_charset);
		//Восстановление пароля:
        define('QUERY_UPDATE', 'UPDATE `' . $table_prefix . 'manager_users` SET `password` = MD5(\'' . $newpassword . '\') WHERE `' . $table_prefix . 'manager_users`.`username` = \'' . $user . '\';');
		//Разблокировка пользователя:
        //define('QUERY_UPDATE', 'UPDATE `' . $table_prefix . 'user_attributes` SET `blocked` = \'0\', `blockeduntil` = \'0\', `failedlogincount` = \'0\' WHERE `'.$table_prefix.'_manager_users`.`username` = \'' . $user . '\';');
        $mysqli = dbConnect();
        recover($mysqli);
        $mysqli->close();
    } else {
        error('<p>Не вижу конфиг <strong>config.inc.php</strong></p>');
    }
}

if (trim($_POST['cms']) == 'MODX Revolution') {
    /* MODX REVO */
    if (file_exists('core/config/config.inc.php')) {
        require_once( 'core/config/config.inc.php' );
        define('DB_NAME', $dbase);
        define('DB_USER', $database_user);
        define('DB_PASSWORD', $database_password);
        define('DB_HOST', $database_server);
        define('DB_CHARSET', $database_connection_charset);
        define('QUERY_UPDATE', 'UPDATE `' . $table_prefix . 'users` SET `username` = \'' . $user . '\',`password` = \'kXXEPN9pTwdXnaSlDvUzaJcR2y/1XzCqs9AXcxOzFdQ=\',`cachepwd` = \'\',`class_key` = \'modUser\',`active` = 1,`hash_class` = \'hashing.modPBKDF2\',`salt` = \'18de7acfa078ec932d6d09f18cf0dbac\',`session_stale` = NULL WHERE username = \'' . $user . '\';');
        $mysqli = dbConnect();
        recover($mysqli);
        $mysqli->close();
        success('Ваш новый пароль: <u><strong>password321</strong></u>!');
    } else {
        error('<p>Не вижу конфиг <strong>config.inc.php</strong></p>');
    }
}

if (trim($_POST['cms']) == 'Drupal 5-6') {
    /* Drupal 5-6 */
    if (file_exists('sites/default/settings.php')) {
        require_once( 'sites/default/settings.php' );
        if (isset($databases)) {
            error('Это Drupal 7!');
            die;
        }
        $arrDBURL = parse_url($db_url);
        if (is_array($db_prefix)) {
            $db_prefix = $db_prefix['users'];
        }
        define('DB_NAME', substr($arrDBURL['path'], 1));
        define('DB_USER', $arrDBURL['user']);
        define('DB_PASSWORD', $arrDBURL['pass']);
        define('DB_HOST', $arrDBURL['host']);
        define('DB_CHARSET', 'utf8');
        define('QUERY_UPDATE', 'UPDATE `' . $db_prefix . 'users` SET `pass` = MD5(\'' . $newpassword . '\'),`status` = 1 WHERE name = \'' . $user . '\';');
        $mysqli = dbConnect();
        recover($mysqli);
        $mysqli->close();
    } else {
        error('<p>Не вижу конфиг <strong>settings.php</strong></p>');
    }
}

if (trim($_POST['cms']) == 'Drupal 7') {
    /* Drupal 7 */
    if (file_exists('sites/default/settings.php')) {
        require_once( 'sites/default/settings.php' );
        if (!isset($databases)) {
            error('Это Drupal 5 или Drupal 6!');
            die;
        }
        define('DRUPAL_ROOT', getcwd());
        require_once DRUPAL_ROOT . '/includes/bootstrap.inc';
        drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
        require_once DRUPAL_ROOT . '/' . variable_get('password_inc', 'includes/password.inc');
        $uid = 1;
        $admin = user_load($uid);
        user_save($admin, array('pass' => $newpassword, 'name' => empty($_POST['user']) ? 'admin' : trim($_POST['user'])));
        $account = user_load($uid);
        if (user_check_password($newpassword, $account)) {
            success('Запрос успешно выполнен. Пароль изменен.');
        }
    } else {
        error('<p>Не вижу конфиг <strong>settings.php</strong></p>');
    }
}


if (trim($_POST['cms']) == 'OpenCart') {
    /* OpenCart */
    if (file_exists('config.php')) {
        require_once( 'config.php' );

        define('DB_NAME', DB_DATABASE);
        define('DB_USER', DB_USERNAME);
        define('DB_PASSWORD', DB_PASSWORD);
        define('DB_HOST', DB_HOSTNAME);
        define('DB_CHARSET', 'utf8');
        define('QUERY_UPDATE', 'UPDATE `' . DB_PREFIX . 'user` SET `password` = MD5(\'' . $newpassword . '\'),`status` = 1 WHERE username = \'' . $user . '\';');
        $mysqli = dbConnect();
        recover($mysqli);
        $mysqli->close();
    } else {
        error('<p>Не вижу конфиг <strong>config.php</strong></p>');
    }
}





/* Функции */

function dbConnect() {
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if ($mysqli->connect_errno) {
        error('Не удалось подключиться к MySQL: (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
        die;
    } else {
        success('<h1>Выбрана база данных [<b>' . DB_NAME . '</b>]</h1>');
        return $mysqli;
    }
}

function recover($mysqli) {
    if (isset($_POST['dobackup']))
        backup($mysqli);

    $resUpdate = $mysqli->query(QUERY_UPDATE);
    $rowCount = $mysqli->query('SELECT ROW_COUNT();');
    if (!$resUpdate) {
        error('Не удалось выполнить запрос: (' . $mysqli->errno . ') ' . $mysqli->error);
    } else {
        success('Запрос успешно выполнен. Пароль изменен.');
    }
}

function backup($mysqli) {
    info('<h1><b>Начинаем делать бэкап:</b></h1>');
//    $mysqli = dbConnect();

    /* изменение набора символов на указанный пользователем */
    if (!$mysqli->set_charset(DB_CHARSET)) {
        error('<h1><b>Ошибка при загрузке набора символов ' . DB_CHARSET . ': ' . $mysqli->error . '</b></h1>');
    } else {
        info('<h1>Текущий набор символов: [<b>' . $mysqli->character_set_name() . '</b>]</h1>');
    }
    /* поехали */
    $tables = '*';
    $return = "SET SQL_MODE=\"NO_AUTO_VALUE_ON_ZERO\";\n"
            . "SET time_zone = \"+00:00\";\n\n"
            . "/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;\n"
            . "/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;\n"
            . "/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;\n"
            . "/*!40101 SET NAMES " . DB_CHARSET . "*/;\n\n";
    if ($tables == '*') {
        $tables = array();
        $result = $mysqli->query('SHOW TABLES');
        while ($row = $result->fetch_row()) {
            $tables[] = $row[0];
        }
    } else {
        $tables = is_array($tables) ? $tables : explode(',', $tables);
    }
    //цикл по каждой таблицы с форматированием данных
    foreach ($tables as $table) {
        info('<h2>Таблица: [<b>' . $table . '</b>]</h2>');

        $result = $mysqli->query('SELECT * FROM ' . $table);
        $num_fields = $result->field_count;
        $return .= 'DROP TABLE IF EXISTS ' . $table . ';';
        $queryCreateTable = $mysqli->query('SHOW CREATE TABLE ' . $table);
        $row2 = $queryCreateTable->fetch_row();
        $return.= "\n\n" . $row2[1] . ";\n\n";
        for ($i = 0; $i < $num_fields; $i++) {
            while ($row = $result->fetch_row()) {
                $return.= 'INSERT INTO ' . $table . ' VALUES(';
                for ($j = 0; $j < $num_fields; $j++) {
                    $row[$j] = addslashes($row[$j]);
                    $row[$j] = str_replace("\n", "\\n", $row[$j]);
                    if (isset($row[$j])) {
                        $return.= '"' . $row[$j] . '"';
                    } else {
                        $return.= '""';
                    }
                    if ($j < ($num_fields - 1)) {
                        $return.= ',';
                    }
                }
                $return.= ");\n";
            }
        }
        $return.="\n\n\n";
    }
    //Сохраняем файл
    $filename = 'db-backup-' . time() . '-' . (md5(implode(',', $tables))) . '.sql';
    if ($handle = fopen($filename, 'w+')) {
        $written = fwrite($handle, $return);
        fclose($handle);
    }
    if (!$handle OR $written === false) {
        error('<h2><b>ОШИБКА ЗАПИСИ В ФАЙЛ РЕЗЕРВНОЙ КОПИИ: ' . $filename . '</b></h2>');
    } else {
        success('<h2><b>Резервная копия сохранена в файле с именем: ' . '<a href="' . $filename . '">' . $filename . '</a></b></h2>');
    }

//    $mysqli->close();
}

function info($strInfo) {
    echo '<info>' . $strInfo . '</info>';
}

function error($strError) {
    echo '<error>' . $strError . '</error>';
}

function success($strSuccess) {
    echo '<success>' . $strSuccess . '</success>';
}
