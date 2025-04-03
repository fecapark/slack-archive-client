# 유어슈 슬랙 아카이브

<p align="center">
  <img width="94" alt="Image" src="https://github.com/user-attachments/assets/a415ce6f-da7c-435b-b366-5e927b4202e2" />
  <div align="center">
    <b>유어슈 슬랙의 스레드를 아카이브해요.</b>
    <br />
    <a href="https://archive.yourssu.com" target="_blank" rel="noopener noreferrer">아카이브 링크</a>
  </div>
</p>

<img width="2553" alt="스크린샷 2025-04-01 05 23 07" src="https://github.com/user-attachments/assets/5f8233f1-8fc1-4e04-a78c-e487042ea049" />

<br />

## 왜 만들어졌나요?

슬랙 무료버전은 90일 이후의 스레드를 열람할 수 없어요.

유어슈 슬랙에는 유용한 컨텍스트 및 토론이 굉장히 많은데, 이 내용들이 버려지는게 아쉽게 다가왔어요.

<br />

이 한계를 보완하기 위해

**`!아카이브`**

**커맨드 한번으로 따로 저장할 수 있도록 해요.**

<br />

더 자세한 맥락은 [유어슈 슬랙 아카이브 노션](https://www.notion.so/yourssu/1ac6915d69788082bc58caf15460b308?pvs=4)을 확인해주세요.

<br />



## 개발 세팅

1. 레포지토리를 로컬에 클론해주세요.

    ```bash
    git clone https://github.com/yourssu/slack-archive-client.git
    ```

<br />

2. 프로젝트 의존성을 설치해주세요.

    ```bash
    corepack enable
    pnpm i
    ```

<br />

3. 프로젝트 루트에 .env를 생성하고, 아래 값으로 채워주세요.

    [노션 > 슬랙 아카이브 > .env](https://www.notion.so/yourssu/env-1c76915d697880a9bb77c72cbb9b6a3a?pvs=4)

<br />

4. 개발 서버 실행

    ```bash
    pnpm dev
    ```

    추가로, 에디터 실행시 자동으로 개발 서버가 실행되도록 [task를 작성](https://github.com/yourssu/slack-archive-client/blob/main/.vscode/tasks.json)해두었어요.

<br />

## 커밋 컨벤션

### 깃모지

더 직관적인 카테고라이징을 위해 깃모지를 사용해요.

하지만 깃모지 특성상, 이모지를 전부 입력해야하는 불편함이 있어요.

<br />

더 나은 개발 경험을 위해, 
**커밋 메시지 맨 앞에 단축어를 입력**하면 

깃모지가 커밋 메시지에 반영되도록 [스크립트를 작성](https://github.com/yourssu/slack-archive-client/blob/main/scripts/commit-msg.mts)해두었어요.

<img src="https://github.com/user-attachments/assets/e77d0e89-3b6c-4eb2-bda5-832fd319057d" width="400" />

<br />
<br />

가능한 단축어 목록은 아래와 같아요.

원하는 단축어는 언제든지 추가해도 돼요.

| 단축어 | 이모지 | 용례 |
| --- | --- | --- |
| s | ✨ | 피처 구현 |
| b | 🐛 | 코드 버그 수정 |
| r | ♻️ | 코드 리팩토링 |
| l | 💄 | 마크업 작성 및 컴포넌트 스타일링 |
| w | 🔧 | 프로젝트 설정 추가 및 변경 |
| t | 🚚 | 파일 및 폴더 이동 |
| f | 🔥 | 코드 및 파일 제거 |
| a | 🎨 | 코드 포매팅 |
| p | 📦 | 의존성 설치, 업데이트 및 정적 빌드 파일 추가 |
| pp | 💩 | 나중에 제거 될 테스트용 코드 |

<br />

```bash
git commit -m "s 새로운 피처를 만들었어요"
> ✨ 새로운 피처를 만들었어요
```

<br />

### 브랜치 병합 규칙

**Rebase Merge**만 사용해요.

- 모든 경우에 대한 머지 방식 일원화
- 직관적 커밋 그래프 (갠취)
- 빠른 이슈 트래킹 + PR 트래킹
- 세부 기능 단위 revert

<br />

## 코드젠

이 프로젝트에서 반복적 파일 생성에는 코드젠 작성을 강력하게 권고해요.

### 컨벤션

1. `scripts/codegen` 폴더 하위에 코드젠 스크립트를 작성해주세요.
2. package.json 파일에 스크립트 커맨드를 작성해주세요.

    ```json
    "scripts": {
        ...
        "gen-<이름>": "pnpm tsx <경로>",
        "gen-<이름>:watch": "pnpm tsx watch --clear-screen=false --include <의존성경로> <경로>"
    }
    ```

    더 자세한 내용은 [tsx](https://tsx.is/) 문서를 확인해주세요.

3. 개발 서버 실행시 함께 watch되도록 추가해주세요.

    ```json
    "scripts": {
        "dev": "concurrently 'next dev --turbopack' '코드젠 코드1' '코드젠 코드2' ... ",
    }
    ```


<br />

## 이슈레이징 & 컨트리뷰션

언제나 환영해요. 이슈 혹은 PR을 열어주세요.

아직은 따로 템플릿을 지정해두지는 않았기에, 최대한의 맥락을 담아 자유롭게 작성해주시면 돼요.

더 빠른 답장을 위해 슬랙에서 저(Feca)를 멘션해주시면 더 좋아요.

<br />

## 프로젝트 스택

> 참고만 해주세요.   
> 이유만 있다면 언제든 바뀔 수 있어요.

| 종류 | 이름 | 이유 |
| -- | -- | -- |
| 패키지 매니저 | pnpm | 용량 문제만 없다면 편리한 의존성 관리 |
| 협업 컨벤션 | husky | . |
| 프레임워크 | Next.js v15 | 아카이브 목록 SSR |
| 스타일링 | tailwind v4 | 빠른 스타일링, 토큰 규격 일원화 |
| 컴포넌트 | radix-ui | 확장을 위한 헤드리스 컴포넌트 및 웹 접근성 |
| 서버 상태 관리 | @tanstack/react-query | 캐싱, 간편한 서버사이드 프리페칭 및 하이드레이션 |
| HTTP 클라이언트 | ky | axios 대비 경량화 라이브러리 |
| 날짜 파싱 | date-fns | 1. tree-shaking,<br />2.(개인취향) day-js 대비 직관적 |
| 마크다운 | markdown-to-jsx | 슬랙 마크다운 커스터마이징<br />1. `react-markdown` 은 span, div 파싱이 의도한대로 이루어지지 않아요.<br />2. 더 넓은 렌더링 규칙 확장성 |
| 유틸리티 | @toss/react, @toss/utils, es-toolkit | 내가 구현하는게 다 여기 있다, type safety |

<br />

## 배포

Vercel에서 호스팅하고 있어요.

무료 버전을 사용하고 있기 떄문에 yourssu 조직 레포의 접근이 제한되는 문제가 있어요.

<br />

따라서, [fecapark/slack-archive-client](https://github.com/fecapark/slack-archive-client) 레포지토리로 fork 해서 

이 fork된 레포지토리를 Vercel이 바라보도록 배포를 돌리고 있어요.

<br />

이에 따른 레포지토리 이원화 문제는 두 레포지토리를 싱크해주는 액션을 구성하여 임시로 해소하고 있어요.

> 이 레포지토리에 push 
> 
> -> fork 레포지토리에 싱크 
> 
> -> Vercel push 이벤트 발생

<br />

### 주의사항

현재 레포지토리 싱크 액션이 force push를 지원하지 않고 있어요.

**따라서 커밋 해시가 바뀌는 rebase push가 생길 경우 액션이 동작하지 않아요.**

해결 전까지는 커밋 해시가 바뀌지 않도록 최대한 주의해주세요. (스쿼시 등)

어쩔 수 없는 경우에는, 저(Feca)를 슬랙에서 찾아주세요.

