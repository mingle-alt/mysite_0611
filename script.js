const state = {
  categories: [],
  services: [],
  activeCategory: "",
  activeSubcategory: "전체",
  filters: {
    free: false,
    korean: false,
    api: false,
    difficulty: "all",
    query: "",
  },
};

const labels = {
  pricing: {
    free: "무료",
    freemium: "부분 무료",
    paid: "유료",
  },
  difficulty: {
    easy: "쉬움",
    medium: "보통",
    advanced: "전문가용",
  },
};

const categoryMenu = document.querySelector("#categoryMenu");
const cards = document.querySelector("#cards");
const searchInput = document.querySelector("#searchInput");
const activeTitle = document.querySelector("#activeTitle");
const activeMeta = document.querySelector("#activeMeta");
const resultCount = document.querySelector("#resultCount");
const freeFilter = document.querySelector("#freeFilter");
const koreanFilter = document.querySelector("#koreanFilter");
const apiFilter = document.querySelector("#apiFilter");
const difficultyFilter = document.querySelector("#difficultyFilter");
const resetFilters = document.querySelector("#resetFilters");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function favicon(url) {
  const host = new URL(url).hostname;
  return `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
}

function placementsFor(service) {
  return [
    { category: service.category, subcategory: service.subcategory },
    ...(service.extraPlacements || []),
  ];
}

function serviceInActiveCategory(service) {
  return placementsFor(service).some((placement) => {
    const inCategory = placement.category === state.activeCategory;
    const inSubcategory =
      state.activeSubcategory === "전체" || placement.subcategory === state.activeSubcategory;
    return inCategory && inSubcategory;
  });
}

function serviceMatches(service) {
  const query = state.filters.query;
  const startsFree = service.pricing === "free" || service.pricing === "freemium";
  const hasDifficulty =
    state.filters.difficulty === "all" || service.difficulty === state.filters.difficulty;
  const haystack = [
    service.name,
    service.summary,
    service.subcategory,
    labels.pricing[service.pricing],
    labels.difficulty[service.difficulty],
    ...service.tags,
  ]
    .join(" ")
    .toLowerCase();

  return (
    serviceInActiveCategory(service) &&
    (!state.filters.free || startsFree) &&
    (!state.filters.korean || service.korean) &&
    (!state.filters.api || service.api) &&
    hasDifficulty &&
    (!query || haystack.includes(query))
  );
}

function renderCategoryMenu() {
  categoryMenu.innerHTML = state.categories
    .map((category) => {
      const isOpen = category.id === state.activeCategory;
      const subitems = category.subcategories
        .map(
          (subcategory) =>
            `<button class="subcategory-item ${isOpen && subcategory === state.activeSubcategory ? "active" : ""}" data-category="${escapeAttr(category.id)}" data-subcategory="${escapeAttr(subcategory)}">${escapeHtml(subcategory)}</button>`,
        )
        .join("");

      return `
        <section class="accordion-item ${isOpen ? "open" : ""}">
          <button class="accordion-trigger" data-category="${escapeAttr(category.id)}" aria-expanded="${isOpen}">
            <span>${escapeHtml(category.label)}</span>
            <span class="chevron">›</span>
          </button>
          <div class="subcategory-list">${subitems}</div>
        </section>
      `;
    })
    .join("");
}

function cardTemplate(service) {
  return `
    <article class="card">
      <div class="card-main">
        <img class="logo" src="${escapeAttr(favicon(service.url))}" alt="" loading="lazy" />
        <div class="card-copy">
          <h3>${escapeHtml(service.name)}</h3>
          <p>${escapeHtml(service.summary)}</p>
        </div>
      </div>
      <div class="meta">
        ${service.tags.slice(0, 4).map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}
      </div>
      <a class="visit" href="${escapeAttr(service.url)}" target="_blank" rel="noreferrer">열기</a>
    </article>
  `;
}

function renderCards() {
  const category = state.categories.find((item) => item.id === state.activeCategory);
  const visible = state.services.filter(serviceMatches);

  activeTitle.textContent = category.label;
  activeMeta.textContent = [
    category.description,
    state.activeSubcategory,
  ]
    .filter(Boolean)
    .join(" · ");
  resultCount.textContent = `${visible.length}개`;

  cards.innerHTML = visible.length
    ? visible.map(cardTemplate).join("")
    : `<div class="empty">조건에 맞는 서비스가 없습니다.</div>`;
}

function render() {
  renderCategoryMenu();
  renderCards();
}

function resetAllFilters() {
  state.filters = { free: false, korean: false, api: false, difficulty: "all", query: "" };
  searchInput.value = "";
  freeFilter.checked = false;
  koreanFilter.checked = false;
  apiFilter.checked = false;
  difficultyFilter.value = "all";
  render();
}

categoryMenu.addEventListener("click", (event) => {
  const categoryButton = event.target.closest(".accordion-trigger");
  const subcategoryButton = event.target.closest("[data-subcategory]");

  if (categoryButton) {
    state.activeCategory = categoryButton.dataset.category;
    state.activeSubcategory = "전체";
    render();
  }

  if (subcategoryButton) {
    state.activeCategory = subcategoryButton.dataset.category;
    state.activeSubcategory = subcategoryButton.dataset.subcategory;
    render();
  }
});

searchInput.addEventListener("input", () => {
  state.filters.query = searchInput.value.trim().toLowerCase();
  renderCards();
});
freeFilter.addEventListener("change", () => {
  state.filters.free = freeFilter.checked;
  renderCards();
});
koreanFilter.addEventListener("change", () => {
  state.filters.korean = koreanFilter.checked;
  renderCards();
});
apiFilter.addEventListener("change", () => {
  state.filters.api = apiFilter.checked;
  renderCards();
});
difficultyFilter.addEventListener("change", () => {
  state.filters.difficulty = difficultyFilter.value;
  renderCards();
});
resetFilters.addEventListener("click", resetAllFilters);

async function loadVisitorCount() {
  const el = document.querySelector("#visitorCount");
  try {
    const res = await fetch("/api/visits");
    if (!res.ok) throw new Error();
    const { count } = await res.json();
    el.textContent = count.toLocaleString("ko-KR");
  } catch {
    el.textContent = "—";
  }
}

async function init() {
  try {
    const response = await fetch("services.json");
    if (!response.ok) throw new Error("services.json을 불러오지 못했습니다.");
    const data = await response.json();
    state.categories = data.categories;
    state.services = data.services;
    state.activeCategory = data.categories[0].id;
    render();
  } catch (error) {
    cards.innerHTML = `<div class="empty">데이터를 불러오지 못했습니다. Vercel 배포 주소나 로컬 정적 서버로 열어주세요.</div>`;
    console.error(error);
  }
}

init();
loadVisitorCount();
