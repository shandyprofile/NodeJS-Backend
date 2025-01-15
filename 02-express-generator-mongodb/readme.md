# Node.js Express CRUD Application with MongoDB and EJS

## 1. Installation

[Install Express-Generator](https://expressjs.com/en/starter/generator.html)

Run the following commands to set up the project:

```bash
npx express-generator --view=ejs express_crud
cd express_crud
npm install
npm install mongodb body-parser dotenv
```

## 2. Directory Structure

```
express_crud/
├── bin/
│   └── www
├── public/
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
│       └── style.css
├── routes/
│   ├── index.js
│   ├── users.js
│   ├── products.js
│   └── categories.js
├── views/
│   ├── error.ejs
│   ├── index.ejs
│   ├── layout.ejs
│   └── others...
├── models/
│   ├── Product.js
│   └── Category.js
├── app.js
├── package.json
├── package-lock.json
└── .env
```

## 3. MongoDB Configuration

### Create .env File

Add the following environment variables to a .env file:

```
MONGO_URI=mongodb://localhost:27017/express_crud
PORT=3000
```

### Update app.js

Modify the app.js file to connect to MongoDB and use routers:

```
require('dotenv').config();
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

const app = express();
const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        app.locals.db = client.db('express_crud');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}
connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

module.exports = app;


```

## 4.Models

### Product Model (models/Product.js)

```
const { ObjectId } = require('mongodb');

class ProductModel {
    constructor(db) {
        this.collection = db.collection('products');
    }

    async getAll() {
        return await this.collection.find().toArray();
    }

    async getById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    async add(product) {
        const result = await this.collection.insertOne(product);
        return result;
    }

    async update(id, product) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: product }
        );
    }

    async delete(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = ProductModel;

```

### Category Model (models/Category.js)

```
const { ObjectId } = require('mongodb');

class CategoryModel {
    constructor(db) {
        this.collection = db.collection('categories');
    }

    async getAll() {
        return await this.collection.find().toArray();
    }

    async getById(id) {
        return await this.collection.findOne({ _id: new ObjectId(id) });
    }

    async add(category) {
        const result = await this.collection.insertOne(category);
        return result;
    }

    async update(id, category) {
        return await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: category }
        );
    }

    async delete(id) {
        return await this.collection.deleteOne({ _id: new ObjectId(id) });
    }
}

module.exports = CategoryModel;

```

## 5. Routers

Product Router (routes/products.js)

```
const express = require('express');
const router = express.Router();
const ProductModel = require('../models/Product');

router.use((req, res, next) => {
    req.productModel = new ProductModel(req.app.locals.db);
    next();
});

router.get('/', async (req, res) => {
    const products = await req.productModel.getAll();
    res.json(products);
});

router.post('/add', async (req, res) => {
    const product = await req.productModel.add(req.body);
    res.json(product);
});

router.put('/:id', async (req, res) => {
    const result = await req.productModel.update(req.params.id, req.body);
    res.json({ message: 'Product updated', result });
});

router.delete('/:id', async (req, res) => {
    const result = await req.productModel.delete(req.params.id);
    res.json({ message: 'Product deleted', result });
});

module.exports = router;


```

Category Router (routes/categories.js)

```
const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/Category');

router.use((req, res, next) => {
    req.categoryModel = new CategoryModel(req.app.locals.db);
    next();
});

// Get all categories
router.get('/', async (req, res) => {
    const categories = await req.categoryModel.getAll();
    res.json(categories);
});

// Add a new category
router.post('/add', async (req, res) => {
    const category = await req.categoryModel.add(req.body);
    res.json(category);
});

// Update a category
router.put('/:id', async (req, res) => {
    const result = await req.categoryModel.update(req.params.id, req.body);
    res.json({ message: 'Category updated', result });
});

// Delete a category
router.delete('/:id', async (req, res) => {
    const result = await req.categoryModel.delete(req.params.id);
    res.json({ message: 'Category deleted', result });
});

module.exports = router;

```

## 6. Testing with Postman

### 6.1. Test Product Endpoints

**GET /products**

- Method: GET
- URL: http://localhost:3000/products
- Response: List of all products in JSON format.

**POST /products/add**

- Method: POST
- URL: http://localhost:3000/products/add
- Body (JSON):

```
{
  "name": "Laptop",
  "price": 1000,
  "category": "Electronics"
}
```

Response: The created product object in JSON format.

**DELETE /products/:id**

- Method: DELETE
- URL: http://localhost:3000/products/<product_id>
- Response: { "message": "Product deleted" }

### 6.2. Category

**GET /categories**

- Method: GET
- URL: http://localhost:3000/categories
- Response: List of all categories in JSON format.

**POST /categories/add**

- Method: POST
- URL: http://localhost:3000/categories/add
- Body (JSON):

```
{
  "name": "Electronics",
  "description": "Electronic devices"
}
```

Response: The created category object in JSON format.

**DELETE /categories/:id**

- Method: DELETE
- URL: http://localhost:3000/categories/<category_id>
- Response: { "message": "Category deleted" }
