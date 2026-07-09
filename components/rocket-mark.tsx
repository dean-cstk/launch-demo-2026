import { ROCKET_SVG_PATH } from '@/lib/rocket-path'

type Props = {
  className?: string
  'aria-hidden'?: boolean
}

/**
 * Inline rocket (same glyph as favicon) — zero network vs Material Symbols (~3.8MB).
 */
export function RocketMark({ className, 'aria-hidden': ariaHidden = true }: Props) {
  return (
    <svg
      viewBox="0 -960 960 960"
      className={className}
      fill="#49A466"
      aria-hidden={ariaHidden}
      focusable="false"
    >
      <path d={ROCKET_SVG_PATH} />
    </svg>
  )
}
