import Link from 'next/link'

const navItems = {
  '/blog': {
    name: 'blog',
  },
  "mailto:iamaidenlight@gmail.com":
  {
    name: 'send a letter',
  },
}

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row justify-between w-full">
            <Link
              key="nurbek fayziev"
              href="/"
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1  m-1 font-semibold"
            >
              Nurbek Fayziev
            </Link>
            <div className='flex flex-row'>
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1 underline decoration-sky-200"
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}
