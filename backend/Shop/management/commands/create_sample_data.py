from django.core.management.base import BaseCommand
from Shop.models import Product

class Command(BaseCommand):
    help = 'Create sample products for testing'

    def handle(self, *args, **options):
        products = [
            {
                'name': 'iPhone 15 Pro',
                'price': 999.99,
                'discount_price': 899.99,
                'category': 'Electronics',
                'desc': 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.',
                'image': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
            },
            {
                'name': 'MacBook Pro 14"',
                'price': 1999.99,
                'category': 'Electronics',
                'desc': 'Powerful laptop with M3 chip, perfect for professionals and creatives.',
                'image': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400'
            },
            {
                'name': 'Sony WH-1000XM5',
                'price': 399.99,
                'discount_price': 349.99,
                'category': 'Electronics',
                'desc': 'Industry-leading noise canceling headphones with premium sound quality.',
                'image': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400'
            },
            {
                'name': 'Nike Air Max 270',
                'price': 150.00,
                'category': 'Footwear',
                'desc': 'Comfortable running shoes with max air cushioning for all-day comfort.',
                'image': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
            },
            {
                'name': 'Levi\'s 501 Jeans',
                'price': 59.99,
                'discount_price': 49.99,
                'category': 'Clothing',
                'desc': 'Classic straight-fit jeans, an iconic wardrobe staple.',
                'image': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400'
            },
            {
                'name': 'Samsung Galaxy Watch 6',
                'price': 329.99,
                'category': 'Electronics',
                'desc': 'Advanced smartwatch with health monitoring and fitness tracking.',
                'image': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
            },
            {
                'name': 'The North Face Jacket',
                'price': 199.99,
                'discount_price': 159.99,
                'category': 'Clothing',
                'desc': 'Waterproof outdoor jacket perfect for hiking and adventures.',
                'image': 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400'
            },
            {
                'name': 'Kindle Paperwhite',
                'price': 139.99,
                'category': 'Electronics',
                'desc': 'Waterproof e-reader with adjustable warm light and long battery life.',
                'image': 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=400'
            },
            {
                'name': 'Adidas Ultraboost 22',
                'price': 180.00,
                'discount_price': 144.00,
                'category': 'Footwear',
                'desc': 'Energy-returning running shoes with responsive boost midsole.',
                'image': 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400'
            },
            {
                'name': 'Patagonia Backpack',
                'price': 89.99,
                'category': 'Accessories',
                'desc': 'Durable 25L backpack perfect for daily commute and weekend adventures.',
                'image': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
            }
        ]

        for product_data in products:
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults=product_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created product: {product.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Product already exists: {product.name}')
                )

        self.stdout.write(
            self.style.SUCCESS('Sample data creation completed!')
        )