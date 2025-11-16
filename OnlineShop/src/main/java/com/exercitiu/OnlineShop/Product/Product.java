package com.exercitiu.OnlineShop.Product;

import jakarta.persistence.*;

@Entity
@Table(name="product")
public class Product {
    private String nume;
    private String descriere;
    private String categorie;
    private String subCategorie;
    private String nume_vanzator;
    private double pret;
    private int cantitate;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Product() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNume() {
        return nume;
    }

    public String getDescriere() {
        return descriere;
    }

    public String getCategorie() {
        return categorie;
    }

    public String getSubCategorie() {
        return subCategorie;
    }

    public String getNume_vanzator() {
        return nume_vanzator;
    }

    public double getPret() {
        return pret;
    }

    public int getCantitate() {
        return cantitate;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public void setSubCategorie(String subCategorie) {
        this.subCategorie = subCategorie;
    }

    public void setNume_vanzator(String nume_vanzator) {
        this.nume_vanzator = nume_vanzator;
    }

    public void setPret(double pret) {
        this.pret = pret;
    }

    public void setCantitate(int cant ){
        this.cantitate = cant;
    }
}
