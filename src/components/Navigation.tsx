
import React, { useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="section-padding py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center p-1">
              <img 
                src="/lovable-uploads/6e143375-4021-47b2-971f-6a9b56b26d8f.png" 
                alt="Logo Boucherie Hidaya" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-playfair text-2xl font-bold text-butchery-red">
                Boucherie Hidaya
              </h1>
              <p className="text-sm text-gray-600">Boucherie Halal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('accueil')}
              className="text-gray-700 hover:text-butchery-red transition-colors font-medium"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('produits')}
              className="text-gray-700 hover:text-butchery-red transition-colors font-medium"
            >
              Nos Produits
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-butchery-red transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-butchery-red transition-colors font-medium"
            >
              Contact
            </button>
            <a
              href="tel:+33561865442"
              className="bg-butchery-red text-white px-4 py-2 rounded-full hover:bg-red-800 transition-colors flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Appeler</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t shadow-lg">
            <div className="section-padding py-4 space-y-4">
              <button
                onClick={() => scrollToSection('accueil')}
                className="block w-full text-left text-gray-700 hover:text-butchery-red transition-colors font-medium py-2"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection('produits')}
                className="block w-full text-left text-gray-700 hover:text-butchery-red transition-colors font-medium py-2"
              >
                Nos Produits
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="block w-full text-left text-gray-700 hover:text-butchery-red transition-colors font-medium py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-gray-700 hover:text-butchery-red transition-colors font-medium py-2"
              >
                Contact
              </button>
              <a
                href="tel:+33561865442"
                className="flex items-center space-x-2 bg-butchery-red text-white px-4 py-2 rounded-full hover:bg-red-800 transition-colors w-fit"
              >
                <Phone className="w-4 h-4" />
                <span>Appeler</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
