
ブートストラップ ベースのテーマは主要のテーマ ファイル (infragistics.theme.less) からコンパイルされており、テーマを構成する値およびルールを提供する他の LESS ファイルへの参照を含みます。

  注: このセクションで参照される LESS ファイルは css\themes\bootstrap\LESS にあります。ファイルを使用するにはファイルを LESS フォルダーからコピーし、新しい css\themes\bootstrap フォルダーの兄弟フォルダーに貼り付けてください。

以下は、主要テーマ ファイルが参照する LESS ファイルとその用途です:

***************
  ファイル
***************

 variables.less
-----------------------------------
包括的なブートストラップ ベースのテーマを作成する場合、variables.less ファイルは Ignite UI コントロール関連のスタイル ルールにみならずブートストラップ テーマ作成に必要なすべてのスタイル ルールを含みます。 

注:  variables.less を使用している場合 variables-igniteui.less を使用する必要はありません。


 variables-igniteui.less
-----------------------------------
ブートストラップ ベースのテーマを作成する場合、variables-igniteui.less ファイルはブートストラップ テーマ関係の Ignite UI コントロールに関連するスタイル ルールを含みます。


 framework.less
-----------------------------------
jQuery UI コントロールは、ブートストラップ テーマでスタイル設定する場合に特に注意を要します。Ignite UI コントロールが jQuery UI ウィジェットであるため framework.less ファイルはブートストラップ テーマで Ignite UI コントロールをスタイル変更するのに必要な jQuery UI 固有のスタイル ルールを含みます。


 infragistics.jqueryui.theme.less
-----------------------------------
infragistics.jqueryui.theme.less ファイルはテーマで jQuery UI ウィジェットのスタイル変更に関連するすべてのスタイル ルールを含みます。


 infragistics.igniteui.theme.less
-----------------------------------
infragistics.igniteui.theme.less  ファイルはテーマで Ignite UI コントロールのスタイル変更に関連するすべてのスタイル ルールを含みます。
