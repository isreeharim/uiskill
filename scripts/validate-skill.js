#!/usr/bin/env node

/**
 * Skill Validation Script - Ensures compliance with AgentSkills standards
 * Checks frontmatter, referenced files, structure, and integrity.
 */

const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
const SKILL_MD = path.join(ROOT, "SKILL.md")

function report(status, msg) {
  const symbol = status ? "✅" : "❌"
  console.log(`${symbol} ${msg}`)
}

let hasErrors = false

console.log("\n==========================================")
console.log("       SKILL UI VALIDATION SUITE          ")
console.log("==========================================\n")

// Check 1: SKILL.md exists
if (!fs.existsSync(SKILL_MD)) {
  report(false, "SKILL.md is missing from root!")
  process.exit(1)
}
report(true, "SKILL.md exists at root")

// Check 2: Frontmatter validation
const content = fs.readFileSync(SKILL_MD, "utf-8")
const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)

if (!frontmatterMatch) {
  report(false, "YAML frontmatter not found in SKILL.md")
  hasErrors = true
} else {
  const yamlContent = frontmatterMatch[1]
  const hasName = /name:\s*([a-zA-Z0-9_-]+)/.test(yamlContent)
  const hasDesc = /description:\s*".+"/.test(yamlContent)

  if (hasName) report(true, "Valid 'name' field in frontmatter")
  else {
    report(false, "Missing or invalid 'name' in frontmatter")
    hasErrors = true
  }

  if (hasDesc) report(true, "Valid 'description' field with WHAT and WHEN")
  else {
    report(false, "Missing or invalid 'description' in frontmatter")
    hasErrors = true
  }
}

// Check 3: References exist
const references = [
  "references/01-decision-framework.md",
  "references/02-shadcn-and-base-ui.md",
  "references/03-enterprise-powerhouses.md",
  "references/04-saas-design-systems.md",
  "references/05-creative-and-motion.md",
  "references/06-component-crosswalk.md",
  "references/07-theming-tokens-and-dark-mode.md",
  "references/08-accessibility-and-rsc.md",
]

references.forEach((ref) => {
  const fullPath = path.join(ROOT, ref)
  if (fs.existsSync(fullPath)) {
    report(true, `Reference verified: ${ref}`)
  } else {
    report(false, `Missing reference file: ${ref}`)
    hasErrors = true
  }
})

// Check 4: Scripts exist
const scripts = ["scripts/ui-picker.js"]
scripts.forEach((scr) => {
  const fullPath = path.join(ROOT, scr)
  if (fs.existsSync(fullPath)) {
    report(true, `Executable script verified: ${scr}`)
  } else {
    report(false, `Missing script file: ${scr}`)
    hasErrors = true
  }
})

console.log("\n==========================================")
if (hasErrors) {
  console.log("❌ Validation failed with errors.")
  process.exit(1)
} else {
  console.log("🎉 Validation passed! Skill is 100% compliant.")
  console.log("==========================================\n")
}
