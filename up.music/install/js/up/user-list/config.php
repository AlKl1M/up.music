<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/user-list.bundle.css',
	'js' => 'dist/user-list.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];