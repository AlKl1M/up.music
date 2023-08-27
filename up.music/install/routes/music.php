<?php

use Bitrix\Main\Context;
use Bitrix\Main\Routing\Controllers\PublicPageController;
use Bitrix\Main\Routing\RoutingConfigurator;
use Up\Music\Services\MusicService;

return static function (RoutingConfigurator $routes) {
    $routes->get('/login/', new PublicPageController('/local/modules/up.music/views/auth/login.php'));
    $routes->post('/login/', new PublicPageController('/local/modules/up.music/views/auth/login.php'));
    $routes->get('/registration/', new PublicPageController('/local/modules/up.music/views/auth/register.php'));
    $routes->post('/registration/', new PublicPageController('/local/modules/up.music/views/auth/register.php'));

    $routes->get('/', new PublicPageController('/local/modules/up.music/views/posts/music-list.php'));
    $routes->get('/posts/', new PublicPageController('/local/modules/up.music/views/posts/music-list.php'));
    $routes->get('/posts', new PublicPageController('/local/modules/up.music/views/posts/music-list.php'));
    $routes->get('/posts/{page}', new PublicPageController('/local/modules/up.music/views/posts/music-list.php'));

    $routes->get('/users/', new PublicPageController('/local/modules/up.music/views/users/users-list.php'));
    $routes->get('/users/{page}', new PublicPageController('/local/modules/up.music/views/users/users-list.php'));
    $routes->get('/user/{nickname}/{page}', new PublicPageController('/local/modules/up.music/views/users/user-details.php'));
    $routes->get('/user/{nickname}/', new PublicPageController('/local/modules/up.music/views/users/user-details.php'));
    $routes->get('/user/{nickname}', new PublicPageController('/local/modules/up.music/views/users/user-details.php'));

    $routes->get('/post/{id}', new PublicPageController('/local/modules/up.music/views/posts/music-details.php'));

    $routes->get('/create/', new PublicPageController('/local/modules/up.music/views/createMusic/music-create.php'));
    $routes->get('/create/success/', new PublicPageController('/local/modules/up.music/views/createMusic/music-create-success.php'));
    $routes->get('/create/unsuccessful/', new PublicPageController('/local/modules/up.music/views/createMusic/music-create-unsuccessful.php'));

    $routes->get('/delete/user/{id}', new PublicPageController('/local/modules/up.music/views/objectDelete/user-delete.php'));
    $routes->get('/delete/music/{id}', new PublicPageController('/local/modules/up.music/views/objectDelete/music-delete.php'));

    $routes->post('/pageNotFound/', new PublicPageController('/local/modules/up.music/views/page-not-found.php'));
    $routes->post('/pageNotFound', new PublicPageController('/local/modules/up.music/views/page-not-found.php'));

    $routes->get('/search/', new PublicPageController('/local/modules/up.music/views/search/search.php'));

    $routes->post('/create/', static function () {
        if (check_bitrix_sessid())
        {
            global $USER;

            $image = Context::getCurrent()->getRequest()->getFile('image');
            $music = Context::getCurrent()->getRequest()->getFile('music');
            $title = Context::getCurrent()->getRequest()->get('title');
            $genreId = (int)Context::getCurrent()->getRequest()->get('genre-id');
            $description = Context::getCurrent()->getRequest()->get('message');
            $userId = $USER->GetID();
            MusicService::saveTrack($image, $music, $title, $description, $genreId, $userId);
        }
        else
        {
            LocalRedirect('/posts');
        }
    });

    $routes->get('/logout/', static function() {
        Global $USER;

        require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
        $USER->Logout();
        if(!($USER->IsAuthorized())) {LocalRedirect('/login/');}
    });
};