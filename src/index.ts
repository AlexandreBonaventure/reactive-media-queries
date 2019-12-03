
interface BreakpointsOptions {
  [key: string]: number;
}
interface MediaQueryConfig {
  [key: string]: string;
}

function convertBreakpointsToMediaQueries(breakpoints: BreakpointsOptions): MediaQueryConfig {
  const keys = Object.keys(breakpoints)
  const values = keys.map(key => breakpoints[key])
  const breakpointValues = [0, ...values.slice(0, -1)]
  const mediaQueries = breakpointValues.reduce((sum, value, index) => {
    const isLast = index === keys.length - 1
    const minWidth = `${value}px`
    const maxWidth = !isLast ? `${breakpointValues[index + 1] - 1}px` : ''
    const mediaQuery: string = `(min-width: ${minWidth})` + (maxWidth && ` and (max-width: ${maxWidth})`)
    return Object.assign(sum, {
      [keys[index]]: mediaQuery,
    })
  }, {})
  return mediaQueries
}

function subscribeToMediaQuery(id: string, mediaQuery: string, callback: (id: string) => any): () => any {
  const mql = window.matchMedia(mediaQuery)
  const cb: (obj: any) => any = ({ matches }) => {
    if (matches) callback(id)
  }
  mql.addListener(cb) // subscribing
  cb(mql) // initial trigger
  return () => mql.removeListener(cb) // return unsubscribtion
}


function reactToBreakpoints(breakpoints: BreakpointsOptions, callback: (id: string) => any) {
  const teardowns: Array<() => any> = []
  const mediaQueriesStrings = convertBreakpointsToMediaQueries(breakpoints)
  for (const key in mediaQueriesStrings) {
    const mediaQuery = mediaQueriesStrings[key]
    const teardown = subscribeToMediaQuery(key, mediaQuery, (id) => {
      callback(id)
    })
    teardowns.push(teardown)
  }
  const destroy = () => {
    for (let teardown of teardowns) {
      teardown()
    }
  }
  return destroy
}

export default reactToBreakpoints

