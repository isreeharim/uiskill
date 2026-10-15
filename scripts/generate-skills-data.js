const fs = require("fs")
const path = require("path")
const os = require("os")

const home = os.homedir()
const dirs = [
  path.join(home, ".gemini/config/skills"),
  path.join(home, ".gemini/antigravity/builtin/skills"),
  path.join(home, ".gemini/config/plugins/android-cli-plugin/skills"),
]

function categorize(name, desc) {
  const d = (name + " " + desc).toLowerCase()
  if (
    d.includes("animate") ||
    d.includes("motion") ||
    d.includes("apple-design") ||
    d.includes("emil") ||
    d.includes("react-bits") ||
    d.includes("banner") ||
    d.includes("design") ||
    d.includes("css") ||
    d.includes("styling") ||
    d.includes("ux") ||
    d.includes("ui") ||
    d.includes("rayden") ||
    d.includes("canvas") ||
    d.includes("html")
  ) {
    return "UI, Design & Motion"
  }
  if (
    d.includes("bug") ||
    d.includes("diagnos") ||
    d.includes("investigat") ||
    d.includes("perform") ||
    d.includes("benchmark") ||
    d.includes("memory") ||
    d.includes("triage")
  ) {
    return "Debugging & Performance"
  }
  if (
    d.includes("test") ||
    d.includes("qa") ||
    d.includes("k6") ||
    d.includes("lambdatest") ||
    d.includes("tdd")
  ) {
    return "Testing & QA Automation"
  }
  if (
    d.includes("review") ||
    d.includes("lint") ||
    d.includes("audit") ||
    d.includes("brooks") ||
    d.includes("logic-lens") ||
    d.includes("architect") ||
    d.includes("harness") ||
    d.includes("codebase")
  ) {
    return "Architecture & Code Review"
  }
  if (
    d.includes("plan") ||
    d.includes("product") ||
    d.includes("spec") ||
    d.includes("office-hours") ||
    d.includes("retro") ||
    d.includes("before-you-build") ||
    d.includes("decision")
  ) {
    return "Product & Planning"
  }
  return "Workflows & Agent Ops"
}

const skills = []
const seen = new Set()

dirs.forEach((baseDir) => {
  if (!fs.existsSync(baseDir)) return

  // Check if baseDir itself has SKILL.md
  const directSkill = path.join(baseDir, "SKILL.md")
  if (fs.existsSync(directSkill)) {
    const skillName = path.basename(baseDir)
    addSkill(skillName, directSkill)
  }

  // Check subdirectories
  const entries = fs.readdirSync(baseDir, { withFileTypes: true })
  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      const p = path.join(baseDir, entry.name, "SKILL.md")
      if (fs.existsSync(p)) {
        addSkill(entry.name, p)
      }
    }
  })
})

function addSkill(name, skillFile) {
  if (seen.has(name)) return
  seen.add(name)

  const content = fs.readFileSync(skillFile, "utf-8")
  let desc = ""

  // First try multiline YAML block scalar
  const multilineMatch = content.match(/description:\s*(?:>[-+]?|\|[-+]?)\r?\n((?:[ \t]+[^\r\n]+\r?\n?)+)/)
  if (multilineMatch) {
    desc = multilineMatch[1]
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
      .join(" ")
  } else {
    const descMatch = content.match(/description:\s*(?:"([^"]+)"|'([^']+)'|([^\r\n]+))/)
    if (descMatch) {
      desc = (descMatch[1] || descMatch[2] || descMatch[3] || "").trim()
    }
  }

  if (!desc || desc === ">-" || desc === "|") {
    const lines = content.split("\n")
    for (const line of lines) {
      const l = line.trim()
      if (l && !l.startsWith("#") && !l.startsWith("---") && !l.startsWith("name:") && !l.startsWith("description:")) {
        desc = l
        break
      }
    }
  }

  const category = categorize(name, desc)
  const normalizedPath = skillFile.replace(/\\/g, "/")
  let sourceType = "User"
  if (normalizedPath.includes("builtin/skills")) {
    sourceType = "Builtin"
  } else if (normalizedPath.includes("plugins")) {
    sourceType = "Plugin"
  }

  const tagList = [
    category.toLowerCase().split(" ")[0].replace(/,/g, ""),
    name.replace(/-/g, " "),
    sourceType.toLowerCase(),
  ]

  // Extract body after frontmatter for previewing
  let bodyExcerpt = ""
  const frontmatterEnd = content.indexOf("---", 3)
  if (frontmatterEnd !== -1) {
    bodyExcerpt = content.slice(frontmatterEnd + 3).trim()
  } else {
    bodyExcerpt = content.trim()
  }
  // Keep up to 3500 chars for clean fast previewing
  if (bodyExcerpt.length > 3500) {
    bodyExcerpt = bodyExcerpt.slice(0, 3500) + "\n\n... (Content truncated for preview. View full SKILL.md in file path)"
  }

  skills.push({
    id: name,
    name: name,
    category: category,
    description: desc || "Agent skill instructions, workflows, and guidelines.",
    path: normalizedPath,
    activationPrompt: `Use the ${name} skill: ${desc}`,
    sourceType: sourceType,
    contentPreview: bodyExcerpt,
    tags: tagList,
  })
}

// Sort alphabetically by name
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

fs.writeFileSync(path.resolve(__dirname, "../src/data/skills-data.ts"), fileContent, "utf-8")
console.log(`Successfully generated src/data/skills-data.ts with ${skills.length} skills!`)
