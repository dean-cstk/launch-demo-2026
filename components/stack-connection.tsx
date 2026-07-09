'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type StackSummary = {
  contentTypesCount: number
  entriesCount: number
  assetsCount: number
  contentTypes: { uid: string; title: string; entryCount: number }[]
  environment: string
  apiHost: string | null
}

type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; summary: StackSummary }
  | { status: 'error'; error: string }

export function StackConnectionButton() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<FetchState>({ status: 'idle' })
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const loadSummary = useCallback(async () => {
    setState({ status: 'loading' })
    try {
      const res = await fetch('/api/stack-summary')
      const body = await res.json()
      if (body.ok) {
        setState({ status: 'success', summary: body.summary })
      } else {
        setState({ status: 'error', error: body.error ?? 'Could not connect to the stack.' })
      }
    } catch {
      setState({ status: 'error', error: 'Could not reach the server to check the stack connection.' })
    }
  }, [])

  const handleOpen = useCallback(() => {
    setOpen(true)
    loadSummary()
  }, [loadSummary])

  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#49A466]/40 bg-black/40 px-10 py-3.5 text-center text-sm font-bold text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-transparent hover:bg-[#49A466] hover:text-black active:scale-95 sm:w-auto touch-manipulation"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#49A466] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#49A466]" />
        </span>
        My Stack
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="stack-modal-title"
            className="glass w-full max-w-lg rounded-2xl bg-[#0f0f0f] p-6 text-left shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id="stack-modal-title" className="text-xl font-bold text-white">
                  My Stack
                </h2>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">
                  Contentstack connection
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            {state.status === 'loading' && (
              <div className="flex items-center gap-3 py-8 text-white/70">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#49A466]" />
                Connecting to stack…
              </div>
            )}

            {state.status === 'error' && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-sm font-semibold text-red-300">Stack not connected</p>
                <p className="mt-1 text-sm text-red-200/80">{state.error}</p>
              </div>
            )}

            {state.status === 'success' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <StatTile label="Content types" value={state.summary.contentTypesCount} />
                  <StatTile label="Entries" value={state.summary.entriesCount} />
                  <StatTile label="Assets" value={state.summary.assetsCount} />
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/50">
                  <span>
                    Environment: <span className="text-white/80">{state.summary.environment}</span>
                  </span>
                  {state.summary.apiHost && (
                    <span>
                      API host: <span className="text-white/80">{state.summary.apiHost}</span>
                    </span>
                  )}
                </div>

                {state.summary.contentTypes.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                      Content types
                    </p>
                    <ul className="max-h-48 space-y-1 overflow-y-auto pr-1">
                      {state.summary.contentTypes.map((ct) => (
                        <li
                          key={ct.uid}
                          className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm"
                        >
                          <span className="text-white/90">{ct.title}</span>
                          <span className="text-white/50">
                            {ct.entryCount} {ct.entryCount === 1 ? 'entry' : 'entries'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-[#49A466]/30 bg-[#49A466]/10 px-3 py-4 text-center">
      <div className="text-2xl font-extrabold text-white">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/50">{label}</div>
    </div>
  )
}
