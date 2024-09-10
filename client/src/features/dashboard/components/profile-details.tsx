'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IUser, navigate } from '@/features/common';
import { avatarWordFormatter } from '@/utils/formatters';
import { ChangeEvent, FormEvent, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { toast } from 'sonner';
import { getUpdatedProfilePayload } from '../utils/generators';

interface IProfileDetails {
  userInitialDetails?: IUser;
  serverAction: any;
}

export interface IUserForm {
  email: string;
  name: string;
  image: string;
  age: number;
  number: number;
}

export const ProfileDetails = (props: IProfileDetails) => {
  const {
    userInitialDetails = { email: '', name: '', age: 0, image: '', number: 0 },
    serverAction,
  } = props;

  const [form, setForm] = useState<IUserForm>({
    age: userInitialDetails.age as number,
    email: userInitialDetails.email,
    image: userInitialDetails.image as string,
    name: userInitialDetails.name,
    number: userInitialDetails.number as number,
  });
  // console.log(form);
  /**
   * This method is used to submit form.
   * @param formData: Formdata includes short url fields
   */
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await serverAction(
      getUpdatedProfilePayload(form, userInitialDetails as IUser),
    );

    if (response?.errorMessage) {
      toast.error(response.errorMessage);
    }

    if (response?.successMessage) {
      toast.success(response.successMessage);
      navigate(`/dashboard/profile`);
    }
  };

  /**
   * This method is used to update text form field.
   * @param event: Native event
   */
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    if (type === 'number') {
      setForm((prevForm: IUserForm) => ({ ...prevForm, [name]: parseInt(value) }));
    } else {
      setForm((prevForm: IUserForm) => ({ ...prevForm, [name]: value }));
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Avatar className="size-28 cursor-pointer">
              <AvatarImage src={form.image} />
              <AvatarFallback className="text-5xl">{avatarWordFormatter(form.name)}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0">
              <div className="rounded-full bg-sky-500 p-2">
                <Label htmlFor="image" tabIndex={0} role="button" className="rounded-full">
                  <MdEdit className="text-white dark:text-gray-900" />
                </Label>
                <Input type="file" className="hidden" id="image" accept=".png, .jpg, .jpeg" />
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4 flex gap-4 max-md:flex-col max-md:gap-1 md:items-center">
            <Label htmlFor="name" className="flex-1 text-base font-semibold max-md:text-sm">
              Name
            </Label>
            <p className="flex-[2]">
              <Input
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                value={form?.name}
                onChange={handleTextChange}
              />
            </p>
          </div>
          <div className="mb-4 flex gap-4 max-md:flex-col max-md:gap-1 md:items-center">
            <Label htmlFor="email" className="flex-1 text-base font-semibold max-md:text-sm">
              Email
            </Label>
            <p className="flex-[2]">
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                value={form?.email}
                onChange={handleTextChange}
              />
            </p>
          </div>
          <div className="mb-4 flex gap-4 max-md:flex-col max-md:gap-1 md:items-center">
            <Label htmlFor="number" className="flex-1 text-base font-semibold max-md:text-sm">
              Phone number
            </Label>
            <p className="flex-[2]">
              <Input
                name="number"
                id="number"
                placeholder="Phone number"
                type="number"
                maxLength={10}
                value={form?.number}
                onChange={handleTextChange}
              />
            </p>
          </div>
          <div className="mb-4 flex gap-4 max-md:flex-col max-md:gap-1 md:items-center">
            <Label htmlFor="age" className="flex-1 text-base font-semibold max-md:text-sm">
              Age
            </Label>
            <p className="flex-[2]">
              <Input
                id="age"
                name="age"
                placeholder="Age"
                type="number"
                value={form?.age}
                onChange={handleTextChange}
              />
            </p>
          </div>
          <div className="flex justify-center">
            <Button>Save</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
