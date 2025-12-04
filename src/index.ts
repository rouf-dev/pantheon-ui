// Styles
import './styles/globals.css'

// Design Tokens (Adamas)
export * from './tokens'

// Utility Hooks
export * from './hooks'

// Theme Provider
export {
  ThemeProvider,
  useTheme,
  useThemeOptional,
  accentPresets,
  themePresets,
  defaultTheme,
  slateTheme,
  roseTheme,
  type ThemeMode,
  type ResolvedTheme,
  type HSLValue,
  type ThemeColors,
  type Theme,
  type PartialTheme,
  type PartialThemeColors,
  type AccentColor,
  type AccentPreset,
  type ThemePreset,
  type ThemeConfig,
  type ThemeContextValue,
  type ThemeProviderProps,
} from './components/ThemeProvider'

// UI Components (Production-ready)
export * from './components/ui/accordion'
export * from './components/ui/alert'
export * from './components/ui/alert-dialog'
export * from './components/ui/aspect-ratio'
export * from './components/ui/avatar'
export * from './components/ui/badge'
export * from './components/ui/breadcrumb'
export * from './components/ui/button'
export * from './components/ui/card'
export * from './components/ui/checkbox'
export * from './components/ui/collapsible'
export * from './components/ui/combobox'
export * from './components/ui/command'
export * from './components/ui/companion-dialog'
export * from './components/ui/data-table'
export * from './components/ui/date-picker'
export * from './components/ui/dialog'
export * from './components/ui/drawer'
export * from './components/ui/dropdown-menu'
export * from './components/ui/empty-state'
export * from './components/ui/glass'
export * from './components/ui/input'
export * from './components/ui/password-input'
export * from './components/ui/search-input'
export * from './components/ui/number-input'
export * from './components/ui/kbd'
export * from './components/ui/label'
export * from './components/ui/pagination'
export * from './components/ui/popover'
export * from './components/ui/progress'
export * from './components/ui/radio-group'
export * from './components/ui/scroll-area'
export * from './components/ui/select'
export * from './components/ui/separator'
export * from './components/ui/sheet'
export * from './components/ui/skeleton'
export * from './components/ui/slider'
export * from './components/ui/spinner'
export * from './components/ui/split-dialog'
export * from './components/ui/switch'
export * from './components/ui/table'
export * from './components/ui/tabs'
export * from './components/ui/textarea'
export * from './components/ui/toast'
export * from './components/ui/toggle'
export * from './components/ui/toggle-group'
export * from './components/ui/tooltip'
export * from './components/ui/typography'

// Glass Components (deprecated - use variant="glass" on components instead)
export * from './components/glass/GlassCard'
export * from './components/glass/GlassModal'

// Motion System (Pantheon animations)
export * from './lib/motion'

// Utils
export { cn } from './lib/utils'
