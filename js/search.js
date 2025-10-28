// 검색 기능
(function () {
  console.log("[Search] 검색 시스템 초기화");

  const searchInput = document.getElementById("search-input");

  if (!searchInput) {
    console.log("[Search] 검색 입력창을 찾을 수 없습니다.");
    return;
  }

  // 디바운스 함수
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // 검색 처리
  const handleSearch = debounce((searchTerm) => {
    console.log("[Search] 검색어:", searchTerm);

    const event = new CustomEvent("search", {
      detail: { searchTerm: searchTerm.toLowerCase() },
    });
    document.dispatchEvent(event);
  }, 300);

  // 검색 입력 이벤트
  searchInput.addEventListener("input", (e) => {
    handleSearch(e.target.value);
  });

  // 검색 이벤트 리스너 (app.js에서 사용 가능)
  document.addEventListener("search", (e) => {
    const searchTerm = e.detail.searchTerm;

    if (!searchTerm) {
      console.log("[Search] 검색어가 없어서 전체 게시글 표시");
      return;
    }

    console.log("[Search] 검색 필터링 시작:", searchTerm);

    // 게시글 필터링
    const postCards = document.querySelectorAll(".post-card");
    let visibleCount = 0;

    postCards.forEach((card) => {
      const title =
        card.querySelector(".post-card-title")?.textContent.toLowerCase() || "";
      const description =
        card
          .querySelector(".post-card-description")
          ?.textContent.toLowerCase() || "";
      const tags = Array.from(card.querySelectorAll(".tag"))
        .map((tag) => tag.textContent.toLowerCase())
        .join(" ");

      const searchableText = `${title} ${description} ${tags}`;
      const isVisible = searchableText.includes(searchTerm);

      if (isVisible) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    console.log(`[Search] ${visibleCount}개의 게시글이 검색어와 일치`);

    // 검색 결과가 없을 때
    const postsListEl = document.getElementById("posts-list");
    if (visibleCount === 0 && postsListEl) {
      const existingNoResults = postsListEl.querySelector(".no-posts");
      if (!existingNoResults) {
        const noResultsEl = document.createElement("div");
        noResultsEl.className = "no-posts";
        noResultsEl.textContent = `"${e.detail.searchTerm}"에 대한 검색 결과가 없습니다.`;
        postsListEl.appendChild(noResultsEl);
      }
    } else {
      // 검색 결과가 있으면 '검색 결과 없음' 메시지 제거
      const existingNoResults = postsListEl?.querySelector(".no-posts");
      if (existingNoResults && visibleCount > 0) {
        existingNoResults.remove();
      }
    }
  });

  console.log("[Search] 검색 시스템 초기화 완료");
})();
