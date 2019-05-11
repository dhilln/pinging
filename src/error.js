function fatal(explainer, error) {
  console.log(`[PINGING FATAL ERROR] ${explainer}:\n    "${error}"\n`)
  process.exit(1)
}
exports.fatal = fatal

function nonfatal(explainer, error) {
  console.log(`[PINGING NON-FATAL ERROR] ${explainer}:\n    "${error}"\n`)
  process.exit(1)
}
exports.nonfatal = nonfatal

function warning(explainer, warning) {
  console.log(`[PINGING WARNING] ${explainer}:\n    "${warning}"\n`)
  process.exit(1)
}
exports.warning = warning
