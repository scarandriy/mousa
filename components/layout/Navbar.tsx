'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";

const Navbar = () => {
  const pathname = usePathname();

  const navLinkClass = (path: string) => {
    const isActive = pathname === path || (path === "/" && pathname === "/index");
    return `${isActive ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`;
  };

  return (
    <header className="w-full sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-wide">
          Mousa <span className="text-primary">Cars</span>
        </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/catalog" className={navLinkClass("/catalog")}>Catalog</Link>
            <Link href="/car-tour" className={navLinkClass("/car-tour")}>Car Tour</Link>
            <Link href="/contacts" className={navLinkClass("/contacts")}>Contacts</Link>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" aria-label="Mobile navigation" className="h-auto">
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Navigate to different sections of the website</SheetDescription>
                <nav className="flex flex-col gap-6 pt-4">
                  <SheetClose asChild>
                    <Link href="/" className={navLinkClass("/")}>Home</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/catalog" className={navLinkClass("/catalog")}>Catalog</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/car-tour" className={navLinkClass("/car-tour")}>Car Tour</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/contacts" className={navLinkClass("/contacts")}>Contacts</Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
      </div>
    </header>
  );
};

export default Navbar;
