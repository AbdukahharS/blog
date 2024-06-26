'use client'

import { PartialBlock } from '@blocknote/core'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/shadcn'
import { useTheme } from 'next-themes'

import '@blocknote/core/fonts/inter.css'
import '@blocknote/shadcn/style.css'

import './styles.css'

interface EditorProps {
  initialContent?: string
  editable?: boolean
  setChanged: (bool: boolean) => void
  setContent: (content: string) => void
}

const Editor = ({
  initialContent,
  editable = true,
  setChanged,
  setContent,
}: EditorProps) => {
  const { resolvedTheme } = useTheme()

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  })

  const handleChange = () => {
    setChanged(true)
    setContent(JSON.stringify(editor.document))
  }

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      onChange={handleChange}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      data-theming-css-demo
    />
  )
}

export default Editor
