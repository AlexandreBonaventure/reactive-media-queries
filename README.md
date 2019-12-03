# reactive-media-queries
Simple and declarative media queries triggers. Written in Typescript.
Define breakpoints and get notified when it changes.

## Installation
```sh
npm install reactive-media-queries
#or
yarn add reactive-media-queries
```

## Usage
Create an instance:
`new ReactiveMediaQueries(breakpoints, callback)`

*Instance Methods*
`destroy` -> Teardown all listeners

## Example
```js
const reactiveMediaQueries = new ReactiveMediaQueries({
  phone: 768,
  tablet: 1024,
  desktop: 1440,
  desktopXL: Infinity,
}, (key) => {
  // whenever a matched breakpoint changes this callback is triggered and the key argument is the current breakpoint id
  // eg: key == phone | tablet | desktop | desktopXL
  console.log('Current breakpoint is: ' + key);
})

// if you need to unsubscribe to media queries and detach event listeners just call destroy
reactiveMediaQueries.destroy()
```

### Need dynamic breakpoints?
Just spawn a `new ReactiveMediaQueries(breakpoints)` 

## Usage with hooks (Vue, React, etc...)
### Vue composition API Example
```js
import ReactiveMediaQueries from 'reactive-media-queries';
import { ref } from '@vue/composition-api';

const currentBreakpoint = ref(null);

(() => new ReactiveMediaQueries({
  phone: 768,
  tablet: 1024,
  desktop: 1440,
  desktopXL: Infinity,
}, (key) => {
  currentBreakpoint.value = key;
}))();

export default function useMQ () {
  return { currentBreakpoint };
}
```