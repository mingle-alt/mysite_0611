const state = {
  categories: [],
  recommendations: [],
  services: [],
  activeCategory: "",
  activeSubcategory: "전체",
  activeRecommendation: "",
  favorites: new Set(),
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

const tabs = document.querySelector("#categoryTabs");
const sideMenu = document.querySelector("#sideMenu");
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
const recommendationTabs = document.querySelector("#recommendationTabs");
const recommendedCards = document.querySelector("#recommendedCards");

function getSavedFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem("ai-link-favorites") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

state.favorites = new Set(getSavedFavorites());

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

function saveFavorites() {
  localStorage.setItem("ai-link-favorites", JSON.stringify([...state.favorites]));
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();

  try {
    if (!document.execCommand("copy")) throw new Error("copy command failed");
  } finally {
    textarea.remove();
  }
}

function serviceMatches(service) {
  const query = state.filters.query;
  const inCategory = service.category === state.activeCategory;
  const inSubcategory =
    state.activeSubcategory === "전체" || service.subcategory === state.activeSubcategory;
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
    inCategory &&
    inSubcategory &&
    (!state.filters.free || startsFree) &&
    (!state.filters.korean || service.korean) &&
    (!state.filters.api || service.api) &&
    hasDifficulty &&
    (!query || haystack.includes(query))
  );
}

function renderTabs() {
  tabs.innerHTML = state.categories
    .map(
      (category) =>
        `<button class="tab ${category.id === state.activeCategory ? "active" : ""}" data-category="${escapeAttr(category.id)}">${escapeHtml(category.label)}</button>`,
    )
    .join("");
}

function renderSideMenu() {
  const category = state.categories.find((item) => item.id === state.activeCategory);
  sideMenu.innerHTML = category.subcategories
    .map(
      (item) =>
        `<button class="side-item ${item === state.activeSubcategory ? "active" : ""}" data-subcategory="${escapeAttr(item)}">${escapeHtml(item)}</button>`,
    )
    .join("");
}

function renderRecommendations() {
  recommendationTabs.innerHTML = state.recommendations
    .map(
      (item) =>
        `<button class="recommendation-tab ${item.id === state.activeRecommendation ? "active" : ""}" data-recommendation="${escapeAttr(item.id)}">${escapeHtml(item.label)}</button>`,
    )
    .join("");

  const active = state.recommendations.find((item) => item.id === state.activeRecommendation);
  const visible = state.services.filter((service) => service.recommendedFor.includes(active.id)).slice(0, 6);

  recommendedCards.innerHTML = visible
    .map(
      (service) => `
        <article class="mini-card">
          <img class="logo small" src="${escapeAttr(favicon(service.url))}" alt="" loading="lazy" />
          <div>
            <strong>${escapeHtml(service.name)}</strong>
            <span>${escapeHtml(active.description)}</span>
          </div>
          <a href="${escapeAttr(service.url)}" target="_blank" rel="noreferrer" aria-label="${escapeAttr(service.name)} 열기">열기</a>
        </article>
      `,
    )
    .join("");
}

function cardTemplate(service) {
  const isFavorite = state.favorites.has(service.name);
  const extraLinks = [
    service.links?.pricing
      ? `<a href="${escapeAttr(service.links.pricing)}" target="_blank" rel="noreferrer">가격</a>`
      : "",
    service.links?.docs
      ? `<a href="${escapeAttr(service.links.docs)}" target="_blank" rel="noreferrer">문서/API</a>`
      : "",
  ]
    .filter(Boolean)
    .join("");
  const favoriteLabel = isFavorite ? `${service.name} 즐겨찾기 해제` : `${service.name} 즐겨찾기 추가`;

  return `
    <article class="card">
      <div>
        <div class="card-top">
          <img class="logo" src="${escapeAttr(favicon(service.url))}" alt="" loading="lazy" />
          <span class="badge ${escapeAttr(service.kind)}">${escapeHtml(service.subcategory)}</span>
        </div>
        <h3>${escapeHtml(service.name)}</h3>
        <p>${escapeHtml(service.summary)}</p>
        <div class="facts">
          <span>${escapeHtml(labels.pricing[service.pricing])}</span>
          <span>${service.korean ? "한국어 지원" : "영문 중심"}</span>
          <span>${service.api ? "API 제공" : "웹 중심"}</span>
          <span>${escapeHtml(labels.difficulty[service.difficulty])}</span>
        </div>
        <div class="meta">
          ${service.tags.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
      <div class="card-actions">
        <button class="icon-action ${isFavorite ? "active" : ""}" data-favorite="${escapeAttr(service.name)}" type="button" title="${escapeAttr(favoriteLabel)}" aria-label="${escapeAttr(favoriteLabel)}" aria-pressed="${isFavorite}">${isFavorite ? "★" : "☆"}</button>
        <button class="icon-action" data-copy="${escapeAttr(service.url)}" type="button" title="${escapeAttr(service.name)} URL 복사" aria-label="${escapeAttr(service.name)} URL 복사">복사</button>
        ${extraLinks}
        <a class="visit" href="${escapeAttr(service.url)}" target="_blank" rel="noreferrer">사이트 열기</a>
      </div>
    </article>
  `;
}

function renderCards() {
  const category = state.categories.find((item) => item.id === state.activeCategory);
  const visible = state.services.filter(serviceMatches);

  activeTitle.textContent = category.label;
  activeMeta.textContent = `${category.description} · ${state.activeSubcategory}`;
  resultCount.textContent = `${visible.length}개`;

  if (!visible.length) {
    cards.innerHTML = `<div class="empty">검색 조건에 맞는 서비스가 없습니다.</div>`;
    return;
  }

  const favorites = visible.filter((service) => state.favorites.has(service.name));
  const regular = visible.filter((service) => !state.favorites.has(service.name));
  cards.innerHTML = [...favorites, ...regular].map(cardTemplate).join("");
}

function render() {
  renderTabs();
  renderSideMenu();
  renderRecommendations();
  renderCards();
}

function resetAllFilters() {
  state.filters = { free: false, korean: false, api: false, difficulty: "all", query: "" };
  searchInput.value = "";
  freeFilter.checked = false;
  koreanFilter.checked = false;
  apiFilter.checked = false;
  difficultyFilter.value = "all";
  renderCards();
}

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.activeCategory = button.dataset.category;
  state.activeSubcategory = "전체";
  render();
});

sideMenu.addEventListener("click", (event) => {
  const button = event.target.closest("[data-subcategory]");
  if (!button) return;
  state.activeSubcategory = button.dataset.subcategory;
  render();
});

recommendationTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-recommendation]");
  if (!button) return;
  state.activeRecommendation = button.dataset.recommendation;
  renderRecommendations();
});

cards.addEventListener("click", async (event) => {
  const favorite = event.target.closest("[data-favorite]");
  const copy = event.target.closest("[data-copy]");

  if (favorite) {
    const name = favorite.dataset.favorite;
    state.favorites.has(name) ? state.favorites.delete(name) : state.favorites.add(name);
    saveFavorites();
    renderCards();
  }

  if (copy) {
    try {
      await copyText(copy.dataset.copy);
      copy.textContent = "완료";
    } catch {
      copy.textContent = "실패";
    } finally {
      setTimeout(() => {
        copy.textContent = "복사";
      }, 1200);
    }
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

async function init() {
  try {
    const response = await fetch("services.json");
    if (!response.ok) throw new Error("services.json을 불러오지 못했습니다.");
    const data = await response.json();
    state.categories = data.categories;
    state.recommendations = data.recommendations;
    state.services = data.services;
    state.activeCategory = data.categories[0].id;
    state.activeRecommendation = data.recommendations[0].id;
    render();
  } catch (error) {
    cards.innerHTML = `<div class="empty">데이터를 불러오지 못했습니다. Vercel 배포 주소나 로컬 정적 서버로 열어주세요.</div>`;
    console.error(error);
  }
}

init();
