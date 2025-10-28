---
title: "첫 번째 게시글 - GitHub Pages 블로그에 오신 것을 환영합니다"
date: 2025-10-28
tags: ["JavaScript", "Web", "Blog"]
category: "Development"
description: "GitHub Pages와 Vanilla JavaScript로 만든 정적 블로그의 첫 게시글입니다."
---

# 안녕하세요! 👋

GitHub Pages 정적 블로그에 오신 것을 환영합니다. 이 블로그는 순수 HTML, CSS, JavaScript로 만들어졌습니다.

## 주요 기능

이 블로그는 다음과 같은 기능을 제공합니다:

- ✨ **마크다운 지원**: marked.js를 사용한 마크다운 파싱
- 🎨 **다크/라이트 모드**: 사용자 선호에 따른 테마 전환
- 🔍 **검색 기능**: 게시글 제목, 내용, 태그 검색
- 🏷️ **태그 필터링**: 태그별로 게시글 분류
- 💬 **댓글 시스템**: Giscus를 활용한 GitHub Discussions 기반 댓글
- 🎯 **코드 하이라이팅**: Prism.js를 사용한 문법 강조

## 코드 예시

JavaScript 코드 예시입니다:

```javascript
function greet(name) {
  console.log(`안녕하세요, ${name}님!`);
  return `환영합니다, ${name}님!`;
}

const message = greet("개발자");
console.log(message);
```

Python 코드 예시:

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 피보나치 수열 출력
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

## 인용문

> "좋은 코드는 그 자체가 최고의 문서이다."  
> — Steve McConnell

## 리스트 예시

### 순서 없는 리스트

- 항목 1
- 항목 2
  - 하위 항목 2.1
  - 하위 항목 2.2
- 항목 3

### 순서 있는 리스트

1. 첫 번째 단계
2. 두 번째 단계
3. 세 번째 단계

## 표 예시

| 기술 스택  | 용도            | 버전   |
| ---------- | --------------- | ------ |
| HTML5      | 구조            | -      |
| CSS3       | 스타일링        | -      |
| JavaScript | 기능            | ES6+   |
| marked.js  | 마크다운 파싱   | 11.1.1 |
| Prism.js   | 코드 하이라이팅 | 1.29.0 |

## 이미지 예시

이미지는 다음과 같이 추가할 수 있습니다:

![예시 이미지](https://via.placeholder.com/600x300?text=Example+Image)

## 수평선

---

## 링크 예시

- [GitHub](https://github.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [Stack Overflow](https://stackoverflow.com)

## 글을 마치며

이 블로그는 GitHub Actions를 통해 자동으로 배포됩니다. `pages/` 폴더에 마크다운 파일을 추가하고 푸시하면 자동으로 게시글이 업데이트됩니다.

즐거운 블로깅 되세요! 🚀
