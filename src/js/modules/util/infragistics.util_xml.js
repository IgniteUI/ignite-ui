/*!@license
 * Infragistics.Web.ClientUI Util functions <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 *
 * util functions that extend the jQuery  namespace
 * if something is not already available in jQuery, please add it here.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *
 */
/*global xyz, Class, ActiveXObject, Modernizr, VBArray, Intl, XDomainRequest, unescape, $, igRoot*/ /*jshint -W106*/ /*jshint -W116*/ /*jshint unused:false*/
import { igRoot as $ } from "infragistics.util_core";

$.ig.XmlNodeType = Class.extend({
		_None: 0,
		_Attribute: 2,
		_CDATA: 4,
		_Comment: 8,
		_Document: 9,
		_DocumentFragment: 11,
		_DocumentType: 10,
		_Element: 1,
		_EndElement: 15,
		_EndEntity: 16,
		_Entity: 6,
		_EntityReference: 5,
		_Notation: 12,
		_ProcessingInstruction: 7,
		_SignificantWhitespace: 14,
		_Text: 3,
		_Whitespace: 13,
		_XmlDeclaration: 17,

		none: 0,
		element: 1,
		attribute: 2,
		text: 3,
		cDATA: 4,
		entityReference: 5,
		entity: 6,
		processingInstruction: 7,
		comment: 8,
		document: 9,
		documentType: 10,
		documentFragment: 11,
		notation: 12,
		whitespace: 13,
		significantWhitespace: 14,
		endElement: 15,
		endEntity: 16,
		xmlDeclaration: 17

	}, true);

	$.ig.XmlDocumentParser = Class.extend({
		parse: function (markup) {
			if (!window.DOMParser) {
				var parsers = [ "Msxml2.DOMDocument.3.0", "Msxml2.DOMDocument" ];

				for (var i = 0; i < parsers.length; i++) {
					try {
						var xmlDOM = new ActiveXObject(parsers[ i ]);
						xmlDOM.async = false;
						xmlDOM.loadXML(markup);
						xmlDOM.setProperty("SelectionLanguage", "XPath");

						return xmlDOM;
					}
					catch (ex) {
					}
				}
			} else {
				try {
					var domParser = new DOMParser();
					return domParser.parseFromString(markup, "text/xml");
				}
				catch (ex) {
				}
			}
			return null;
		}
	}, true);

export { igRoot };
