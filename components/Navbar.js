"use client";
import Link from "next/link";
import { useState } from "react";
import { RiArrowRightUpLine, RiCloseFill, RiMenu3Fill } from "react-icons/ri";

const navLinks = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Our Trainers",
    href: "#trainers",
  },
  {
    name: "Book A Demo",
    href: "#contact",
  },
];

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <header className="w-full sticky top-0 left-0 z-50 border-b border-accent bg-background/50 backdrop-blur-md">
        <nav className="nav hidden md:flex items-center justify-between w-full md:px-8 lg:px-16 py-4">
          <div className="logo">
            <h1 className="text-2xl font-bio-rhyme font-extrabold">
              <Link href="/">IronVault</Link>
            </h1>
          </div>
          <div className="links flex items-center justify-center gap-1 font-semibold font-bio-rhyme">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${item.href === "#contact" ? "border border-zinc-500 bg-(--accent) hover:bg-transparent text-lg hover:text-foreground hover:scale-[1.1] active:scale-[0.9] text-zinc-950 rounded-full px-4 py-2 inline-flex items-center transition-all duration-300 ease-out md:ml-8 lg:ml-20" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50 rounded-lg"} text-lg px-2 py-1 inline-flex items-center transition-all duration-300 ease-out`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Nav */}
        <nav className="mobileNav w-full flex items-center justify-between p-4 md:hidden">
          <div className="logo">
            <h1 className="text-xl font-bio-rhyme font-extrabold">
              <Link href="/">IronVault</Link>
            </h1>
          </div>
          <button
            onClick={() => setIsNavOpen(true)}
            className="p-2 hover:bg-zinc-700/50 active:bg-zinc-700/50 rounded-md"
          >
            <RiMenu3Fill size={22} />
          </button>
          {isNavOpen && (
            <div className="absolute top-0 right-0 w-3/4 h-screen bg-zinc-900 border-l border-accent flex flex-col items-center transition-all duration-300 ease-out px-4 pt-4">
              <div className="w-[95%] flex items-center justify-between pb-4 border-b border-accent">
                <h1 className="text-2xl font-bio-rhyme font-semibold">
                  Navigation
                </h1>
                <button
                  onClick={() => setIsNavOpen(false)}
                  className="p-2 hover:bg-zinc-700/50 active:bg-zinc-700/50 rounded-md"
                >
                  <RiCloseFill size={24} />
                </button>
              </div>
              <div className="w-[95%] flex flex-col items-start justify-center gap-4 font-semibold font-bio-rhyme mt-14">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsNavOpen(false)}
                    className={`${item.href === "#contact" ? "border border-zinc-500 bg-(--accent) hover:bg-transparent active:bg-zinc-700/50 active:scale-[0.9] justify-center rounded-full px-4 py-2 " : "active:bg-zinc-700/50 rounded-lg px-2 py-1 justify-between "} inline-flex items-center w-full text-lg transition-all duration-300 ease-out`}
                  >
                    <span
                      className={`text-[3.2vh] ${item.href === "#contact" ? "text-zinc-950" : "text-zinc-400 active:text-zinc-200"}`}
                    >
                      {item.name}
                    </span>
                    <RiArrowRightUpLine
                      size={18}
                      className={`${item.href === "#contact" ? "hidden" : "text-accent active:text-accent"}`}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
