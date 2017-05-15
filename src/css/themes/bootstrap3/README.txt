
The Bootstrap-based theme is compiled from the main theme file (infragistics.theme.less) 
and the file includes references to a number of other LESS files which provide values 
and rules which make up the theme.

************************************************************************
  Files which are referenced by the main theme file and their purpose:
************************************************************************

 variables.less
-----------------------------------
When creating a comprehensive Bootstrap-based theme, the variables.less file includes not 
only the style rules which relate to Ignite UI controls, but also the rest of the style 
rules required to create a Bootstrap theme.

 variables-igniteui.less
-----------------------------------
When creating a Bootstrap-based theme, the variables-igniteui.less file includes the 
style rules which exclusively related to Ignite UI controls in the context of a Bootstrap 
theme.

 *****
    Note: If you are using variables.less you do not need to use variables-igniteui.less.
 *****

 framework.less
-----------------------------------
jQuery UI controls require special attention when being styled with a Bootstrap theme. 
As Ignite UI controls are jQuery UI widgets, the framework.less file includes the 
jQuery UI-specific style rules required to style Ignite UI controls in a Bootstrap-based 
theme.


 infragistics.jqueryui.theme.less
-----------------------------------
The infragistics.jqueryui.theme.less file includes all the style rules relevant to 
styling jQuery UI widgets in the theme.


 infragistics.igniteui.theme.less
-----------------------------------
The infragistics.igniteui.theme.less file includes all the style rules relevant to 
styling Ignite UI controls in the theme.
