import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DASHBOARD_NAVIGATION } from '../constants';

interface IDashboardSidebar {
  sidebarOpen: boolean;
}

export const DashboardSidebar = ({ sidebarOpen }: IDashboardSidebar) => {
  const path = usePathname();

  return (
    <aside
      className={`flex h-[100dvh] w-64 flex-col bg-gradient-to-tr from-sky-600 to-sky-400 text-white transition-[left] max-lg:w-[5.4rem] max-md:absolute max-md:top-0 max-md:w-64 ${sidebarOpen ? 'max-md:left-0' : 'max-md:-left-64'}`}
    >
      {/* logo */}
      <div className="flex h-16 items-center justify-center">
        <Link href="/dashboard" className="text-xl font-bold">
          <div className="hidden max-lg:block max-md:hidden">QU</div>
          <div className="max-lg:hidden max-md:block">QuickURL</div>
        </Link>
      </div>
      {/* nav */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 p-4 text-black">
          {DASHBOARD_NAVIGATION.map(({ Icon, link, title }) => (
            <Link
              key={title}
              href={link}
              title={title}
              className={`mb-2 flex items-center rounded-lg px-4 py-3 transition hover:bg-white hover:text-sky-600 ${link === path ? 'bg-white text-sky-600' : 'text-white'}`}
              prefetch
            >
              <div className="mr-2" title={title}>
                <Icon className="text-2xl" />
              </div>
              <p className="max-lg:hidden max-md:block">{title}</p>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};
