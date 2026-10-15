const fs = require("fs")
const path = require("path")
const os = require("os")

const repoRoot = path.resolve(__dirname, "..")
const bundledSkillsRoot = path.join(repoRoot, "skills")
const outputPath = path.join(repoRoot, "src/data/skills-data.ts")
const includeLocal = process.argv.includes("--include-local") || process.env.UISKILL_INCLUDE_LOCAL_SKILLS === "1"
const checkOnly = process.argv.includes("--check")

function categorize(name, desc) {
  const d = `${name} ${desc}`.toLowerCase()
  if (["animate", "motion", "apple-design", "emil", "react-bits", "banner", "design", "css", "styling", "ux", "ui", "rayden", "canvas", "html"].some((term) => d.includes(term))) {
    return "UI, Design & Motion"
  }
  if (["bug", "diagnos", "investigat", "perform", "benchmark", "memory", "triage"].some((term) => d.includes(term))) {
    return "Debugging & Performance"
  }
  if (["test", "qa", "k6", "lambdatest", "tdd"].some((term) => d.includes(term))) {
    return "Testing & QA Automation"
  }
  if (["review", "lint", "audit", "brooks", "logic-lens", "architect", "harness", "codebase"].some((term) => d.includes(term))) {
    return "Architecture & Code Review"
  }
  if (["plan", "product", "spec", "office-hours", "retro", "before-you-build", "decision"].some((term) => d.includes(term))) {
    return "Product & Planning"
  }
  return "Workflows & Agent Ops"
}

function parseSkill(content) {
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : ""
  const body = frontmatterMatch ? frontmatterMatch[2].trim() : content.trim()

  const nameMatch = frontmatter.match(/^name:\s*(?:"([^"]+)"|'([^']+)'|([^\r\n]+))$/m)
  const name = (nameMatch?.[1] || nameMatch?.[2] || nameMatch?.[3] || "").trim()

  let desc = ""
  const multilineMatch = frontmatter.match(/description:\s*(?:>[-+]?|\|[-+]?)\r?\n((?:[ \t]+[^\r\n]+\r?\n?)+)/)
  if (multilineMatch) {
    desc = multilineMatch[1]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .join(" ")
  } else {
    const descMatch = frontmatter.match(/^description:\s*(?:"([^"]+)"|'([^']+)'|([^\r\n]+))$/m)
    desc = (descMatch?.[1] || descMatch?.[2] || descMatch?.[3] || "").trim()
  }

  return { name, desc, body }
}

function discoverSkillFiles(rootDir) {
  if (!fs.existsSync(rootDir)) return []

  return fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(rootDir, entry.name, "SKILL.md"))
    .filter((skillFile) => fs.existsSync(skillFile))
}

function addSkill(skills, seen, skillFile, sourceType) {
  const content = fs.readFileSync(skillFile, "utf8")
  const { name, desc, body } = parseSkill(content)
  if (!name || seen.has(name)) return

  seen.add(name)

  const relativePath = path.relative(repoRoot, skillFile).split(path.sep).join("/")
  const category = categorize(name, desc)
  const tagList = [
    category.toLowerCase().split(" ")[0].replace(/,/g, ""),
    name.replace(/-/g, " "),
    sourceType.toLowerCase(),
  ]

  const bodyExcerpt = body.length > 3500
    ? `${body.slice(0, 3500)}\n\n... (Content truncated for preview. View full SKILL.md in file path)`
    : body

  skills.push({
    id: name,
    name,
    category,
    description: desc || "Agent skill instructions, workflows, and guidelines.",
    path: relativePath,
    activationPrompt: `Use the ${name} skill: ${desc}`,
    sourceType,
    contentPreview: bodyExcerpt,
    tags: tagList,
  })
}

const skills = []
const seen = new Set()

// The repository's bundled skills are the canonical, reproducible source.
for (const skillFile of discoverSkillFiles(bundledSkillsRoot)) {
  addSkill(skills, seen, skillFile, "User")
}

// Machine-local skill discovery is intentionally opt-in. This keeps generation
// deterministic for CI and other contributors while preserving the old local
// discovery workflow when explicitly requested.
if (includeLocal) {
  const home = os.homedir()
  const localRoots = [
    path.join(home, ".gemini/config/skills"),
    path.join(home, ".gemini/antigravity/builtin/skills"),
    path.join(home, ".gemini/config/plugins/android-cli-plugin/skills"),
  ]

  for (const root of localRoots) {
    const sourceType = root.includes("builtin/skills") ? "Builtin" : root.includes("plugins") ? "Plugin" : "User"
    for (const skillFile of discoverSkillFiles(root)) {
      addSkill(skills, seen, skillFile, sourceType)
    }
  }
}

skills.sort((a, b) => a.name.localeCompare(b.name))

const fileContent = `export interface AgentSkillItem {
  id: string
  name: string
  category: "UI, Design & Motion" | "Architecture & Code Review" | "Debugging & Performance" | "Testing & QA Automation" | "Product & Planning" | "Workflows & Agent Ops"
  description: string
  path: string
  activationPrompt: string
  sourceType: "User" | "Builtin" | "Plugin"
  contentPreview: string
  tags: string[]
}

export const AGENT_SKILLS_DATA: AgentSkillItem[] = ${JSON.stringify(skills, null, 2)}
`

if (checkOnly) {
  if (!fs.existsSync(outputPath)) {
    console.error(`Missing generated file: ${path.relative(repoRoot, outputPath)}`)
    process.exit(1)
  }
  const current = fs.readFileSync(outputPath, "utf8")
  if (current !== fileContent) {
    console.error("Generated skills data is stale. Run: npm run generate:skills")
    process.exit(1)
  }
  console.log(`Skills data is up to date (${skills.length} bundled skills).`)
} else {
  fs.writeFileSync(outputPath, fileContent, "utf8")
  console.log(`Successfully generated ${path.relative(repoRoot, outputPath)} with ${skills.length} skills.`)
}
