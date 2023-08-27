<?php

use Bitrix\Main\ObjectPropertyException;

class UserDetailsComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->prepareTemplateParams();
		$this->includeComponentTemplate();
	}

	protected function prepareTemplateParams(): void
	{
		$this->arResult['CURRENT_PAGE'] = $this->arParams['CURRENT_PAGE'];
		$this->arResult['DATE_FORMAT'] = $this->arParams['DATE_FORMAT'];
		$this->arResult['NICKNAME'] = $this->arParams['NICKNAME'];
	}

	/**
	 * @throws ObjectPropertyException
	 */
	public function onPrepareComponentParams($arParams): array
	{
		$arParams['DATE_FORMAT'] = $arParams['DATE_FORMAT'] ?? 'd.m.Y H:i';

		$arParams['CURRENT_PAGE'] = (int)$arParams['CURRENT_PAGE'];
		if ($arParams['CURRENT_PAGE'] <= 0)
		{
			throw new ObjectPropertyException('Invalid page');
		}

		if (!preg_match('/^\w+$/u',$arParams['NICKNAME']))
		{
			throw new ObjectPropertyException('Invalid user nickname');
		}

		return $arParams;
	}
}