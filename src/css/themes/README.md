
Infragistics Themes
=====================


1. infragistics - Default
2. infragistics - 2012
3. Metro
4. IOS



### Themes - file structure


* **images** - Contain all images related to the theme

* **infragistics.theme.less** - The root file which import all partial files.

* **Modules** - Contain all theme styles related to Ignite UI for jQuery modules.

* **Styles-guide** - In progress theme style guide

* **framework.less** -  Contain all styles, that are needed, in order to make Ignite UI for jQuery component's to work properly witch jQueryUI components.

* **variables.less** - Theme variables.
 
* **mixins.less** - Contain all mixins related to Ignite UI for jQuery components


**Note:** the root file "infragistics-theme-less" is the only file that needs to be compiled to .CSS


### File order:

```diff
// Ignite UI for jQuery Theme variables
@import "variables.less";

// Ignite UI for jQuery Mixins
@import "mixins.less";

// Font styles
@import (css)"icons-styles.css";

// JQuery UI Theme
@import "framework.less";

//Ignite UI for jQuery modules
@import "modules/modules";
```

**Note:** File order is important in order the theme to work correctly.




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