<?php

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Entity\Query;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Music\Config\Config;
use Up\Music\Model\User\UserTable;
use Up\Music\Services\PaginationService;

class UsersListComponent extends CBitrixComponent
{

	public function executeComponent()
	{
		$this->prepareTemplateParams();
		$this->includeComponentTemplate();
	}


	public function onPrepareComponentParams($arParams): array
	{
		if(isset($arParams['SEARCH_STRING']))
		{
			$searchStringIsValidBySymbol = preg_match('/^\w+|\s\w{2,}$/u', $arParams['SEARCH_STRING']);
			$searchStringIsValidByLength = (strlen($arParams['SEARCH_STRING']) < 100);

			if (!$searchStringIsValidBySymbol || !$searchStringIsValidByLength)
			{
				throw new ObjectPropertyException('Invalid search string');
			}
		}

		$arParams['DATE_FORMAT'] = $arParams['DATE_FORMAT'] ?? 'd.m.Y';

		$arParams['CURRENT_PAGE'] = (int)$arParams['CURRENT_PAGE'];
		if ($arParams['CURRENT_PAGE'] <= 0)
		{
			throw new ObjectPropertyException('Invalid page');
		}
		return $arParams;
	}

	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	protected function prepareTemplateParams(): void
	{
		if(isset($this->arParams['SEARCH_STRING']))
		{
			$this->arResult['SEARCH_STRING'] = $this->arParams['SEARCH_STRING'];
		}

		$this->arResult['PAGINATION_BASE_LINK'] = $this->arParams['PAGINATION_BASE_LINK'];
		$this->arResult['DATE_FORMAT'] = $this->arParams['DATE_FORMAT'];
		$this->arResult['CURRENT_PAGE'] = $this->arParams['CURRENT_PAGE'];
	}
}