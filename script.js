const categories = [
  {
    id: "chat",
    label: "챗봇/검색",
    description: "대화형 AI와 답변형 검색",
    subcategories: ["전체", "범용 챗봇", "실시간 검색", "국내외 대안"],
  },
  {
    id: "creative",
    label: "이미지/영상/음악",
    description: "시각, 영상, 음악 생성",
    subcategories: ["전체", "이미지", "영상", "음악", "음성"],
  },
  {
    id: "build",
    label: "앱/코딩",
    description: "웹앱 제작과 개발 보조",
    subcategories: ["전체", "앱 빌더", "코딩 에이전트", "배포/협업"],
  },
  {
    id: "dev",
    label: "모델/개발자",
    description: "모델 허브, API, 오픈소스",
    subcategories: ["전체", "모델 허브", "API 콘솔", "프레임워크", "로컬 AI"],
  },
  {
    id: "work",
    label: "업무/리서치",
    description: "문서, 발표, 학술 검색, 회의",
    subcategories: ["전체", "문서/노트", "발표", "학술/리서치", "회의"],
  },
];

const services = [
  {
    name: "Claude",
    url: "https://claude.ai/",
    category: "chat",
    subcategory: "범용 챗봇",
    kind: "chat",
    tags: ["글쓰기", "코딩", "분석"],
    summary: "Anthropic의 대화형 AI입니다. 긴 문서 요약, 기획, 코드 설명, 업무 글 작성에 강합니다.",
  },
  {
    name: "Gemini",
    url: "https://gemini.google.com/",
    category: "chat",
    subcategory: "범용 챗봇",
    kind: "chat",
    tags: ["Google", "멀티모달", "검색"],
    summary: "Google의 AI 어시스턴트입니다. Google 생태계와 검색 기반 작업을 함께 쓰기 좋습니다.",
  },
  {
    name: "Grok",
    url: "https://grok.com/",
    category: "chat",
    subcategory: "실시간 검색",
    kind: "chat",
    tags: ["xAI", "실시간", "소셜"],
    summary: "xAI의 챗봇입니다. 실시간 이슈 파악과 X 기반 흐름을 보는 용도로 자주 사용됩니다.",
  },
  {
    name: "Genspark",
    url: "https://www.genspark.ai/",
    category: "chat",
    subcategory: "실시간 검색",
    kind: "chat",
    tags: ["AI 검색", "에이전트", "요약"],
    summary: "검색 결과를 바탕으로 요약 페이지와 답변을 만들어주는 AI 검색 서비스입니다.",
  },
  {
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    category: "chat",
    subcategory: "범용 챗봇",
    kind: "chat",
    tags: ["OpenAI", "업무", "멀티모달"],
    summary: "범용 AI 어시스턴트입니다. 아이디어 정리, 문서, 코드, 이미지 이해까지 폭넓게 활용됩니다.",
  },
  {
    name: "Perplexity",
    url: "https://www.perplexity.ai/",
    category: "chat",
    subcategory: "실시간 검색",
    kind: "research",
    tags: ["검색", "출처", "리서치"],
    summary: "출처 링크를 함께 보여주는 답변형 검색 도구입니다. 빠른 자료 조사에 적합합니다.",
  },
  {
    name: "Poe",
    url: "https://poe.com/",
    category: "chat",
    subcategory: "국내외 대안",
    kind: "chat",
    tags: ["여러 모델", "봇", "비교"],
    summary: "여러 AI 모델과 커스텀 봇을 한곳에서 써볼 수 있는 플랫폼입니다.",
  },
  {
    name: "Le Chat",
    url: "https://chat.mistral.ai/",
    category: "chat",
    subcategory: "국내외 대안",
    kind: "chat",
    tags: ["Mistral", "유럽", "챗봇"],
    summary: "Mistral AI의 챗봇입니다. Mistral 모델을 직접 체험하기 좋습니다.",
  },
  {
    name: "Whisk",
    url: "https://labs.google/fx/tools/whisk/",
    category: "creative",
    subcategory: "이미지",
    kind: "create",
    tags: ["Google Labs", "이미지", "아이디어"],
    summary: "텍스트보다 이미지 조합을 중심으로 새로운 이미지를 만드는 Google Labs 도구입니다.",
  },
  {
    name: "Suno",
    url: "https://suno.com/",
    category: "creative",
    subcategory: "음악",
    kind: "create",
    tags: ["음악", "보컬", "작곡"],
    summary: "프롬프트로 보컬과 반주가 포함된 음악을 생성하는 대표적인 AI 음악 제작 서비스입니다.",
  },
  {
    name: "Midjourney",
    url: "https://www.midjourney.com/",
    category: "creative",
    subcategory: "이미지",
    kind: "create",
    tags: ["이미지", "아트", "컨셉"],
    summary: "고품질 이미지와 콘셉트 아트 생성에 널리 쓰이는 이미지 생성 도구입니다.",
  },
  {
    name: "Adobe Firefly",
    url: "https://firefly.adobe.com/",
    category: "creative",
    subcategory: "이미지",
    kind: "create",
    tags: ["Adobe", "디자인", "상업 작업"],
    summary: "Adobe 제품군과 연결되는 생성형 이미지 및 디자인 도구입니다.",
  },
  {
    name: "Runway",
    url: "https://runwayml.com/",
    category: "creative",
    subcategory: "영상",
    kind: "create",
    tags: ["영상", "편집", "생성"],
    summary: "텍스트/이미지 기반 영상 생성과 AI 영상 편집 기능을 제공하는 크리에이티브 플랫폼입니다.",
  },
  {
    name: "Krea",
    url: "https://www.krea.ai/",
    category: "creative",
    subcategory: "이미지",
    kind: "create",
    tags: ["이미지", "실시간", "업스케일"],
    summary: "실시간 이미지 생성, 스타일 탐색, 업스케일 작업에 유용한 디자인 도구입니다.",
  },
  {
    name: "Ideogram",
    url: "https://ideogram.ai/",
    category: "creative",
    subcategory: "이미지",
    kind: "create",
    tags: ["이미지", "텍스트 렌더링", "포스터"],
    summary: "이미지 안의 글자 표현이 필요한 포스터, 로고 시안, 썸네일 제작에 활용하기 좋습니다.",
  },
  {
    name: "ElevenLabs",
    url: "https://elevenlabs.io/",
    category: "creative",
    subcategory: "음성",
    kind: "create",
    tags: ["음성", "TTS", "더빙"],
    summary: "AI 음성 합성, 더빙, 보이스오버 제작에 많이 쓰이는 서비스입니다.",
  },
  {
    name: "Lovable",
    url: "https://lovable.dev/",
    category: "build",
    subcategory: "앱 빌더",
    kind: "code",
    tags: ["앱 제작", "노코드", "배포"],
    summary: "자연어로 웹앱을 만들고 수정하는 AI 앱 빌더입니다. 빠른 MVP 제작에 적합합니다.",
  },
  {
    name: "v0",
    url: "https://v0.dev/",
    category: "build",
    subcategory: "앱 빌더",
    kind: "code",
    tags: ["Vercel", "UI", "React"],
    summary: "프롬프트로 UI와 웹앱 코드를 생성하는 Vercel의 제작 도구입니다.",
  },
  {
    name: "Cursor",
    url: "https://cursor.com/",
    category: "build",
    subcategory: "코딩 에이전트",
    kind: "code",
    tags: ["IDE", "코딩", "에이전트"],
    summary: "AI 기능이 깊게 통합된 코드 에디터입니다. 기존 코드베이스 수정 작업에 강합니다.",
  },
  {
    name: "Replit",
    url: "https://replit.com/",
    category: "build",
    subcategory: "앱 빌더",
    kind: "code",
    tags: ["웹 IDE", "배포", "에이전트"],
    summary: "브라우저에서 개발, 실행, 배포까지 할 수 있는 클라우드 개발 플랫폼입니다.",
  },
  {
    name: "Bolt",
    url: "https://bolt.new/",
    category: "build",
    subcategory: "앱 빌더",
    kind: "code",
    tags: ["웹앱", "프로토타입", "StackBlitz"],
    summary: "프롬프트로 웹앱을 빠르게 만들고 브라우저에서 바로 실행해볼 수 있는 도구입니다.",
  },
  {
    name: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    category: "build",
    subcategory: "코딩 에이전트",
    kind: "code",
    tags: ["GitHub", "IDE", "코드 보조"],
    summary: "IDE와 GitHub 워크플로에 연결되는 AI 코딩 보조 도구입니다.",
  },
  {
    name: "GitHub",
    url: "https://github.com/",
    category: "build",
    subcategory: "배포/협업",
    kind: "code",
    tags: ["저장소", "협업", "오픈소스"],
    summary: "AI 프로젝트의 소스 코드, 이슈, 협업, 오픈소스 탐색을 위한 기본 플랫폼입니다.",
  },
  {
    name: "Hugging Face",
    url: "https://huggingface.co/",
    category: "dev",
    subcategory: "모델 허브",
    kind: "code",
    tags: ["모델", "데이터셋", "Spaces"],
    summary: "오픈 모델, 데이터셋, 데모 앱을 찾고 배포할 수 있는 대표적인 AI 커뮤니티입니다.",
  },
  {
    name: "OpenAI Platform",
    url: "https://platform.openai.com/",
    category: "dev",
    subcategory: "API 콘솔",
    kind: "code",
    tags: ["API", "모델", "개발자"],
    summary: "OpenAI 모델 API, 문서, 키 관리, 사용량 확인을 위한 개발자 플랫폼입니다.",
  },
  {
    name: "Google AI Studio",
    url: "https://aistudio.google.com/",
    category: "dev",
    subcategory: "API 콘솔",
    kind: "code",
    tags: ["Gemini API", "프로토타입", "Google"],
    summary: "Gemini 모델을 테스트하고 API 기반 앱을 빠르게 실험할 수 있는 개발자 도구입니다.",
  },
  {
    name: "Anthropic Console",
    url: "https://console.anthropic.com/",
    category: "dev",
    subcategory: "API 콘솔",
    kind: "code",
    tags: ["Claude API", "프롬프트", "개발자"],
    summary: "Claude API를 테스트하고 프로젝트 키와 사용량을 관리하는 콘솔입니다.",
  },
  {
    name: "Replicate",
    url: "https://replicate.com/",
    category: "dev",
    subcategory: "모델 허브",
    kind: "code",
    tags: ["모델 실행", "API", "오픈 모델"],
    summary: "이미지, 영상, 음성, LLM 등 다양한 모델을 API로 바로 실행할 수 있습니다.",
  },
  {
    name: "LangChain",
    url: "https://www.langchain.com/",
    category: "dev",
    subcategory: "프레임워크",
    kind: "code",
    tags: ["에이전트", "RAG", "프레임워크"],
    summary: "LLM 앱, RAG, 에이전트 워크플로를 만들기 위한 프레임워크와 플랫폼입니다.",
  },
  {
    name: "Ollama",
    url: "https://ollama.com/",
    category: "dev",
    subcategory: "로컬 AI",
    kind: "code",
    tags: ["로컬 LLM", "오픈 모델", "개인 PC"],
    summary: "로컬 컴퓨터에서 Llama 계열 등 오픈 LLM을 실행하기 쉽게 해주는 도구입니다.",
  },
  {
    name: "NotebookLM",
    url: "https://notebooklm.google.com/",
    category: "work",
    subcategory: "문서/노트",
    kind: "research",
    tags: ["문서", "요약", "Google"],
    summary: "업로드한 문서와 자료를 기반으로 질문, 요약, 브리핑을 생성하는 리서치 도구입니다.",
  },
  {
    name: "Notion AI",
    url: "https://www.notion.com/product/ai",
    category: "work",
    subcategory: "문서/노트",
    kind: "research",
    tags: ["문서", "업무", "지식관리"],
    summary: "Notion 문서와 데이터베이스 안에서 글쓰기, 요약, 정리를 돕는 AI 기능입니다.",
  },
  {
    name: "Gamma",
    url: "https://gamma.app/",
    category: "work",
    subcategory: "발표",
    kind: "research",
    tags: ["발표", "문서", "웹페이지"],
    summary: "프롬프트와 자료를 바탕으로 발표자료, 문서, 웹페이지를 빠르게 만드는 도구입니다.",
  },
  {
    name: "Elicit",
    url: "https://elicit.com/",
    category: "work",
    subcategory: "학술/리서치",
    kind: "research",
    tags: ["논문", "근거", "리서치"],
    summary: "논문 검색, 근거 추출, 연구 질문 정리에 특화된 학술 리서치 도구입니다.",
  },
  {
    name: "Consensus",
    url: "https://consensus.app/",
    category: "work",
    subcategory: "학술/리서치",
    kind: "research",
    tags: ["논문", "질문", "근거"],
    summary: "학술 논문을 기반으로 질문에 대한 근거 중심 답변을 찾아주는 검색 서비스입니다.",
  },
  {
    name: "Otter.ai",
    url: "https://otter.ai/",
    category: "work",
    subcategory: "회의",
    kind: "research",
    tags: ["회의록", "녹취", "요약"],
    summary: "회의 녹취, 자동 전사, 요약에 특화된 업무용 AI 도구입니다.",
  },
];

const tabs = document.querySelector("#categoryTabs");
const sideMenu = document.querySelector("#sideMenu");
const cards = document.querySelector("#cards");
const searchInput = document.querySelector("#searchInput");
const activeTitle = document.querySelector("#activeTitle");
const activeMeta = document.querySelector("#activeMeta");
const resultCount = document.querySelector("#resultCount");

let activeCategory = categories[0].id;
let activeSubcategory = "전체";

function favicon(url) {
  const host = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
}

function renderTabs() {
  tabs.innerHTML = categories
    .map(
      (category) =>
        `<button class="tab ${category.id === activeCategory ? "active" : ""}" data-category="${category.id}">${category.label}</button>`,
    )
    .join("");
}

function renderSideMenu() {
  const category = categories.find((item) => item.id === activeCategory);
  sideMenu.innerHTML = category.subcategories
    .map(
      (item) =>
        `<button class="side-item ${item === activeSubcategory ? "active" : ""}" data-subcategory="${item}">${item}</button>`,
    )
    .join("");
}

function renderCards() {
  const category = categories.find((item) => item.id === activeCategory);
  const query = searchInput.value.trim().toLowerCase();
  const visible = services.filter((service) => {
    const inCategory = service.category === activeCategory;
    const inSubcategory = activeSubcategory === "전체" || service.subcategory === activeSubcategory;
    const haystack = [service.name, service.summary, service.subcategory, ...service.tags]
      .join(" ")
      .toLowerCase();
    return inCategory && inSubcategory && (!query || haystack.includes(query));
  });

  activeTitle.textContent = category.label;
  activeMeta.textContent = `${category.description} · ${activeSubcategory}`;
  resultCount.textContent = `${visible.length}개`;

  if (!visible.length) {
    cards.innerHTML = `<div class="empty">검색 조건에 맞는 서비스가 없습니다.</div>`;
    return;
  }

  cards.innerHTML = visible
    .map(
      (service) => `
        <article class="card">
          <div>
            <div class="card-top">
              <img class="logo" src="${favicon(service.url)}" alt="" loading="lazy" />
              <span class="badge ${service.kind}">${service.subcategory}</span>
            </div>
            <h3>${service.name}</h3>
            <p>${service.summary}</p>
            <div class="meta">
              ${service.tags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
            </div>
          </div>
          <a class="visit" href="${service.url}" target="_blank" rel="noreferrer">사이트 열기</a>
        </article>
      `,
    )
    .join("");
}

function render() {
  renderTabs();
  renderSideMenu();
  renderCards();
}

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  activeSubcategory = "전체";
  render();
});

sideMenu.addEventListener("click", (event) => {
  const button = event.target.closest("[data-subcategory]");
  if (!button) return;
  activeSubcategory = button.dataset.subcategory;
  render();
});

searchInput.addEventListener("input", renderCards);

render();
