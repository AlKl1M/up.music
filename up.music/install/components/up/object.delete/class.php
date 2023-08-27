<?php

use Bitrix\Main\ObjectPropertyException;

class ObjectDeleteComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->prepareTemplateParams();
		$this->includeComponentTemplate();
	}

	protected function prepareTemplateParams(): void
	{
		$this->arResult['ID'] = $this->arParams['ID'];
		$this->arResult['BASE_LINK'] = $this->arParams['BASE_LINK'];
		$this->arResult['SHOW_SUCCESS_MESSAGE'] = $this->arParams['SHOW_SUCCESS_MESSAGE'];
		$this->arResult['SHOW_UNSUCCESSFUL_MESSAGE'] = $this->arParams['SHOW_UNSUCCESSFUL_MESSAGE'];
	}

	/**
	 * @throws ObjectPropertyException
	 */
	public function onPrepareComponentParams($arParams): array
	{
		$arParams['SHOW_SUCCESS_MESSAGE'] = $arParams['SHOW_SUCCESS_MESSAGE'] ?? false;
		$arParams['SHOW_UNSUCCESSFUL_MESSAGE'] = $arParams['SHOW_UNSUCCESSFUL_MESSAGE'] ?? false;
		$arParams['BASE_LINK'] = $arParams['BASE_LINK'] ?? '';

		if ($arParams['SHOW_SUCCESS_MESSAGE']&&$arParams['SHOW_UNSUCCESSFUL_MESSAGE'])
		{
			throw new ObjectPropertyException('Displaying more than one information message is not possible');
		}

		if (isset($arParams['ID']))
		{
			$arParams['ID'] = (int)$arParams['ID'];
			if ($arParams['ID'] <= 0)
			{
				throw new ObjectPropertyException('ID must be greater than zero');
			}
		}
		return $arParams;
	}
}