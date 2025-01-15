# Node.js Express CRUD Application with MongoDB and EJS

## 1. Installation

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
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

module.exports = app;

```

## 4.Models

### Product Model (models/Product.js)

```
const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
});
module.exports = mongoose.model('Product', ProductSchema);
```

### Category Model (models/Category.js)
```
const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: String,
    description: String,
});
module.exports = mongoose.model('Category', CategorySchema);
```

## 5. Routers

Product Router (routes/products.js)

```
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post('/add', async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});

router.delete('/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
});

module.exports = router;
```

Category Router (routes/categories.js)

```
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

// Add a new category
router.post('/add', async (req, res) => {
    const category = await Category.create(req.body);
    res.json(category);
});

// Delete a category
router.delete('/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
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
