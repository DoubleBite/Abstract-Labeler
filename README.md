# Abstract-Labeler


此 Repository 用以存放 Abstract Labeler 的程式碼。 ([Abstract Labeler 連結](https://abstractlabeling.firebaseapp.com/))  <br/>


Abstract Labeler是一個前後端整合的 **文字檔標注暨收集工具**，在此計畫中主要擔當資料收集的角色，目前是部署在 google firebase 上面，以 firebase 官方提供的 firestore 功能為儲存標注檔的資料庫，並以 Gmail authentication API 來管理標注者的上傳以及會員資訊。([firebase project 管理頁面連結](https://console.firebase.google.com/project/abstractlabeling/overview))


前端的 [標注工具](https://abstractlabeling.firebaseapp.com/labeling-tool.html) 是核心功能所在。標注者可以載入一至多個文字檔，為其加上 tag (顏色)，並將標注的結果以 json 檔的格式在本地端儲存，並上傳一份包含時間流水號的 json document 至firebase的資料庫儲存，詳細的標注流程可參考標注工具頁面右上角的 [使用教學](https://abstractlabeling.firebaseapp.com/tutorial.html) 。剩下的網頁部分包含：首頁、計畫說明，以及如何申請成為標注者等等...。


後端的部分主要負責處理標注者觸發的各種事件，包含：
1. 有人申請成為標注者時會自動寄發三份測試標注檔給申請人，並在資料庫中賦予其身份為 trainee (試用者)
2. trainee (試用者)上傳測試標注檔後會回傳分數給他
3. trainee (試用者)上傳完三份標注檔後會告知其總分，以及其是否通過測試
4. trainee 若通過測試，系統會自動寄信通知當前的管理員，以便聯絡新標注者
5. 正式標注者上傳標注檔成功後會回傳上傳成功的通知

註： 聯絡新標注者並寄發正式的標注檔這邊的流程目前保留人工的，因為包含一些人工審核標注者的資格、索取報帳資訊等，最後管理員才能正式寄發 100份待標注資料給標注者。

---

## 資料夾結構與檔案說明

因為 Abstract Labeler 目前部署在 firebase hosting 上面，所以資料夾分類是以 firebase 官方提供的資料夾結構為主：

+ **public**: 存放前端的程式碼，前端 html 網頁及 css/js 資源都放於此資料夾。詳細的程式碼說明請參考 [public/README.md](./public/README.md)
+ **functions**: 存放後端的程式碼，後端的 nodejs 功能請在這邊撰寫。詳細的程式碼說明請參考 [functions/README.md](./functions/README.md)
+ **firestore.rules**:  規範 firestore 讀寫的規則
+ **其他**：可參考 [官方文件](https://firebase.google.com/docs/hosting/?authuser=0)

---

## 資料庫儲存說明

firestore 是屬於 document-based database，單一 document 的檔案格式以 json 為主，多個 document 集合為一個 collection，詳細關於 data model 的定義請參考 [Cloud Firestore Data model](https://firebase.google.com/docs/firestore/data-model).

詳細關於本資料庫以及資料檔的儲存結構規劃請參考 [ 資料庫及資料的儲存結構](./DATABASE.md)



---

## Todo
+ 首頁的計畫說明連結還沒有做，之後可以把完整的計畫說明丟上來，畢竟這是一個偉大的計畫？ 值得提一下XD
+ 各個網頁的 navbar 連結還沒做 (懶得做)
+ 首頁有一堆文字先用廢文填充上去，找時間把它補齊
+ [有空再做就好] index.js 裡面的 submit function (使用者上傳標注檔時觸發的功能) 是以express app 為主寫成的，app 的實作建議可以從 index.js 移到另一個檔案以增加程式可讀性

---

## Acknowledgements

