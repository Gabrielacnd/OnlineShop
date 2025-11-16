package com.exercitiu.OnlineShop.Product;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ControllerProduct {
    private ServiceProduct serviceProduct;
    private RepositoryProduct repositoryProduct;

    public ControllerProduct(ServiceProduct serviceProduct, RepositoryProduct repositoryProduct) {
        this.serviceProduct = serviceProduct;
        this.repositoryProduct = repositoryProduct;
    }
    
    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
    ) {
        return repositoryProduct.findAll().stream()
                .filter(p -> name == null || name.isEmpty() || p.getNume().toLowerCase().contains(name.toLowerCase()))
                .filter(p -> minPrice == null || p.getPret() >= minPrice)
                .filter(p -> maxPrice == null || p.getPret() <= maxPrice)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<String> getAllProducts(@RequestBody Product product){
        serviceProduct.createProduct(product);
        return new ResponseEntity<>("Produs adaugat cu succes!",HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        boolean sters=serviceProduct.deleteByIdProduct(id);
        if(sters){
            return new ResponseEntity<>("Produs sters cu succes!",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PatchMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody Product product){
        boolean produsEditat=serviceProduct.updateProductById(id,product);
        if(produsEditat){
            return new ResponseEntity<>("Produs editat cu succes!",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
