import React, { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { Pen } from 'lucide-react'
import {
  UpdateCompanyProfile,
  UpdateHrProfile,
  UpdateLogo
} from '@/axios/api/company.api'
import {
  setData
} from '@/redux/authSlice'
import NavbarCompany from './shared/NavbarCompany'

const CompanyProfile = () => {
  const { data } = useSelector(store => store.auth)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const [companyData, setCompanyData] = useState({
    companyName: '',
    contactNumber: '',
    locations: [''],
    description: '',
    tech: [''],
    members: '',
    websiteLink: '',
    establishment: ''
  })

  const [hrData, setHrData] = useState({
    hrName: '',
    hrEmail: '',
    hrPhone: ''
  })

  const [logoFile, setLogoFile] = useState(null)

  useEffect(() => {
    if (data) {
      setCompanyData({
        companyName: data.companyName || '',
        contactNumber: data.contactNumber || '',
        locations: data.locations || [''],
        description: data.description || '',
        tech: data.tech || [''],
        members: data.members || '',
        websiteLink: data.websiteLink || '',
        establishment: data.establishment || '',
        email: data.email || ''
      })

      setHrData({
        hrName: data.hrName || '',
        hrEmail: data.hrEmail || '',
        hrPhone: data.hrPhone || ''
      })
      setLogoFile(data.logo);
    }

  }, [data])

  const handleCompanyChange = (e) => {
    setCompanyData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleHRChange = (e) => {
    setHrData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0])
  }

  const updateCompanyInfo = async () => {
    try {
      const response = await UpdateCompanyProfile(companyData)
      console.log(response);
      dispatch(setData(response.data.data))
    } catch (err) {
      console.error('Company Update Error:', err)
    }
  }

  const updateHRInfo = async () => {
    try {
      const response = await UpdateHrProfile(hrData)
      dispatch(setHrData(response.data.data))
    } catch (err) {
      console.error('HR Update Error:', err)
    }
  }

  const updateLogo = async () => {
    if (!logoFile) return
    try {
      const formData = new FormData()
      formData.append('logo', logoFile)
      const response = await UpdateLogo(formData)
      dispatch(setData(response.data.data))
      console.log("Logo" + response)
    } catch (err) {
      console.error('Logo Upload Error:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateCompanyInfo()
    await updateHRInfo()
    await updateLogo()
    setOpen(false)
    // window.reload()
  }

  return (
    <div>
      <NavbarCompany />
      <div className='max-w-4xl mx-auto bg-white border p-8 rounded-xl my-5'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage src={logoFile || 'https://via.placeholder.com/150'} alt='logo' />
            </Avatar>
            <div>
              <h1 className='text-xl font-semibold'>{data?.companyName}</h1>
              <p>{data?.description}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant='outline'><Pen /></Button>
        </div>

        {!open ? (
          <div className='space-y-6 mt-6'>
            <div className='space-y-2'>
              <h2 className='font-semibold'>Contact Info</h2>
              <p><strong>Phone:</strong> {companyData?.contactNumber || 'NA'}</p>
              <p><strong>Email:</strong> {companyData?.email || 'NA'}</p>
              <p><strong>Website:</strong> {companyData?.websiteLink || 'NA'}</p>
            </div>

            <div className='space-y-2'>
              <h2 className='font-semibold'>Company Details</h2>
              <p><strong>Company Name:</strong> {companyData?.companyName || 'NA'}</p>
              <p><strong>Established:</strong> {companyData?.establishment || 'NA'}</p>
              <p><strong>Total Members:</strong> {companyData?.members || 'NA'}</p>
              <p><strong>Locations:</strong> {companyData?.locations?.join(', ') || 'NA'}</p>
              <p><strong>Tech Stack:</strong> {companyData?.tech?.join(', ') || 'NA'}</p>
            </div>

            <div className='space-y-2'>
              <h2 className='font-semibold'>HR Contact</h2>
              <p><strong>Name:</strong> {hrData?.hrName || 'NA'}</p>
              <p><strong>Email:</strong> {hrData?.hrEmail || 'NA'}</p>
              <p><strong>Phone:</strong> {hrData?.hrPhone || 'NA'}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='mt-6 space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              {[
                'companyName',
                'contactNumber',
                'description',
                'members',
                'websiteLink',
                'establishment'
              ].map(field => (
                <div key={field}>
                  <Label className='capitalize'>{field.replace(/([A-Z])/g, ' $1')}</Label>
                  <Input
                    name={field}
                    value={companyData[field]}
                    onChange={handleCompanyChange}
                  />
                </div>
              ))}

              <div>
                <Label>Locations (comma separated)</Label>
                <Input
                  name='locations'
                  value={companyData.locations.join(', ')}
                  onChange={e =>
                    setCompanyData(prev => ({
                      ...prev,
                      locations: e.target.value.split(',').map(s => s.trim())
                    }))
                  }
                />
              </div>

              <div>
                <Label>Tech Stack (comma separated)</Label>
                <Input
                  name='tech'
                  value={companyData.tech.join(', ')}
                  onChange={e =>
                    setCompanyData(prev => ({
                      ...prev,
                      tech: e.target.value.split(',').map(s => s.trim())
                    }))
                  }
                />
              </div>
            </div>

            {/* HR Info */}
            <div className='grid grid-cols-2 gap-4'>
              {['hrName', 'hrEmail', 'hrPhone'].map(field => (
                <div key={field}>
                  <Label className='capitalize'>{field}</Label>
                  <Input
                    name={field}
                    value={hrData[field]}
                    onChange={handleHRChange}
                  />
                </div>
              ))}
            </div>

            {/* Logo Upload */}
            <div>
              <Label>Company Logo</Label>
              <Input type='file' onChange={handleLogoChange} />
            </div>

            <div className='flex justify-end gap-2'>
              <Button type='button' variant='secondary' onClick={() => setOpen(false)}>Cancel</Button>
              <Button type='submit'>Save Changes</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CompanyProfile
