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

/*jshint -W100 */ // jscs:disable
	var globalInfo = { "invariant": { c: "¤", d: "MM/dd/yyyy" }, 127: "invariant",
		"af": { c: "R", d: "yyyy/MM/dd" }, 54: "af", "af-ZA": { c: "R", d: "yyyy/MM/dd" }, 1078: "af-ZA", "am": { c: "ETB", d: "d/M/yyyy" }, 94: "am", "am-ET": { c: "ETB", d: "d/M/yyyy" }, 1118: "am-ET", "ar": { c: "ر.س.‏", d: "dd/MM/yy", n: "٠١٢٣٤٥٦٧٨٩" }, 1: "ar", "ar-AE": { c: "د.إ.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 14337: "ar-AE", "ar-BH": { c: "د.ب.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 15361: "ar-BH", "ar-DZ": { c: "د.ج.‏", d: "dd-MM-yyyy" }, 5121: "ar-DZ", "ar-EG": { c: "ج.م.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 3073: "ar-EG", "ar-IQ": { c: "د.ع.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 2049: "ar-IQ", "ar-JO": { c: "د.ا.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 11265: "ar-JO", "ar-KW": { c: "د.ك.‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 13313: "ar-KW", "ar-LB": { c: "ل.ل.‏‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 12289: "ar-LB", "ar-LY": { c: "د.ل.‏‏", d: "dd/MM/yyyy" }, 4097: "ar-LY", "ar-MA": { c: "د.م.‏‏", d: "dd-MM-yyyy" }, 6145: "ar-MA", "arn": { c: "$", d: "dd-MM-yyyy" }, 122: "arn", "arn-CL": { c: "$", d: "dd-MM-yyyy" }, 1146: "arn-CL", "ar-OM": { c: "ر.ع.‏‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 8193: "ar-OM", "ar-QA": { c: "ر.ق.‏‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 16385: "ar-QA", "ar-SA": { c: "ر.س.‏", d: "dd/MM/yy", n: "٠١٢٣٤٥٦٧٨٩" }, 1025: "ar-SA", "ar-SY": { c: "ل.س.‏‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 10241: "ar-SY", "ar-TN": { c: "د.ت.‏‏", d: "dd-MM-yyyy" }, 7169: "ar-TN", "ar-YE": { c: "ر.ي.‏‏", d: "dd/MM/yyyy", n: "٠١٢٣٤٥٦٧٨٩" }, 9217: "ar-YE", "as": { c: "₹", d: "dd-MM-yyyy", n: "০১২৩৪৫৬৭৮৯" }, 77: "as", "as-IN": { c: "₹", d: "dd-MM-yyyy", n: "০১২৩৪৫৬৭৮৯" }, 1101: "as-IN", "az": { c: "man.", d: "dd.MM.yyyy" }, 44: "az", "az-Cyrl": { c: "ман.", d: "dd.MM.yyyy" }, 29740: "az-Cyrl", "az-Cyrl-AZ": { c: "ман.", d: "dd.MM.yyyy" }, 2092: "az-Cyrl-AZ", "az-Latn": { c: "man.", d: "dd.MM.yyyy" }, 30764: "az-Latn", "az-Latn-AZ": { c: "man.", d: "dd.MM.yyyy" }, 1068: "az-Latn-AZ", "ba": { c: "₽", d: "dd.MM.yy" }, 109: "ba", "ba-RU": { c: "₽", d: "dd.MM.yy" }, 1133: "ba-RU", "be": { c: "Br", d: "dd.MM.yy" }, 35: "be", "be-BY": { c: "Br", d: "dd.MM.yy" }, 1059: "be-BY", "bg": { c: "лв.", d: "d.M.yyyy \"г.\"" }, 2: "bg", "bg-BG": { c: "лв.", d: "d.M.yyyy \"г.\"" }, 1026: "bg-BG", "bn": { c: "₹", d: "dd-MM-yy", n: "০১২৩৪৫৬৭৮৯" }, 69: "bn", "bn-BD": { c: "৳", d: "dd-MM-yy", n: "০১২৩৪৫৬৭৮৯" }, 2117: "bn-BD", "bn-IN": { c: "₹", d: "dd-MM-yy", n: "০১২৩৪৫৬৭৮৯" }, 1093: "bn-IN", "bo": { c: "¥", d: "yyyy/M/d", n: "༠༡༢༣༤༥༦༧༨༩" }, 81: "bo", "bo-CN": { c: "¥", d: "yyyy/M/d", n: "༠༡༢༣༤༥༦༧༨༩" }, 1105: "bo-CN", "br": { c: "€", d: "dd/MM/yyyy" }, 126: "br", "br-FR": { c: "€", d: "dd/MM/yyyy" }, 1150: "br-FR", "bs": { c: "KM", d: "d.M.yyyy" }, 30746: "bs", "bs-Cyrl": { c: "КМ", d: "d.M.yyyy" }, 25626: "bs-Cyrl", "bs-Cyrl-BA": { c: "КМ", d: "d.M.yyyy" }, 8218: "bs-Cyrl-BA", "bs-Latn": { c: "KM", d: "d.M.yyyy" }, 26650: "bs-Latn", "bs-Latn-BA": { c: "KM", d: "d.M.yyyy" }, 5146: "bs-Latn-BA", "ca": { c: "€", d: "dd/MM/yyyy" }, 3: "ca", "ca-ES": { c: "€", d: "dd/MM/yyyy" }, 1027: "ca-ES", "ca-ES-valencia": { c: "€", d: "dd/MM/yy" }, 2051: "ca-ES-valencia", "chr": { c: "$", d: "M/d/yyyy" }, 92: "chr", "chr-Cher": { c: "$", d: "M/d/yyyy" }, 31836: "chr-Cher", "chr-Cher-US": { c: "$", d: "M/d/yyyy" }, 1116: "chr-Cher-US", "co": { c: "€", d: "dd/MM/yyyy" }, 131: "co", "co-FR": { c: "€", d: "dd/MM/yyyy" }, 1155: "co-FR", "cs": { c: "Kč", d: "d. M. yyyy" }, 5: "cs", "cs-CZ": { c: "Kč", d: "d. M. yyyy" }, 1029: "cs-CZ", "cy": { c: "£", d: "dd/MM/yy" }, 82: "cy", "cy-GB": { c: "£", d: "dd/MM/yy" }, 1106: "cy-GB", "da": { c: "kr.", d: "dd-MM-yyyy" }, 6: "da", "da-DK": { c: "kr.", d: "dd-MM-yyyy" }, 1030: "da-DK", "de": { c: "€", d: "dd.MM.yyyy" }, 7: "de", "de-AT": { c: "€", d: "dd.MM.yyyy" }, 3079: "de-AT", "de-CH": { c: "Fr.", d: "dd.MM.yyyy" }, 2055: "de-CH", "de-DE": { c: "€", d: "dd.MM.yyyy" }, 1031: "de-DE", "de-LI": { c: "CHF", d: "dd.MM.yyyy" }, 5127: "de-LI", "de-LU": { c: "€", d: "dd.MM.yyyy" }, 4103: "de-LU", "dsb": { c: "€", d: "d. M. yyyy" }, 31790: "dsb", "dsb-DE": { c: "€", d: "d. M. yyyy" }, 2094: "dsb-DE", "dv": { c: "ރ.", d: "dd/MM/yy" }, 101: "dv", "dv-MV": { c: "ރ.", d: "dd/MM/yy" }, 1125: "dv-MV", "el": { c: "€", d: "d/M/yyyy" }, 8: "el", "el-GR": { c: "€", d: "d/M/yyyy" }, 1032: "el-GR", "en": { c: "$", d: "M/d/yyyy" }, 9: "en", "en-029": { c: "EC$", d: "dd/MM/yyyy" }, 9225: "en-029", "en-AU": { c: "$", d: "d/MM/yyyy" }, 3081: "en-AU", "en-BZ": { c: "BZ$", d: "dd/MM/yyyy" }, 10249: "en-BZ", "en-CA": { c: "$", d: "yyyy-MM-dd" }, 4105: "en-CA", "en-GB": { c: "£", d: "dd/MM/yyyy" }, 2057: "en-GB", "en-HK": { c: "$", d: "d/M/yy" }, 15369: "en-HK", "en-IE": { c: "€", d: "dd/MM/yyyy" }, 6153: "en-IE", "en-IN": { c: "₹", d: "dd-MM-yyyy" }, 16393: "en-IN", "en-JM": { c: "J$", d: "dd/MM/yyyy" }, 8201: "en-JM", "en-MY": { c: "RM", d: "d/M/yyyy" }, 17417: "en-MY", "en-NZ": { c: "$", d: "d/MM/yyyy" }, 5129: "en-NZ", "en-PH": { c: "₱", d: "M/d/yyyy" }, 13321: "en-PH", "en-SG": { c: "$", d: "d/M/yyyy" }, 18441: "en-SG", "en-TT": { c: "TT$", d: "dd/MM/yyyy" }, 11273: "en-TT", "en-US": { c: "$", d: "M/d/yyyy" }, 1033: "en-US", "en-ZA": { c: "R", d: "yyyy-MM-dd" }, 7177: "en-ZA", "en-ZW": { c: "$", d: "dd/MM/yyyy" }, 12297: "en-ZW", "es": { c: "€", d: "dd/MM/yyyy" }, 10: "es", "es-419": { c: "US$", d: "dd/MM/yy" }, 22538: "es-419", "es-AR": { c: "$", d: "dd/MM/yyyy" }, 11274: "es-AR", "es-BO": { c: "Bs.", d: "dd/MM/yyyy" }, 16394: "es-BO", "es-CL": { c: "$", d: "dd-MM-yyyy" }, 13322: "es-CL", "es-CO": { c: "$", d: "dd/MM/yyyy" }, 9226: "es-CO", "es-CR": { c: "₡", d: "dd/MM/yyyy" }, 5130: "es-CR", "es-DO": { c: "RD$", d: "d/M/yy" }, 7178: "es-DO", "es-EC": { c: "$", d: "dd/MM/yyyy" }, 12298: "es-EC", "es-ES": { c: "€", d: "dd/MM/yyyy" }, 3082: "es-ES", "es-GT": { c: "Q", d: "dd/MM/yyyy" }, 4106: "es-GT", "es-HN": { c: "L.", d: "dd/MM/yyyy" }, 18442: "es-HN", "es-MX": { c: "$", d: "dd/MM/yyyy" }, 2058: "es-MX", "es-NI": { c: "C$", d: "dd/MM/yyyy" }, 19466: "es-NI", "es-PA": { c: "B/.", d: "d/M/yy" }, 6154: "es-PA", "es-PE": { c: "S/.", d: "dd/MM/yyyy" }, 10250: "es-PE", "es-PR": { c: "$", d: "dd/MM/yyyy" }, 20490: "es-PR", "es-PY": { c: "₲", d: "dd/MM/yyyy" }, 15370: "es-PY", "es-SV": { c: "$", d: "dd/MM/yyyy" }, 17418: "es-SV", "es-US": { c: "$", d: "M/d/yyyy" }, 21514: "es-US", "es-UY": { c: "$U", d: "dd/MM/yyyy" }, 14346: "es-UY", "es-VE": { c: "Bs.F.", d: "dd-MM-yyyy" }, 8202: "es-VE", "et": { c: "€", d: "d.MM.yyyy" }, 37: "et", "et-EE": { c: "€", d: "d.MM.yyyy" }, 1061: "et-EE", "eu": { c: "€", d: "yyyy/MM/dd" }, 45: "eu", "eu-ES": { c: "€", d: "yyyy/MM/dd" }, 1069: "eu-ES", "fa": { c: "ريال", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 41: "fa", "fa-IR": { c: "ريال", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 1065: "fa-IR", "ff": { c: "CFA", d: "dd/MM/yyyy" }, 103: "ff", "ff-Latn": { c: "CFA", d: "dd/MM/yyyy" }, 31847: "ff-Latn", "ff-Latn-SN": { c: "CFA", d: "dd/MM/yyyy" }, 2151: "ff-Latn-SN", "fi": { c: "€", d: "d.M.yyyy" }, 11: "fi", "fi-FI": { c: "€", d: "d.M.yyyy" }, 1035: "fi-FI", "fil": { c: "₱", d: "M/d/yyyy" }, 100: "fil", "fil-PH": { c: "₱", d: "M/d/yyyy" }, 1124: "fil-PH", "fo": { c: "kr.", d: "dd-MM-yyyy" }, 56: "fo", "fo-FO": { c: "kr.", d: "dd-MM-yyyy" }, 1080: "fo-FO", "fr": { c: "€", d: "dd/MM/yyyy" }, 12: "fr", "fr-BE": { c: "€", d: "dd-MM-yy" }, 2060: "fr-BE", "fr-CA": { c: "$", d: "yyyy-MM-dd" }, 3084: "fr-CA", "fr-CD": { c: "FC", d: "dd/MM/yyyy" }, 9228: "fr-CD", "fr-CH": { c: "fr.", d: "dd.MM.yyyy" }, 4108: "fr-CH", "fr-CI": { c: "CFA", d: "dd/MM/yyyy" }, 12300: "fr-CI", "fr-CM": { c: "FCFA", d: "dd/MM/yyyy" }, 11276: "fr-CM", "fr-FR": { c: "€", d: "dd/MM/yyyy" }, 1036: "fr-FR", "fr-HT": { c: "G", d: "dd/MM/yyyy" }, 15372: "fr-HT", "fr-LU": { c: "€", d: "dd/MM/yyyy" }, 5132: "fr-LU", "fr-MA": { c: "DH", d: "dd/MM/yyyy" }, 14348: "fr-MA", "fr-MC": { c: "€", d: "dd/MM/yyyy" }, 6156: "fr-MC", "fr-ML": { c: "CFA", d: "dd/MM/yyyy" }, 13324: "fr-ML", "fr-RE": { c: "€", d: "dd/MM/yyyy" }, 8204: "fr-RE", "fr-SN": { c: "CFA", d: "dd/MM/yyyy" }, 10252: "fr-SN", "fy": { c: "€", d: "d-M-yyyy" }, 98: "fy", "fy-NL": { c: "€", d: "d-M-yyyy" }, 1122: "fy-NL", "ga": { c: "€", d: "dd/MM/yyyy" }, 60: "ga", "ga-IE": { c: "€", d: "dd/MM/yyyy" }, 2108: "ga-IE", "gd": { c: "£", d: "dd/MM/yyyy" }, 145: "gd", "gd-GB": { c: "£", d: "dd/MM/yyyy" }, 1169: "gd-GB", "gl": { c: "€", d: "dd/MM/yyyy" }, 86: "gl", "gl-ES": { c: "€", d: "dd/MM/yyyy" }, 1110: "gl-ES", "gn": { c: "₲", d: "dd/MM/yyyy" }, 116: "gn", "gn-PY": { c: "₲", d: "dd/MM/yyyy" }, 1140: "gn-PY", "gsw": { c: "€", d: "dd/MM/yyyy" }, 132: "gsw", "gsw-FR": { c: "€", d: "dd/MM/yyyy" }, 1156: "gsw-FR", "gu": { c: "₹", d: "dd-MM-yy", n: "૦૧૨૩૪૫૬૭૮૯" }, 71: "gu", "gu-IN": { c: "₹", d: "dd-MM-yy", n: "૦૧૨૩૪૫૬૭૮૯" }, 1095: "gu-IN", "ha": { c: "₦", d: "d/M/yyyy" }, 104: "ha", "ha-Latn": { c: "₦", d: "d/M/yyyy" }, 31848: "ha-Latn", "ha-Latn-NG": { c: "₦", d: "d/M/yyyy" }, 1128: "ha-Latn-NG", "haw": { c: "$", d: "M/d/yyyy" }, 117: "haw", "haw-US": { c: "$", d: "M/d/yyyy" }, 1141: "haw-US", "he": { c: "₪", d: "dd/MM/yyyy" }, 13: "he", "he-IL": { c: "₪", d: "dd/MM/yyyy" }, 1037: "he-IL", "hi": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 57: "hi", "hi-IN": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 1081: "hi-IN", "hr": { c: "kn", d: "d.M.yyyy." }, 26: "hr", "hr-BA": { c: "KM", d: "d.M.yyyy." }, 4122: "hr-BA", "hr-HR": { c: "kn", d: "d.M.yyyy." }, 1050: "hr-HR", "hsb": { c: "€", d: "d. M. yyyy" }, 46: "hsb", "hsb-DE": { c: "€", d: "d. M. yyyy" }, 1070: "hsb-DE", "hu": { c: "Ft", d: "yyyy.MM.dd." }, 14: "hu", "hu-HU": { c: "Ft", d: "yyyy.MM.dd." }, 1038: "hu-HU", "hy": { c: "֏", d: "dd.MM.yyyy" }, 43: "hy", "hy-AM": { c: "֏", d: "dd.MM.yyyy" }, 1067: "hy-AM", "id": { c: "Rp", d: "dd/MM/yyyy" }, 33: "id", "id-ID": { c: "Rp", d: "dd/MM/yyyy" }, 1057: "id-ID", "ig": { c: "₦", d: "d/M/yyyy" }, 112: "ig", "ig-NG": { c: "₦", d: "d/M/yyyy" }, 1136: "ig-NG", "ii": { c: "¥", d: "yyyy/M/d" }, 120: "ii", "ii-CN": { c: "¥", d: "yyyy/M/d" }, 1144: "ii-CN", "is": { c: "kr.", d: "d.M.yyyy" }, 15: "is", "is-IS": { c: "kr.", d: "d.M.yyyy" }, 1039: "is-IS", "it": { c: "€", d: "dd/MM/yyyy" }, 16: "it", "it-CH": { c: "fr.", d: "dd.MM.yyyy" }, 2064: "it-CH", "it-IT": { c: "€", d: "dd/MM/yyyy" }, 1040: "it-IT", "iu": { c: "$", d: "d/MM/yyyy" }, 93: "iu", "iu-Cans": { c: "$", d: "d/M/yyyy" }, 30813: "iu-Cans", "iu-Cans-CA": { c: "$", d: "d/M/yyyy" }, 1117: "iu-Cans-CA", "iu-Latn": { c: "$", d: "d/MM/yyyy" }, 31837: "iu-Latn", "iu-Latn-CA": { c: "$", d: "d/MM/yyyy" }, 2141: "iu-Latn-CA", "ja": { c: "¥", d: "yyyy/MM/dd" }, 17: "ja", "ja-JP": { c: "¥", d: "yyyy/MM/dd" }, 1041: "ja-JP", "jv": { c: "Rp", d: "dd/MM/yyyy" }, 4096: "jv", "jv-Latn": { c: "Rp", d: "dd/MM/yyyy" }, "jv-Latn-ID": { c: "Rp", d: "dd/MM/yyyy" }, "ka": { c: "ლ.", d: "dd.MM.yyyy" }, 55: "ka", "ka-GE": { c: "ლ.", d: "dd.MM.yyyy" }, 1079: "ka-GE", "kk": { c: "₸", d: "d-MMM-yy" }, 63: "kk", "kk-KZ": { c: "₸", d: "d-MMM-yy" }, 1087: "kk-KZ", "kl": { c: "kr.", d: "dd-MM-yyyy" }, 111: "kl", "kl-GL": { c: "kr.", d: "dd-MM-yyyy" }, 1135: "kl-GL", "km": { c: "៛", d: "dd/MM/yy", n: "០១២៣៤៥៦៧៨៩" }, 83: "km", "km-KH": { c: "៛", d: "dd/MM/yy", n: "០១២៣៤៥៦៧៨៩" }, 1107: "km-KH", "kn": { c: "₹", d: "dd-MM-yy", n: "೦೧೨೩೪೫೬೭೮೯" }, 75: "kn", "kn-IN": { c: "₹", d: "dd-MM-yy", n: "೦೧೨೩೪೫೬೭೮೯" }, 1099: "kn-IN", "ko": { c: "₩", d: "yyyy-MM-dd" }, 18: "ko", "kok": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 87: "kok", "kok-IN": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 1111: "kok-IN", "ko-KR": { c: "₩", d: "yyyy-MM-dd" }, 1042: "ko-KR", "ku": { c: "د.ع.‏", d: "yyyy/MM/dd", n: "٠١٢٣٤٥٦٧٨٩" }, 146: "ku", "ku-Arab": { c: "د.ع.‏", d: "yyyy/MM/dd", n: "٠١٢٣٤٥٦٧٨٩" }, 31890: "ku-Arab", "ku-Arab-IQ": { c: "د.ع.‏", d: "yyyy/MM/dd", n: "٠١٢٣٤٥٦٧٨٩" }, 1170: "ku-Arab-IQ", "ky": { c: "сом", d: "d-MMM yy" }, 64: "ky", "ky-KG": { c: "сом", d: "d-MMM yy" }, 1088: "ky-KG", "lb": { c: "€", d: "dd.MM.yy" }, 110: "lb", "lb-LU": { c: "€", d: "dd.MM.yy" }, 1134: "lb-LU", "lo": { c: "₭", d: "dd/MM/yyyy", n: "໐໑໒໓໔໕໖໗໘໙" }, 84: "lo", "lo-LA": { c: "₭", d: "dd/MM/yyyy", n: "໐໑໒໓໔໕໖໗໘໙" }, 1108: "lo-LA", "lt": { c: "Lt", d: "yyyy-MM-dd" }, 39: "lt", "lt-LT": { c: "Lt", d: "yyyy-MM-dd" }, 1063: "lt-LT", "lv": { c: "€", d: "dd.MM.yyyy." }, 38: "lv", "lv-LV": { c: "€", d: "dd.MM.yyyy." }, 1062: "lv-LV", "mg": { c: "Ar", d: "d/M/yyyy" }, "mg-MG": { c: "Ar", d: "d/M/yyyy" }, "mi": { c: "$", d: "dd/MM/yyyy" }, 129: "mi", "mi-NZ": { c: "$", d: "dd/MM/yyyy" }, 1153: "mi-NZ", "mk": { c: "ден.", d: "dd.MM.yyyy" }, 47: "mk", "mk-MK": { c: "ден.", d: "dd.MM.yyyy" }, 1071: "mk-MK", "ml": { c: "₹", d: "dd-MM-yy", n: "൦൧൨൩൪൫൬൭൮൯" }, 76: "ml", "ml-IN": { c: "₹", d: "dd-MM-yy", n: "൦൧൨൩൪൫൬൭൮൯" }, 1100: "ml-IN", "mn": { c: "₮", d: "yyyy-MM-dd" }, 80: "mn", "mn-Cyrl": { c: "₮", d: "yyyy-MM-dd" }, 30800: "mn-Cyrl", "mn-MN": { c: "₮", d: "yyyy-MM-dd" }, 1104: "mn-MN", "mn-Mong": { c: "¥", d: "yyyy/M/d" }, 31824: "mn-Mong", "mn-Mong-CN": { c: "¥", d: "yyyy/M/d" }, 2128: "mn-Mong-CN", "mn-Mong-MN": { c: "₮", d: "yyyy/M/d" }, 3152: "mn-Mong-MN", "moh": { c: "$", d: "M/d/yyyy" }, 124: "moh", "moh-CA": { c: "$", d: "M/d/yyyy" }, 1148: "moh-CA", "mr": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 78: "mr", "mr-IN": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 1102: "mr-IN", "ms": { c: "RM", d: "dd/MM/yyyy" }, 62: "ms", "ms-BN": { c: "$", d: "dd/MM/yyyy" }, 2110: "ms-BN", "ms-MY": { c: "RM", d: "dd/MM/yyyy" }, 1086: "ms-MY", "mt": { c: "€", d: "dd/MM/yyyy" }, 58: "mt", "mt-MT": { c: "€", d: "dd/MM/yyyy" }, 1082: "mt-MT", "my": { c: "K", d: "dd-MM-yyyy", n: "၀၁၂၃၄၅၆၇၈၉" }, 85: "my", "my-MM": { c: "K", d: "dd-MM-yyyy", n: "၀၁၂၃၄၅၆၇၈၉" }, 1109: "my-MM", "nb": { c: "kr", d: "dd.MM.yyyy" }, 31764: "nb", "nb-NO": { c: "kr", d: "dd.MM.yyyy" }, 1044: "nb-NO", "ne": { c: "रु", d: "M/d/yyyy", n: "०१२३४५६७८९" }, 97: "ne", "ne-IN": { c: "₹", d: "yyyy-MM-dd", n: "०१२३४५६७८९" }, 2145: "ne-IN", "ne-NP": { c: "रु", d: "M/d/yyyy", n: "०१२३४५६७८९" }, 1121: "ne-NP", "nl": { c: "€", d: "d-M-yyyy" }, 19: "nl", "nl-BE": { c: "€", d: "d/MM/yyyy" }, 2067: "nl-BE", "nl-NL": { c: "€", d: "d-M-yyyy" }, 1043: "nl-NL", "nn": { c: "kr", d: "dd.MM.yyyy" }, 30740: "nn", "nn-NO": { c: "kr", d: "dd.MM.yyyy" }, 2068: "nn-NO", "no": { c: "kr", d: "dd.MM.yyyy" }, 20: "no", "nqo": { c: "ߖߕ.", d: "dd/MM/yyyy", n: "߀߁߂߃߄߅߆߇߈߉" }, "nqo-GN": { c: "ߖߕ.", d: "dd/MM/yyyy", n: "߀߁߂߃߄߅߆߇߈߉" }, "nso": { c: "R", d: "dd/MM/yy" }, 108: "nso", "nso-ZA": { c: "R", d: "dd/MM/yy" }, 1132: "nso-ZA", "oc": { c: "€", d: "dd/MM/yyyy" }, 130: "oc", "oc-FR": { c: "€", d: "dd/MM/yyyy" }, 1154: "oc-FR", "om": { c: "Br", d: "dd/MM/yy" }, 114: "om", "om-ET": { c: "Br", d: "dd/MM/yy" }, 1138: "om-ET", "or": { c: "₹", d: "dd-MM-yy", n: "୦୧୨୩୪୫୬୭୮୯" }, 72: "or", "or-IN": { c: "₹", d: "dd-MM-yy", n: "୦୧୨୩୪୫୬୭୮୯" }, 1096: "or-IN", "pa": { c: "₹", d: "dd-MM-yy", n: "੦੧੨੩੪੫੬੭੮੯" }, 70: "pa", "pa-Arab": { c: "Rs", d: "dd-MM-yy", n: "۰۱۲۳۴۵۶۷۸۹" }, 31814: "pa-Arab", "pa-Arab-PK": { c: "Rs", d: "dd-MM-yy", n: "۰۱۲۳۴۵۶۷۸۹" }, 2118: "pa-Arab-PK", "pa-IN": { c: "₹", d: "dd-MM-yy", n: "੦੧੨੩੪੫੬੭੮੯" }, 1094: "pa-IN", "pl": { c: "zł", d: "yyyy-MM-dd" }, 21: "pl", "pl-PL": { c: "zł", d: "yyyy-MM-dd" }, 1045: "pl-PL", "prs": { c: "؋", d: "yyyy/M/d", n: "٠١٢٣٤٥٦٧٨٩" }, 140: "prs", "prs-AF": { c: "؋", d: "yyyy/M/d", n: "٠١٢٣٤٥٦٧٨٩" }, 1164: "prs-AF", "ps": { c: "؋", d: "yyyy/M/d", n: "٠١٢٣٤٥٦٧٨٩" }, 99: "ps", "ps-AF": { c: "؋", d: "yyyy/M/d", n: "٠١٢٣٤٥٦٧٨٩" }, 1123: "ps-AF", "pt": { c: "R$", d: "dd/MM/yyyy" }, 22: "pt", "pt-AO": { c: "Kz", d: "dd/MM/yy" }, "pt-BR": { c: "R$", d: "dd/MM/yyyy" }, 1046: "pt-BR", "pt-PT": { c: "€", d: "dd/MM/yyyy" }, 2070: "pt-PT", "qut": { c: "Q", d: "dd/MM/yyyy" }, 134: "qut", "qut-GT": { c: "Q", d: "dd/MM/yyyy" }, 1158: "qut-GT", "quz": { c: "Bs.", d: "dd/MM/yyyy" }, 107: "quz", "quz-BO": { c: "Bs.", d: "dd/MM/yyyy" }, 1131: "quz-BO", "quz-EC": { c: "$", d: "dd/MM/yyyy" }, 2155: "quz-EC", "quz-PE": { c: "S/.", d: "dd/MM/yyyy" }, 3179: "quz-PE", "rm": { c: "fr.", d: "dd-MM-yyyy" }, 23: "rm", "rm-CH": { c: "fr.", d: "dd-MM-yyyy" }, 1047: "rm-CH", "ro": { c: "lei", d: "dd.MM.yyyy" }, 24: "ro", "ro-MD": { c: "L", d: "dd.MM.yyyy" }, 2072: "ro-MD", "ro-RO": { c: "lei", d: "dd.MM.yyyy" }, 1048: "ro-RO", "ru": { c: "₽", d: "dd.MM.yyyy" }, 25: "ru", "ru-RU": { c: "₽", d: "dd.MM.yyyy" }, 1049: "ru-RU", "rw": { c: "RWF", d: "d/MM/yyyy" }, 135: "rw", "rw-RW": { c: "RWF", d: "d/MM/yyyy" }, 1159: "rw-RW", "sa": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 79: "sa", "sah": { c: "₽", d: "dd.MM.yyyy" }, 133: "sah", "sah-RU": { c: "₽", d: "dd.MM.yyyy" }, 1157: "sah-RU", "sa-IN": { c: "₹", d: "dd-MM-yyyy", n: "०१२३४५६७८९" }, 1103: "sa-IN", "sd": { c: "Rs", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 89: "sd", "sd-Arab": { c: "Rs", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 31833: "sd-Arab", "sd-Arab-PK": { c: "Rs", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 2137: "sd-Arab-PK", "se": { c: "kr", d: "dd.MM.yyyy" }, 59: "se", "se-FI": { c: "€", d: "d.M.yyyy" }, 3131: "se-FI", "se-NO": { c: "kr", d: "dd.MM.yyyy" }, 1083: "se-NO", "se-SE": { c: "kr", d: "yyyy-MM-dd" }, 2107: "se-SE", "si": { c: "රු.", d: "yyyy-MM-dd" }, 91: "si", "si-LK": { c: "රු.", d: "yyyy-MM-dd" }, 1115: "si-LK", "sk": { c: "EUR", d: "d.M.yyyy" }, 27: "sk", "sk-SK": { c: "EUR", d: "d.M.yyyy" }, 1051: "sk-SK", "sl": { c: "€", d: "d.M.yyyy" }, 36: "sl", "sl-SI": { c: "€", d: "d.M.yyyy" }, 1060: "sl-SI", "sma": { c: "kr", d: "yyyy-MM-dd" }, 30779: "sma", "sma-NO": { c: "kr", d: "dd.MM.yyyy" }, 6203: "sma-NO", "sma-SE": { c: "kr", d: "yyyy-MM-dd" }, 7227: "sma-SE", "smj": { c: "kr", d: "yyyy-MM-dd" }, 31803: "smj", "smj-NO": { c: "kr", d: "dd.MM.yyyy" }, 4155: "smj-NO", "smj-SE": { c: "kr", d: "yyyy-MM-dd" }, 5179: "smj-SE", "smn": { c: "€", d: "d.M.yyyy" }, 28731: "smn", "smn-FI": { c: "€", d: "d.M.yyyy" }, 9275: "smn-FI", "sms": { c: "€", d: "d.M.yyyy" }, 29755: "sms", "sms-FI": { c: "€", d: "d.M.yyyy" }, 8251: "sms-FI", "sn": { c: "US$", d: "dd/MM/yyyy" }, "sn-Latn": { c: "US$", d: "dd/MM/yyyy" }, "sn-Latn-ZW": { c: "US$", d: "dd/MM/yyyy" }, "so": { c: "S", d: "dd/MM/yy" }, 119: "so", "so-SO": { c: "S", d: "dd/MM/yy" }, 1143: "so-SO", "sq": { c: "Lek", d: "d.M.yyyy" }, 28: "sq", "sq-AL": { c: "Lek", d: "d.M.yyyy" }, 1052: "sq-AL", "sr": { c: "din.", d: "d.M.yyyy." }, 31770: "sr", "sr-Cyrl": { c: "дин.", d: "d.M.yyyy." }, 27674: "sr-Cyrl", "sr-Cyrl-BA": { c: "КМ", d: "d.M.yyyy." }, 7194: "sr-Cyrl-BA", "sr-Cyrl-CS": { c: "дин.", d: "d.M.yyyy." }, 3098: "sr-Cyrl-CS", "sr-Cyrl-ME": { c: "€", d: "d.M.yyyy." }, 12314: "sr-Cyrl-ME", "sr-Cyrl-RS": { c: "дин.", d: "d.M.yyyy." }, 10266: "sr-Cyrl-RS", "sr-Latn": { c: "din.", d: "d.M.yyyy." }, 28698: "sr-Latn", "sr-Latn-BA": { c: "KM", d: "d.M.yyyy." }, 6170: "sr-Latn-BA", "sr-Latn-CS": { c: "din.", d: "d.M.yyyy." }, 2074: "sr-Latn-CS", "sr-Latn-ME": { c: "€", d: "d.M.yyyy." }, 11290: "sr-Latn-ME", "sr-Latn-RS": { c: "din.", d: "d.M.yyyy." }, 9242: "sr-Latn-RS", "st": { c: "R", d: "yyyy-MM-dd" }, 48: "st", "st-ZA": { c: "R", d: "yyyy-MM-dd" }, 1072: "st-ZA", "sv": { c: "kr", d: "yyyy-MM-dd" }, 29: "sv", "sv-FI": { c: "€", d: "d.M.yyyy" }, 2077: "sv-FI", "sv-SE": { c: "kr", d: "yyyy-MM-dd" }, 1053: "sv-SE", "sw": { c: "KSh", d: "M/d/yyyy" }, 65: "sw", "sw-KE": { c: "KSh", d: "M/d/yyyy" }, 1089: "sw-KE", "syr": { c: "ܠ.ܣ.‏", d: "dd/MM/yyyy" }, 90: "syr", "syr-SY": { c: "ܠ.ܣ.‏", d: "dd/MM/yyyy" }, 1114: "syr-SY", "ta": { c: "₹", d: "dd-MM-yyyy", n: "௦௧௨௩௪௫௬௭௮௯" }, 73: "ta", "ta-IN": { c: "₹", d: "dd-MM-yyyy", n: "௦௧௨௩௪௫௬௭௮௯" }, 1097: "ta-IN", "ta-LK": { c: "Rs", d: "dd-MM-yyyy", n: "௦௧௨௩௪௫௬௭௮௯" }, 2121: "ta-LK", "te": { c: "₹", d: "dd-MM-yy", n: "౦౧౨౩౪౫౬౭౮౯" }, 74: "te", "te-IN": { c: "₹", d: "dd-MM-yy", n: "౦౧౨౩౪౫౬౭౮౯" }, 1098: "te-IN", "tg": { c: "смн", d: "dd.MM.yyyy" }, 40: "tg", "tg-Cyrl": { c: "смн", d: "dd.MM.yyyy" }, 31784: "tg-Cyrl", "tg-Cyrl-TJ": { c: "смн", d: "dd.MM.yyyy" }, 1064: "tg-Cyrl-TJ", "th": { c: "฿", d: "d/M/yyyy", n: "๐๑๒๓๔๕๖๗๘๙" }, 30: "th", "th-TH": { c: "฿", d: "d/M/yyyy", n: "๐๑๒๓๔๕๖๗๘๙" }, 1054: "th-TH", "ti": { c: "ERN", d: "d/M/yyyy" }, 115: "ti", "ti-ER": { c: "ERN", d: "d/M/yyyy" }, 2163: "ti-ER", "ti-ET": { c: "ብር", d: "d/M/yyyy" }, 1139: "ti-ET", "tk": { c: "m.", d: "dd.MM.yy \"ý.\"" }, 66: "tk", "tk-TM": { c: "m.", d: "dd.MM.yy \"ý.\"" }, 1090: "tk-TM", "tn": { c: "R", d: "dd/MM/yy" }, 50: "tn", "tn-BW": { c: "P", d: "dd/MM/yy" }, 2098: "tn-BW", "tn-ZA": { c: "R", d: "dd/MM/yy" }, 1074: "tn-ZA", "tr": { c: "₺", d: "d.M.yyyy" }, 31: "tr", "tr-TR": { c: "₺", d: "d.M.yyyy" }, 1055: "tr-TR", "ts": { c: "R", d: "yyyy-MM-dd" }, 49: "ts", "ts-ZA": { c: "R", d: "yyyy-MM-dd" }, 1073: "ts-ZA", "tt": { c: "₽", d: "dd.MM.yyyy" }, 68: "tt", "tt-RU": { c: "₽", d: "dd.MM.yyyy" }, 1092: "tt-RU", "tzm": { c: "DA", d: "dd-MM-yyyy" }, 95: "tzm", "tzm-Latn": { c: "DA", d: "dd-MM-yyyy" }, 31839: "tzm-Latn", "tzm-Latn-DZ": { c: "DA", d: "dd-MM-yyyy" }, 2143: "tzm-Latn-DZ", "tzm-Tfng": { c: "ⴷⵔ", d: "dd-MM-yyyy" }, 30815: "tzm-Tfng", "tzm-Tfng-MA": { c: "ⴷⵔ", d: "dd-MM-yyyy" }, 4191: "tzm-Tfng-MA", "ug": { c: "¥", d: "yyyy-M-d" }, 128: "ug", "ug-CN": { c: "¥", d: "yyyy-M-d" }, 1152: "ug-CN", "uk": { c: "₴", d: "dd.MM.yyyy" }, 34: "uk", "uk-UA": { c: "₴", d: "dd.MM.yyyy" }, 1058: "uk-UA", "ur": { c: "Rs", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 32: "ur", "ur-IN": { c: "₹", d: "d/M/yy", n: "۰۱۲۳۴۵۶۷۸۹" }, 2080: "ur-IN", "ur-PK": { c: "Rs", d: "dd/MM/yyyy", n: "۰۱۲۳۴۵۶۷۸۹" }, 1056: "ur-PK", "uz": { c: "so\"m", d: "dd.MM.yyyy" }, 67: "uz", "uz-Cyrl": { c: "сўм", d: "dd.MM.yyyy" }, 30787: "uz-Cyrl", "uz-Cyrl-UZ": { c: "сўм", d: "dd.MM.yyyy" }, 2115: "uz-Cyrl-UZ", "uz-Latn": { c: "so\"m", d: "dd.MM.yyyy" }, 31811: "uz-Latn", "uz-Latn-UZ": { c: "so\"m", d: "dd.MM.yyyy" }, 1091: "uz-Latn-UZ", "vi": { c: "₫", d: "dd/MM/yyyy" }, 42: "vi", "vi-VN": { c: "₫", d: "dd/MM/yyyy" }, 1066: "vi-VN", "wo": { c: "CFA", d: "dd/MM/yyyy" }, 136: "wo", "wo-SN": { c: "CFA", d: "dd/MM/yyyy" }, 1160: "wo-SN", "xh": { c: "R", d: "yyyy/MM/dd" }, 52: "xh", "xh-ZA": { c: "R", d: "yyyy/MM/dd" }, 1076: "xh-ZA", "yo": { c: "₦", d: "d/M/yyyy" }, 106: "yo", "yo-NG": { c: "₦", d: "d/M/yyyy" }, 1130: "yo-NG", "zgh": { c: "ⴷⵔⵎ", d: "dd-MM-yyyy" }, "zgh-Tfng": { c: "ⴷⵔⵎ", d: "dd-MM-yyyy" }, "zgh-Tfng-MA": { c: "ⴷⵔⵎ", d: "dd-MM-yyyy" }, "zh": { c: "¥", d: "yyyy/M/d" }, 30724: "zh", "zh-CHS": { c: "¥", d: "yyyy/M/d" }, 4: "zh-CHS", "zh-CHT": { c: "HK$", d: "d/M/yyyy" }, 31748: "zh-CHT", "zh-CN": { c: "¥", d: "yyyy/M/d" }, 2052: "zh-CN", "zh-Hans": { c: "¥", d: "yyyy/M/d" }, "zh-Hant": { c: "HK$", d: "d/M/yyyy" }, "zh-HK": { c: "HK$", d: "d/M/yyyy" }, 3076: "zh-HK", "zh-MO": { c: "MOP", d: "d/M/yyyy" }, 5124: "zh-MO", "zh-SG": { c: "$", d: "d/M/yyyy" }, 4100: "zh-SG", "zh-TW": { c: "NT$", d: "yyyy/M/d" }, 1028: "zh-TW", "zu": { c: "R", d: "dd-MM-yyyy" }, 53: "zu", "zu-ZA": { c: "R", d: "dd-MM-yyyy" }, 1077: "zu-ZA" };
	/*jshint +W100 */

	// jscs:enable
	$.ig.CultureInfo = Class.extend({
		_name: null,
		_isInvariant: false,
		init: function (name) {
			this._name = name;
		},
		clone: function () {
			var copy = new $.ig.CultureInfo(this._name);
			for (var attr in this) {
				if (this.hasOwnProperty(attr)) {
					copy[ attr ] = this[ attr ];
				}
			}

			if (copy._dateTimeFormat) {
				copy._dateTimeFormat = copy._dateTimeFormat.clone();
			}

			if (copy._numberFormat) {
				copy._numberFormat = copy._numberFormat.clone();
			}

			return copy;
		},
		compareInfo: function () {

			// TODO:
			return new $.ig.CompareInfo();
		},
		getFormat: function ($t) {
			if ($t === $.ig.NumberFormatInfo.prototype.$type) {
				return this.numberFormat();
			}

			if ($t === $.ig.DateTimeFormat.prototype.$type) {
				return this.dateTimeFormat();
			}

			throw new Error("Unknown format type");
		},
		name: function () {
			return this._name;
		},
		calendar: function () {

			// TODO
			return new $.ig.Calendar();
		},
		dateTimeFormat: function (value) {
			if (arguments.length === 1) {
				this._dateTimeFormat = value;
			}

			if (!this._dateTimeFormat) {
				this._dateTimeFormat = new $.ig.DateTimeFormat(this._name, this._isInvariant);
			}

			return this._dateTimeFormat;
		},
		numberFormat: function (value) {
			if (arguments.length === 1) {
				this._numberFormat = value;
			}

			if (!this._numberFormat) {
				this._numberFormat = new $.ig.NumberFormatInfo(this._name, this._isInvariant);
			}

			return this._numberFormat;
		},
		twoLetterISOLanguageName: function () {
			if (this._name.length > 2 && this._name[ 2 ] == "-") {
				return this._name.substr(0, 2);
			}

			// TODO
			return "";
		},
		getCultureInfo: function (lcid) {
			var name = globalInfo[ lcid ];
			if (name) {
				if (name === "invariant") {
					return $.ig.CultureInfo.prototype.invariantCulture();
				}

				return new $.ig.CultureInfo(name);
			}

			// TODO: throw error here?
			return $.ig.CultureInfo.prototype.invariantCulture();
		},
		$type: new $.ig.Type("CultureInfo", $.ig.Object.prototype.$type)
	}, true);

	$.ig.CultureInfo.prototype.currentCulture = function () {
		return $.ig.Thread.prototype.currentThread().currentCulture();
	};

	$.ig.CultureInfo.prototype.invariantCulture = function () {
		if (this._cachedInvariant) {
			return this._cachedInvariant;
		}

		// TODO: Make a true invariant culture
		/*jshint -W093 */
		this._cachedInvariant = new $.ig.CultureInfo("en-US");
		this._cachedInvariant._isInvariant = true;
		return this._cachedInvariant;
	};

	$.ig.util.defType("Thread", "Object", {
		init: function () {
		},
		currentThread: function () {
			if (!this._currentThread) {
				this._currentThread = new $.ig.Thread();
			}

			return this._currentThread;
		},
		currentCulture: function (value) {
			if (arguments.length === 1) {
				this._currentCulture = value;
			}

			if (!this._currentCulture) {
				var currentLocale = navigator.language || navigator.userLanguage;
				this._currentCulture = new $.ig.CultureInfo(currentLocale);
			}

			return this._currentCulture;
		},
		$type: new $.ig.Type("Thread", $.ig.Object.prototype.$type)
	}, true);

	$.ig.NumberFormatInfo = Class.extend({
		init: function (cultureName, isInvariant) {
			this._cultureName = cultureName;
			this._isInvariant = isInvariant;
		},
		clone: function () {
			var copy = new $.ig.NumberFormatInfo(this._cultureName, this._isInvariant);
			for (var attr in this) {
				if (this.hasOwnProperty(attr)) {
					copy[ attr ] = this[ attr ];
				}
			}

			return copy;
		},
		currencySymbol: function (value) {
			if (arguments.length === 1) {
				this._currencySymbol = value;
			}

			if (!this._currencySymbol) {
				var g = globalInfo[ this._isInvariant ? "invariant" : this._cultureName ];
				if (g) {
					this._currencySymbol = g.c;
				} else {
					this._currencySymbol = "$";
				}
			}

			return this._currencySymbol;
		},
		nativeDigits: function () {
			if (!this._nativeDigits) {
				var g = globalInfo[ this._isInvariant ? "invariant" : this._cultureName ];
				if (g && g.n) {
					this._nativeDigits = g.n;
				} else {
					this._nativeDigits = "0123456789";
				}
			}

			return this._nativeDigits;
		},
		negativeSign: function (value) {

			if (arguments.length === 1) {
				this._negativeSign = value;
			}

			if (!this._negativeSign) {
				this._negativeSign = "-";
			}

			return this._negativeSign;
		},
		percentSymbol: function (value) {
			if (arguments.length === 1) {
				this._percentSymbol = value;
			}

			if (!this._percentSymbol) {
				var temp = (1).toLocaleString(this._cultureName, { style: "percent" });
				this._percentSymbol = temp[ temp.length - 1 ];
			}

			return this._percentSymbol;
		},
		positiveSign: function (value) {
			if (arguments.length === 1) {
				this._positiveSign = value;
			}

			if (!this._positiveSign) {
				this._positiveSign = "+";
			}

			return this._positiveSign;
		},
		numberDecimalSeparator: function (value) {

			if (arguments.length === 1) {
				this._numberDecimalSeparator = value;
			}

			if (!this._numberDecimalSeparator) {
				this._numberDecimalSeparator = (1.1).toLocaleString(this._cultureName)
					.substring(1, 2);
			}

			return this._numberDecimalSeparator;
		},
		numberGroupSeparator: function (value) {
			if (arguments.length === 1) {
				this._numberGroupSeparator = value;
			}

			if (!this._numberGroupSeparator) {
				var s = (123456789.0).toLocaleString(this._cultureName);
				var result = /\D/.exec(s);
				if (result === null || result.length === 0) {
					this._numberGroupSeparator = ",";
				} else {
					this._numberGroupSeparator = result[ 0 ];
				}
			}

			return this._numberGroupSeparator;
		},
		numberGroupSizes: function (value) {
			if (arguments.length === 1) {
				this._numberGroupSizes = value;
			}

			if (!this._numberGroupSizes) {
				var s = (123456789.0).toLocaleString(this._cultureName);
				var result = /\D(\d+)\D/.exec(s);

				if (result === null || result.length === 0) {
					this._numberGroupSizes = [ 3 ];
				} else {
					this._numberGroupSizes = [ result[ 1 ].length ];
				}
			}

			return this._numberGroupSizes;
		},
		$type: new $.ig.Type("NumberFormatInfo", $.ig.Object.prototype.$type) // TODO: Define and add IFormatProvider interface here
	}, true);

    $.ig.DateTimeFormat = Class.extend({
		init: function (cultureName, isInvariant) {
			this._cultureName = cultureName;
			this._isInvariant = isInvariant;
		},
		clone: function () {
			var copy = new $.ig.DateTimeFormat(this._cultureName, this._isInvariant);
			for (var attr in this) {
				if (this.hasOwnProperty(attr)) {
					copy[ attr ] = this[ attr ];
				}
			}

			return copy;
		},
		dateSeparator: function (value) {
			if (arguments.length === 1) {
				this._dateSeparator = value;
			}

			if (!this._dateSeparator) {
				this._dateSeparator = "/"; // TODO: Get this based on the culture somehow
			}

			return this._dateSeparator;
		},
		timeSeparator: function (value) {
			if (arguments.length === 1) {
				this._timeSeparator = value;
			}

			if (!this._timeSeparator) {
				this._timeSeparator = ":"; // TODO: Get this based on the culture somehow
			}

			return this._timeSeparator;
		},
		longDatePattern: function (value) {
			if (arguments.length === 1) {
				this._longDatePattern = value;
			}

			if (!this._longDatePattern) {
				this._longDatePattern = "dddd, MMMM d, yyyy"; // TODO: Get this based on the culture somehow
			}

			return this._longDatePattern;
		},
		shortDatePattern: function (value) {
			if (arguments.length === 1) {
				this._shortDatePattern = value;
			}

			if (!this._shortDatePattern) {
				var g = globalInfo[ this._isInvariant ? "invariant" : this._cultureName ];
				if (g) {
					this._shortDatePattern = g.d;
				} else {
					this._shortDatePattern = "M/d/yyyy";
				}
			}

			return this._shortDatePattern;
		},
		shortTimePattern: function (value) {

			if (arguments.length === 1) {
				this._shortTimePattern = value;
			}

			if (!this._shortTimePattern) {
				this._shortTimePattern = "h:mm tt"; // TODO: Get this based on the culture somehow
			}

			return this._shortTimePattern;
		},
		$type: new $.ig.Type("DateTimeFormat", $.ig.Object.prototype.$type) // TODO: Define and add IFormatProvider interface here
	}, true);

export { igRoot };
