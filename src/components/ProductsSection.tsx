
import React from 'react';
import { useProducts } from '@/contexts/ProductsContext';

const ProductsSection = () => {
  const { categories } = useProducts();

  return (
    <section id="produits" className="py-20 bg-gray-50">
      <div className="section-padding">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-butchery-red mb-6">
            Nos Produits
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection de viandes halal et produits orientaux, 
            choisis avec soin pour vous garantir fraîcheur et qualité exceptionnelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="font-playfair text-2xl font-bold text-butchery-red mb-4">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-butchery-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-butchery-red text-white p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="font-playfair text-2xl font-bold mb-4">
              Certification Halal
            </h3>
            <p className="text-lg leading-relaxed">
              Tous nos produits sont certifiés halal et respectent scrupuleusement 
              les traditions islamiques. Nous travaillons exclusivement avec des 
              fournisseurs certifiés pour vous garantir la conformité religieuse.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
