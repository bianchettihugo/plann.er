import { AtSign, Plus, X } from 'lucide-react'
import { Input } from '../input'
import { Button } from '../button'
import { useState } from 'react'
import { Tag } from '../tag'

interface GuestSelectorProps {
  onClose: (emails: string[]) => void
  emails: string[]
}

export function GuestSelector({ onClose, emails }: GuestSelectorProps) {
  const [guestEmail, setGuestEmail] = useState('')
  const [guestEmails, setGuestEmails] = useState<string[]>(emails)

  function handleAddGuestClick(e: any) {
    e.preventDefault()
    setGuestEmail('')
    if (guestEmails.includes(guestEmail)) return
    setGuestEmails((state) => [...state, guestEmail])
  }

  function handleRemoveGuest(email: string) {
    setGuestEmails((state) => state.filter((item) => item !== email))
  }

  return (
    <div className="w-[640px] bg-zinc-900 flex flex-col px-6 py-5 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-xl text-white font-semibold">Select guests</p>
        <button
          type="button"
          onClick={() => onClose(guestEmails)}
          className="text-zinc-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <p className="text-zinc-400 text-base">
        The guests will receive an email invitation to confirm their attendance.
      </p>
      <div className="w-full my-2 flex flex-wrap">
        {guestEmails.map((email) => (
          <Tag text={email} onRemove={handleRemoveGuest} />
        ))}
        ,
      </div>
      <div className="w-full h-[1.5px] bg-zinc-800 my-4">&nbsp;</div>
      <form onSubmit={handleAddGuestClick}>
        <Input
          placeholder="Type the email of the guest"
          leading={<AtSign className="w-5 h-5" />}
          className="w-full"
          type="email"
          name="guest"
          background="dark"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          focusOnAction
          required
          trailing={
            <Button type="submit">
              Invite <Plus className="w-5 h-5 pt-[0.3px]" />
            </Button>
          }
        />
      </form>
    </div>
  )
}
