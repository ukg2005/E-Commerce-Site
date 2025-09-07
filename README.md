# ShopEasy - Complete E-Commerce Web Application

A full-stack single-page e-commerce application built with Django REST Framework backend and React TypeScript frontend.

![Homepage](https://github.com/user-attachments/assets/b0561b55-d588-45d8-ba04-822877139ac0)

## Features

### Backend (Django + DRF)
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Product Management**: CRUD operations with filtering, search, and pagination
- **Shopping Cart**: Persistent cart functionality with add/remove/update operations
- **Order Management**: Complete order processing with customer information
- **API Documentation**: RESTful API with comprehensive endpoints
- **Admin Interface**: Django admin for managing products, orders, and users

### Frontend (React + TypeScript)
- **Single Page Application**: Built with React Router for seamless navigation
- **Modern UI**: Professional design using Tailwind CSS
- **Authentication**: Login/Register with protected routes
- **Product Catalog**: Grid layout with filtering (category, price range, search)
- **Shopping Cart**: Real-time cart updates with quantity management
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **State Management**: Context API for authentication and cart state

## Screenshots

### Homepage
![Homepage](https://github.com/user-attachments/assets/b0561b55-d588-45d8-ba04-822877139ac0)

### Login Page
![Login](https://github.com/user-attachments/assets/348370d8-3606-47d7-8c90-3296a7bb22d0)

### Registration Page
![Register](https://github.com/user-attachments/assets/800306dd-0be1-46d1-a18d-5c3a948cc7c0)

## Technology Stack

### Backend
- **Django 5.2**: Web framework
- **Django REST Framework**: API development
- **Django REST Framework Simple JWT**: JWT authentication
- **Django CORS Headers**: Cross-origin resource sharing
- **SQLite**: Database (easily configurable for PostgreSQL)
- **Python 3.12**: Programming language

### Frontend
- **React 18**: Frontend framework
- **TypeScript**: Type safety
- **React Router Dom**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API calls
- **Context API**: State management

## Project Structure

```
├── backend/                 # Django REST API
│   ├── EcomSite/           # Django project settings
│   ├── Shop/               # Main application
│   │   ├── models.py       # Database models
│   │   ├── serializers.py  # API serializers
│   │   ├── views.py        # API views
│   │   ├── urls.py         # URL routing
│   │   └── admin.py        # Admin configuration
│   ├── requirements.txt    # Python dependencies
│   └── manage.py          # Django management script
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/            # Static assets
│   └── package.json       # Node.js dependencies
└── README.md             # This file
```

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create sample data**
   ```bash
   python manage.py create_sample_data
   ```

6. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the development server**
   ```bash
   python manage.py runserver
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/refresh/` - Refresh JWT token
- `GET /api/auth/profile/` - Get user profile

### Products
- `GET /api/products/` - List products with filtering
- `GET /api/products/{id}/` - Get product details

### Cart
- `GET /api/cart/` - Get user's cart
- `POST /api/cart/add/` - Add item to cart
- `PUT /api/cart/update/{item_id}/` - Update cart item quantity
- `DELETE /api/cart/remove/{item_id}/` - Remove item from cart
- `DELETE /api/cart/clear/` - Clear entire cart

### Orders
- `GET /api/orders/` - List user's orders
- `POST /api/orders/create/` - Create new order
- `GET /api/orders/{id}/` - Get order details

## Features in Detail

### Authentication System
- JWT-based authentication with access and refresh tokens
- Automatic token refresh on API calls
- Protected routes that redirect to login
- Persistent login state across browser sessions

### Product Catalog
- Grid layout with responsive design
- Real-time search functionality
- Category filtering
- Price range filtering
- Sorting options (price, name, date)
- Product images and detailed information

### Shopping Cart
- Add/remove products with instant updates
- Quantity adjustment with validation
- Real-time price calculation
- Cart persistence across login sessions
- Clear cart functionality

### Order Management
- Complete checkout process with shipping information
- Order history for authenticated users
- Order status tracking
- Detailed order information display

## Development

### Adding New Products
Use the Django admin interface or create a management command:

```bash
python manage.py shell
```

```python
from Shop.models import Product

Product.objects.create(
    name="New Product",
    price=99.99,
    category="Electronics",
    desc="Product description",
    image="https://example.com/image.jpg"
)
```

### Customizing the Frontend
- Modify `src/components/` for UI components
- Update `src/contexts/` for state management
- Edit `src/services/api.ts` for API integration
- Customize styles in Tailwind CSS classes

## Testing

### Backend Testing
```bash
cd backend
python manage.py test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Production Deployment

### Backend
1. Set `DEBUG = False` in settings.py
2. Configure proper database (PostgreSQL recommended)
3. Set up static file serving
4. Configure CORS for production domain
5. Use environment variables for sensitive settings

### Frontend
1. Build the production version:
   ```bash
   npm run build
   ```
2. Serve the built files using a web server (Nginx, Apache)
3. Update API URL for production backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please open an issue in the GitHub repository.