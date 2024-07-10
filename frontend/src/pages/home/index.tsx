import {
  ArrowRight,
  Calendar,
  MapPin,
  Settings2,
  UserRoundPlus,
} from 'lucide-react'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import logo from '../../assets/logo.svg'
import { useState } from 'react'
import { GuestSelector } from '../../components/guest_selector'

export function Home() {
  const [isLocationSelected, setIsLocationSelected] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)
  const [guests, setGuests] = useState<string[]>([])

  function handleContinueClick() {
    setIsLocationSelected((state) => !state)
  }

  function handleGuestModalOpen() {
    setIsGuestModalOpen(true)
  }

  function handleGuestModalClose(emails: string[]) {
    setGuests(emails)
    setIsGuestModalOpen(false)
  }

  return (
    <div className="bg-zinc-950 h-screen flex items-center justify-center bg-[url('/home_bg.png')] bg-no-repeat bg-center">
      <div className="w-full max-w-3xl ">
        <div className="flex flex-col items-center gap-1 py-10">
          <img src={logo} alt="Plann.er" className="w-44" />
          <p className="text-zinc-300 text-xl">
            Invite your friends and plan your next trip!
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <Input
            placeholder="Where are you going?"
            leading={<MapPin className="w-5 h-5" />}
            className="w-full"
            disabled={isLocationSelected}
            trailing={
              <div className="flex items-center justify-end">
                <div className="w-[180px]">
                  <Input
                    placeholder="When?"
                    leading={<Calendar className="w-5 h-5" />}
                    outlined={false}
                    disabled={isLocationSelected}
                    density="small"
                  />
                </div>
                <div className="w-0.5 h-full bg-zinc-800 text-zinc-800 mx-5">
                  &nbsp;
                </div>
                {isLocationSelected ? (
                  <Button onClick={handleContinueClick} variant="secondary">
                    Change location <Settings2 className="w-5 h-5 pt-[0.3px]" />
                  </Button>
                ) : (
                  <Button onClick={handleContinueClick}>
                    Confirm <ArrowRight className="w-5 h-5 pt-[0.3px]" />
                  </Button>
                )}
              </div>
            }
          />
          {isLocationSelected && (
            <Input
              placeholder="Who are you going with?"
              leading={<UserRoundPlus className="w-5 h-5" />}
              className="w-full"
              disabled={!isLocationSelected}
              onFocus={handleGuestModalOpen}
              readOnly
              value={
                guests.length === 0
                  ? ''
                  : `${guests.length} ${guests.length === 1 ? 'person' : 'people'} invited`
              }
              trailing={
                <Button>
                  Confirm Trip <ArrowRight className="w-5 h-5 pt-[0.3px]" />
                </Button>
              }
            />
          )}
        </div>

        <div className="flex flex-col items-center gap-1 py-10">
          <p className="text-zinc-500 text-base text-center">
            To plan your next trip on Plann.er, you automatically agree
            <br /> to our{' '}
            <a href="" className="text-zinc-300 underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="" className="text-zinc-300 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {isGuestModalOpen && (
        <div className="fixed flex flex-col items-center justify-center inset-0 bg-black bg-opacity-50">
          <GuestSelector onClose={handleGuestModalClose} emails={guests} />
        </div>
      )}
    </div>
  )
}
