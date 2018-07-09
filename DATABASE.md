# 資料庫結構說明


1. 所有標注者的資訊儲存在 users collection 底下，每個 user 的資訊都是一則 document，並用信箱來作為 ID。
<br>每個 user 都有 status 資訊，表示當前是否是 trainee (試用者)或 labeler (正式標注者)。
<br> test_submissions 和 submissions 則是 collection

![](https://i.imgur.com/cfrhChr.png)
