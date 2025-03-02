'use client'

import type React from 'react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { PencilIcon, Camera } from 'lucide-react'
import type { PersonalDataSectionProps } from '../interface'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import type { Education } from '@/modules/RegisterModule/interface'
import { useRouter } from 'next/navigation'

export const PersonalDataSection: React.FC<PersonalDataSectionProps> = ({
  fullname,
  email,
  phone_number,
  address,
  education_level,
  gender,
  educationList,
  profile_picture,
}) => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullname: fullname || '',
    email: email || '',
    phone_number: phone_number || '',
    address: address || '',
    education_level:
      educationList.find((education) => education.level === education_level)
        ?.id || '',
    gender: gender || 'MALE',
    profile_picture: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === 'profile_picture' && files && files[0]) {
      const file = files[0]
      setFormData((prev) => ({ ...prev, [name]: file }))
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const formDataToSend = new FormData()

      // Append all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value)
        }
      })

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/edit`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${getCookie('AT')}`,
          },
          body: formDataToSend,
        }
      )
      const responseJson = await response.json()
      if (responseJson.status !== 200) throw new Error(responseJson.message)
      toast.success('Profil berhasil diperbarui')
      router.refresh()
      setIsEditing(false)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex justify-center items-center py-12 container max-w-screen-lg">
      {/* Profile Section */}
      <div className="flex items-start gap-16 w-full max-w-screen-lg">
        {/* Left Side - Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="w-52 h-60 rounded-t-full px-2 pt-2 border-2 border-b-0 border-[#6C4534]">
            <div className="relative w-full h-full rounded-t-full overflow-hidden">
              <Image
                src={
                  profile_picture || '/assets/images/profile-placeholder.jpg'
                }
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
              className="w-10 h-10 p-0 rounded-2xl aspect-square flex justify-center items-center border-2 border-[#6C4534]"
              onClick={() => setIsEditing(true)}
            >
              <PencilIcon className="w-8 h-8 text-[#6C4534]" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-y-4 text-sm text-[#6C4534]">
            {/* <div className="font-medium">Email</div>
            <div className="font-light">{email ?? '-'}</div> */}

            <div className="font-medium">Nomor Telepon</div>
            <div className="font-light">{phone_number}</div>

            <div className="font-medium">Alamat</div>
            <div className="font-light">{address}</div>

            <div className="font-medium">Pendidikan Terakhir</div>
            <div className="font-light">{education_level}</div>

            <div className="font-medium">Jenis Kelamin</div>
            <div className="font-light">
              {formData.gender === 'MALE' ? 'Laki-laki' : 'Perempuan'}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-[#6C4534] text-xl">
              Edit Data Diri
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {/* Profile Picture Upload */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="profile_picture"
                  className="text-right text-[#6C4534]"
                >
                  Foto Profil
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#6C4534]">
                      <Image
                        src={
                          previewImage ||
                          profile_picture ||
                          '/assets/images/profile-placeholder.jpg'
                        }
                        alt="Profile Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Pilih Foto
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="profile_picture"
                      name="profile_picture"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="text-right text-[#6C4534]">
                  Nama Lengkap
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="col-span-3 border-[#6C4534]"
                />
              </div>
              {/* <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-[#6C4534]">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="col-span-3 border-[#6C4534]"
                />
              </div> */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="phone_number"
                  className="text-right text-[#6C4534]"
                >
                  Nomor Telepon
                </Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="col-span-3 border-[#6C4534]"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right text-[#6C4534]">
                  Alamat
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="col-span-3 border-[#6C4534]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="education_level"
                  className="text-right text-[#6C4534]"
                >
                  Pendidikan
                </Label>
                <Select
                  value={formData.education_level}
                  onValueChange={(value) =>
                    handleSelectChange('education_level', value)
                  }
                >
                  <SelectTrigger className="col-span-3 border-[#6C4534]">
                    <SelectValue placeholder="Pilih pendidikan" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationList &&
                      educationList.map((education: Education) => (
                        <SelectItem key={education.id} value={education.id}>
                          {education.level}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right text-[#6C4534]">
                  Jenis Kelamin
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <SelectTrigger className="col-span-3 border-[#6C4534]">
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Laki-laki</SelectItem>
                    <SelectItem value="FEMALE">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => {
                  setIsEditing(false)
                  setPreviewImage(null)
                }}
                disabled={loading}
              >
                Batal
              </Button>
              <Button disabled={loading} type="submit">
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
