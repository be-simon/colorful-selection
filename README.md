# 🎨 colorful-selection
* Chrome Extension Project
* 텍스트 선택을 선택한 색깔로 하게 하는 익스텐션

### 🖥 사용 영상

![화면 기록 2021-09-04 오후 2 11 04](https://user-images.githubusercontent.com/22143039/132083481-cfda224c-fdc0-4470-93d8-847156c5efd6.gif)



# 수정 내역
### 2021.09.07
> popup 창 레이아웃 수정
* 약간의 디자인 수정, 선택된 색상은 다르게 표시되게 했다.
  -> storage에 저장된 selected 색상을 찾아 `css class를 추가`

> chrome.storage.sync.get 비동기 처리
* storage.sync.get은 비동기로 데이터를 가져오기 때문에 처리를 해줄 필요가 있다.
  ```javascript
    // storage.js
    function storageGetSelected () {
    return new Promise ((resolve, reject) => {
      chrome.storage.sync.get("selectedColor", ({selectedColor}) => {
        const err = chrome.runtime.lastError
        if (err) return reject(err)

        resolve(selectedColor)
      })
    })
  }
  ```
  * storage.js에 storage에서 데이터를 받아오는 Promise를 만들었다.

> 전역변수 삭제
* 전역변수를 없애야겠다는 생각이 들어서 js 파일들에 즉시실행함수를 만들고 실행하는 형태로 수정해주었다.


### 2021.09.06 
> injected style 우선 적용하기
* manifest.json 파일에 정적으로 추가해준 css style은 DOM style 에 의해 덮어진다.
  -> 웹사이트에서 ::selection style을 지정해둔 경우 선택한 색상이 적용되지 않는 문제 발생
* 정적으로 추가한 css style은 DOM 렌더링 전에 추가된다.
* script 파일은 run_at: document_end 속성을 추가해서 DOM 렌더링 이후에 실행되도록 할 수 있다.
* 따라서 main.js 에서 DOM이 렌더링 된 후 styleSheet를 불러와 style을 수정했다.

### 2021.09.06 (2)
> 선택된 색상 유지하기
* 기존 코드:
  * storage에 default color를 저장해두고 main.js 스크립트가 실행될 때마다 그 색상을 가져와서 적용했다.
  -> 새로고침하거나 새 탭을 열면 선택했던 색상이 초기화된다.
* 수정사항:
  * storage에 저장했던 default를 selected-color로 수정한다.
  * main.js는 실행할 때마다 storage에 저장된 selected-color를 불러온다.
  * popup에서 색상을 선택하면 storage에 저장된 selected를 변경한다.
    main.js로 보내는 메세지는 유지
    -> 새로고침해도 선택된 색상이 유지되고 탭 간에 동기화도 가능.

> styleSheetList의 length가 0인 경우
* 이유는 모르겠지만 console에 아이템이 찍히는데도 불구하고 styleSheetList의 length가 0인 페이지가 있다.
  -> ::selection이 적용되지 않음.
  -> length == 0인 경우 새로운 styleSheet을 만들고 rule을 추가해서 더해줬다.