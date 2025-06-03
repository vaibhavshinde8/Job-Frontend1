import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Loader2 } from 'lucide-react'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
} from './ui/select'

const UpdateCompanyProfileDialog = ({
    open,
    setOpen,
    input,
    changeEventHandler,
    selectChangeHandler,
    submitHandler,
    companies = [],
    loading
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Update Company Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid grid-cols-2 gap-4 my-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="companyName"
                                value={input.companyName}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Contact Number</Label>
                            <Input
                                type="text"
                                name="contactNumber"
                                value={input.contactNumber}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="websiteLink"
                                value={input.websiteLink}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Established Year</Label>
                            <Input
                                type="number"
                                name="establishment"
                                value={input.establishment}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>HR Name</Label>
                            <Input
                                type="text"
                                name="hrName"
                                value={input.hrName}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>HR Email</Label>
                            <Input
                                type="email"
                                name="hrEmail"
                                value={input.hrEmail}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>HR Phone</Label>
                            <Input
                                type="text"
                                name="hrPhone"
                                value={input.hrPhone}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Members</Label>
                            <Input
                                type="number"
                                name="members"
                                value={input.members}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Tech Stack (comma separated)</Label>
                            <Input
                                type="text"
                                name="tech"
                                value={input.tech}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Locations (comma separated)</Label>
                            <Input
                                type="text"
                                name="locations"
                                value={input.locations}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo URL</Label>
                            <Input
                                type="text"
                                name="logo"
                                value={input.logo}
                                onChange={changeEventHandler}
                            />
                        </div>

                        {companies.length > 0 && (
                            <div>
                                <Label>Select Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => (
                                                    <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                        {company.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        {
                            loading
                                ? <Button disabled className="w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button>
                                : <Button type="submit" className="w-full">Update Profile</Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateCompanyProfileDialog
