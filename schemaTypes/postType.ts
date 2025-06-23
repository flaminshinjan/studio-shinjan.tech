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
                  {title: 'Small', value: 'small'},
                  {title: 'Medium', value: 'medium'},
                  {title: 'Large', value: 'large'},
                  {title: 'Full Width', value: 'full'},
                ],
              },
              initialValue: 'medium',
            },
          ],
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