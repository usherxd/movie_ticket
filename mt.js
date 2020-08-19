const prompt = require('prompt-sync')();


// 系統變數
let cards = false // 出示證件
let ebt = false   // Early Bird 早場票權限
let cst = false   // concession ticket 優待票權限
let sbt = false   // senior persons ticket 敬老票權限
const sbtAge = 65   // 敬老票年齡限制
const cstHeC = 110   // 兒童票身高限制
const nowTime = new Date()  // 現在購票時間
const ebTimeB = new Date(2020, 1, 2, 12, 00)  // early bird Time b 之前 
const ebTimeA = new Date(2020, 1, 2, 06, 00)  // early bird Time a 之後
const ebtP = 200   /// Price 早場票價
const cstP = 230   /// Price 優待票價
const sbtP = 130   /// Price 敬老票價


// 使用者變數
let usAge   // 使用者年齡
let usHeight  // 使用者身高


// 使用者輸入
const ticket = prompt('是否要購買優待票？ (1.是 2.否，購買「全票」或「早場票」)  ')   
if(ticket === '1') {
  const usId = prompt('請選擇優待票種。 (1.敬老票 2.軍/警/學生 3.兒童票 )  ')
  if(usId === '1') {
    console.log('您選擇「敬老票」')
    const usCards = prompt('請出示身份證件 (1.給證件 2.大爺不給)  ')
    if(usCards === '1') {
      cards = true   // 確認出示證件
      const ageC = prompt('請輸入年齡：  ')
      usAge = parseInt(ageC)   // str 轉 number(int)
      if(usAge >= sbtAge) {   // 敬老票年齡判斷
        sbt = true   // 開啟可購敬老票
      } else if(usAge < sbtAge) {
        console.log(`大爺您 ${usAge} 歲，還年輕啦！ 考慮買張全票如何？`)
      } else {
        console.log('未輸入年齡，建議以下票種。')
      }
    }else if(usCards === '2') {
      console.log('好哦，給大爺一張全票！')
    }else {
      console.log('要嘛給，要嘛不給。 請重新排隊購票！')   /// 敬老票防誤
    }

  }else if(usId === '2') {
    console.log('您選擇「軍/警/學生票」')
    const usCards = prompt('請出示身份證件 (1.給證件 2.大爺不給)  ')
    if(usCards === '1') {
      cards = true   // 確認出示證件
      cst = true   // 開啟可購優待票
    } else if(usCards === '2') {
      console.log('好哦，大爺考慮買個全票如何？')
    }else {
      console.log('哎喲，亂按。無法確認優待身份哦 ')   /// 優待票防誤
    }

  }else if(usId === '3') {
    console.log('您選擇「兒童優待票」')
    const hc = prompt('請輸入身高：  ')
    usHeight = parseInt(hc)   // str 轉 number(int)
    if(usHeight <= cstHeC) {   // 兒童票身高判斷
      cst = true   // 開啟可購優待票
      cards = true   // 符合兒童票，默認開啟證件出示
    } else if(usHeight >= cstHeC) {
      console.log('發育真好，小朋友要買全票哦')
      cst = false
    } else {
      console.log('請勿亂按哦！')   /// 兒童票防誤
    }

  }else {
   console.log('哎喲，亂按。 請爺們重新排隊購票！')   /// 防誤
  }

} else if (ticket === '2' ){
  console.log('購買「全票」或「早場票」。')
} else {
  console.log('未確認優待身份，請購買「全票」或「早場票」。')
}


// 早場票權限確認
if(ebTimeB.getHours() > nowTime.getHours() 
&& ebTimeA.getHours() <= nowTime.getHours()) {
  ebt = true
  console.log('-------')
  console.log(`現在時間為 ${nowTime.getHours()}:${nowTime.getMinutes()} ，可購買早場票。`)
} else {
  ebt = false
  console.log('-------')
  console.log(`現在時間為 ${nowTime.getHours()}:${nowTime.getMinutes()} ，無法購買早場票。`)
}


// 擇優判斷完成售票
if(cards == true && sbt == true) {
  console.log(`您可以購買「敬老票」，票價為 ${sbtP} 元。`)
} else if(ebt == true) {
  console.log(`您可以購買「早場票」，票價為 ${ebtP} 元。`)
} else if(cards == true && cst == true) {
  console.log(`您可以購買「優待票」，票價為 ${cstP} 元。`)
} else {
  console.log('您可以購買「全票」，票價為 260 元。')
}


// 優待票身份確認
// console.log('-------')
// console.log('證 ' + cards)
// console.log('早 ' + ebt)
// console.log('優 ' + cst)
// console.log('老 ' + sbt)