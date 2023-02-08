# framer

[TOC]

> framer-motion의 공식문서를 보고 공부하고, 직접 사용해보면서 장,단점, 기초를 정리해봤다.

## 장점

- 리액트 언마운트시 애니메이션 넣기 쉽게 해줌
- children 애니메이션 동기적으로 컨트롤 가능하게 해줌 (transition delay, stagger 등)
- focus, tap, hover등 애니메이션을 jsx에 넣어줄 수 있음 따로 css로 안빼고 (다른 CSS in JS 에 비해 가독성 좋음)
- layout속성 -> reflow를 줄여줌 -> 최적화

- scroll 애니메이션도 간편하게 (scroll-linked, scroll-triggered)

## 단점

## 기초

### `Animation`

#### animate 설정

`animate`에 준 값이 변경될 때마다 애니메이션이 실행된다. 최초 렌더링시에도 실행된다.

```typescript
<motion.div animate={{ x: 100 }} />
```

#### transition 설정

`motion` 컴포넌트는 각 애니메이션마다 기본 `transition`값을 가지고 있다. `transition` prop을 줌으로써 해당 속성을 변경할 수 있다.

```typescript
<motion.div
  animate={{ x: 100 }}
  transition={{ ease: "easeIn", duration: 0.2 }}
/>
```

#### Enter 애니메이션

`motion` 컴포넌트가 처음 mount될 때 `animate`에 지정된 속성과 기존 `initial` 또는 `style`에 지정된 속성이 다를 경우 자동으로 애니메이션이 실행되면서 `animate`에 지정된 속성값으로 변화한다.

`initial={false}`하면 mount될 때 애니메이션이 없어진다.

#### Exit 애니메이션

컴포넌트가 컴포넌트 트리에서 지워질 때 애니메이션을 준다.

쓰기위해서는 해당 컴포넌트를 `AnimatePresence`로 감싸줘야 한다.

`exit` prop을 줘서 언마운트시 애니메이션을 설정한다.

#### Keyframes

`animate` 속성으로 `keyframes`를 줄 수 있다. 배열 처음부터 순서대로 값이 변경되면서 애니메이션이 실행된다.

```typescript
<motion.div animate={{ opacity: [0, 1, 0] }} />
```

`keyframes`의 처음 값으로 `null`을 주면 현재 컴포넌트가 가지고 있는 속성값이 들어간다. 이를 활용해서 자연스러운 애니메이션이 가능하다

```typescript
<motion.div animate={{ opacity: [null, 1, 0] }} />
```

`keyframes`의 변환 간격은 동일하다. `transition`의 `times`속성을 설정해서 변환 간격을 조정할 수 있다.

```typescript
<motion.div
  animate={{ opacity: [null, 1, 0] }}
  transition={{ times: [0, 0.5, 1] }}
/>
```

#### Gesture 애니메이션

`hover`, `tap`, `drag`, `focus`, `inView` 등의 제스쳐가 발생했을 때 애니메이션을 줄 수 있다.

```typescript
<motion.button
  initial={{ opacity: 0.6 }}
  whileHover={{
    scale: 1.2,
    transition: { duration: 1 },
  }}
  whileTap={{ scale: 0.9 }}
  whileInView={{ opacity: 1 }}
/>
```

#### Variants

`Variants`를 활용해서 `DOM`을 통해 전파되는 애니메이션을 만들거나, 애니메이션들을 선언적으로 조정할 수 있다

##### 애니메이션 하위 children으로 전파

애니메이션들이 일괄적으로 적용되는(ex: 드롭다운, 모달 등)을 감싸는 상위 컴포넌트에 `animate` 속성에 `open`, `closed`같은 `string`을 전달한다. ex) `animate={isOpen ? "open" : "closed"}`

하위컴포넌트에 각각 `animate`속성을 주는 대신 `variants`를 전달한다. `variants`에는 `open`일 때의 애니메이션 속성, `closed`일 떄의 애니메이션 속성이 들어간다. 상위컴포넌트에서 `animate`에 전달되는 `string`값이 변경되면 하위 컴포넌트들에 **전파**되면서 해당 값에 해당하는 애니메이션이 실행된다.

```typescript
import "./styles.css"
import { useState } from "react"
import { motion, Variants } from "framer-motion"

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="menu"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.li variants={itemVariants}>Item 1 </motion.li>
        <motion.li variants={itemVariants}>Item 2 </motion.li>
        <motion.li variants={itemVariants}>Item 3 </motion.li>
        <motion.li variants={itemVariants}>Item 4 </motion.li>
        <motion.li variants={itemVariants}>Item 5 </motion.li>
      </motion.ul>
    </motion.nav>
  )
}
```

즉, `Variants`는 어떤 상태일 때의 애니메이션을 미리 선언해 놓는 것이다.

##### 애니메이션 순서 조정하기

기본적으로 `variants`가 변경되며 전파되는 애니메이션들은 동시에 시작된다. `transition`의 `when`, `delayChildren`,`staggerChildren`등을 활용해 자식 컴포넌트 애니메이션 실행 순서를 조정할 수 있다.

```typescript
const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
}
```

##### 동적 variants

`custom` prop을 활용해서 변수를 동적으로 `variants`에 전달할 수 있다.

```typescript
const variants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0 },
}

return items.map((item, i) => (
  <motion.li custom={i} animate="visible" variants={variants} />
))
```

##### variants 여러개 주기

`variants={["visible", "active"]}`

배열로 전달할 수도 있다.

##### 수동으로 애니메이션 조작하기

여기부턴 다음부터 공식문서 Animation/Overview/Manual controls

### `Layout`

`layoutId`를 주면 새 컴포넌트 생성될때 이전에 있던 컴포넌트 중 `layoutId`가 일치하는 친구가 있다면 자동으로 그 친구에서 애니메이션이 자연스럽게 실행된다. (위치가 변경되거나 할 떄)

### `AnimatePresence`

리액트 컴포넌트 트리에서 컴포넌트가 제거될 때 컴포넌트에 애니메이션을 줄 수 있게 해준다.

사용법은 `exit` 애니메이션을 주고 싶은 컴포넌트들을 `AnimatePresence`로 감싸면 된다.

#### 사용법

```typescript
const MyComponent = () => (
  <AnimatePresence>
    <motion.div key="mDiv" exit={{ opacity: 0 }} />
  </AnimatePresence>
)
```

##### 사용시 주의점

- `AnimatePresence` 내부의 컴포넌트들은 추적가능하게 유일한 `key`를 가지고 있어야 한다.

#### `key`를 활용해 애니메이션 주기

`React`는 `key`가 다르면 기존 컴포넌트 트리를 없애고 새로운 트리를 만든다. 그래서 이전 컴포넌트가 unmount되고 새 컴포넌트가 mount된다.

이걸 활용해서 `AnimatePresence` 내부 컴포넌트의 `key`를 변경해줌으로써 이전 컴포넌트`exit` -> 새 컴포넌트`initial` -> 새 컴포넌트`animate` 순서로 애니메이션을 줄 수 있다.

#### initial animation 작동 안하게 하기

`<AnimatePresence initial={false}>`

`initail` 프로퍼티에 `false` 값을 줌으로써 `AnimatePresence`가 처음 렌더될 때 같이 렌더된 `children`들의 `initial` 애니메이션을 `disable`한다.

// TODO: 직접 써보고 먼지 보기

## 출처

- [Framer Motion 공식문서](https://www.framer.com/motion/)

## 만들어볼 컴포넌트

- 탭과 내용물, 탭 이동시 내용물이 휙 (왼쪽 or 오른쪽) 이동하고 나타남, or 사라졋다가 위로 휙하면서 나타남 (O)
- 목록 나타날때 위에 애부터 차례대로 옆에서 삭 나옴 (O)
- 맥북 or window UI - 휙 밑으로 빨려들어감, 아이콘 클릭시 샥 나옴 끄면 샥 없어짐 (O)
- exit 애니메이션 활용하기 (O)
- 아코디언
- 카드 expansion
- 슬라이드쇼
- notification
- directional stagger
- 로딩창 개쩌는거
- dropdown 촤르륵 나오는거,
- 라우터와 결합해서 path바뀔떄마다 화면 슥 나오게하기
