Bootstrap 4 用のテーマ
=====================


1. Default (デフォルトの bootstrap 4 テーマ)

### テーマ - ファイル構造

* **images** - テーマに関連するすべての画像を含みます。

* **infragistics.theme.less** - すべての部分ファイルをインポートするルート ファイル。

* **Modules** - Ignite UI for jQuery モジュールに関連するすべてのテーマ スタイルを含みます。

* **Styles-guide** - テーマのスタイル ガイド (作業中)。

* **framework.less** -  Ignite UI for jQuery コンポーネントを jQueryUI コンポーネントと正しく動作させるために必要なスタイルをすべて含みます。

* **variables.less** - テーマ変数。

* **ignite-ui-variables.less** - テーマ変数。

* **mixins.less** - Ignite UI for jQuery コンポーネントに関連するすべての mixins を含みます。


**注:** ルート "infragistics-theme-scss" ファイルは、.CSS にコンパイルするために必要な単一のファイルです。


**注:** "infragistics.theme.less" で File "@import" の順序が重要です。テーマを正しく動作させるために以下の順序に従ってください。



### ファイルの順序:

```diff
// Bootstrap Theme variables
@import "variables";

// Ignite UI for jQuery variables
@import "ignite-ui-variables";

// Ignite UI for jQuery Mixins
@import "mixins";

// Icons fonts
@import "icons-styles.css";

//JQuery UI
@import "framework";

//Ignite UI for jQuery styles
@import "modules/modules";
```


### アイコンの web フォント

*** css/structure/fonts ***
アイコンの web フォントに関連するすべてのファイルを含みます。

web フォントにアイコン フォームを追加/削除/変更:
1. [icomoon.io/app](icomoon.io/app) に移動し、css/structure/fonts の "**jquery-ui.svg**" ファイルをアップロードします。
2. 変更する場合は、ファイルをダウンロードして変更されたフォントを置き換えます。


**重要:**
フォントを正しく動作させるために icons クラスのプレフィックスを指定する必要があります。
"icomoon.io" のフォント設定で、プレフィックスを "ui-icon-" に設定してください。
既存のフォントをオーバーライドするには、フォント名を保持します。
