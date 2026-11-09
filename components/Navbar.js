"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RiArrowRightUpLine, RiCloseFill, RiMenu3Fill } from "react-icons/ri";
import { AnimatePresence, motion } from "motion/react";


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
    name: "Contact Us",
    href: "#contact",
  },
];

const menuPanelVariants = {
  closed: {
    x: "100%",
    transition: { duration: 0.5, ease: "linear" },
  },
  open: {
    x: "0%",
    transition: { duration: 0.5, ease: "linear" },
  },
};

const menuLinksVariants = {
  closed: {
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
  open: {
    transition: { delayChildren: 0.075, staggerChildren: 0.1 },
  },
};

const menuLinkVariants = {
  closed: { opacity: 0, x: 30 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

gsap.registerPlugin(useGSAP);


const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);
  const mobileRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".logo", {
        y: -50,
        opacity: 0,
        duration: 0.5,
      });
      tl.from(
        ".links .link",
        {
          y: -50,
          opacity: 0,
          duration: 0.4,
          stagger: 0.15,
        },
        "-=0.1",
      );
    },
    { scope: navRef },
  );

  useGSAP(
    () => {
      gsap.from(".logo, .menuToggle", {
        y: -50,
        opacity: 0,
        duration: 0.45,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: mobileRef },
  );

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-50 border-b border-accent bg-background/50 backdrop-blur-md">
        <nav
          ref={navRef}
          className="nav hidden md:flex items-center justify-between w-full md:px-8 lg:px-16 py-4"
        >
          <div className="logo">
            <motion.h1 whileHover={{ scale: 1.05, color: "#a7e400" }} className="text-2xl font-bio-rhyme font-extrabold">
              <Link href="/">IronVault</Link>
            </motion.h1>
          </div>
          <div className="links flex items-center justify-center gap-2 font-semibold font-bio-rhyme transition-all duration-300 ease-out">
            {navLinks.map((item) => (
              <motion.div
                key={item.name}
                className={`link ${item.href === "#contact" ? "border border-zinc-500 bg-accent hover:bg-transparent text-lg hover:text-foreground active:scale-[0.9] text-zinc-950 rounded-full inline-flex items-center md:ml-8 lg:ml-20" : "text-zinc-300 hover:text-zinc-200 hover:bg-zinc-700/50 rounded-lg"} text-lg inline-flex items-center cursor-pointer relative`}
                whileHover={
                  item.href === "#contact" ? { scale: 1.1 } : { scale: 1.05 }
                }
                whileTap={
                  item.href === "#contact" ? { scale: 0.9 } : { scale: 0.95 }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Link
                  href={item.href}
                  className={`${item.href === "#contact" ? "px-4 py-2" : "px-2 py-1"} "w-full h-full"`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            {/* // <Link
              //   key={item.name}
              //   href={item.href}
              //   className={`link ${item.href === "#contact" ? "border border-zinc-500 bg-accent hover:bg-transparent text-lg hover:text-foreground active:scale-[0.9] text-zinc-950 rounded-full px-4 py-2 inline-flex items-center md:ml-8 lg:ml-20" : "text-zinc-300 hover:text-zinc-200 hover:bg-zinc-700/50 rounded-lg"} text-lg px-2 py-1 inline-flex items-center `}
              // >
              //   {item.name}
              // </Link> */}
          </div>
        </nav>

        {/* Mobile Nav */}
        <nav ref={mobileRef} className="mobileNav w-full flex items-center justify-between p-4 md:hidden">
          <div className="logo">
            <motion.h1 whileTap={{ scale: 1.05, color: "#a7e400" }} className="text-xl font-bio-rhyme font-extrabold">
              <Link href="/">IronVault</Link>
            </motion.h1>
          </div>
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={isNavOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsNavOpen(true)}
            className="menuToggle p-2 hover:bg-zinc-700/50 rounded-md"
          >
            <motion.span
              whileHover={{ rotate: 8, scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex"
            >
              <RiMenu3Fill size={22} />
            </motion.span>
          </button>
          <AnimatePresence>
            {isNavOpen && (
              <motion.div
                id="mobile-navigation"
                key="mobile-navigation"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuPanelVariants}
                className="sliderNav absolute top-0 right-0 w-3/4 h-screen bg-zinc-900 border-l border-accent flex flex-col items-center px-4 pt-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.12 } }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.12 } }}
                  className="navHeader w-[95%] flex items-center justify-between pb-4 border-b border-accent"
                >
                  <h1 className="text-2xl font-bio-rhyme font-semibold">
                    Navigation
                  </h1>
                  <button
                    type="button"
                    aria-label="Close navigation"
                    onClick={() => setIsNavOpen(false)}
                    className="p-2 hover:bg-zinc-700/50 rounded-md"
                  >
                    <motion.span
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9, rotate: -90 }}
                      className="inline-flex"
                    >
                      <RiCloseFill size={24} />
                    </motion.span>
                  </button>
                </motion.div>
                <motion.div
                  variants={menuLinksVariants}
                  className="links w-[95%] flex flex-col items-start justify-center gap-4 font-semibold font-bio-rhyme mt-14"
                >
                  {navLinks.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={menuLinkVariants}
                      className="link w-full"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsNavOpen(false)}
                        className={`inline-flex items-center w-full text-lg ${item.href === "#contact" ? "border border-zinc-500 bg-accent hover:bg-transparent justify-center rounded-full px-4 py-2 mt-10" : "rounded-lg px-2 py-1 justify-between"}`}
                      >
                        <span
                          className={`text-[3.2vh] ${item.href === "#contact" ? "text-zinc-950" : "text-zinc-400"}`}
                        >
                          {item.name}
                        </span>
                        {item.href !== "#contact" && (
                          <motion.span
                            whileHover={{ x: 4, y: -4 }}
                            className="inline-flex text-accent"
                          >
                            <RiArrowRightUpLine size={18} />
                          </motion.span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
