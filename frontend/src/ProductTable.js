import React, { useState, useEffect } from 'react';
import { productAPI } from './api';
import './ProductTable.css';

function ProductTable({ onEditProduct, onProductDeleted }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const filterParams = {};
      if (filters.name.trim()) filterParams.name = filters.name.trim();
      if (filters.minPrice) filterParams.minPrice = parseFloat(filters.minPrice);
      if (filters.maxPrice) filterParams.maxPrice = parseFloat(filters.maxPrice);
      
      const data = await productAPI.getAllProducts(filterParams);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Eroare la încărcarea produselor!');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Sunteți sigur că doriți să ștergeți acest produs?')) {
      return;
    }

    try {
      await productAPI.deleteProduct(id);
      alert('Produs șters cu succes!');
      // Reload products
      loadProducts();
      // Notify parent
      if (onProductDeleted) {
        onProductDeleted();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Eroare la ștergerea produsului!');
    }
  };

  const handleEdit = (product) => {
    if (onEditProduct) {
      onEditProduct(product);
    }
  };

  return (
    <div className="product-table-container">
      <h2>Lista Produse</h2>
      
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="name">Caută după nume:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Introduceți numele produsului..."
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="minPrice">Preț minim:</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="maxPrice">Preț maxim:</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="1000"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">Se încarcă...</div>
      ) : (
        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nume</th>
                <th>Descriere</th>
                <th>Categorie</th>
                <th>Subcategorie</th>
                <th>Nume Vânzător</th>
                <th>Preț</th>
                <th>Cantitate</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="9" className="no-data">
                    Nu există produse care să corespundă filtrelor.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.nume}</td>
                    <td>{product.descriere}</td>
                    <td>{product.categorie}</td>
                    <td>{product.subCategorie}</td>
                    <td>{product.nume_vanzator}</td>
                    <td>{product.pret.toFixed(2)} RON</td>
                    <td>{product.cantitate}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-button" 
                          onClick={() => handleEdit(product)}
                          title="Editează"
                        >
                          Editează
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={() => handleDelete(product.id)}
                          title="Șterge"
                        >
                          Șterge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductTable;

