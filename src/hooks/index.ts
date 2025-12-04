// Utility hooks barrel export
// Re-exports all hooks from a single entry point

export {
  useCopyToClipboard,
  type UseCopyToClipboardReturn,
  type UseCopyToClipboardOptions,
} from "./useCopyToClipboard"

export {
  useDisclosure,
  type UseDisclosureProps,
  type UseDisclosureReturn,
} from "./useDisclosure"

export {
  useLocalStorage,
  removeLocalStorageItem,
  type UseLocalStorageOptions,
} from "./useLocalStorage"

export {
  useMediaQuery,
  useBreakpoints,
  breakpoints,
  type UseBreakpointsReturn,
} from "./useMediaQuery"

export {
  usePrefersReducedMotion,
  useReducedMotionProps,
  useMotionValue,
} from "./usePrefersReducedMotion"

export { useDebounce } from "./useDebounce"

export { useThrottle } from "./useThrottle"

export { useClickOutside } from "./useClickOutside"

export {
  useKeyboardShortcut,
  formatShortcutKeys,
  type UseKeyboardShortcutOptions,
} from "./useKeyboardShortcut"

export {
  usePrefersColorScheme,
  type ColorScheme,
} from "./usePrefersColorScheme"

export {
  useIntersectionObserver,
  type UseIntersectionObserverOptions,
  type UseIntersectionObserverReturn,
} from "./useIntersectionObserver"

export {
  useFocusTrap,
  type UseFocusTrapOptions,
} from "./useFocusTrap"

export { usePrevious } from "./usePrevious"

export {
  useToggle,
  type UseToggleOptions,
  type UseToggleReturn,
} from "./useToggle"

export { useInterval } from "./useInterval"

export { useTimeout } from "./useTimeout"

export { useOnMount } from "./useOnMount"

export { useOnUnmount } from "./useOnUnmount"

export {
  useSessionStorage,
  removeSessionStorageItem,
  type UseSessionStorageOptions,
} from "./useSessionStorage"

export { useIsClient } from "./useIsClient"
