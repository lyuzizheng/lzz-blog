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

interface TextNode extends MdastNode {
  type: 'text'
  value: string
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

    visit(tree, (node: MdastNode) => {
      // 1. Rewrite relative image URLs
      if (node.type === 'image') {
        const img = node as ImageNode
        if (img.url && !img.url.startsWith('http://') && !img.url.startsWith('https://') && !img.url.startsWith('/')) {
          let cleanUrl = img.url.replace(/#center$/, '')
          if (cleanUrl.startsWith('./')) cleanUrl = cleanUrl.substring(2)
          img.url = postDir ? `/posts/${postDir}/${cleanUrl}` : `/posts/${cleanUrl}`
        }
      }

      // 2. Transform Hugo shortcodes in text nodes
      if (node.type === 'text') {
        const txt = node as TextNode
        if (typeof txt.value === 'string') {
          let text = txt.value

          // {{< math.inline >}}...{{</ math.inline >}} -> $...$
          text = text.replace(/\{\{<\s*math\.inline\s*>\}\}([\s\S]*?)\{\{<\/\s*math\.inline\s*>\}\}/g, '$$$1$$')

          // {{< youtube ID >}} -> YouTube component
          text = text.replace(/\{\{<\s*youtube\s+([a-zA-Z0-9_-]+)\s*>\}\}/g, '<YouTube id="$1" />')

          // {{< bilibili ID >}} -> Bilibili component
          text = text.replace(/\{\{<\s*bilibili\s+([a-zA-Z0-9_-]+)\s*>\}\}/g, '<Bilibili id="$1" />')

          // {{< tweet user="..." id="..." >}} -> Tweet component
          text = text.replace(/\{\{<\s*tweet\s+(?:user="[^"]*"\s+)?id="([0-9]+)"[^>]*>\}\}/g, '<Tweet id="$1" />')

          // {{< spotify ... id="..." ... >}} -> Spotify component
          text = text.replace(/\{\{<\s*spotify\s+[^>]*id="([a-zA-Z0-9]+)"[^>]*>\}\}/g, '<Spotify id="$1" />')

          // Notice shortcodes: {{< notice >}} -> <Notice>, {{< /notice >}} -> </Notice>
          text = text.replace(/\{\{<\s*notice\s*>\}\}/g, '<Notice>')
          text = text.replace(/\{\{<\/\s*notice\s*>\}\}/g, '</Notice>')

          // Strip <!--more-->
          text = text.replace(/<!--\s*more\s*-->/g, '')

          txt.value = text
        }
      }
    })
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
          content: s.mdx({
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
          }),
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
