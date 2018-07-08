# Abstract-Labeler


此 repository 用以存放 Abstract Labeler 的程式碼。 ([Abstract Labeler 連結](https://abstractlabeling.firebaseapp.com/))

Abstract Labeler是一個前後端整合的 **文字檔標注暨收集工具**，在此計畫中主要擔當資料收集的角色。 <br/>
前端的[標注工具](https://abstractlabeling.firebaseapp.com/labeling-tool.html) 是核心功能所在。標注者可以載入一至多個文字檔，為其加上 tag (顏色)，並將標注的結果在本地端以 json 的格式儲存，並上傳一份包含時間流水號的
至firebase的資料庫。


詳細的標注流程可參考頁面右上角的使用教學。 <br/>


剩下的網頁部分包含：首頁、計畫說明，以及如何申請成為標注者等等...。





前後端


，用

主要是將讀入論文摘要



Abstract Labeler 目前部署在 firebase 上面，並以 firebase 提供的 firestore 功能為儲存標注檔的資料庫。
https://console.firebase.google.com/project/abstractlabeling/overview
因此現存的


官方 hosting 
也是以firebase 主要的結構


## 資料夾結構






## Todo

(有空再做就好) index.js 裡面的功能 實作  
app 可以移到  另一個檔案 以增加可讀性
