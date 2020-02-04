
Bootstrap 3 Themes
=====================


1. Default (Default bootstrap 3 theme)
2. Flatly
3. Yeti
4. superhero

Theme source:
https://bootswatch.com/


### Themes - file structure

* **images** - Contain all images related to the theme
 
* **infragistics.theme.less** - The root file which import all partial files.
 
* **Modules** - Contain all theme styles related to Ignite UI for jQuery modules.

* **Styles-guide** - In progress theme style guide

* **framework.less** -  Contain all styles, that are needed, in order to make Ignite UI for jQuery component's to work properly witch jQueryUI components.
 
* **variables.less** - Theme variables.
 
* **ignite-ui-variables.less** -Theme variables.
 
* **mixins.less** - Contain all mixins related to Ignite UI for jQuery components



**Note:** the root file "infragistics-theme-less" is the only file that needs to be compiled to .CSS


**Note:** The order of File "@import" inside "infragistics.theme.less" is important! In order the theme to work correctly.



### File order:

```diff
// Bootstrap Theme variables
@import "variables.less";

// Ignite UI for jQuery Theme variables
@import "ignite-ui-variables";

// Ignite UI for jQuery Mixins
@import "mixins.less";

//JQuery UI
@import "framework.less";

//Ignite UI for jQuery styles
@import "modules/modules.less";

// Font styles
@import (css)"icons-styles.css";
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
