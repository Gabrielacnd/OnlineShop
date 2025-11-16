package com.exercitiu.OnlineShop.Product;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceProductImplem implements ServiceProduct {
    private RepositoryProduct repositoryProduct;
    public ServiceProductImplem(RepositoryProduct repositoryProduct){
        this.repositoryProduct = repositoryProduct;
    }
    @Override
    public List<Product> getAllProducts() {
        return repositoryProduct.findAll();
    }

    @Override
    public void createProduct(Product product) {
        repositoryProduct.save(product);
    }

    @Override
    public boolean deleteByIdProduct(Long id) {
        try{
            repositoryProduct.deleteById(id);
            return true;
        }
        catch(Exception e){
            return false;
        }

    }

    @Override
    public boolean updateProductById(Long id, Product product) {
        Product produs=repositoryProduct.findById(id).orElseThrow(()->new RuntimeException("Produsul nu a fost gasit!"));
        if(produs!=null){
            produs=repositoryProduct.save(product);
            return true;
        }
        else {
            return false;
        }
    }
}
