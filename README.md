## EP.1 메인 헤더 생성

오늘은 메인 헤더만 생성을 했다. 한가지 이슈가 있다면 svg 파일을 react component 형식으로 불러오는데 실패해서 그게 아쉬웠다.
일단 컴포넌트로 직접 생성해서 작업을 진행했다.

## EP.2 이메일 인증

오늘은 이메일 인증을 구현했다. 일단 폼은 다 구현했고 실제 API 테스트를 하면 될 것 같다.

## EP.3 코드 이메일 인증

오늘은 코드 이메일 인증을 했다. 상당히 쉽게 인증을 하였고, 오류 메세지는 toast UI로 보여 줄 예정이다. 여기서 추가적으로 적용? 고민? 해야하는 문제가 있다.

1. refresh, access 토큰의 관리
2. 인증 후 유저 정보를 가져오는 것

일단 인증 후 유저 정보를 가져오는건 이메일 인증에서는 클라이언트 사이드에서 유저 정보를 가져오는 것으로
해결하면 될 것 같고 나머지 유저 정보는 음... 서버사이드에서 store로 넣어주는 방식으로 할지 고민이된다.

그리고 토큰의 관리는 일단 2가지를 생각하고 있는데, 첫번째는 스토리지 API를 사용하는거 두번째는 세션으로 관리하는건데.... 고민이 된다.

### 오늘 한 일

- 이메일 인증

## EP.4 write 페이지 추가및 서버 사이드 렌더링 store 연동 수정

작성페이지및 스토어 연동 수정을 했다. 그리고 redux saga는 사용하지 않을 예정이다.

## EP.5 write 페이지에서 에디터 적용하기

오늘은 글을 작성하는 페이지를 작업하고 있었다. 개발을 진행하면서 발생했던 이슈는 next.js에서 code mirror를 호출 할 때 에러를 발생하는 이슈가 있었다.
[CodeMirror Issue - Navigator error](https://alonzoaustin.com/blog?title=QcbtUxpArUDnjT2B4VYh)

서버 사이드 렌더링을 하면서 코드 미러를 못읽어 발생하는 이슈인 것 같다. 해결은 서버 사이드에서 발생하는 이슈이면 클라이언트 사이드 렌더링시 로드를 하게하면 고칠 수 있는 에러였다.

```javascript
  initialize = () => {
    if (!this.editorElement.current) return;
    const CodeMirror = require('codemirror');
    require('codemirror/mode/markdown/markdown');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/jsx/jsx');
    require('codemirror/addon/display/placeholder');
    this.codemirror = CodeMirror.fromTextArea(this.editorElement.current, {
      mode: 'markdown',
      theme: 'one-light',
      placeholder: '당신의 이야기를 적어보세요...',
      lineWrapping: true,
    });
  };

  componentDidMount() {
    this.initialize();
  }
```

다음번에는 계속 에디터 작업을 계속하면 될 것 같다.