import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief description of the post for previews and SEO',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'author',
      type: 'object',
      fields: [
        {name: 'name', type: 'string', validation: (rule) => rule.required()},
        {name: 'email', type: 'email'},
        {name: 'bio', type: 'text', rows: 2},
        {name: 'avatar', type: 'image'},
        {name: 'github', type: 'url', title: 'GitHub Profile'},
        {name: 'twitter', type: 'url', title: 'Twitter Profile'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn Profile'},
      ],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Featured Post',
      description: 'Mark this post as featured',
      initialValue: false,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
        {
          name: 'size',
          type: 'string',
          title: 'Display Size',
          options: {
            list: [
              {title: 'Standard', value: 'standard'},
              {title: 'Hero (Large)', value: 'hero'},
              {title: 'Banner (Wide)', value: 'banner'},
            ],
          },
          initialValue: 'standard',
        },
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Frontend', value: 'frontend'},
          {title: 'Backend', value: 'backend'},
          {title: 'Full Stack', value: 'fullstack'},
          {title: 'DevOps', value: 'devops'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'AI/ML', value: 'ai-ml'},
          {title: 'Web3', value: 'web3'},
          {title: 'Tutorial', value: 'tutorial'},
          {title: 'Tips & Tricks', value: 'tips'},
          {title: 'Career', value: 'career'},
          {title: 'Tools', value: 'tools'},
          {title: 'Opinion', value: 'opinion'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Add relevant tags (e.g., React, Node.js, TypeScript)',
    }),
    defineField({
      name: 'difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
      },
      initialValue: 'beginner',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'object',
          name: 'table',
          title: 'Table',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Table Caption',
              description: 'Optional caption for the table',
            },
            {
              name: 'rows',
              type: 'array',
              title: 'Table Rows',
              of: [
                {
                  type: 'object',
                  name: 'tableRow',
                  title: 'Row',
                  fields: [
                    {
                      name: 'cells',
                      type: 'array',
                      title: 'Cells',
                      of: [
                        {
                          type: 'object',
                          name: 'tableCell',
                          title: 'Cell',
                          fields: [
                            {
                              name: 'content',
                              type: 'string',
                              title: 'Content',
                            },
                            {
                              name: 'isHeader',
                              type: 'boolean',
                              title: 'Header Cell',
                              description: 'Mark this cell as a header (th)',
                              initialValue: false,
                            },
                          ],
                          preview: {
                            select: {
                              content: 'content',
                              isHeader: 'isHeader',
                            },
                            prepare(selection) {
                              const {content, isHeader} = selection
                              return {
                                title: content || 'Empty cell',
                                subtitle: isHeader ? 'Header' : 'Data',
                              }
                            },
                          },
                        },
                      ],
                    },
                  ],
                  preview: {
                    select: {
                      cells: 'cells',
                    },
                    prepare(selection) {
                      const {cells} = selection
                      const cellCount = cells?.length || 0
                      const firstCellContent = cells?.[0]?.content || 'Empty row'
                      return {
                        title: `Row (${cellCount} cells)`,
                        subtitle: firstCellContent,
                      }
                    },
                  },
                },
              ],
              validation: (rule) => rule.min(1).error('Table must have at least one row'),
            },
            {
              name: 'style',
              type: 'string',
              title: 'Table Style',
              options: {
                list: [
                  {title: 'Default', value: 'default'},
                  {title: 'Striped Rows', value: 'striped'},
                  {title: 'Bordered', value: 'bordered'},
                  {title: 'Compact', value: 'compact'},
                  {title: 'Minimal', value: 'minimal'},
                ],
              },
              initialValue: 'default',
            },
            {
              name: 'alignment',
              type: 'string',
              title: 'Text Alignment',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Right', value: 'right'},
                ],
              },
              initialValue: 'left',
            },
          ],
          preview: {
            select: {
              caption: 'caption',
              rows: 'rows',
              style: 'style',
            },
            prepare(selection) {
              const {caption, rows, style} = selection
              const rowCount = rows?.length || 0
              const colCount = rows?.[0]?.cells?.length || 0
              return {
                title: caption || 'Table',
                subtitle: `${rowCount} rows × ${colCount} columns | Style: ${style}`,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            {
              name: 'language',
              type: 'string',
              title: 'Language',
              options: {
                list: [
                  {title: 'JavaScript', value: 'javascript'},
                  {title: 'TypeScript', value: 'typescript'},
                  {title: 'Python', value: 'python'},
                  {title: 'Java', value: 'java'},
                  {title: 'C++', value: 'cpp'},
                  {title: 'Go', value: 'go'},
                  {title: 'Rust', value: 'rust'},
                  {title: 'HTML', value: 'html'},
                  {title: 'CSS', value: 'css'},
                  {title: 'SQL', value: 'sql'},
                  {title: 'Bash', value: 'bash'},
                  {title: 'JSON', value: 'json'},
                  {title: 'YAML', value: 'yaml'},
                  {title: 'Dockerfile', value: 'dockerfile'},
                ],
              },
              initialValue: 'javascript',
            },
            {
              name: 'code',
              type: 'text',
              title: 'Code',
              rows: 10,
            },
            {
              name: 'filename',
              type: 'string',
              title: 'Filename (optional)',
              description: 'Display filename above code block',
            },
          ],
          preview: {
            select: {
              language: 'language',
              code: 'code',
              filename: 'filename',
            },
            prepare(selection) {
              const {language, code, filename} = selection
              const title = filename || `${language} code`
              const subtitle = code ? code.substring(0, 50) + '...' : 'Empty code block'
              return {
                title,
                subtitle,
              }
            },
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
            {
              name: 'size',
              type: 'string',
              title: 'Image Size',
              options: {
                list: [
                  {title: 'Small (300px)', value: 'small'},
                  {title: 'Medium (600px)', value: 'medium'},
                  {title: 'Large (800px)', value: 'large'},
                  {title: 'Extra Large (1000px)', value: 'xl'},
                  {title: 'Full Width', value: 'full'},
                ],
              },
              initialValue: 'medium',
            },
            {
              name: 'alignment',
              type: 'string',
              title: 'Image Alignment',
              options: {
                list: [
                  {title: 'Left', value: 'left'},
                  {title: 'Center', value: 'center'},
                  {title: 'Right', value: 'right'},
                ],
              },
              initialValue: 'center',
            },
            {
              name: 'aspectRatio',
              type: 'string',
              title: 'Aspect Ratio',
              description: 'Control how the image is displayed to prevent cropping',
              options: {
                list: [
                  {title: 'Original (No cropping)', value: 'original'},
                  {title: 'Square (1:1)', value: 'square'},
                  {title: 'Landscape (16:9)', value: 'landscape'},
                  {title: 'Portrait (9:16)', value: 'portrait'},
                  {title: 'Wide (21:9)', value: 'wide'},
                ],
              },
              initialValue: 'original',
            },
            {
              name: 'border',
              type: 'boolean',
              title: 'Add Border',
              description: 'Add a subtle border around the image',
              initialValue: false,
            },
            {
              name: 'shadow',
              type: 'boolean',
              title: 'Add Shadow',
              description: 'Add a drop shadow to the image',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              media: 'asset',
              alt: 'alt',
              size: 'size',
              aspectRatio: 'aspectRatio',
            },
            prepare(selection) {
              const {alt, size, aspectRatio} = selection
              return {
                title: alt || 'Image',
                subtitle: `Size: ${size || 'medium'} | Ratio: ${aspectRatio || 'original'}`,
                media: selection.media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'tableOfContents',
      title: 'Table of Contents',
      type: 'boolean',
      description: 'Generate table of contents for this post',
      initialValue: true,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          description: 'Title for search engines (50-60 characters)',
          validation: (rule) => rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          description: 'Description for search engines (150-160 characters)',
          validation: (rule) => rule.max(160),
        },
        {
          name: 'keywords',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Focus Keywords',
          description: 'SEO keywords for this post',
        },
      ],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'post'}]}],
      description: 'Select related posts to show at the end',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {title, author, publishedAt} = selection
      return {
        title,
        subtitle: `by ${author} on ${new Date(publishedAt).toLocaleDateString()}`,
        media: selection.media,
      }
    },
  },
})