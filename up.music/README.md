# Установка модуля UP.Music

Клонировать репозиторий в `${doc_root}/local/modules`

## Системные требования
```
php 7.4
mysql 5.7
apache 2.4
```
## Подключение роутинга

Добавьте `music.php` в `routing` секцию в `${doc_root}/bitrix/.settings.php` файле:

```php
'routing' => ['value' => [
	'config' => ['music.php']
]],
```

Поменяйте содержимое вашего `${doc_root}/index.php` файла:

```php
<?php

if(file_exists($_SERVER['DOCUMENT_ROOT'].'/local/routing_index.php'))
{
	include_once($_SERVER['DOCUMENT_ROOT'].'/local/routing_index.php');
}
```

Поменяйте следующие строчки в `${doc_root}/.htaccess` файле:

```
-RewriteCond %{REQUEST_FILENAME} !/bitrix/urlrewrite.php$
-RewriteRule ^(.*)$ /bitrix/urlrewrite.php [L]

+RewriteCond %{REQUEST_FILENAME} !/index.php$
+RewriteRule ^(.*)$ /index.php [L]
```

Создайте `${doc_root}/local/routing_index.php` файл:

```php
<?php
include_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/routing_index.php');
if(file_exists($_SERVER['DOCUMENT_ROOT'].'/local/modules/up.music/views/page-not-found.php'))
{
	include_once($_SERVER['DOCUMENT_ROOT'] . '/local/modules/up.music/views/page-not-found.php');
}
```

Создайте `${doc_root}/local/php_interface/init.php` файл:

```php
<?php

use Bitrix\Main\Loader;

if (CModule::IncludeModule("up.music"))
{
	Loader::includeModule('up.music');
}
```
## Линковка для разработки

Можно использовать следующие символьные ссылки:

```
local/components/up -> local/modules/up.tasks/install/components/up
local/templates/tasks -> local/modules/up.tasks/install/templates/tasks
local/routes/tasks.php -> local/modules/up.tasks/install/routes/tasks.php
```

## Подключение авторизации и логина

```
Зайти в панель "администрирование" 
Перейти по пути Настройки > Настройки модулей > Настройки модулей > Авторизация

Заполнить следующие данные:

Страница регистрации (для системного компонента авторизации):   /registration/
Шаблон системных компонентов авторизации (system.auth.*):       .default
Позволять ли пользователям регистрироваться самостоятельно? :   Установить галочку
При регистрации добавлять в группу:                             Пользователи, имеющие право голосовать за авторитет [4]

```

## Установка шаблонов 

```
Зайти в панель "администрирование" 
Перейти по пути Настройки > Настройки продукта > Сайты > Список сайтов
Выбрать сайт, на котором установлен компонент up.music

Заполнить следующие данные в поле "Шаблон сайта":

Шаблон                 Сорт.        Тип уловия                 Условие
Music template          1           без условия             без условия
Music template static   2       Для папки или файла         /create/

```

## Требования к паролю

```
Мы желаем, чтобы пользователи сервиса были надежно защищены, поэтому рекомендуем установить следующие требования к паролю:

Зайти в панель "администрирование" 
Перейти по пути Пользователи > Группы пользователей > ID=4 > Безопасность

Задать параметр минимальная длина пароля равным 8

УБРАТЬ галочку в поле "Не переопределять" на следующих методах:
Пароль должен содержать латинские символы верхнего регистра (A-Z)
Пароль должен содержать латинские символы нижнего регистра (a-z)
Пароль должен содержать цифры (0-9)
Проверять пароль по базе слабых паролей
```