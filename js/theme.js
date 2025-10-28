// 다크/라이트 모드 토글 기능
(function () {
  console.log("[Theme] 테마 시스템 초기화 시작");

  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");

  // 로컬 스토리지에서 테마 불러오기
  const savedTheme = localStorage.getItem("theme") || "light";
  console.log("[Theme] 저장된 테마:", savedTheme);

  // 초기 테마 적용
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  // 테마 토글 버튼 이벤트
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";

      console.log("[Theme] 테마 변경:", currentTheme, "->", newTheme);

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === "light" ? "🌙" : "☀️";
    }
  }

  console.log("[Theme] 테마 시스템 초기화 완료");
})();
