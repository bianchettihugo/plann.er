import { X } from 'lucide-react'

interface TagProps {
  text: string
  onRemove: (tag: string) => void
}

export function Tag({ text, onRemove }: TagProps) {
  return (
    <div className="bg-zinc-800 px-3 py-1.5 rounded-md mr-2 mt-2 text-zinc-300 flex justify-between items-center gap-3">
      {text}
      <button
        type="button"
        onClick={() => {
          onRemove(text)
        }}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
