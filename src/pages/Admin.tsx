
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Save, ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProducts, ProductCategory } from '@/contexts/ProductsContext';
import ProductCategoryEditor from '@/components/ProductCategoryEditor';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const navigate = useNavigate();
  const { categories, updateCategory, addCategory, deleteCategory } = useProducts();
  const { toast } = useToast();
  const [heroImage, setHeroImage] = useState('');

  const [newCategory, setNewCategory] = useState({
    title: '',
    description: '',
    image: '',
    items: ['']
  });

  const handleSave = () => {
    console.log('Image de bannière sauvegardée:', heroImage);
    toast({
      title: "Succès",
      description: "Les modifications ont été sauvegardées avec succès!",
    });
  };

  const handleAddNewCategory = () => {
    if (newCategory.title && newCategory.description) {
      addCategory({
        title: newCategory.title,
        description: newCategory.description,
        image: newCategory.image,
        items: newCategory.items.filter(item => item.trim() !== '')
      });
      setNewCategory({
        title: '',
        description: '',
        image: '',
        items: ['']
      });
      toast({
        title: "Succès",
        description: "Nouvelle catégorie ajoutée avec succès!",
      });
    }
  };

  const handleNewCategoryItemChange = (index: number, value: string) => {
    const newItems = [...newCategory.items];
    newItems[index] = value;
    setNewCategory(prev => ({ ...prev, items: newItems }));
  };

  const addNewCategoryItem = () => {
    setNewCategory(prev => ({ ...prev, items: [...prev.items, ''] }));
  };

  const removeNewCategoryItem = (index: number) => {
    setNewCategory(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Administration - Gestion du contenu
          </h1>
        </div>

        {/* Section gestion des produits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestion des Produits</h2>
          
          {/* Catégories existantes */}
          {categories.map((category) => (
            <ProductCategoryEditor
              key={category.id}
              category={category}
              onUpdate={updateCategory}
              onDelete={deleteCategory}
            />
          ))}

          {/* Ajouter nouvelle catégorie */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Ajouter une nouvelle catégorie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="new-title">Titre</Label>
                <Input
                  id="new-title"
                  value={newCategory.title}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nom de la nouvelle catégorie"
                />
              </div>

              <div>
                <Label htmlFor="new-description">Description</Label>
                <Textarea
                  id="new-description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description de la catégorie"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="new-image">URL de l'image</Label>
                <Input
                  id="new-image"
                  value={newCategory.image}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Articles disponibles</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addNewCategoryItem}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {newCategory.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={item}
                        onChange={(e) => handleNewCategoryItemChange(index, e.target.value)}
                        placeholder="Description de l'article"
                      />
                      {newCategory.items.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeNewCategoryItem(index)}
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAddNewCategory}
                className="w-full bg-butchery-red hover:bg-red-800 text-white"
              >
                Ajouter la catégorie
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Section gestion de la photo de bannière uniquement */}
        <div className="grid gap-6">
          <h2 className="text-2xl font-bold text-gray-900">Gestion de la photo de bannière</h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Photo de bannière (Accueil)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="hero-image">URL de l'image</Label>
                <Input
                  id="hero-image"
                  placeholder="https://example.com/image.jpg"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                />
                {heroImage && (
                  <img
                    src={heroImage}
                    alt="Aperçu bannière"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSave}
            className="w-full bg-butchery-red hover:bg-red-800 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Sauvegarder les modifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
