# README

這邊因為寫得比較匆忙，所以程式結構沒有安排的很好，不過功能少，不至於太難後續維護。

+ **index.js**: 宣告所有後台監聽或等待使用者觸發的功能，有些功能的實作寫在 checker.js、email.js 裡面
+ **checker.js**: 評估使用者上傳分數的實作檔
+ **email.js**: 寄信功能的實作檔
+ **data**: 存放 data 的資料夾
    + **raw**: 放待標註的檔案，三份標註測試檔目前放在這裡
    + **answers**: 放標註檔解答的資料夾，三份標註測試檔的參考解答目前放在這裡
+ **node_modules**: npm library 安裝位置
+ **abstractlabeling-firebase-adminsdk-mo3e5-db2442f321.json**: admin sdk 的 config 檔，用來初始化 firebase
  
