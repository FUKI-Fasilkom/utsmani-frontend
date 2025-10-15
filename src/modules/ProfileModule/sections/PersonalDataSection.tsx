'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
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
import { Label } from '@/components/ui/label'
import { Camera, Loader2 } from 'lucide-react'
import type { UserProfile } from '../interface'
import { getCookie } from 'cookies-next'
import { toast } from 'sonner'
import type { Education } from '@/modules/RegisterModule/interface'
import { useRouter } from 'next/navigation'

const fetchEducationData = async (): Promise<Education[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/education`,
      { cache: 'no-store' }
    )
    if (!response.ok) throw new Error('Gagal memuat data pendidikan.')
    const data = await response.json()
    return data.contents || []
  } catch (error: any) {
    toast.error(error.message)
    return []
  }
}

export const PersonalDataSection: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [educationList, setEducationList] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    birthdate: '',
    address: '',
    education_level: '',
    gender: 'MALE',
    profile_picture: null as File | null,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const fetchProfileData = useCallback(async () => {
    const at = getCookie('AT')
    if (!at) {
      toast.error('Sesi Anda berakhir, silakan login kembali.')
      router.push('/login?next=/profile')
      return
    }
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        { headers: { Authorization: `Bearer ${at}` }, cache: 'no-store' }
      )
      if (response.status === 401) {
        toast.error('Sesi Anda berakhir, silakan login kembali.')
        router.push('/login?next=/profile')
        return
      }
      if (!response.ok) throw new Error('Gagal memuat profil.')

      const data = await response.json()
      setProfile(data.contents)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchProfileData()
    fetchEducationData().then(setEducationList)
  }, [fetchProfileData])

  useEffect(() => {
    if (profile) {
      setFormData((prev) => ({
        ...prev,
        fullname: profile.fullname || '',
        email: profile.email || '',
        birthdate: profile.birthdate || '',
        address: profile.address || '',
        gender: profile.gender || 'MALE',
        education_level:
          educationList.find((edu) => edu.level === profile.education_level)
            ?.id || '',
      }))
    }
  }, [profile, educationList])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === 'profile_picture' && files?.[0]) {
      const file = files[0]
      setFormData((prev) => ({ ...prev, profile_picture: file }))
      setPreviewImage(URL.createObjectURL(file))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitLoading(true)
    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value)
      })

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile/edit`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${getCookie('AT')}` },
          body: formDataToSend,
        }
      )
      const responseJson = await response.json()
      if (!response.ok) throw new Error(responseJson.message)

      toast.success('Profil berhasil diperbarui')
      setPreviewImage(null)
      fetchProfileData() // Re-fetch profile data
    } catch (error: any) {
      toast.error(error.message || 'Gagal memperbarui profil')
    } finally {
      setSubmitLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="p-8 text-center text-gray-500">
        Gagal memuat data profil.
      </div>
    )
  }

  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profil Saya</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
            <Image
              src={
                previewImage ||
                profile.profile_picture ||
                '/assets/images/profile-placeholder.jpg'
              }
              alt="Profile Preview"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-4 h-4 mr-2" /> Ubah Foto
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={profile.username}
              disabled
              className="mt-1 bg-gray-100"
            />
          </div>
          <div>
            <Label htmlFor="phone_number">No. HP</Label>
            <Input
              id="phone_number"
              value={profile.phone_number}
              disabled
              className="mt-1 bg-gray-100"
            />
          </div>
          <div>
            <Label htmlFor="fullname">Nama Lengkap</Label>
            <Input
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="birthdate">Tanggal Lahir</Label>
            <Input
              id="birthdate"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="gender">Jenis Kelamin</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleSelectChange('gender', value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih jenis kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Laki-laki</SelectItem>
                <SelectItem value="FEMALE">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="education_level">Pendidikan Terakhir</Label>
            <Select
              value={formData.education_level}
              onValueChange={(value) =>
                handleSelectChange('education_level', value)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Pilih pendidikan" />
              </SelectTrigger>
              <SelectContent>
                {educationList.map((edu) => (
                  <SelectItem key={edu.id} value={edu.id}>
                    {edu.level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="address">Alamat</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={submitLoading} className="px-8">
            {submitLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  )
}
