
Infragistics Themes
=====================


1. Default
2. infragistics - 2012
3. Metro
4. IOS



### Themes - file structure


* **images** - Contain all images related to the theme (This will be removed after we implement the web font in each theme)
 
* **infragistics.theme.less** - The root file which import all partial.
 
* **infragistics-ignite-ui-controls** - Contain all theme styles related to ignite ui controls
 
* **jquery-ui-overrides.less** -  Contain all styles, that are needed, in order to make ignite UI component's to work properly witch jQueryUI components.
 
* **variables.less** - Contain all theme variables.
 
* **mixins.less** - Contain all mixins related to Ignite UI components


**Note:** the root file "infragistics-theme-less" is the only file that needs to be compiled to .CSS


### File order:

```diff
//Theme variables
@import "variables.less";
 
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

**Note:** File order is important in order the theme to work correctly.




### Icons web font

*** css/structure/fonts ***
hold all files related to icons web font

To add/remove/change icons form the web font:
1. Go to [icomoon.io/app](icomoon.io/app) and upload the file "**jqurey-ui.svg**" located in: css/structure/fonts
2. Make the desired modification, download and replace the changed font.



**IMPORTANT:**
in order the font to work you need to specify the prefix for the icons clsss. In "icomoon.io", font settings. The prefix should be "ui-icon-". Keep the name for the font the same in order to override the existing font.
