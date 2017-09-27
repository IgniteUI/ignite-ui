
Bootstrap 3 Themes
=====================


1. Default (Default bootstrap 3 theme)
2. Flatly
3. Yeti
4. superhero



### Themes - file structure


* **images** - Contain all images related to the theme
 
* **infragistics.theme.less** - The root file which import all partial files.
 
* **infragistics-ignite-ui-controls** - Contain all theme styles related to ignite ui controls
 
* **jquery-ui-overrides.less** -  Contain all styles, that are needed, in order to make ignite UI component's to work properly witch jQueryUI components.
 
* **variables.less** - Contain all bootstrap theme variables.
 
* **ignite-ui-variables.less** - Contain all variables related to Ignite UI components
 
* **mixins.less** - Contain all mixins related to Ignite UI components



**Note:** the root file "infragistics-theme-less" is the only file that needs to be compiled to .CSS


**Note:** File "@import" order inside "infragistics.theme.less" is important! In order the theme to work correctly.



### File order:

```diff
//Bootstrap Theme variables
@import "variables.less";
 
//Ignite UI Theme variables
@import "ignite-ui-variables";
 
//Ignite UI mixins
@import "mixins.less";
 
//Icons font
@import (css)"../../../../structure/fonts/style.css";
 
//JQuery UI styles
@import (css)"../../../../structure/jquery-ui.css";
 
//JQuery UI Overrides
@import "jquery-ui-overrides.less";
 
//Ignite UI styles
@import "infragistics-ignite-ui-controls.less";
 
//Font styles
@import (css)"../../../../structure/icons-styles.css";
 
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
in order the font to work you need to specify the prefix for the icons clsss. 
In "icomoon.io", font settings. The prefix should be "ui-icon-".
Keep the name for the font the same in order to override the existing font.
