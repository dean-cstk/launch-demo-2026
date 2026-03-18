#!/usr/bin/env node
/**
 * Runs after a successful `next build` — terminal-only surprise (no page changes).
 * Set NO_COLOR=1 or run in non-TTY to disable ANSI colors.
 */

const color =
  !process.env.NO_COLOR && process.stdout.isTTY
    ? (codes) => codes
    : () => ''

const m = color('\x1b[35m')
const b = color('\x1b[1m')
const c = color('\x1b[96m')
const w = color('\x1b[37m')
const d = color('\x1b[2m')
const x = color('\x1b[0m')

const rocket = `
${d}                    . *  ·${x}
${m}                       /\\${x}
${m}                      /  \\${x}   ${c}_.-^._${x}
${m}                     / ${w}^${m}  \\${x}  ${c}/       \\${x}
${m}                    /______\\${x} ${c}|  ${w}GO${c}  |${x}
${m}                    ${w}|${m}  ${w}##${m}  ${w}|${x}${c}  \\_______/${x}
${m}                    ${w}|${m}__${w}##${m}__${w}|${x}
${m}                   ${w}/${m}   ${w}||${m}   ${w}\\${x}
${m}                  ${w}/_${m}___${w}||${m}___${w}_\\${x}
${d}                   ~   thrusters   ~${x}
`

const launch = `
${b}${m}    ██████╗      ${c}█████╗     ${w}██╗   ██╗${m}    ███╗   ██╗${c}    ██████╗${w}    ██╗  ██╗${m}    ██╗${x}
${b}${m}    ██╔══██╗    ${c}██╔══██╗    ${w}██║   ██║${m}    ████╗  ██║${c}    ██╔══██╗${w}    ██║  ██║${m}    ██║${x}
${b}${m}    ██████╔╝    ${c}███████║    ${w}██║   ██║${m}    ██╔██╗ ██║${c}    ██║  ██║${w}    ███████║${m}    ██║${x}
${b}${m}    ██╔══██╗    ${c}██╔══██║    ${w}██║   ██║${m}    ██║╚██╗██║${c}    ██║  ██║${w}    ██╔══██║${m}    ╚═╝${x}
${b}${m}    ██║  ██║    ${c}██║  ██║    ${w}╚██████╔╝${m}    ██║ ╚████║${c}    ██████╔╝${w}    ██║  ██║${m}    ██╗${x}
${b}${m}    ╚═╝  ╚═╝    ${c}╚═╝  ╚═╝     ${w}╚═════╝ ${m}    ╚═╝  ╚═══╝${c}    ╚═════╝ ${w}    ╚═╝  ╚═╝${m}    ╚═╝${x}
`

const footer = `
${c}${b}  ═══════════════════════════════════════════════════════════════════${x}
${w}       ${b}Site is live.${x}  ${d}Thank you for launching with Contentstack.${x}
${c}${b}  ═══════════════════════════════════════════════════════════════════${x}
`

process.stdout.write('\n')
process.stdout.write(rocket)
process.stdout.write(launch)
process.stdout.write(footer)
process.stdout.write('\n')
