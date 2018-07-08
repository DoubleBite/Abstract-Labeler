# Abstract-Labeler


此 repository 用以存放 Abstract Labeler 的程式碼。 ([Abstract Labeler 連結](https://abstractlabeling.firebaseapp.com/))

Abstract Labeler是一個前後端整合的 **文字檔標注暨收集工具**，在此計畫中主要擔當資料收集的角色。

前端的[標注工具](https://abstractlabeling.firebaseapp.com/labeling-tool.html) 是核心功能所在。標注者可以載入一至多個文字檔，為其加上 tag (顏色)，並將標注的結果在本地端以 json 的格式儲存，並上傳一份包含時間流水號的
json document 至firebase的資料庫。
詳細的標注流程可參考標注工具頁面右上角的使用教學。 <br/>
，用
主要是將讀入論文摘要
剩下的網頁部分包含：首頁、計畫說明，以及如何申請成為標注者等等...。



後端的部分主要負責處理標注者觸發的各種事件，包含：
1. 有人申請成為標注者時會自動寄發三份測試標注檔給申請人，並在資料庫中賦予其身份為 trainee (試用者)
2. trainee (試用者)上傳測試標注檔後會回傳分數給他
3. trainee (試用者)上傳完三份標注檔後會告知其總分，以及其是否通過測試
4. trainee 若通過測試，系統會自動寄信通知當前的管理員，以便聯絡新標注者
5. 正式標注者上傳標注檔成功後會回傳上傳成功的通知
註： 聯絡新標注者並寄發正式的標注檔這邊的流程目前保留人工的，因為包含一些人工審核標注者的資格、索取報帳所需資訊等，最後管理者才會正式寄發 100份待標注資料給標注者。

## 資料夾結構

Abstract Labeler 目前部署在 firebase 上面，因此以 firebase 官方提供的 firestore 功能為儲存標注檔的資料庫。
https://console.firebase.google.com/project/abstractlabeling/overview
因此現存的


官方 hosting 
也是以firebase 主要的結構








## Todo

+ [有空再做就好] index.js 裡面的 submit function (使用者上傳標注檔時觸發的功能) 是以express app 為主寫成的，app 的實作建議可以從 index.js 移到另一個檔案以增加程式可讀性
