import Link from "next/link";
import { Button } from "./ui/Button";
import { FaLeaf } from "react-icons/fa";

/**
 * Header component
 * Displays the main site navigation header.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <FaLeaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-text">NutriPlan</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/#features"
            className="text-sm font-medium text-text/80 transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-text/80 transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="/configurator"
            className="text-sm font-medium text-text/80 transition-colors hover:text-primary"
          >
            Configurator
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/configurator">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;