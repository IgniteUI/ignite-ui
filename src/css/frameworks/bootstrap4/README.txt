===================
Bootstrap 4 framework
===================


==== SHARED STYLES ====

*** bootstrap4/_shared-styles/less ***
This folder contain shared .SCSS styles between all bootstrap4 related themes, those files are important for all bootstrap4 themes

less/icons-styles.less - Contain all style for webfont icons

less/jquery-ui-structure.less -  Contain all structure styles for jQuery UI components

less/jquery-ui-theme.less -  Contain all theme styles for jQuery UI components

less/jquery-ui-overrides.less -  Contain all styles, that are needed, in order to make ignite UI component's to work properly witch jQueryUI components.


==== THEMES ====

*** bootstrap4/themes/ ***
Contain all theme related to Bootstrap 4 framework

- Bootstrap 4 Themes:
1. default



*** bootstrap4/themes/[Theme name] ***

themes/[Theme name]/images - Contain all images related to the theme (This will be removed after we implement the web font in each theme)

themes/[Theme name]/infragistics.theme.less - This is the root file which import all partial files to form the theme

themes/[Theme name]/infragistics-ignite-ui-controls - Contain all theme styles related to ignite ui controls

themes/[Theme name]/jquery-ui-theme.less -  Contain all theme styles for jQuery UI components

themes/[Theme name]/jquery-ui-overrides.less -  Contain all styles, that are needed, in order to make ignite UI component's to work properly witch jQueryUI components.

themes/[Theme name]/variables.less - contain all variables related to Ignite UI components

themes/[Theme name]/mixins.less - contain all mixins related to Ignite UI components


NOTE: the root file "infragistics-theme-less" is the only file that needs to be compiled to .CSS
NOTE: The order for the imported files inside "infragistics.theme.less" is important! In order the theme to work correctly.



==== STYLE GUIDES ====

*** bootstrap4/style-guides ***
This folder holds the style guides for all jQuery UI related themes

- how to change the style guide to much the theme you are using
1. Go to "style-guide/style-guide.less"
2. Change the path "../[theme-name]/variables" with the pat for your theme variables.

Example: if you are using "SUPERHERO" theme you need to change the path to "../superhero/variables"



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
