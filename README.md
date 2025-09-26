# Personal Portfolio (GitHub Pages)

`byungyoung.github.io` 개인 소개 & 포트폴리오 사이트입니다.

## 현재 구성

```
index.html        # 단일 페이지 앱 형태
assets/
	css/style.css   # 다크/라이트 지원 모던 스타일
	js/main.js      # 테마 토글, 인터섹션 애니메이션, 스무스 스크롤
```

## 커스터마이징 해야 할 내용

1. About / Experience / Projects 실제 LinkedIn 기반 내용 치환 (현재 placeholder + i18n 키 적용 완료)
2. Experience 항목 추가 (Action → Impact 형식, 수치 포함 권장)
3. Projects 3~6개 갱신 (Problem → Solution → Result 구조) + Demo/Repo 링크
4. Skills 카테고리 세분화 필요 시 조정
5. 이메일 갱신 완료: `panda10373@gmail.com`
6. og-image 실제 제작 필요 (`assets/og-image.png` placeholder 준비 필요)
7. JSON-LD Person 스키마 추가 완료 (Project 스키마는 후속 가능)
8. Analytics (Plausible 또는 GA4) 원할 시 스크립트 추가 예정

## 배포

User Page 형식 → `main` 브랜치 루트 `index.html` 자동 반영.

## 개발 메모

- 프레임워크 없이 순수 HTML/CSS/JS → 로딩 빠름
- Section anchor 스크롤 네이티브 smooth 처리
- IntersectionObserver 한 번만 초기화하여 성능 부담 최소화

## 구현된 사항 (업데이트)

- 레거시 자산 제거 (기존 multi-page / 이미지 세트 정리 일부 진행)
- SEO: canonical, OG/Twitter meta, color-scheme, JSON-LD(Person)
- i18n 스캐폴드: `data-i18n` + `assets/js/i18n.js` (ko/en)
- 다크/라이트 + 시스템 선호 반영
- 접근성: skip link, focus-visible, reduced motion 대응

## 향후 확장 아이디어

- Project 상세 모달 + 기술 다이어그램 (선택)
- Skills 시각화 (progress / radar)
- Lighthouse 결과 기반 추가 성능 미세 튜닝 (이미지 lazy, preload font 등)
- Blog / Posts 섹션 별도 폴더 + 리스트 생성 스크립트

## 라이선스

개인 포트폴리오 용. 자유롭게 수정/확장.
