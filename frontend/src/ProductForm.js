import React, { useState, useEffect } from 'react';
import { productAPI } from './api';
import './ProductForm.css';

function ProductForm({ onProductAdded, editingProduct, onCancelEdit }) {
  const [formData, setFormData] = useState({
    nume: '',
    descriere: '',
    categorie: '',
    subCategorie: '',
    nume_vanzator: '',
    pret: '',
    cantitate: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        nume: editingProduct.nume || '',
        descriere: editingProduct.descriere || '',
        categorie: editingProduct.categorie || '',
        subCategorie: editingProduct.subCategorie || '',
        nume_vanzator: editingProduct.nume_vanzator || '',
        pret: editingProduct.pret || '',
        cantitate: editingProduct.cantitate || ''
      });
    } else {
      // Reset form when not editing
      setFormData({
        nume: '',
        descriere: '',
        categorie: '',
        subCategorie: '',
        nume_vanzator: '',
        pret: '',
        cantitate: ''
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    // Validation
    if (!formData.nume || !formData.descriere || !formData.categorie || 
        !formData.subCategorie || !formData.nume_vanzator || 
        !formData.pret || !formData.cantitate) {
      setMessage('Vă rugăm să completați toate câmpurile!');
      setSubmitting(false);
      return;
    }

    if (parseFloat(formData.pret) < 0) {
      setMessage('Prețul trebuie să fie pozitiv!');
      setSubmitting(false);
      return;
    }

    if (parseInt(formData.cantitate) < 0) {
      setMessage('Cantitatea trebuie să fie pozitivă!');
      setSubmitting(false);
      return;
    }

    try {
      const product = {
        nume: formData.nume,
        descriere: formData.descriere,
        categorie: formData.categorie,
        subCategorie: formData.subCategorie,
        nume_vanzator: formData.nume_vanzator,
        pret: parseFloat(formData.pret),
        cantitate: parseInt(formData.cantitate)
      };

      if (editingProduct) {
        // Update existing product
        await productAPI.updateProduct(editingProduct.id, product);
        setMessage('Produs editat cu succes!');
      } else {
        // Create new product
        await productAPI.createProduct(product);
        setMessage('Produs adăugat cu succes!');
      }
      
      // Reset form
      setFormData({
        nume: '',
        descriere: '',
        categorie: '',
        subCategorie: '',
        nume_vanzator: '',
        pret: '',
        cantitate: ''
      });

      // Notify parent component
      if (onProductAdded) {
        onProductAdded();
      }

      // If editing, cancel edit mode
      if (editingProduct && onCancelEdit) {
        onCancelEdit();
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setMessage(editingProduct ? 'Eroare la editarea produsului!' : 'Eroare la adăugarea produsului!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{editingProduct ? 'Editează Produs' : 'Adaugă Produs Nou'}</h2>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="nume">Nume *</label>
          <input
            type="text"
            id="nume"
            name="nume"
            value={formData.nume}
            onChange={handleChange}
            required
            placeholder="Introduceți numele produsului"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descriere">Descriere *</label>
          <textarea
            id="descriere"
            name="descriere"
            value={formData.descriere}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Introduceți descrierea produsului"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categorie">Categorie *</label>
          <input
            type="text"
            id="categorie"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            required
            placeholder="Ex: Electronice, Haine, etc."
          />
        </div>

        <div className="form-group">
          <label htmlFor="subCategorie">Subcategorie *</label>
          <input
            type="text"
            id="subCategorie"
            name="subCategorie"
            value={formData.subCategorie}
            onChange={handleChange}
            required
            placeholder="Ex: Telefoane, Pantaloni, etc."
          />
        </div>

        <div className="form-group">
          <label htmlFor="nume_vanzator">Nume Vânzător *</label>
          <input
            type="text"
            id="nume_vanzator"
            name="nume_vanzator"
            value={formData.nume_vanzator}
            onChange={handleChange}
            required
            placeholder="Introduceți numele vânzătorului"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pret">Preț (RON) *</label>
          <input
            type="number"
            id="pret"
            name="pret"
            value={formData.pret}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cantitate">Cantitate *</label>
          <input
            type="number"
            id="cantitate"
            name="cantitate"
            value={formData.cantitate}
            onChange={handleChange}
            required
            min="0"
            placeholder="0"
          />
        </div>

        {message && (
          <div className={`message ${message.includes('succes') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={submitting} className="submit-button">
            {submitting 
              ? (editingProduct ? 'Se salvează...' : 'Se adaugă...') 
              : (editingProduct ? 'Salvează Modificările' : 'Adaugă Produs')}
          </button>
          {editingProduct && onCancelEdit && (
            <button 
              type="button" 
              onClick={onCancelEdit} 
              className="cancel-button"
              disabled={submitting}
            >
              Anulează
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;

