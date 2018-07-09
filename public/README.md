# Readme

目前資料夾的結構安排是按照[這個網站的建議](http://appcropolis.com/blog/web-technology/organize-html-css-javascript-files/):

+ index.html : 首頁 
+ 404.html :  連結錯誤時所顯示的網頁
+ howto.html :  如何成為標注者的網頁
+ labeling-tool.html :  標注工具的網頁
+ tutorial.html :  標注工具的使用教學
+ resources : 用來存放自己寫的資源，包含 js 或 css style 檔
  + css :  放CSS style 的資料夾，網頁所屬的 css file 可在對應名稱的資料夾找到
    + global.css: 用來放所有頁面都會用到的 navbar, footer, 字形等設定
  + js :  放JS lib 的資料夾，網頁所屬的 js file 可在對應名稱的資料夾找到
    + firebase_initializer.js: 用來初始化 firebase instance，所有用到 firebase功能的網頁都要先呼叫這個 js 檔。
+ vendors:  用來存放外部或他人提供的 library，目前只有放 file-saver 
  + file-saver : 能將 json data 儲存成檔案的 [library](https://github.com/eligrey/FileSaver.js/)
