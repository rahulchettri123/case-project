import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create admin user
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
  });
  console.log(`Created admin user: ${admin.name}`);

  // Create regular user
  const hashedUserPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: hashedUserPassword,
      role: 'USER',
    },
  });
  console.log(`Created regular user: ${user.name}`);

  // Create iPhone 16 Pro Max category
  const iphone16Category = await prisma.category.upsert({
    where: { slug: 'iphone16-pro-max' },
    update: {},
    create: {
      name: 'iPhone 16 Pro Max',
      slug: 'iphone16-pro-max',
      image: '/images/iphone16-pmax1.webp',
    },
  });
  console.log(`Created category: ${iphone16Category.name}`);

  // Create iPhone 15 Pro Max category
  const iphone15Category = await prisma.category.upsert({
    where: { slug: 'iphone15-pro-max' },
    update: {},
    create: {
      name: 'iPhone 15 Pro Max',
      slug: 'iphone15-pro-max',
      image: '/images/iphone15-pmax1.webp',
    },
  });
  console.log(`Created category: ${iphone15Category.name}`);

  // Create iPhone 16 Pro Max products
  const iphone16Products = [
    {
      name: 'iPhone 16 Pro Max 256GB - Natural Titanium',
      description: 'The iPhone 16 Pro Max features the A18 Pro chip, a stunning 6.9-inch Super Retina XDR display with ProMotion technology, a professional camera system with 48MP main camera, and all-day battery life.',
      price: 1199.99,
      images: ['/images/iphone16-pmax1.webp', '/images/iphone16-pmax2.webp'],
      stock: 50,
      sku: 'IP16PM-256-NT',
      featured: true,
      categoryId: iphone16Category.id,
    },
    {
      name: 'iPhone 16 Pro Max 512GB - Black Titanium',
      description: 'The iPhone 16 Pro Max with 512GB features the A18 Pro chip, a stunning 6.9-inch Super Retina XDR display with ProMotion technology, a professional camera system with 48MP main camera, and all-day battery life.',
      price: 1399.99,
      images: ['/images/iphone16-pmax2.webp', '/images/iphone16-pmax1.webp'],
      stock: 30,
      sku: 'IP16PM-512-BT',
      featured: false,
      categoryId: iphone16Category.id,
    },
  ];

  // Create iPhone 15 Pro Max products
  const iphone15Products = [
    {
      name: 'iPhone 15 Pro Max 256GB - Blue Titanium',
      description: 'The iPhone 15 Pro Max features the A17 Pro chip, a 6.7-inch Super Retina XDR display with ProMotion technology, a professional camera system with 48MP main camera, and amazing battery life.',
      price: 999.99,
      images: ['/images/iphone15-pmax1.webp', '/images/iphone15-pmax2.webp'],
      stock: 40,
      sku: 'IP15PM-256-BT',
      featured: true,
      categoryId: iphone15Category.id,
    },
    {
      name: 'iPhone 15 Pro Max 512GB - Natural Titanium',
      description: 'The iPhone 15 Pro Max with 512GB storage features the A17 Pro chip, a 6.7-inch Super Retina XDR display with ProMotion technology, a professional camera system with 48MP main camera, and amazing battery life.',
      price: 1199.99,
      images: ['/images/iphone15-pmax2.webp', '/images/iphone15-pmax1.webp'],
      stock: 25,
      sku: 'IP15PM-512-NT',
      featured: false,
      categoryId: iphone15Category.id,
    },
  ];

  // Insert all iPhone 16 Pro Max products
  for (const product of iphone16Products) {
    const createdProduct = await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
    console.log(`Created product: ${createdProduct.name}`);

    // Add variants for each product
    const variants = [
      { name: 'Color', value: 'Natural Titanium', stock: 25 },
      { name: 'Color', value: 'Black Titanium', stock: 15 },
      { name: 'Color', value: 'White Titanium', stock: 10 },
    ];

    for (const variant of variants) {
      await prisma.productVariant.create({
        data: {
          ...variant,
          productId: createdProduct.id,
        },
      });
    }
    console.log(`Added variants for product: ${createdProduct.name}`);
  }

  // Insert all iPhone 15 Pro Max products
  for (const product of iphone15Products) {
    const createdProduct = await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: product,
    });
    console.log(`Created product: ${createdProduct.name}`);

    // Add variants for each product
    const variants = [
      { name: 'Color', value: 'Blue Titanium', stock: 20 },
      { name: 'Color', value: 'Natural Titanium', stock: 20 },
      { name: 'Color', value: 'Black Titanium', stock: 10 },
    ];

    for (const variant of variants) {
      await prisma.productVariant.create({
        data: {
          ...variant,
          productId: createdProduct.id,
        },
      });
    }
    console.log(`Added variants for product: ${createdProduct.name}`);
  }

  // Create some reviews for the products
  const reviews = [
    {
      userId: user.id,
      productId: (await prisma.product.findUnique({ where: { sku: 'IP16PM-256-NT' } }))!.id,
      rating: 5,
      comment: 'Amazing phone! The camera quality is incredible and the battery life is outstanding.',
    },
    {
      userId: user.id,
      productId: (await prisma.product.findUnique({ where: { sku: 'IP15PM-256-BT' } }))!.id,
      rating: 4,
      comment: 'Great phone overall. The Blue Titanium looks gorgeous. Battery life could be a bit better.',
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({
      data: review,
    });
  }
  console.log('Created product reviews');

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 