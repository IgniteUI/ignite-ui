/*!@license
* Infragistics.Web.ClientUI Validator localization resources <build_number>
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
	$.ig.Validator = $.ig.Validator || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.cs = $.ig.locale.cs || {};

	$.ig.locale.cs.Validator = {
		        defaultMessage: 'Toto pole vyžaduje pozornost',
		        selectMessage: 'Měla by být vybrána hodnota',
		        rangeSelectMessage: 'Je třeba vybrat alespoň {0}, ale maximálně {1} položek',
		        minSelectMessage: 'Je třeba vybrat alespoň {0} položek',
		        maxSelectMessage: 'Nemělo by být vybráno více než {0} položek',
		        rangeLengthMessage: 'Položka by měla mít délku mezi {0} a {1} znaky',
		        minLengthMessage: 'Záznam by měl mít alespoň {0} znaků',
		        maxLengthMessage: 'Záznam by neměl mít více než {0} znaků',
		        requiredMessage: 'Toto pole je povinné',
		        patternMessage: 'Položka neodpovídá požadovanému vzoru',
		        maskMessage: 'Měly by být vyplněny všechny požadované pozice',
		        dateFieldsMessage: 'Je třeba zadat hodnoty pole data',
		        invalidDayMessage: 'Je třeba zadat platný den v měsíci',
		        dateMessage: 'Je třeba zadat platné datum',
		        numberMessage: 'Je třeba zadat platné číslo',
		        rangeValueMessage: 'Měla by být zadána hodnota mezi {0} a {1}',
		        minValueMessage: 'Je třeba zadat hodnotu alespoň {0}',
		        maxValueMessage: 'Měla by být zadána hodnota nejvýše {0}',
		        emailMessage: 'Je třeba zadat platnou e-mailovou adresu',
		        creditCardMessage: 'Je třeba zadat platné číslo platební karty',
		        equalToMessage: 'Tyto dvě hodnoty se neshodují',
		        optionalString: '(volitelný)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale.cs.Validator;
	return $.ig.locale.cs.Validator;
}));// REMOVE_FROM_COMBINED_FILES
