import {RssIcon, GithubIcon, InstagramIcon, EmailIcon, LinkedInIcon, XIcon} from './icons'

export default function Footer() {
  return (
    <footer className="mb-16 border-t-1 mt-2">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <a
            className="flex items-center transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <RssIcon />
            <p className="ml-2 h-7">rss</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/nfzv"
          >
            <GithubIcon />
            <p className="ml-2 h-7">nfzv</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/nurbek_fayziev"
          >
            <XIcon />
            <p className="ml-2 h-7">nurbek_fayziev</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://instagram.com/nurbek_fayziev"
          >
            <InstagramIcon />
            <p className="ml-2 h-7">nurbek_fayziev</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/nurbek-fayziev/"
          >
            <LinkedInIcon />
            <p className="ml-2 h-7">nurbek-fayziev</p>
          </a>
        </li>
      </ul>
      <div className="text-sm text-neutral-500">
        <p className="mt-8">
          Copyright © {new Date().getFullYear()}, Nurbek Fayziev <br />
          Content is available under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> unless otherwise noted
        </p>
      </div>
    </footer>
  )
}
