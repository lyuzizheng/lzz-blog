import { defineConfig, s } from 'velite'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { visit } from 'unist-util-visit'
import type { Root, Node as MdastNode } from 'mdast'

interface CustomVFile {
  history?: string[]
  path?: string
}
import fs from 'node:fs'
import path from 'node:path'

// Sync static assets from content/posts into public/posts
function syncStaticAssets(): void {
  const contentDir = path.resolve('content/posts')
  const publicDir = path.resolve('public/posts')

  function copyRecursive(src: string, relPath: string = ''): void {
    if (!fs.existsSync(src)) return
    const entries = fs.readdirSync(src, { withFileTypes: true })
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const currentRel = relPath ? path.join(relPath, entry.name) : entry.name
      if (entry.isDirectory()) {
        copyRecursive(srcPath, currentRel)
      } else if (entry.isFile() && !entry.name.endsWith('.md') && entry.name !== '.DS_Store') {
        // Copy to original casing
        const dest1 = path.join(publicDir, currentRel)
        fs.mkdirSync(path.dirname(dest1), { recursive: true })
        fs.copyFileSync(srcPath, dest1)

        // Copy to lowercased path for case-insensitive URL match
        const lowerRel = currentRel
          .split(path.sep)
          .map(segment => segment.toLowerCase())
          .join(path.sep)
        const dest2 = path.join(publicDir, lowerRel)
        if (dest2 !== dest1) {
          fs.mkdirSync(path.dirname(dest2), { recursive: true })
          fs.copyFileSync(srcPath, dest2)
        }
      }
    }
  }

  copyRecursive(contentDir)
}

interface ImageNode extends MdastNode {
  type: 'image'
  url: string
  title?: string | null
  alt?: string | null
}
type AstNode = MdastNode & {
  children?: AstNode[]
  data?: Record<string, unknown>
  value?: string
}

const OPEN_NOTICE_REGEX = /(?:\{\{<\s*notice(?:\s+([a-zA-Z0-9_-]+))?(?:\s+title=["']([^"']*)["'])?\s*>\}\}|\{\{%\s*notice(?:\s+([a-zA-Z0-9_-]+))?(?:\s+title=["']([^"']*)["'])?\s*%\}\}|<(?:Notice|Callout|notice|callout)(?:\s+type=["']([^"']*)["'])?(?:\s+title=["']([^"']*)["'])?[^>]*>)/i
const CLOSE_NOTICE_REGEX = /(?:\{\{<\s*\/\s*notice\s*>\}\}|\{\{<\/\s*notice\s*>\}\}|\{\{%\s*\/\s*notice\s*%\}\}|\{\{%\/\s*notice\s*%\}\}|<\/(?:Notice|Callout|notice|callout)>)/i

const YOUTUBE_REGEX = /\{\{<\s*youtube\s+([a-zA-Z0-9_-]+)\s*>\}\}|<YouTube\s+id=["']([a-zA-Z0-9_-]+)["']\s*\/>/i
const BILIBILI_REGEX = /\{\{<\s*bilibili\s+([a-zA-Z0-9_-]+)\s*>\}\}|<Bilibili\s+id=["']([a-zA-Z0-9_-]+)["']\s*\/>/i
const TWEET_REGEX = /\{\{<\s*tweet\s+(?:user=["'][^"']*["']\s+)?id=["']([0-9]+)["'][^>]*>\}\}|<Tweet\s+id=["']([0-9]+)["']\s*\/>/i
const SPOTIFY_REGEX = /\{\{<\s*spotify\s+[^>]*id=["']([a-zA-Z0-9]+)["'][^>]*>\}\}|<Spotify\s+id=["']([a-zA-Z0-9]+)["']\s*\/>/i

function hasCloseNoticeTag(node: unknown): boolean {
  if (!node || typeof node !== 'object') return false
  const n = node as Record<string, unknown>
  if ((n.type === 'text' || n.type === 'html') && typeof n.value === 'string') {
    return CLOSE_NOTICE_REGEX.test(n.value)
  }
  if (Array.isArray(n.children)) {
    return n.children.some(hasCloseNoticeTag)
  }
  return false
}

function stripCloseNoticeTag(node: unknown): void {
  if (!node || typeof node !== 'object') return
  const n = node as Record<string, unknown>
  if ((n.type === 'text' || n.type === 'html') && typeof n.value === 'string') {
    n.value = n.value.replace(CLOSE_NOTICE_REGEX, '').trimEnd()
  }
  if (Array.isArray(n.children)) {
    n.children.forEach(stripCloseNoticeTag)
  }
}

function nodeHasContent(node: unknown): boolean {
  if (!node || typeof node !== 'object') return false
  const n = node as Record<string, unknown>
  if (n.type === 'text' && typeof n.value === 'string') {
    return n.value.trim().length > 0
  }
  if (n.type === 'paragraph' && Array.isArray(n.children)) {
    return n.children.some(nodeHasContent)
  }
  return true
}

function findNoticeOpen(node: AstNode): { match: RegExpMatchArray; textNode: AstNode & { value: string } } | null {
  if (!node) return null
  if ((node.type === 'text' || node.type === 'html') && typeof node.value === 'string') {
    const m = node.value.match(OPEN_NOTICE_REGEX)
    if (m) return { match: m, textNode: node as AstNode & { value: string } }
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      const found = findNoticeOpen(child as AstNode)
      if (found) return found
    }
  }
  return null
}

function transformTree(tree: Root): void {
  const newChildren: AstNode[] = []
  let i = 0

  while (i < tree.children.length) {
    const node = tree.children[i] as AstNode

    // 1. Check for Embeds (YouTube, Bilibili, Tweet, Spotify)
    if (node.type === 'paragraph' && Array.isArray(node.children)) {
      const firstChild = node.children[0]
      if (firstChild && (firstChild.type === 'text' || firstChild.type === 'html') && typeof firstChild.value === 'string') {
        const val = firstChild.value.trim()
        const yt = val.match(YOUTUBE_REGEX)
        if (yt) {
          newChildren.push({
            type: 'parent',
            data: { hName: 'YouTube', hProperties: { id: yt[1] || yt[2] } },
            children: []
          })
          i++
          continue
        }
        const bb = val.match(BILIBILI_REGEX)
        if (bb) {
          newChildren.push({
            type: 'parent',
            data: { hName: 'Bilibili', hProperties: { id: bb[1] || bb[2] } },
            children: []
          })
          i++
          continue
        }
        const tw = val.match(TWEET_REGEX)
        if (tw) {
          newChildren.push({
            type: 'parent',
            data: { hName: 'Tweet', hProperties: { id: tw[1] || tw[2] } },
            children: []
          })
          i++
          continue
        }
        const sp = val.match(SPOTIFY_REGEX)
        if (sp) {
          newChildren.push({
            type: 'parent',
            data: { hName: 'Spotify', hProperties: { id: sp[1] || sp[2] } },
            children: []
          })
          i++
          continue
        }
      }
    }

    // 2. Check for Notice opening
    const openMatch = findNoticeOpen(node)
    if (!openMatch) {
      newChildren.push(node)
      i++
      continue
    }

    const type = openMatch.match[1] || openMatch.match[3] || 'info'
    const title = openMatch.match[2] || openMatch.match[4] || undefined
    const hProperties: Record<string, string> = { type: type.toLowerCase() }
    if (title) hProperties.title = title

    // Case A: Single block notice
    if (hasCloseNoticeTag(node)) {
      openMatch.textNode.value = openMatch.textNode.value.replace(OPEN_NOTICE_REGEX, '').trimStart()
      stripCloseNoticeTag(node)
      if (Array.isArray(node.children)) {
        node.children = node.children.filter((c: AstNode) => c.type !== 'text' || (c.value && c.value.length > 0))
      }
      newChildren.push({
        type: 'parent',
        data: { hName: 'Notice', hProperties },
        children: [node]
      })
      i++
      continue
    }

    // Case B: Multi-block notice
    openMatch.textNode.value = openMatch.textNode.value.replace(OPEN_NOTICE_REGEX, '').trim()
    const noticeChildren: AstNode[] = []
    if (nodeHasContent(node)) {
      noticeChildren.push(node)
    }

    i++
    while (i < tree.children.length) {
      const sibling = tree.children[i] as AstNode
      if (hasCloseNoticeTag(sibling)) {
        stripCloseNoticeTag(sibling)
        if (nodeHasContent(sibling)) {
          noticeChildren.push(sibling)
        }
        i++
        break
      } else {
        noticeChildren.push(sibling)
        i++
      }
    }

    newChildren.push({
      type: 'parent',
      data: { hName: 'Notice', hProperties },
      children: noticeChildren
    })
  }

  tree.children = newChildren as Root['children']
}

// Custom Remark plugin to transform Hugo shortcodes & resolve image paths
function remarkHugoCompatibility() {
  return (tree: Root, file: CustomVFile): void => {
    const filePath = (file.history && file.history[0]) || file.path || ''
    const contentPostsIndex = filePath.indexOf('content/posts/')
    let postDir = ''
    if (contentPostsIndex !== -1) {
      const rel = filePath.substring(contentPostsIndex + 'content/posts/'.length)
      const parts = rel.split('/')
      parts.pop() // remove filename
      postDir = parts.map((p: string) => p.toLowerCase()).join('/')
    }

    // Rewrite relative image URLs
    visit(tree, (node: MdastNode) => {
      if (node.type === 'image') {
        const img = node as ImageNode
        if (img.url && !img.url.startsWith('http://') && !img.url.startsWith('https://') && !img.url.startsWith('/')) {
          let cleanUrl = img.url.replace(/#center$/, '')
          if (cleanUrl.startsWith('./')) cleanUrl = cleanUrl.substring(2)
          img.url = postDir ? `/posts/${postDir}/${cleanUrl}` : `/posts/${cleanUrl}`
        }
      }
    })

    // Transform Hugo notices & embeds in AST
    transformTree(tree)
  }
}

// Run initial static sync
syncStaticAssets()

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true
  },
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.md',
      schema: s
        .object({
          title: s.string(),
          path: s.path(),
          date: s.isodate(),
          author: s.string().default('Zizheng Lyu'),
          summary: s.string().optional(),
          description: s.string().optional(),
          tags: s.array(s.string()).default([]),
          categories: s.array(s.string()).default([]),
          draft: s
            .union([s.boolean(), s.string()])
            .transform(val => (typeof val === 'boolean' ? val : val === 'true' || val === 'tr'))
            .default(false),
          ShowToc: s.boolean().optional(),
          TocOpen: s.boolean().optional(),
          cover: s
            .object({
              image: s.string().optional(),
              alt: s.string().optional(),
              relative: s.boolean().optional(),
              caption: s.string().optional()
            })
            .optional(),
          metadata: s.metadata(),
          toc: s.toc(),
          content: s
            .custom<string>()
            .transform((val, { meta }) => {
              let raw = (val ?? meta.content ?? '') as string
              // Normalize Hugo shortcode syntax to ensure markdown tokenizer parses delimiters cleanly
              raw = raw.replace(/\{\{<\s*notice/gi, '{{< notice ')
              raw = raw.replace(/\{\{<\s*\/\s*notice/gi, '{{< /notice ')
              raw = raw.replace(/\{\{<\/\s*notice/gi, '{{< /notice ')
              raw = raw.replace(/\{\{%\s*notice/gi, '{{% notice ')
              raw = raw.replace(/\{\{%\s*\/\s*notice/gi, '{{% /notice ')
              raw = raw.replace(/\{\{%\/\s*notice/gi, '{{% /notice ')
              raw = raw.replace(/\{\{<\s*youtube/gi, '\n\n{{< youtube')
              raw = raw.replace(/\{\{<\s*bilibili/gi, '\n\n{{< bilibili')
              raw = raw.replace(/\{\{<\s*tweet/gi, '\n\n{{< tweet')
              raw = raw.replace(/\{\{<\s*spotify/gi, '\n\n{{< spotify')
              raw = raw.replace(/<!--\s*more\s*-->/gi, '')
              raw = raw.replace(/\{\{<\s*math\.inline\s*>\}\}([\s\S]*?)\{\{<\/\s*math\.inline\s*>\}\}/gi, '$$$1$$')
              return raw
            })
            .pipe(
              s.mdx({
                gfm: true,
                remarkPlugins: [remarkGfm, remarkMath, remarkHugoCompatibility],
                rehypePlugins: [
                  rehypeSlug,
                  [
                    rehypeAutolinkHeadings,
                    {
                      behavior: 'append',
                      properties: {
                        className: ['heading-anchor'],
                        ariaLabel: 'Link to section'
                      }
                    }
                  ],
                  rehypeKatex,
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        dark: 'vesper',
                        light: 'vitesse-light'
                      },
                      keepBackground: false,
                      defaultLang: 'plaintext'
                    }
                  ]
                ]
              })
            ),
          raw: s.raw()
        })
        .transform(data => {
          // Normalize path: e.g. "posts/essay/I_hate_IM" -> "essay/i_hate_im"
          // "posts/essay/labrador_park/Labrador" -> "essay/labrador_park/labrador"
          // "posts/study/math-typesetting" -> "study/math-typesetting"
          const normalizedPath = data.path.replace(/^posts\//, '')
          const pathSegments = normalizedPath.split('/').map(seg => seg.toLowerCase())
          const slug = pathSegments.join('/')
          const permalink = `/posts/${slug}`

          // Extract primary category (e.g. "essay" or "study")
          const category = pathSegments[0] || (data.categories.length > 0 ? data.categories[0] : 'essay')

          // Derive cover image URL
          let coverImage: string | undefined = undefined
          if (data.cover?.image) {
            const rawCover = data.cover.image.replace(/#center$/, '')
            if (rawCover.startsWith('http://') || rawCover.startsWith('https://') || rawCover.startsWith('/')) {
              coverImage = rawCover
            } else {
              // Relative to the post's directory
              const baseDir = pathSegments.length > 1 ? pathSegments.slice(0, 2).join('/') : pathSegments[0]
              const candidatePath = `/posts/${baseDir}/${rawCover}`
              const diskPath = path.resolve('public', candidatePath.replace(/^\//, ''))
              if (fs.existsSync(diskPath)) {
                coverImage = candidatePath
              }
            }
          }

          // Alias handling for Labrador and other potential legacy links
          const aliases: string[] = []
          if (slug === 'essay/labrador_park/labrador') {
            aliases.push('essay/labrador_park', 'essay/labrador')
          }

          return {
            ...data,
            slug,
            permalink,
            aliases,
            category,
            cover_image: coverImage,
            status: data.draft ? ('draft' as const) : ('published' as const),
            reading_time: data.metadata?.readingTime ?? 5,
            word_count: data.metadata?.wordCount ?? 0,
            excerpt: data.summary || data.description || ''
          }
        })
    }
  }
})
