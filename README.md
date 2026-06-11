# AI 서비스 링크 허브

업무에 맞는 AI 도구를 검색하고 바로 열어볼 수 있는 정적 링크 허브 사이트입니다.

## 주요 기능

- **카테고리 탐색** — 챗봇/검색, 이미지/영상/음악, 앱/코딩, 모델/개발자, 업무/리서치, 자동화/에이전트, 마케팅/영업 7개 카테고리
- **서브카테고리 필터** — 각 카테고리 내 세부 분류로 빠른 탐색
- **실시간 검색** — 서비스 이름·태그·설명 전문 검색
- **상세 필터** — 무료 시작 여부, 한국어 지원, API 제공, 난이도(쉬움/보통/전문가) 필터
- **외부 링크** — 공식 사이트, 공식 문서, 요금제 페이지 직접 연결

## 구조

```
├── index.html      # 메인 페이지
├── styles.css      # 스타일
├── script.js       # 검색·필터·렌더링 로직
└── services.json   # 서비스 데이터
```

## 서비스 데이터 추가

`services.json`의 `services` 배열에 항목을 추가합니다.

```json
{
  "name": "서비스 이름",
  "url": "https://example.com/",
  "category": "chat",
  "subcategory": "범용 챗봇",
  "kind": "chat",
  "tags": ["태그1", "태그2"],
  "summary": "한 줄 설명",
  "pricing": "freemium",
  "korean": true,
  "api": false,
  "difficulty": "easy",
  "recommendedFor": ["beginner"],
  "links": {
    "official": "https://example.com/",
    "docs": "https://docs.example.com/",
    "pricing": "https://example.com/pricing"
  }
}
```

| 필드 | 값 |
|------|-----|
| `category` | `chat` `creative` `build` `dev` `work` `automation` `marketing` |
| `pricing` | `free` `freemium` `paid` |
| `difficulty` | `easy` `medium` `advanced` |
| `recommendedFor` | `beginner` `developer` `creator` `work` `free` `automation` `marketing` |

한 서비스를 여러 카테고리에 노출하려면 `extraPlacements` 배열을 추가합니다.

```json
"extraPlacements": [
  { "category": "marketing", "subcategory": "카피라이팅" }
]
```

## 로컬 실행

별도 빌드 과정이 없는 정적 사이트입니다. 브라우저에서 `index.html`을 열거나 간단한 서버를 사용합니다.

```bash
npx serve .
# 또는
python3 -m http.server 8080
```

## 배포

Vercel에 연결되어 있으며 `main` 브랜치에 push하면 자동으로 배포됩니다.
