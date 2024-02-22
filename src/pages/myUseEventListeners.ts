import { getCurrentScope, onScopeDispose, toValue, watch } from 'vue'

export function myUseEventListeners(target: HTMLElement, events: string, handler: EventListenerOrEventListenerObject) {
  const cleanups: Function[] = []
  const cleanup = () => {
    cleanups.forEach((fn) => {
      fn()
    })
    cleanups.length = 0
  }

  const register = (el: HTMLElement, events: string, handler: EventListenerOrEventListenerObject) => {
    el.addEventListener(events, handler)
    return () => el.removeEventListener(events, handler)
  }

  watch(() => unrefElement(target), (el) => {
    cleanup()
    if (!el)
      return
    el = toValue(el)
    cleanups.push(register(el, events, handler))
  }, { immediate: true })

  onScopeDispose(() => {
    cleanup()
  })
}

// export function myUseEventListeners(...args: any[]) {
//   debugger
//   let target
//   let events
//   let listeners
//   let options

//   if (typeof args[0] === 'string' || Array.isArray(args[0])) {
//     [events, listeners, options] = args
//     target = window
//   }
//   else {
//     [target, events, listeners, options] = args
//   }

//   if (!target)
//     return () => {}

//   if (!Array.isArray(events))
//     events = [events]
//   if (!Array.isArray(listeners))
//     listeners = [listeners]

//   const cleanups: Function[] = []
//   const cleanup = () => {
//     cleanups.forEach(fn => fn())
//     cleanups.length = 0
//   }

//   const register = (el: any, event: string, listener: any, options: any) => {
//     el.addEventListener(event, listener, options)
//     return () => el.removeEventListener(event, listener, options)
//   }

//   const stopWatch = watch(
//     () => [unrefElement(target), toValue(options)],
//     ([el, options]) => {
//       cleanup()
//       if (!el)
//         return

//       cleanups.push(
//         ...(events as string[]).flatMap((event) => {
//           return (listeners as Function[]).map(listener => register(el, event, listener, options))
//         }),
//       )
//     },
//     { immediate: true, flush: 'post' },
//   )

//   const stop = () => {
//     stopWatch()
//     cleanup()
//   }

//   tryOnScopeDispose(stop)

//   return stop
// }

function unrefElement(elRef) {
  const plain = toValue(elRef)
  return plain?.$el ?? plain
}
export function tryOnScopeDispose(fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
