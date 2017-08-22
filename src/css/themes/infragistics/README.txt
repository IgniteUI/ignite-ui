===========================
jQuery UI framework Themes
===========================


==== THEMES ====

*** jqueryui/themes/ ***
Contain all theme related to jQuery UI framework

- jQuery UI Themes:
1. infragistics
2. infragistics2012
3. ios
4. metro(default)



*** jquery/themes/[Theme name] ***

themes/[Theme name]/images - Contain all images related to the theme (This will be removed after we implement the web font in each theme)

themes/[Theme name]/infragistics.theme.less - The root file which import all partial.

themes/[Theme name]/infragistics-ignite-ui-controls - Contain all theme styles related to ignite ui controls

themes/[Theme name]/jquery-ui-overrides.less -  Contain all styles, that are needed, in order to make ignite UI component's to work properly witch jQueryUI components.

themes/[Theme name]/variables.less - Contain all bootstrap theme variables.

themes/[Theme name]/ignite-ui-variables.less - Contain all variables related to Ignite UI components

themes/[Theme name]/mixins.less - Contain all mixins related to Ignite UI components


NOTE: the root file "infragistics-theme-less" is the only file that needs to be compiled to .CSS

NOTE: File "@import" order inside "infragistics.theme.less" is important! In order the theme to work correctly.



==== ICONS WEB FONT ====

*** css/structure/fonts ***
hold all files related to icons web font

- in order ot add/remove/change icons form the web font.
1. Go to icomoon.io/app/ and upload the file "jqurey-ui.svg" located in: C css/structure/fonts
2. Make the desired modification, download and replace the changed font.

IMPORTANT
Note: in order the font to work you need to specify the prefix for the icons clsss. In "icomoon.io", font settings the prefix
should be "ui-icon-". We change the prefix in order to prevent conflicts with class names.

Note: Keep the name for the font the same in order to override the existing font
