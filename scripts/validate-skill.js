#!/usr/bin/env node

/** Validate the root skill and every bundled skill under skills/. */
const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
const ROOT_SKILL = path.join(ROOT, "SKILL.md")
const SKILLS_DIR = path.join(ROOT, "skills")
const NAME_RE = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/
let errors = 0
let warnings = 0

function report(ok, message) {
  console.log(`${ok ? "✅" : "❌"} ${message}`)
  if (!ok) errors += 1
}
function warn(message) {
  console.log(`⚠️  ${message}`)
  warnings += 1
}

function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) return { content, fields: null }

  const fields = {}
  let blockKey = null
  for (const line of match[1].split(/\r?\n/)) {
    const key = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (key) {
      blockKey = key[2] === "|" || key[2] === "|-" ? key[1] : null
      fields[key[1]] = blockKey ? "" : key[2].replace(/^['"]|['"]$/g, "").trim()
    } else if (blockKey && /^\s+/.test(line)) {
      fields[blockKey] += `${fields[blockKey] ? "\n" : ""}${line.trim()}`
    }
  }
  return { content, fields }
}

function validateSkill(filePath, expectedDirectoryName = null) {
  const relative = path.relative(ROOT, filePath).replace(/\\/g, "/")
  const { content, fields } = readFrontmatter(filePath)
  if (!fields) {
    report(false, `${relative}: missing or malformed YAML frontmatter`)
    return
  }

  const name = fields.name || ""
  const description = fields.description || ""
  report(Boolean(name), `${relative}: required 'name' is present`)
  if (name) report(name.length <= 64 && NAME_RE.test(name) && !name.includes("--"), `${relative}: name '${name}' follows Agent Skills naming rules`)
  report(Boolean(description), `${relative}: required 'description' is present`)
  if (description) report(description.length <= 1024, `${relative}: description is <= 1024 characters`)
  report(content.slice(content.indexOf("---") + 3).trim().length > 0, `${relative}: skill body is non-empty`)

  if (expectedDirectoryName) {
    report(name === expectedDirectoryName, `${relative}: name matches directory '${expectedDirectoryName}'`)
  }

  const linkPattern = /\[[^\]]*\]\(([^)#]+)(?:#[^)]+)?\)/g
  for (const match of content.matchAll(linkPattern)) {
    const target = match[1].trim()
    if (!target || /^(https?:|mailto:|#)/i.test(target)) continue
    const resolved = path.resolve(path.dirname(filePath), target)
    report(resolved.startsWith(ROOT + path.sep) && fs.existsSync(resolved), `${relative}: local reference resolves: ${target}`)
  }
}

console.log("\n==========================================")
console.log("       UI SKILL VALIDATION SUITE          ")
console.log("==========================================\n")

if (!fs.existsSync(ROOT_SKILL)) report(false, "Root SKILL.md is missing")
else validateSkill(ROOT_SKILL)

if (!fs.existsSync(SKILLS_DIR)) {
  warn("skills/ directory is missing; bundled skills were not checked")
} else {
  for (const entry of fs.readdirSync(SKILLS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const skillFile = path.join(SKILLS_DIR, entry.name, "SKILL.md")
    if (!fs.existsSync(skillFile)) report(false, `skills/${entry.name}: SKILL.md is missing`)
    else validateSkill(skillFile, entry.name)
  }
}

const requiredReferences = [
  "references/01-decision-framework.md",
  "references/02-shadcn-and-base-ui.md",
  "references/03-enterprise-powerhouses.md",
  "references/04-saas-design-systems.md",
  "references/05-creative-and-motion.md",
  "references/06-component-crosswalk.md",
  "references/07-theming-tokens-and-dark-mode.md",
  "references/08-accessibility-and-rsc.md",
  "references/09-licensing-and-free-tier-guide.md",
  "references/10-react-bits-catalog.md",
  "references/11-enterprise-giants-and-ecosystem.md",
  "references/12-awesome-react-components-directory.md",
]
for (const reference of requiredReferences) {
  report(fs.existsSync(path.join(ROOT, reference)), `Required reference exists: ${reference}`)
}

console.log(`\nErrors: ${errors} | Warnings: ${warnings}`)
if (errors) {
  console.log("❌ Validation failed.")
  process.exit(1)
}
console.log("🎉 Validation passed.")
