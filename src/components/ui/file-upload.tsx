import * as React from 'react'
import { cn } from '@/lib/utils'
import { Upload, X, File, FileImage, FileText } from 'lucide-react'
import { Button } from './button'

export interface FileUploadFile {
  file: File
  preview?: string
  progress?: number
  error?: string
  id: string
}

export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onDrop'> {
  /**
   * Accepted file types
   * @example 'image/*' | '.pdf,.doc' | 'image/png,image/jpeg'
   */
  accept?: string
  /**
   * Allow multiple files
   * @default false
   */
  multiple?: boolean
  /**
   * Maximum file size in bytes
   * @default 5242880 (5MB)
   */
  maxSize?: number
  /**
   * Maximum number of files
   * @default 1
   */
  maxFiles?: number
  /**
   * Current files
   */
  value?: FileUploadFile[]
  /**
   * Callback when files change
   */
  onChange?: (files: FileUploadFile[]) => void
  /**
   * Callback when files are dropped/selected
   */
  onDrop?: (acceptedFiles: File[], rejectedFiles: File[]) => void
  /**
   * Disable the dropzone
   * @default false
   */
  disabled?: boolean
  /**
   * Show preview for images
   * @default true
   */
  showPreview?: boolean
  /**
   * Animation for file items
   * @default 'scale'
   */
  animation?: 'scale' | 'fade' | 'slide' | false
}

/**
 * FileUpload - Drag-and-drop file upload
 * 
 * Features:
 * - Drag and drop files
 * - Click to browse
 * - File preview (images)
 * - File type validation
 * - File size validation
 * - Multiple files support
 * - Remove files
 * - Progress tracking
 * 
 * @example
 * ```tsx
 * const [files, setFiles] = useState<FileUploadFile[]>([])
 * 
 * <FileUpload
 *   accept="image/*"
 *   multiple
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   maxFiles={5}
 *   value={files}
 *   onChange={setFiles}
 *   showPreview
 * />
 * ```
 */
export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      accept,
      multiple = false,
      maxSize = 5 * 1024 * 1024, // 5MB
      maxFiles = 1,
      value = [],
      onChange,
      onDrop,
      disabled = false,
      showPreview = true,
      animation = 'scale',
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = React.useState(false)

    const processFiles = React.useCallback(
      (files: FileList | File[]) => {
        const fileArray = Array.from(files)
        const acceptedFiles: File[] = []
        const rejectedFiles: File[] = []

        fileArray.forEach((file) => {
          // Check file size
          if (maxSize && file.size > maxSize) {
            rejectedFiles.push(file)
            return
          }

          // Check file type
          if (accept) {
            const acceptedTypes = accept.split(',').map((type) => type.trim())
            const fileType = file.type
            const fileExtension = `.${file.name.split('.').pop()}`

            const isAccepted = acceptedTypes.some((type) => {
              if (type.startsWith('.')) {
                return fileExtension === type
              }
              if (type.endsWith('/*')) {
                return fileType.startsWith(type.replace('/*', ''))
              }
              return fileType === type
            })

            if (!isAccepted) {
              rejectedFiles.push(file)
              return
            }
          }

          acceptedFiles.push(file)
        })

        // Check max files
        const totalFiles = value.length + acceptedFiles.length
        if (totalFiles > maxFiles) {
          const allowedCount = maxFiles - value.length
          acceptedFiles.splice(allowedCount)
        }

        onDrop?.(acceptedFiles, rejectedFiles)

        // Create file objects with preview
        const newFiles: FileUploadFile[] = acceptedFiles.map((file) => ({
          file,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          id: Math.random().toString(36).substr(2, 9),
        }))

        onChange?.([...value, ...newFiles])
      },
      [accept, maxSize, maxFiles, value, onChange, onDrop]
    )

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        setIsDragging(true)
      }
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (disabled) return

      const { files } = e.dataTransfer
      if (files && files.length > 0) {
        processFiles(files)
      }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target
      if (files && files.length > 0) {
        processFiles(files)
      }
      // Reset input
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    const handleRemove = (id: string) => {
      const fileToRemove = value.find((f) => f.id === id)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      onChange?.(value.filter((f) => f.id !== id))
    }

    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click()
      }
    }

    // Cleanup previews on unmount
    React.useEffect(() => {
      return () => {
        value.forEach((file) => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview)
          }
        })
      }
    }, [value])

    return (
      <div ref={ref} className={cn('space-y-4', className)} {...props}>
        {/* Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={cn(
            'relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-muted-foreground/50',
            disabled && 'cursor-not-allowed opacity-50',
            'motion-safe:transition-all motion-safe:duration-200'
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            disabled={disabled}
            className="sr-only"
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <Upload
              className={cn(
                'h-10 w-10 text-muted-foreground',
                isDragging && 'text-primary motion-safe:animate-bounce'
              )}
            />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragging ? 'Drop files here' : 'Drag & drop files here'}
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse
              </p>
            </div>
            {(accept || maxSize) && (
              <div className="text-xs text-muted-foreground">
                {accept && <p>Accepted: {accept}</p>}
                {maxSize && <p>Max size: {formatFileSize(maxSize)}</p>}
              </div>
            )}
          </div>
        </div>

        {/* File List */}
        {value.length > 0 && (
          <div className="space-y-2">
            {value.map((fileObj) => (
              <FileItem
                key={fileObj.id}
                fileObj={fileObj}
                onRemove={() => handleRemove(fileObj.id)}
                showPreview={showPreview}
                animation={animation}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)
FileUpload.displayName = 'FileUpload'

interface FileItemProps {
  fileObj: FileUploadFile
  onRemove: () => void
  showPreview: boolean
  animation?: 'scale' | 'fade' | 'slide' | false
}

function FileItem({ fileObj, onRemove, showPreview, animation }: FileItemProps) {
  const { file, preview, progress, error } = fileObj

  const animationClasses = React.useMemo(() => {
    if (animation === false) return ''

    switch (animation) {
      case 'scale':
        return 'motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:duration-200'
      case 'fade':
        return 'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200'
      case 'slide':
        return 'motion-safe:animate-in motion-safe:slide-in-from-left motion-safe:duration-200'
      default:
        return ''
    }
  }, [animation])

  const icon = React.useMemo(() => {
    if (file.type.startsWith('image/')) return FileImage
    if (file.type.startsWith('text/') || file.type.includes('document')) return FileText
    return File
  }, [file.type])

  const Icon = icon

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border bg-card p-3 text-card-foreground',
        error && 'border-destructive',
        animationClasses
      )}
    >
      {/* Preview/Icon */}
      {showPreview && preview ? (
        <img
          src={preview}
          alt={file.name}
          className="h-12 w-12 rounded object-cover"
        />
      ) : (
        <Icon className="h-8 w-8 text-muted-foreground" />
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
        {progress !== undefined && progress < 100 && (
          <div className="mt-1 h-1.5 w-full rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all motion-safe:duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Remove button */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Remove {file.name}</span>
      </Button>
    </div>
  )
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export interface DropzoneProps extends FileUploadProps {
  /**
   * Custom content inside dropzone
   */
  children?: React.ReactNode
}

/**
 * Dropzone - Alias for FileUpload with custom content support
 */
export const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  ({ children, ...props }, ref) => {
    if (children) {
      return (
        <FileUpload ref={ref} {...props}>
          {children}
        </FileUpload>
      )
    }
    return <FileUpload ref={ref} {...props} />
  }
)
Dropzone.displayName = 'Dropzone'
