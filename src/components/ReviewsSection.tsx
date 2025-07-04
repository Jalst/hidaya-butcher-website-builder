
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Tristan N.",
    rating: 5,
    comment: "Deux commandes en livraison à domicile je ne peux que noter la satisfaction de manger de la très bonne viande. Un plaisir! La livraison par chronofresh est top et rapide. C'est devenu ma boucherie préférée. Je suis du puy de dôme.",
    date: "Il y a 1 semaine"
  },
  {
    id: 2,
    name: "Audrey M.",
    rating: 5,
    comment: "Parfait !",
    date: "Il y a 2 semaines"
  },
  {
    id: 3,
    name: "Nicolas G.",
    rating: 5,
    comment: "Colis très soigné et produits de qualité",
    date: "Il y a 1 mois"
  },
  {
    id: 4,
    name: "Théophile J.",
    rating: 5,
    comment: "Commande au top.",
    date: "Il y a 1 mois"
  },
  {
    id: 5,
    name: "Julie D.",
    rating: 5,
    comment: "Produits conforme aux produits exposés sur le site.",
    date: "Il y a 2 mois"
  }
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = reviews.length - cardsPerView.desktop;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = reviews.length - cardsPerView.desktop;
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  return (
    <section className="py-24 bg-white min-h-[600px]">
      <div className="section-padding pb-16">
        <div className="text-center mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-butchery-red mb-6">
            Avis de nos Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce que nos clients disent de notre boucherie halal. 
            Leur satisfaction est notre priorité depuis des années.
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-white shadow-lg hover:shadow-xl -translate-x-6"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex bg-white shadow-lg hover:shadow-xl translate-x-6"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView.desktop)}%)`
              }}
            >
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                >
                  <div className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-auto min-h-[320px] flex flex-col mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    
                    <div className="flex-1 mb-4">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        "{review.comment}"
                      </p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-auto">
                      <p className="font-semibold text-butchery-red">
                        {review.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6 md:hidden">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-butchery-red' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
