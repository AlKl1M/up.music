<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/music-list.bundle.css',
	'js' => 'dist/music-list.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];