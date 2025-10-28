// 게시글 로더 (post.html용)
(function () {
  console.log("[PostLoader] 게시글 로더 초기화 시작");

  // URL에서 파일명 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const filename = urlParams.get("file");

  if (!filename) {
    console.error("[PostLoader] 파일명이 URL에 없습니다.");
    displayError("게시글을 찾을 수 없습니다.");
    return;
  }

  console.log("[PostLoader] 로드할 파일:", filename);

  // 마크다운 파일 로드 및 파싱
  async function loadPost() {
    try {
      const response = await fetch(`pages/${filename}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const markdown = await response.text();
      console.log(
        `[PostLoader] 마크다운 파일 로드 완료 (${markdown.length}자)`
      );

      // Front Matter 파싱
      const { metadata, content } = parseFrontMatter(markdown);
      console.log("[PostLoader] Front Matter 파싱 완료:", metadata);

      // 메타 정보 렌더링
      renderPostMeta(metadata);

      // 마크다운을 HTML로 변환
      if (typeof marked === "undefined") {
        throw new Error("marked.js 라이브러리가 로드되지 않았습니다.");
      }

      // marked 설정
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false,
      });

      const html = marked.parse(content);
      console.log("[PostLoader] 마크다운 파싱 완료");

      // HTML 렌더링
      const postContentEl = document.getElementById("post-content");
      if (postContentEl) {
        postContentEl.innerHTML = html;

        // 페이지 타이틀 업데이트
        if (metadata.title) {
          document.title = `${metadata.title} - 나의 블로그`;
        }

        // 코드 하이라이팅 적용
        if (typeof Prism !== "undefined") {
          console.log("[PostLoader] Prism 코드 하이라이팅 적용");
          Prism.highlightAll();
        }

        // Giscus 댓글 로드
        loadGiscus();
      }
    } catch (error) {
      console.error("[PostLoader] 게시글 로드 실패:", error);
      displayError("게시글을 불러올 수 없습니다.");
    }
  }

  // Front Matter 파싱
  function parseFrontMatter(markdown) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontMatterRegex);

    if (!match) {
      console.log("[PostLoader] Front Matter 없음");
      return { metadata: {}, content: markdown };
    }

    const frontMatterText = match[1];
    const content = match[2];
    const metadata = {};

    // Front Matter 라인 파싱
    const lines = frontMatterText.split("\n");
    lines.forEach((line) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // 따옴표 제거
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        // 배열 파싱 (tags)
        if (key === "tags" && value.startsWith("[") && value.endsWith("]")) {
          try {
            value = JSON.parse(value);
          } catch {
            value = value
              .slice(1, -1)
              .split(",")
              .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""));
          }
        }

        metadata[key] = value;
      }
    });

    return { metadata, content };
  }

  // 게시글 메타 정보 렌더링
  function renderPostMeta(metadata) {
    const postMetaEl = document.getElementById("post-meta");
    if (!postMetaEl) return;

    const title = metadata.title || "제목 없음";
    const date = metadata.date || "";
    const category = metadata.category || "";
    const tags = Array.isArray(metadata.tags) ? metadata.tags : [];

    const tagsHtml =
      tags.length > 0
        ? `<div class="post-tags">${tags
            .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
            .join("")}</div>`
        : "";

    const categoryHtml = category
      ? `<span>📁 ${escapeHtml(category)}</span>`
      : "";

    postMetaEl.innerHTML = `
      <h1 class="post-title">${escapeHtml(title)}</h1>
      <div class="post-info">
        ${date ? `<span>📅 ${date}</span>` : ""}
        ${categoryHtml}
      </div>
      ${tagsHtml}
    `;
  }

  // Giscus 댓글 로드
  function loadGiscus() {
    console.log("[PostLoader] Giscus 댓글 시스템 로드");

    const giscusContainer = document.getElementById("giscus-container");
    if (!giscusContainer) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "beast3857-design/jimin.github.io"); // ⚠️ "beast3857-design/jimin.github.io"본인의 저장소로 변경 필요
    script.setAttribute("data-repo-id", "R_kgDOQKk3Ng"); // ⚠️ Giscus 설정에서 복사
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOQKk3Ns4CxKT9"); // ⚠️ Giscus 설정에서 복사
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "1");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");ㄴㄴ
    script.async = true;

    giscusContainer.appendChild(script);
    console.log("[PostLoader] Giscus 스크립트 추가 완료");
  }

  // 에러 표시
  function displayError(message) {
    const postContentEl = document.getElementById("post-content");
    if (postContentEl) {
      postContentEl.innerHTML = `<div class="no-posts">${escapeHtml(
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
    document.addEventListener("DOMContentLoaded", loadPost);
  } else {
    loadPost();
  }

  console.log("[PostLoader] 게시글 로더 초기화 완료");
})();
