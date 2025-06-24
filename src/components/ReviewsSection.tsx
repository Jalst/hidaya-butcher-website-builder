import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from 'lucide-react';

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
    name: "Mohammed A.",
    rating: 5,
    comment: "Excellente boucherie halal ! La viande est toujours fraîche et de très bonne qualité. Le service est impeccable et les prix sont raisonnables. Je recommande vivement !",
    date: "Il y a 2 semaines"
  },
  {
    id: 2,
    name: "Fatima B.",
    rating: 5,
    comment: "Boucherie de confiance à Cugnaux. Large choix de viandes halal, personnel très accueillant et conseils avisés. C'est ma boucherie de référence depuis des années.",
    date: "Il y a 1 mois"
  },
  {
    id: 3,
    name: "Ahmed K.",
    rating: 5,
    comment: "Qualité exceptionnelle ! Les produits sont toujours frais, la certification halal est rigoureuse. L'équipe est professionnelle et sympathique. Parfait !",
    date: "Il y a 3 semaines"
  },
  {
    id: 4,
    name: "Aicha M.",
    rating: 5,
    comment: "Je fais mes courses ici depuis l'ouverture. Jamais déçue ! Viandes de première qualité, hygiène irréprochable et accueil chaleureux. Bravo !",
    date: "Il y a 1 semaine"
  },
  {
    id: 5,
    name: "Youssef L.",
    rating: 5,
    comment: "Boucherie au top ! Grande variété de produits, prix compétitifs et surtout une qualité constante. Le personnel est toujours de bon conseil.",
    date: "Il y a 2 mois"
  }
];

const ReviewsSection = () => {
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

  return (
    <section className="py-20 bg-white">
      <div className="section-padding">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-butchery-red mb-6">
            Avis de nos Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce que nos clients disent de notre boucherie halal. 
            Leur satisfaction est notre priorité depuis des années.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-gray-50 rounded-2xl p-6 h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="flex space-x-1 mr-3">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed line-clamp-4">
                      "{review.comment}"
                    </p>
                    
                    <div className="mt-auto">
                      <p className="font-semibold text-butchery-red">
                        {review.name}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
