"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Sample", href: "/sample" },
    { label: "Spare", href: "/" },
  ];

  return (
    <>
      <nav className="w-full h-auto bg-[#FFD7A8] flex justify-center sticky top-0 z-50 border-b-2 border-gray-800">
        <div className="flex h-16 w-full max-w-[1440px] justify-between items-center px-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-[20px] sm:text-2xl font-semibold whitespace-nowrap hover:text-blue-600 transition-colors"
          >
            Smart Image Processor BRTGC
          </Link>

          {/* Mobile Menu Button - Using Sheet */}
          <div className="lg:hidden">
            <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 hover:bg-[#FFC9C9] rounded-lg h-auto w-auto cursor-pointer"
                >
                  <Menu size={20} />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="top"
                className="bg-[#FFD7A8] border-b-2 border-gray-800 h-screen p-0 [&>button]:hidden"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Mobile navigation menu with links to sub routes
                </SheetDescription>
                {/* Modal Header */}
                <div className="flex justify-between items-center px-4 h-16 border-b-2 border-gray-800">
                  <Link
                    href="/"
                    onClick={() => setIsModalOpen(false)}
                    className="text-[20px] sm:text-2xl font-semibold whitespace-nowrap hover:text-blue-600 transition-colors"
                  >
                    Smart Image Processor BRTGC
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-[#FFC9C9] rounded-lg h-auto w-auto cursor-pointer"
                  >
                    <X size={24} />
                  </Button>
                </div>

                {/* Modal Content */}
                <div className="px-4 py-6 space-y-4 overflow-y-auto max-h-[calc(100vh-64px)]">
                  {navLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="ghost"
                      asChild
                      className="block w-full text-center py-2 text-base font-semibold bg-[#FFC9C9] text-yellow-900 border-2 border-blue-900 rounded-md hover:bg-[#BEDBFF] hover:text-black transition duration-300 h-auto"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsModalOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center gap-2 md:gap-4">
            {navLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                asChild
                className="text-base font-semibold bg-[#FFC9C9] text-yellow-900 border-2 border-blue-900 px-2 py-1 rounded-md hover:bg-[#BEDBFF] hover:text-black transition duration-300 h-auto"
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
