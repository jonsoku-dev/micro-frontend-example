# Module Federation 2.0 가이드

## 1. 개요(Intro)

### 1.1 Module Federation이란?

Module Federation(줄여서 MF)은 Webpack 5 때 처음 공개된 “모듈 공유 아키텍처”이며, 최근 Rspack, Vite 등 다양한 번들러에서도 유사한 방식을 지원하게 되었습니다. 서로 다른 프로젝트(마이크로 프런트엔드, 라이브러리 등) 간에 독립적으로 개발·배포된 모듈을 런타임에 동적으로 가져와서 사용하기 위해 설계되었습니다.

• 인프라 및 빌드 복잡도를 줄이고, 팀 간 코드 공유와 독립 배포를 가능하게 함
• Webpack, Rspack, Vite, Nx CLI, Next.js 등 다양한 프레임워크/도구와 결합하여 사용할 수 있음
• Typescript 타입 자동 공유, Chrome DevTools 제공, Plugin 시스템 등을 새롭게 지원한 2.0 버전으로 발전

이 가이드는 2.0 시스템(“@module-federation/enhanced”)에서 제공하는 기능과 설정 방법을 중점적으로 다룹니다.

---

## 2. 핵심 개념(Glossary)

- Producer(Remote)
  모듈을 “exposes” 설정을 통해 외부에 제공하는 역할을 맡는 애플리케이션. 보통 “Remote” 라고도 불립니다.

- Consumer(Host)
  “remotes” 설정으로 외부 모듈을 코드에서 사용(로딩)하는 애플리케이션. 보통 “Host”라고 칭합니다.

- Shared Dependencies
  Producer에서 의존하는 라이브러리가 Consumer에서도 사용된다면, 중복 로딩을 피하기 위해 “shared” 설정을 통해 싱글톤/버전 호환 등을 제어할 수 있습니다.

- manifest (mf-manifest.json)
  MF 2.0에서 추가된 파일 포맷. remoteEntry.js와 함께, 모듈 정보, 추가적인 의존성 매핑 등을 담아둔 매니페스트. Manifest 파일을 사용하면 타입 자동 추출, preload, DevTools 디버깅 등이 가능해집니다.

- Federation Runtime
  빌드 시점이 아닌 런타임 레벨에서 remotes, shared 등 모듈 정보를 등록·관리하며, 동적 로딩/플러그인 시스템을 구현. Webpack이나 Rspack이 아닌 별도의 NPM 패키지로 분리되었습니다.

---

## 3. 설치 및 기본 설정

### 3.1 Webpack 사용 예시

1) 설치
   - npm install @module-federation/enhanced --save
   - webpack.config.js에서 ModuleFederationPlugin 불러오기:

```ts
import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack';

module.exports = {
  output: {
    publicPath: 'http://localhost:3000/', // or 'auto'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      exposes: {
        // 예시
        './Button': './src/Button',
      },
      remotes: {
        // 예시
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js'
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      }
    })
  ]
};
```

### 3.2 Rspack 사용 예시

Rspack의 ModuleFederationPlugin도 “@module-federation/enhanced/rspack”에서 제공됩니다.
rsbuild.config.ts 혹은 rspack.config.js에서 설정 형식이 거의 동일하나, Rspack 전역 옵션(rspack 문서 참고)이 약간 다를 수 있습니다.

```ts
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default {
  output: { publicPath: 'http://localhost:3002/' },
  plugins: [
    new ModuleFederationPlugin({
      name: 'rspack_provider',
      filename: 'remoteEntry.js',
      exposes: { './button': './src/button.tsx' },
      remotes: {
        remote: 'remote@http://localhost:3001/remoteEntry.js'
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
    })
  ]
};
```

### 3.3 Vite 사용 예시

“@module-federation/vite” 패키지 설치 후, vite.config.js 내에 federation 함수를 호출하면 됩니다.

```ts
import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    federation({
      name: 'vite_provider',
      exposes: { './Button': './src/Button' },
      remotes: { remoteApp: 'remoteApp@http://localhost:3004/mf-manifest.json' },
      shared: ['react', 'react-dom']
    })
  ]
});
```

### 3.4 Nx Monorepo 사용

Nx CLI 사용 시, “@nx/angular” 혹은 “@nx/react” 의 host / remote 생성기를 통해 Module Federation 구조를 쉽게 생성할 수 있습니다. nx 19~20에서 캐싱, DevRemotes, 빌드 파이프라인 등 기능을 제공하며, “module-federation.config.js” 혹은 “webpack.config.js”에서 자동 설정이 이뤄집니다.

---

## 4. 상세 설정(Configuration Overview)

아래는 첨부 문서에서 발췌한 주요 설정 필드입니다. 자세한 내용은 “configure/” 문서를 참조하세요.

1) name
   - 필수 값이며, Producer/Consumer의 고유 식별자 역할

2) filename
   - remoteEntry.js(디폴트) 등. Producer에서 생성할 원격 엔트리 파일명

3) exposes
   - Producer가 외부로 노출할 모듈의 경로
   - 예: { './Button': './src/components/Button.tsx' }

4) remotes
   - Consumer에서 참조할 외부 모듈들
   - 예: { remote1: 'remote1@<http://localhost:3001/mf-manifest.json>' }

5) shared
   - 라이브러리 중복 로딩, 버전 충돌 등을 제어하기 위해 사용
   - singleton, eager, requiredVersion 등의 옵션을 지원

6) dev / dts / manifest / runtimePlugins / experiments 등 확장 옵션
   - 타입 자동 생성(dts), manifest 생성, plugin 시스템 등에 사용

---

## 5. 런타임(Runtime) & 고급 기능

### 5.1 Federation Runtime

“@module-federation/enhanced/runtime”에서 import할 수 있는 init, loadRemote, registerRemotes 등 메서드를 이용해, 빌드 도구 없이도 동적 로딩·엔트리 등록 등이 가능합니다.
예:

```ts
import { init, loadRemote } from '@module-federation/enhanced/runtime';

init({
  name: 'host',
  remotes: [
    { name: 'remote1', entry: 'http://localhost:3001/mf-manifest.json', alias: 'remote1' }
  ],
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
  }
});

// 동적 로딩
loadRemote('remote1/Button').then((Button) => { /* ... */ });
```

### 5.2 Chrome DevTools

크롬 확장 프로그램 “Module Federation DevTools” 설치 시,
• 현재 페이지에서 로딩된 Remotes/Exposes/Shared 목록, 버전, 의존 관계를 시각화
• 원격 모듈 프록시(온라인 -> 로컬) 기능
• mf-manifest.json이 필수(Manifest 기반)

### 5.3 Hoisted Runtime (experiments.federationRuntime = 'hoisted')

• 추가 실험 기능으로서, runtime을 entrypoint가 아닌 별도 “hoisted” chunk로 분리하여, 단일 runtime chunk 사용 가능
• async startup, eager consumption 문제 감소
• 향후 shared runtime 등 확장 가능성

### 5.4 Types 자동 추출(dts.generateTypes)

build 시점에 “@mf-types” 폴더나 ZIP으로 Producer의 TS 타입이 생성되어 Consumer 쪽에서 원격 모듈 실시간 타입 힌트를 받을 수 있습니다.
• typed hot reload, third-party package type extraction 등 제공
• tsconfig.json paths에 “./@mf-types/*” 매핑 필요
• 다양한 옵션 (extractRemoteTypes, extractThirdParty 등)

---

## 6. 오류 해결 / 트러블슈팅

아래는 “guide/troubleshooting” 문서에 기재된 대표 오류 예시입니다.

1) RUNTIME-001
   - remoteEntryUrl이 올바르지 않거나, remoteEntry가 container를 제대로 등록하지 못함
   - 해결: 포트·경로가 맞는지, runtimeChunk 설정이 꺼져 있는지 확인

2) RUNTIME-002
   - container init 함수가 undefined
   - runtimeChunk, 시점 문제 등으로 mf-init 로직이 호출 안 됐을 가능성

3) BUILD-001
   - “exposes” 모듈 경로가 잘못됐거나 Next.js 등에서 webpack path가 충돌

4) TYPE-001
   - TS 타입 빌드 실패. tsconfig가 누락되었거나, exposes 필드가 “./Foo” 형태를 제대로 잡지 못함
   - 해결: “**/@mf-types/**”를 webpack watchOptions.ignored에 추가하여 루프 방지; paths 매핑 재확인

---

## 7. 프레임워크별 심화 사례

### 7.1 Next.js

• @module-federation/nextjs-mf 플러그인을 사용
• SSR 지원 (단, App Router는 미지원이라고 명시)
• next/dynamic 대신 React.lazy 권장 (Hydration error 방지)
• Dev mode 시 next private local webpack 설정 필요

### 7.2 Angular

• Nx나 @angular-architects/module-federation 같은 커스텀 빌더 사용 가능
• SSR도 지원 (Nx >= 15.4)
• Shared 되는 @angular/core 등은 singleton + strictVersion으로 충돌 방지
• LazyLoad 방식을 routing module에 적용해서 remote 모듈 라우팅

### 7.3 React (CRA, Rspack, Vite)

• CRA -> rsbuild로 마이그레이션하거나 @module-federation/enhanced/webpack 설치
• React.lazy, Suspense 로 remote 모듈 동적 import
• i18n, Auth0/Okta 연동 시 shared state/단일 인증토큰 관리가 중요
• Nx 19+ 또는 Turborepo, Lerna 등 모노레포 환경 병행 사용 시 빌드 최적화 가능

---

## 8. Plugin 시스템 & Runtime Hooks

Module Federation 2.0은 runtime 시점에서 플러그인 등록이 가능합니다. 예: RetryPlugin, NodePlugin 등.
• beforeRequest, afterResolve, onLoad, errorLoadRemote, loadShare, createScript 등의 훅 제공
• 재시도 로직, custom fetch, preloadRemote, ESM/JSON 등 다양한 형태를 확장 가능

---

## 9. 성능 및 운영

1) 캐싱·프리로딩
   - preloadRemote, preloadAssets 등 활용해 초기 로딩 시간을 단축
   - Nx나 Turborepo의 CI 캐시와 병행하면 빌드 속도 개선

2) 모니터링
   - Chrome DevTools, logs, API gateway, remoteEntry URLs 접근성 체크
   - Sentry, Datadog 등으로 runtime error와 version mismatch 추적

3) CD(Continuous Deployment)
   - Producer(Remote)는 독립 배포 가능
   - Consumer(Host)는 manifest를 통해 최신 버전을 자동으로 인입 가능 (단, MAJOR 버전 차이 등은 주의)

---

## 10. 결론 및 권장 활용

Module Federation 2.0은 기존 Webpack 한계를 넘어 Rspack, Vite, Nx, Node 런타임 등 다양한 환경에서 모듈 공유와 동적 로딩을 구현할 수 있게 해줍니다.

- 마이크로 프런트엔드(MFE) 아키텍처를 더욱 쉽게 구성. 독립 개발·배포와 코드 재사용의 균형 추구
- 프레임워크별 플러그인 생태계(Next.js, Angular, React 등) 잘 활용하며, 런타임 DevTools, Typed-Hot-Reload 기능으로 개발 편의성 극대화
- 점진적으로 기존 레거시 Webpack 기반 프로젝트를 Rspack or Nx + MF로 이전 시, 대규모 트래픽이나 빌드 시간 문제도 완화 가능

추가 문의가 있다면 [공식 문서](https://module-federation.io/), [GitHub 이슈](https://github.com/module-federation/core/issues), [Chrome DevTools](https://chrome.google.com/webstore/detail/module-federation/aeoilchhomapofiopejjlecddfldpeom) 등을 참조하세요.

---

## 참고 링크

- ModuleFederation Docs: <https://module-federation.io/>
- GitHub Examples: <https://github.com/module-federation/module-federation-examples>
- Nx 모놀리포 + Module Federation: <https://nx.dev/concepts/module-federation>
- Rspack Repo: <https://github.com/web-infra-dev/rspack>
- Vite Plugin: <https://github.com/module-federation/vite>
- 오류 가이드: /guide/troubleshooting
- 타입 가이드: /guide/basic/type-prompt
