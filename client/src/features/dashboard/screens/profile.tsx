'use server';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getUserDetailsAction, IUser } from '@/features/common';
import { avatarWordFormatter } from '@/utils/formatters';
import { MdEdit } from 'react-icons/md';

export const DashboardProfileScreen = async () => {
  const result = await getUserDetailsAction();

  const { email, name, age = 0, image = '', number = 0 } = result.data as IUser;

  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Avatar className="size-28 cursor-pointer">
                <AvatarImage src={image} />
                <AvatarFallback className="text-5xl">{avatarWordFormatter(name)}</AvatarFallback>
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
          <div className="mb-4 flex gap-4 max-md:flex-col max-md:gap-1 md:items-center">
            <Label htmlFor="name" className="flex-1 text-base font-semibold max-md:text-sm">
              Name
            </Label>
            <p className="flex-[2]">
              <Input id="name" placeholder="Name" type="text" />
            </p>
          </div>
          <div className="mb-4 flex gap-4 max-md:flex-col max-md:gap-1 md:items-center">
            <Label htmlFor="email" className="flex-1 text-base font-semibold max-md:text-sm">
              Email
            </Label>
            <p className="flex-[2]">
              <Input id="email" placeholder="Email" type="email" />
            </p>
          </div>
          <div className="mb-4 flex gap-4 max-md:flex-col max-md:gap-1 md:items-center">
            <Label htmlFor="number" className="flex-1 text-base font-semibold max-md:text-sm">
              Phone number
            </Label>
            <p className="flex-[2]">
              <Input id="number" placeholder="Phone number" type="number" maxLength={10} />
            </p>
          </div>
          <div className="mb-4 flex gap-4 max-md:flex-col max-md:gap-1 md:items-center">
            <Label htmlFor="age" className="flex-1 text-base font-semibold max-md:text-sm">
              Age
            </Label>
            <p className="flex-[2]">
              <Input id="age" placeholder="Age" type="number" />
            </p>
          </div>
          {/* <div>Image: {image}</div>
          <div>Name: {name}</div>
          <div>Email: {email}</div>
          <div>Number: {number}</div>
          <div>Age: {age}</div> */}
        </CardContent>
      </Card>
    </div>
  );
};
