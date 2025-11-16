package com.exercitiu.OnlineShop.Product;

import java.util.List;

public interface ServiceProduct {
    public List<Product> getAllProducts();
    public void createProduct(Product product);
    boolean deleteByIdProduct(Long id);
    boolean updateProductById(Long id, Product product);
}
