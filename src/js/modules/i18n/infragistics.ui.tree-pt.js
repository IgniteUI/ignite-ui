/*!@license
* Infragistics.Web.ClientUI Tree localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Tree = $.ig.Tree || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pt = $.ig.locale.pt || {};

	$.ig.locale.pt.Tree = {
			    invalidArgumentType: 'Tipo de argumento inválido fornecido.',
			    errorOnRequest: 'Ocorreu um erro ao obter dados: ',
			    noDataSourceUrl: 'O controlo igTree requer um dataSourceUrl fornecido para iniciar um pedido de dados para esse URL.',
			    incorrectPath: 'Um nó não foi encontrado no caminho fornecido: ',
			    incorrectNodeObject: 'O argumento fornecido não é um elemento do nó jQuery.',
			    setOptionError: 'As alterações ao tempo de execução não são permitidas para a seguinte opção: ',
			    moveTo: '<strong>Mover para</strong> {0}',
			    moveBetween: '<strong>Mover entre</strong> {0} e {1}',
			    moveAfter: '<strong>Mover após</strong> {0}',
			    moveBefore: '<strong>Mover antes de</strong> {0}',
			    copyTo: '<strong>Copiar para</strong> {0}',
			    copyBetween: '<strong>Copiar entre</strong> {0} e {1}',
			    copyAfter: '<strong>Copiar após</strong> {0}',
			    copyBefore: '<strong>Copiar antes de</strong> {0}',
			    and: 'e'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.pt.Tree;
	return $.ig.locale.pt.Tree;
}));// REMOVE_FROM_COMBINED_FILES
