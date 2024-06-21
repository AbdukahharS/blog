'use client'

import { PartialBlock } from '@blocknote/core'
import { useCreateBlockNote } from '@blocknote/react'
import { BlockNoteView } from '@blocknote/shadcn'
import { useTheme } from 'next-themes'

import '@blocknote/shadcn/style.css'
import '@blocknote/core/fonts/inter.css'

interface EditorProps {
  initialContent?: string
  editable?: boolean
}

const Editor = ({ initialContent, editable = true }: EditorProps) => {
  const { resolvedTheme } = useTheme()

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  })

  //   const handleChange = () => {
  //     console.log(editor.document)

  //     onChange(JSON.stringify(editor.document))
  //   }

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      //   onChange={handleChange}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}

export default Editor
