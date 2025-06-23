import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  images: string[];
  type: string;
  origin: string;
  weight: string;
  pricePerKg: string;
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  items: string[];
  products: Product[];
}

export interface SiteData {
  heroSection: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  categories: ProductCategory[];
  services: Array<{
    title: string;
    description: string;
  }>;
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };
}

interface ProductsContextType {
  categories: ProductCategory[];
  siteData: SiteData | null;
  loading: boolean;
  updateCategory: (id: string, updates: Partial<ProductCategory>) => void;
  addCategory: (category: Omit<ProductCategory, 'id'>) => void;
  deleteCategory: (id: string) => void;
  addProduct: (categoryId: string, product: Omit<Product, 'id'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
  exportData: () => SiteData;
  importData: (data: SiteData) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  // Chargement initial des données
  useEffect(() => {
    const loadData = async () => {
      try {
        // Essayer de charger depuis le fichier JSON public
        const response = await fetch('/data.json');
        if (response.ok) {
          const data = await response.json();
          setSiteData(data);
          // Sauvegarder dans localStorage comme fallback
          localStorage.setItem('siteData', JSON.stringify(data));
        } else {
          throw new Error('Fichier data.json non trouvé');
        }
      } catch (error) {
        console.log('Chargement depuis localStorage...');
        // Fallback vers localStorage
        const savedData = localStorage.getItem('siteData');
        if (savedData) {
          setSiteData(JSON.parse(savedData));
        } else {
          // Données par défaut si rien n'est trouvé
          console.log('Utilisation des données par défaut');
          const defaultData: SiteData = {
            heroSection: {
              title: "Boucherie Artisanale",
              subtitle: "Viandes fraîches et de qualité",
              backgroundImage: "/lovable-uploads/6e143375-4021-47b2-971f-6a9b56b26d8f.png"
            },
            categories: [],
            services: [],
            contact: {
              address: "123 Rue de la Boucherie, 75001 Paris",
              phone: "01 23 45 67 89",
              email: "contact@boucherie-artisanale.fr",
              hours: {
                weekdays: "8h00 - 19h30",
                saturday: "8h00 - 19h00",
                sunday: "Fermé"
              }
            }
          };
          setSiteData(defaultData);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const saveData = (data: SiteData) => {
    setSiteData(data);
    localStorage.setItem('siteData', JSON.stringify(data));
  };

  const updateCategory = (id: string, updates: Partial<ProductCategory>) => {
    if (!siteData) return;
    
    const updatedCategories = siteData.categories.map(cat =>
      cat.id === id ? { ...cat, ...updates } : cat
    );
    
    const newData = { ...siteData, categories: updatedCategories };
    saveData(newData);
  };

  const addCategory = (category: Omit<ProductCategory, 'id'>) => {
    if (!siteData) return;
    
    const newCategory: ProductCategory = {
      ...category,
      id: `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    const newData = {
      ...siteData,
      categories: [...siteData.categories, newCategory]
    };
    saveData(newData);
  };

  const deleteCategory = (id: string) => {
    if (!siteData) return;
    
    const newData = {
      ...siteData,
      categories: siteData.categories.filter(cat => cat.id !== id)
    };
    saveData(newData);
  };

  const addProduct = (categoryId: string, product: Omit<Product, 'id'>) => {
    if (!siteData) return;
    
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    const updatedCategories = siteData.categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, products: [...cat.products, newProduct] }
        : cat
    );
    
    const newData = { ...siteData, categories: updatedCategories };
    saveData(newData);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    if (!siteData) return;
    
    const updatedCategories = siteData.categories.map(cat => ({
      ...cat,
      products: cat.products.map(product =>
        product.id === productId ? { ...product, ...updates } : product
      )
    }));
    
    const newData = { ...siteData, categories: updatedCategories };
    saveData(newData);
  };

  const deleteProduct = (productId: string) => {
    if (!siteData) return;
    
    const updatedCategories = siteData.categories.map(cat => ({
      ...cat,
      products: cat.products.filter(product => product.id !== productId)
    }));
    
    const newData = { ...siteData, categories: updatedCategories };
    saveData(newData);
  };

  const exportData = (): SiteData => {
    if (!siteData) throw new Error('Aucune donnée à exporter');
    return siteData;
  };

  const importData = (data: SiteData) => {
    saveData(data);
  };

  const getProductById = (productId: string): Product | undefined => {
    if (!siteData) return undefined;
    
    for (const category of siteData.categories) {
      const product = category.products.find(p => p.id === productId);
      if (product) return product;
    }
    
    return undefined;
  };

  return (
    <ProductsContext.Provider value={{
      categories: siteData?.categories || [],
      siteData,
      loading,
      updateCategory,
      addCategory,
      deleteCategory,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      exportData,
      importData
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
