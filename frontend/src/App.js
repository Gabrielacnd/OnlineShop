import React, { useState } from 'react';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('overview');
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleProductAdded = () => {
    // Force refresh of product table
    setRefreshKey(prev => prev + 1);
    // Reset to overview after adding/editing
    setCurrentView('overview');
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setCurrentView('new-product');
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setCurrentView('overview');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Magazin Online</h1>
        <nav className="navigation">
          <button 
            className={currentView === 'overview' ? 'active' : ''}
            onClick={() => setCurrentView('overview')}
          >
            Lista Produse
          </button>
          <button 
            className={currentView === 'new-product' ? 'active' : ''}
            onClick={() => setCurrentView('new-product')}
          >
            Adauga produs
          </button>
        </nav>
      </header>

      <main className="App-main">
        {currentView === 'overview' ? (
          <ProductTable key={refreshKey} onEditProduct={handleEditProduct} onProductDeleted={handleProductAdded} />
        ) : (
          <ProductForm 
            onProductAdded={handleProductAdded} 
            editingProduct={editingProduct}
            onCancelEdit={handleCancelEdit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
