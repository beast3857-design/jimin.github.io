// 메인 애플리케이션 로직 (index.html용)
(function () {
  console.log("[App] 애플리케이션 초기화 시작");

  let allPosts = [];
  let filteredPosts = [];
  let selectedTag = null;

  // posts.json 로드
  async function loadPosts() {
    console.log("[App] posts.json 로드 시작");
    try {
      const response = await fetch("posts.json");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      allPosts = await response.json();
      filteredPosts = [...allPosts];

      console.log(`[App] ${allPosts.length}개의 게시글 로드 완료`);

      renderTagFilter();
      renderPosts();
    } catch (error) {
      console.error("[App] posts.json 로드 실패:", error);
      displayError("게시글을 불러올 수 없습니다.");
    }
  }

  // 태그 필터 렌더링
  function renderTagFilter() {
    console.log("[App] 태그 필터 렌더링");

    const tagFilterEl = document.getElementById("tag-filter");
    if (!tagFilterEl) return;

    // 모든 태그 수집
    const tagsSet = new Set();
    allPosts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => tagsSet.add(tag));
      }
    });

    const tags = Array.from(tagsSet).sort();
    console.log(`[App] 총 ${tags.length}개의 태그 발견:`, tags);

    if (tags.length === 0) {
      tagFilterEl.innerHTML = "";
      return;
    }

    // '전체' 태그 추가
    let html = `<span class="tag ${
      selectedTag === null ? "active" : ""
    }" data-tag="all">전체</span>`;

    tags.forEach((tag) => {
      html += `<span class="tag ${
        selectedTag === tag ? "active" : ""
      }" data-tag="${tag}">${tag}</span>`;
    });

    tagFilterEl.innerHTML = html;

    // 태그 클릭 이벤트
    tagFilterEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("tag")) {
        const tag = e.target.dataset.tag;
        console.log("[App] 태그 필터 클릭:", tag);

        if (tag === "all") {
          selectedTag = null;
          filteredPosts = [...allPosts];
        } else {
          selectedTag = tag;
          filteredPosts = allPosts.filter(
            (post) => post.tags && post.tags.includes(tag)
          );
        }

        renderTagFilter();
        renderPosts();
      }
    });
  }

  // 게시글 목록 렌더링
  function renderPosts() {
    console.log(`[App] ${filteredPosts.length}개의 게시글 렌더링`);

    const postsListEl = document.getElementById("posts-list");
    if (!postsListEl) return;

    if (filteredPosts.length === 0) {
      postsListEl.innerHTML = '<div class="no-posts">게시글이 없습니다.</div>';
      return;
    }

    const html = filteredPosts.map((post) => createPostCard(post)).join("");
    postsListEl.innerHTML = html;

    // 게시글 카드 클릭 이벤트
    postsListEl.addEventListener("click", (e) => {
      const postCard = e.target.closest(".post-card");
      if (postCard) {
        const filename = postCard.dataset.file;
        console.log("[App] 게시글 카드 클릭:", filename);
        window.location.href = `post.html?file=${filename}`;
      }
    });
  }

  // 게시글 카드 HTML 생성
  function createPostCard(post) {
    const tagsHtml =
      post.tags && post.tags.length > 0
        ? post.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")
        : "";

    const categoryHtml = post.category
      ? `<span>📁 ${post.category}</span>`
      : "";

    return `
      <div class="post-card" data-file="${post.file}">
        <h2 class="post-card-title">${escapeHtml(post.title)}</h2>
        <div class="post-card-meta">
          <span>📅 ${post.date}</span>
          ${categoryHtml}
        </div>
        ${
          post.description
            ? `<p class="post-card-description">${escapeHtml(
                post.description
              )}</p>`
            : ""
        }
        ${
          post.excerpt
            ? `<p class="post-card-description">${escapeHtml(post.excerpt)}</p>`
            : ""
        }
        ${tagsHtml ? `<div class="post-card-tags">${tagsHtml}</div>` : ""}
      </div>
    `;
  }

  // 에러 표시
  function displayError(message) {
    const postsListEl = document.getElementById("posts-list");
    if (postsListEl) {
      postsListEl.innerHTML = `<div class="no-posts">${escapeHtml(
        message
      )}</div>`;
    }
  }

  // HTML 이스케이프
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // 페이지 로드 시 실행
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadPosts);
  } else {
    loadPosts();
  }

  console.log("[App] 애플리케이션 초기화 완료");
})();
