# Magazin Online - Gestionare Produse

Aplicație full-stack pentru gestionarea unui magazin online de produse, construită cu React, Java Spring Boot și MySQL.

## Tehnologii

- **Backend**: Spring Boot 3.5.7, Java 21, JPA/Hibernate
- **Frontend**: React, Axios
- **Database**: MySQL
- **Ports**: Backend (8080), Frontend (3000)

## Structura Bazei de Date

### Entitate Product
- `id` (Long) - Primary key, auto-generated
- `nume` (String)
- `descriere` (String)
- `categorie` (String)
- `subCategorie` (String)
- `nume_vanzator` (String)
- `pret` (double)
- `cantitate` (int)

## Funcționalități

### 1. Overview - Lista Produse
- Tabel cu toate coloanele produsului (ID, Nume, Descriere, Categorie, Subcategorie, Nume Vânzător, Preț, Cantitate)
- Filtrare după nume (LIKE search)
- Filtrare după preț (interval: preț minim și maxim)
- Operații Edit și Delete pentru fiecare produs

### 2. Adaugă Produs Nou
- Formular complet cu validare
- Validare pentru preț și cantitate (valori pozitive)

### 3. Editare Produs
- Formular pre-completat cu datele existente
- Actualizare prin endpoint PATCH

### 4. Ștergere Produs
- Confirmare înainte de ștergere
- Ștergere prin endpoint DELETE

## Structura Proiectului

```
OnlineShop/
├── frontend/              # Aplicație React
│   └── src/
│       ├── App.js
│       ├── ProductTable.js
│       ├── ProductForm.js
│       └── api.js
│
└── OnlineShop/           # Aplicație Spring Boot
    └── src/main/java/com/exercitiu/OnlineShop/
        └── Product/
            ├── Product.java
            ├── RepositoryProduct.java
            ├── ServiceProduct.java
            ├── ServiceProductImplem.java
            └── ControllerProduct.java
```

## Instalare și Configurare

### Cerințe
- Java 21
- Maven
- Node.js și npm
- MySQL Server

### Backend

1. Creează baza de date:
```sql
CREATE DATABASE magazin_online;
```

Creează tabelul în MySQL Workbench.

2. Configurează `OnlineShop/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/magazin_online?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

3. Rulează aplicația:
```bash
cd OnlineShop
mvn spring-boot:run
```

### Frontend

1. Instalează dependențele:
```bash
cd frontend
npm install
```

2. Rulează aplicația:
```bash
npm start
```

## Note

- Aplicația a fost testată în MySQL Workbench, unde tabelul a fost creat manual
- CORS este configurat pentru comunicare între frontend și backend
- Aplicația suportă operațiuni CRUD complete
