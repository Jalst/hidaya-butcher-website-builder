
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Download } from 'lucide-react';
import { useProducts } from '@/contexts/ProductsContext';
import { useToast } from '@/hooks/use-toast';

const GlobalSaveButton = () => {
  const { hasUnsavedChanges, saveAllChanges, exportData } = useProducts();
  const { toast } = useToast();

  const handleSaveAndExport = () => {
    // Sauvegarder toutes les modifications
    saveAllChanges();
    
    // Exporter automatiquement le fichier JSON
    try {
      const data = exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Succès",
        description: "Modifications sauvegardées et fichier JSON téléchargé! Uploadez ce fichier sur votre serveur pour mettre à jour le site.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'export des données",
        variant: "destructive",
      });
    }
  };

  if (!hasUnsavedChanges) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              Vous avez des modifications non sauvegardées
            </span>
            <span className="text-xs text-gray-500">
              Cliquez pour sauvegarder et télécharger le fichier de mise à jour
            </span>
          </div>
          <Button
            onClick={handleSaveAndExport}
            className="bg-butchery-red hover:bg-red-800 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <Download className="w-4 h-4" />
            Sauvegarder et Exporter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalSaveButton;
