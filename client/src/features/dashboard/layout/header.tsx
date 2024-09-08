import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { signOutAction } from '@/features/auth/server-actions';
import { IUser } from '@/features/common';
import { avatarWordFormatter } from '@/utils/formatters';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

interface IDashboardHeader {
  data: IUser | undefined;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardHeader = ({ data, setSidebarOpen }: IDashboardHeader) => {
  const router = useRouter();
  const { email = '', name = '', image = '' } = data || {};

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white p-2 px-4 shadow-md">
      <div className="flex items-center pr-4">
        <Link href="/dashboard" className="text-xl font-bold md:hidden">
          QuickURL
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src={image} />
              <AvatarFallback>{avatarWordFormatter(name)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-auto">
            <div className="mb-3">
              <div className="text-lg font-semibold">{name}</div>
              <div className="mb text-sm">{email}</div>
            </div>
            <Button
              className="mb-2 w-full"
              variant="outline"
              onClick={() => router.replace('/dashboard/profile')}
            >
              Update Profile
            </Button>
            <Button className="w-full" onClick={() => signOutAction()}>
              Logout
            </Button>
          </PopoverContent>
        </Popover>

        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="hidden focus:outline-none max-md:block"
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>
      </div>
    </header>
  );
};
