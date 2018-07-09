# 資料庫結構說明


1. 所有標注者的資訊儲存在 users collection 底下，每個 user 的資訊都是一則 document，並用信箱來作為 ID

+ 每個 user 都有 status 資訊，表示當前是否是 trainee (試用者)或 labeler (正式標注者)

+ test_submissions / submissions 則是用來存放使用者標注完成檔案的 collection，每筆 submission 都是一則 document，因此把一堆同質性的 document 集合放在同一個 collection 中

<img src="https://i.imgur.com/cfrhChr.png" width="80%">

<br>
<br>

2. test_submissions 收集 trainee 上傳的測試標注檔，並記錄其分數在名為 records 的 document 

<img src="https://i.imgur.com/yQY78oI.png" width="80%">


<br>
<br>

3. 每一筆上傳的 submission 用其檔案名稱作為 document 的 ID (因此後上傳的會蓋過前面上傳的)

<img src="https://i.imgur.com/6CXbz48.png" width="80%">
