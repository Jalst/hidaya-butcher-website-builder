
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  items: string[];
}

interface ProductsContextType {
  categories: ProductCategory[];
  updateCategory: (id: string, category: Partial<ProductCategory>) => void;
  addCategory: (category: Omit<ProductCategory, 'id'>) => void;
  deleteCategory: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

const defaultCategories: ProductCategory[] = [
  {
    id: '1',
    title: "Viandes Rouges",
    description: "Bœuf et agneau de première qualité, sélectionnés avec soin auprès de nos fournisseurs certifiés halal.",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    items: ["Bœuf : steaks, rôtis, viande hachée", "Agneau : côtelettes, gigot, épaule", "Préparations spéciales sur demande"]
  },
  {
    id: '2',
    title: "Volailles",
    description: "Poulets et dindes élevés dans le respect des traditions, pour une viande tendre et savoureuse.",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    items: ["Poulets fermiers entiers et découpés", "Dindes pour vos occasions spéciales", "Abats frais disponibles"]
  },
  {
    id: '3',
    title: "Plats Préparés",
    description: "Délicieux plats traditionnels préparés avec amour dans notre cuisine, prêts à réchauffer.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    items: ["Tajines et couscous maison", "Grillades marinées", "Spécialités du Ramadan"]
  },
  {
    id: '4',
    title: "Épicerie Orientale",
    description: "Une sélection d'épices, condiments et produits orientaux pour accompagner vos plats.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    items: ["Épices et mélanges traditionnels", "Conserves et produits d'importation", "Thés et pâtisseries orientales"]
  }
];

const STORAGE_KEY = 'boucherie-products';

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<ProductCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch {
      return defaultCategories;
    }
  });

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  }, [categories]);

  const updateCategory = (id: string, updatedCategory: Partial<ProductCategory>) => {
    setCategories(prev => 
      prev.map(cat => cat.id === id ? { ...cat, ...updatedCategory } : cat)
    );
  };

  const addCategory = (newCategory: Omit<ProductCategory, 'id'>) => {
    const id = Date.now().toString();
    setCategories(prev => [...prev, { ...newCategory, id }]);
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  return (
    <ProductsContext.Provider value={{
      categories,
      updateCategory,
      addCategory,
      deleteCategory
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
