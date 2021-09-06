# 🎨 colorful-selection
* Chrome Extension Project
* 텍스트 선택을 선택한 색깔로 하게 하는 익스텐션

### 🖥 사용 영상

![화면 기록 2021-09-04 오후 2 11 04](https://user-images.githubusercontent.com/22143039/132083481-cfda224c-fdc0-4470-93d8-847156c5efd6.gif)



# 수정 내역
### 2021.09.06
* manifest.json 파일에 정적으로 추가해준 css style은 DOM style 에 의해 덮어진다.
  -> 웹사이트에서 ::selection style을 지정해둔 경우 선택한 색상이 적용되지 않는 문제 발생
* 정적으로 추가한 css style은 DOM 렌더링 전에 추가된다.
* script 파일은 run_at: document_end 속성을 추가해서 DOM 렌더링 이후에 실행되도록 할 수 있다.
* 따라서 main.js 에서 DOM이 렌더링 된 후 styleSheet를 불러와 style을 수정했다.
