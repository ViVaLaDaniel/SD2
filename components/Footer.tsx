import Link from "next/link";
import { FaLeaf, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

/**
 * Footer component
 * Displays the main site footer with links and copyright info.
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <FaLeaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-text">NutriPlan</span>
            </Link>
            <p className="text-sm text-text/80">
              Personalized meal plans for a healthier lifestyle, delivered right to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-text mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/configurator" className="text-sm text-text/80 hover:text-primary">
                  Start Your Plan
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-text/80 hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-sm text-text/80 hover:text-primary">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-text mb-4">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Twitter" className="text-text/70 hover:text-primary">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-text/70 hover:text-primary">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-text/70 hover:text-primary">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-text/60">
          <p>&copy; {new Date().getFullYear()} NutriPlan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;