import React from 'react';
import { Menu, X, Newspaper } from 'lucide-react';
import AuthModal from './auth/AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  const navItems = [
    { name: 'Solutions', href: '#features' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Newspaper className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Auto Newsletter</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Log In
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="mt-4 w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Log In
              </button>
            </div>
          )}
        </nav>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;