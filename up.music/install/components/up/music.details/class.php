<?php

use Bitrix\Main\ObjectPropertyException;

class MusicDetailsComponent extends CBitrixComponent
{

	public function executeComponent()
	{
		$this->prepareTemplateParams();
		$this->includeComponentTemplate();
	}

	protected function prepareTemplateParams(): void
	{
		$this->arResult['DATE_FORMAT'] = $this->arParams['DATE_FORMAT'];
		$this->arResult['MUSIC_ID'] = $this->arParams['MUSIC_ID'];
	}

	/**
	 * @throws ObjectPropertyException
	 */
	public function onPrepareComponentParams($arParams): array
	{
		$arParams['DATE_FORMAT'] = $arParams['DATE_FORMAT'] ?? 'd.m.Y H:i';
		$arParams['MUSIC_ID'] = (int)$arParams['MUSIC_ID'];
		if ($arParams['MUSIC_ID'] <= 0)
		{
			throw new ObjectPropertyException('Invalid music ID');
		}

		return $arParams;
	}
}