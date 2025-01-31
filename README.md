# Module federation example

## Add application

```typescript
npx nx g @nx/react:app cart --directory=apps/cart --routing --style=css --unitTestRunner=jest --bundler=rspack --e2eTestRunner=playwright
```

## hoist 옵션

런타임 공유
hoisted 모드가 활성화되면, Module Federation 런타임이 모든 애플리케이션에서 공유됩니다.
이는 각 리모트 앱이 자신만의 Module Federation 런타임을 가지지 않고, 호스트 앱의 런타임을 공유하게 됩니다.
메모리 효율성
런타임을 공유함으로써 각 리모트 앱이 동일한 런타임 코드를 중복해서 로드하지 않습니다.
이는 전체 애플리케이션의 번들 크기를 줄이고 메모리 사용을 최적화합니다.
일관성 보장
모든 앱이 동일한 Module Federation 런타임을 사용하므로, 버전 충돌이나 불일치 문제를 방지할 수 있습니다.
하지만 hoisted 모드를 끄면:

각 리모트 앱이 자체적인 Module Federation 런타임을 가집니다.
독립적으로 개발하고 테스트하기가 더 쉬워집니다.
호스트 앱에 대한 의존성이 줄어듭니다.
따라서:

프로덕션 환경에서는 hoisted: true가 더 효율적일 수 있습니다.
개발 환경에서는 hoisted: false가 더 편리할 수 있습니다.
