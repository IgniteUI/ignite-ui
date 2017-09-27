
Bootstrap 4 Themes
=====================


1. Default (Default bootstrap 4 theme)




### Themes - file structure


* **/images** - Contain all images related to the theme (This will be removed after we implement the web font in each theme)
 
* **infragistics.theme.scss** - The root file which import all partial.
 
* **infragistics-ignite-ui-controls.scss** - Contain all theme styles related to ignite ui controls
 
* **jquery-ui-overrides.scss** -  Contain all styles, that are needed, in order to make ignite UI component's to work properly witch jQueryUI components.
 
* **variables.scss** - Contain all bootstrap theme variables.
 
* **ignite-ui-variables.scss** - Contain all variables related to Ignite UI components
 
* **mixins.scss** - Contain all mixins related to Ignite UI components



**Note:** the root file "infragistics-theme-scss" is the only file that needs to be compiled to .CSS


**Note:** File "@import" order inside "infragistics.theme.less" is important! In order the theme to work correctly.



### File order:

```diff
//Bootstrap Theme variables
@import "variables";
 
//Ignite UI Theme variables
@import "ignite-ui-variables";
 
//Ignite UI mixins
@import "mixins";
 
//Icons font
@import "../../../../structure/fonts/style.css";
 
//JQuery UI styles
@import "../../../../structure/jquery-ui.css";
 
//UI Theme Overrides
@import "jquery-ui-overrides";
 
//Ignite UI styles
@import "infragistics-ignite-ui-controls";
 
//Font styles
@import "../../../../structure/icons-styles.css";
 
//Use this file to override all infragistics & jQuery styles
@import "overrides";
```


### Icons web font

*** css/structure/fonts ***
hold all files related to icons web font

To add/remove/change icons form the web font:
1. Go to [icomoon.io/app](icomoon.io/app) and upload the file "**jqurey-ui.svg**" located in: css/structure/fonts
2. Make the desired modification, download and replace the changed font.



**IMPORTANT:**
in order the font to work you need to specify the prefix for the icons clsss. In "icomoon.io", font settings. The prefix should be "ui-icon-". Keep the name for the font the same in order to override the existing font.
