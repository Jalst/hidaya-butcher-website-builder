
import React from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('produits');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Vitrine de boucherie avec viandes fraîches"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white section-padding max-w-4xl mx-auto pt-20 md:pt-0">
        <div className="animate-fade-in">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Bienvenue à la
            <span className="block text-butchery-gold">Boucherie Hidaya</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            Votre boucherie halal de confiance à Cugnaux.<br />
            <span className="text-butchery-gold font-medium">Produits frais, qualité garantie, service chaleureux.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={scrollToProducts}
              className="bg-butchery-red hover:bg-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Découvrir nos produits
            </button>
            
            <a
              href="tel:+33561865442"
              className="border-2 border-white text-white hover:bg-white hover:text-butchery-red px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Nous contacter
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-2 text-butchery-gold">Halal Certifié</h3>
              <p className="text-sm opacity-90">Toutes nos viandes sont certifiées halal</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-2 text-butchery-gold">Fraîcheur Garantie</h3>
              <p className="text-sm opacity-90">Produits frais livrés quotidiennement</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="font-bold text-lg mb-2 text-butchery-gold">Service Local</h3>
              <p className="text-sm opacity-90">Au cœur de Cugnaux depuis des années</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <ArrowDown className="w-6 h-6 text-white animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
