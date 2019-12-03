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
This library exports a single function with the following signature:
`reactToBreakpoints(breakpoints, callback) => teardownFunction`
It returns a teardown function that you can use to remove all the DOM listeners.

## Example
```js
import reactToBreakpoints from 'reactive-media-queries'

const teardownListeners = reactToBreakpoints({
  phone: 768,
  tablet: 1024,
  desktop: 1440,
  desktopXL: Infinity,
}, (key) => {
  // whenever a matched breakpoint changes this callback is triggered and the key argument is the current breakpoint id
  // eg: key == phone | tablet | desktop | desktopXL
  console.log('Current breakpoint is: ' + key);
})

// if you need to unsubscribe to media queries and detach event listeners just call the function return by reactToBreakpoints()
teardownListeners()
```

### Need dynamic breakpoints?
Just teardown previous listeners and run `reactToBreakpoints(newBreakpoints, callback)` 

## Usage with hooks (Vue, React, etc...)
### Vue composition API Example
```js
import ReactiveMediaQueries from 'reactive-media-queries';
import { ref } from '@vue/composition-api';

const currentBreakpoint = ref(null);

reactToBreakpoints({
  phone: 768,
  tablet: 1024,
  desktop: 1440,
  desktopXL: Infinity,
}, (key) => {
  currentBreakpoint.value = key;
})();

export default function useMQ () {
  return { currentBreakpoint };
}
```