import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { PersonalDataSectionProps } from '../interface'

export const PersonalDataSection: React.FC<PersonalDataSectionProps> = ({
  fullname,
  email,
  phone_number,
  address,
  education_level,
  gender,
}) => {
  return (
    <section className="flex justify-center items-center py-12 container max-w-screen-lg">
      {/* Profile Section */}
      <div className="flex items-start gap-16 w-full max-w-screen-lg">
        {/* Left Side - Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="w-52 h-60 rounded-t-full px-2 pt-2 border-2 border-b-0 border-[#6C4534]">
            <div className="relative w-full h-full rounded-t-full overflow-hidden ">
              <Image
                src="https://img.freepik.com/premium-photo/smiling-muslim-man-wearing-kufi_856987-707.jpg"
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-center text-[#6C4534] font-semibold mt-4">
            {fullname}
          </p>
        </div>

        {/* Right Side - Personal Data */}
        <div className="flex-1 bg-white rounded-2xl border-2 border-[#6C4534] p-6 drop-shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div className="border-2 border-[#6C4534] py-1.5 px-8 rounded-full">
              <h2 className="text-xl font-semibold text-[#6C4534]">
                Data Diri
              </h2>
            </div>
            <Button
              variant="tertiary"
              className="w-10 h-10 p-0 rounded-2xl aspect-square flex justify-center items-center border-2  border-[#6C4534]"
            >
              <PencilIcon className="w-8 h-8 text-[#6C4534]" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-y-4 text-sm text-[#6C4534]">
            <div className="font-medium">Email</div>
            <div className="font-light">{email ?? '-'}</div>

            <div className="font-medium">Nomor Telepon</div>
            <div className="font-light">{phone_number}</div>

            {/* <div className="font-medium">Tanggal Lahir</div>
            <div className="font-light">{birthdate}</div> */}

            <div className="font-medium">Alamat</div>
            <div className="font-light">{address}</div>

            <div className="font-medium">Pendidikan Terakhir</div>
            <div className="font-light">{education_level}</div>

            <div className="font-medium">Jenis Kelamin</div>
            <div className="font-light">
              {gender === 'MALE' ? 'Laki-laki' : 'Perempuan'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
