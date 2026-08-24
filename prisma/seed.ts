import { PrismaClient, ProductScope } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

// Prisma 7 reaches Postgres through a driver adapter; see lib/prisma.ts.
// Schema changes run over the session connection, not the transaction pooler.
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL

if (!connectionString) {
  console.error('Set DATABASE_URL (and ideally DIRECT_URL) before seeding.')
  process.exit(1)
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) })

async function main() {
  console.log('Starting seed...')

  // Clean existing
  await prisma.productSourceCountry.deleteMany()
  await prisma.exportDestinationProduct.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.sourceCountry.deleteMany()
  await prisma.exportDestination.deleteMany()
  await prisma.user.deleteMany()
  
  // 1. SuperAdmin. Credentials come from the environment so that no password or
  // hash is ever committed. ADMIN_USERNAME / ADMIN_PASSWORD also work on their
  // own as a login (see lib/auth.ts), so skipping this row is not fatal.
  const adminEmail = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  if (adminEmail && adminPassword) {
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        passwordHash: await bcrypt.hash(adminPassword, 10),
        role: 'SuperAdmin'
      }
    })
    console.log(`Created SuperAdmin: ${adminEmail}`)
  } else {
    console.log('Skipped SuperAdmin row - ADMIN_USERNAME / ADMIN_PASSWORD not set.')
  }

  // 2. Categories
  const categories = [
    { name: 'Fresh Fruits', slug: 'fresh-fruits' },
    { name: 'Fresh Vegetables', slug: 'fresh-vegetables' },
    { name: 'Himalayan Pink Salt', slug: 'himalayan-salt' },
    { name: 'Dates', slug: 'dates' },
    { name: 'Sesame Seeds & Oilseeds', slug: 'seeds-oilseeds' },
    { name: 'Dry Fruits & Nuts', slug: 'dry-fruits' },
    { name: 'Spices & Aromatics', slug: 'spices-aromatics' },
    { name: 'Grains & Staples', slug: 'grains' },
    { name: 'Poultry / Eggs', slug: 'poultry' },
  ]
  const createdCategories: any = {}
  for (const cat of categories) {
    createdCategories[cat.name] = await prisma.category.create({ data: cat })
  }

  // 3. Source Countries
  const countries = [
    'Kenya', 'Egypt', 'Vietnam', 'South Africa', 'Iran', 'Pakistan', 
    'India', 'Sri Lanka', 'USA', 'China', 'Turkey', 'Azerbaijan'
  ]
  const createdCountries: any = {}
  for (const c of countries) {
    createdCountries[c] = await prisma.sourceCountry.create({
      data: { name: c, slug: c.toLowerCase().replace(/\s+/g, '-') }
    })
  }

  // 4. Products and Join with Countries
  const productsData = [
    // Kenya
    { name: 'Avocado', slug: 'avocado', category: 'Fresh Fruits', countries: ['Kenya'] },
    { name: 'Mango', slug: 'mango', category: 'Fresh Fruits', countries: ['Kenya', 'Egypt', 'Pakistan'] },
    // Egypt
    { name: 'Valencia Orange', slug: 'valencia-orange', category: 'Fresh Fruits', countries: ['Egypt'] },
    { name: 'Lemon', slug: 'lemon', category: 'Fresh Fruits', countries: ['Egypt'] },
    { name: 'Onion', slug: 'onion', category: 'Fresh Vegetables', countries: ['Egypt', 'Iran', 'India'] },
    // Vietnam
    { name: 'Lime', slug: 'lime', category: 'Fresh Fruits', countries: ['Vietnam'] },
    { name: 'Guava', slug: 'guava', category: 'Fresh Fruits', countries: ['Vietnam'] },
    { name: 'Diamond-Cut Coconut', slug: 'diamond-cut-coconut', category: 'Fresh Fruits', countries: ['Vietnam'] },
    { name: 'Dragon Fruit', slug: 'dragon-fruit', category: 'Fresh Fruits', countries: ['Vietnam'] },
    // South Africa
    { name: 'Valencia Apple', slug: 'valencia-apple', category: 'Fresh Fruits', countries: ['South Africa'] },
    { name: 'Grapes', slug: 'grapes', category: 'Fresh Fruits', countries: ['South Africa'] },
    { name: 'Nectarine', slug: 'nectarine', category: 'Fresh Fruits', countries: ['South Africa'] },
    { name: 'Plums', slug: 'plums', category: 'Fresh Fruits', countries: ['South Africa'] },
    { name: 'Pear', slug: 'pear', category: 'Fresh Fruits', countries: ['South Africa'] },
    // Iran
    { name: 'Apple', slug: 'apple', category: 'Fresh Fruits', countries: ['Iran', 'Azerbaijan'] },
    { name: 'Mix Vegetables', slug: 'mix-vegetables', category: 'Fresh Vegetables', countries: ['Iran', 'India'] },
    // Pakistan
    { name: 'Orange', slug: 'orange', category: 'Fresh Fruits', countries: ['Pakistan'] },
    { name: 'Potato', slug: 'potato', category: 'Fresh Vegetables', countries: ['Pakistan'] },
    { name: 'Green Peas', slug: 'green-peas', category: 'Fresh Vegetables', countries: ['Pakistan'] },
    { name: 'Bitter Gourd', slug: 'bitter-gourd', category: 'Fresh Vegetables', countries: ['Pakistan'] },
    { name: 'Carrot', slug: 'carrot', category: 'Fresh Vegetables', countries: ['Pakistan'] },
    { name: 'Tinda (Apple Gourd)', slug: 'tinda-apple-gourd', category: 'Fresh Vegetables', countries: ['Pakistan'] },
    { name: 'Loki (Bottle Gourd)', slug: 'loki-bottle-gourd', category: 'Fresh Vegetables', countries: ['Pakistan'] },
    { name: 'Arvi (Taro Root)', slug: 'arvi-taro-root', category: 'Fresh Vegetables', countries: ['Pakistan'] },
    { name: '1121 Basmati Rice', slug: '1121-basmati-rice', category: 'Grains & Staples', countries: ['Pakistan'] },
    { name: 'Premium Wheat', slug: 'premium-wheat', category: 'Grains & Staples', countries: ['Pakistan'] },
    // Himalayan salt (Khewra range, Punjab)
    { name: 'Himalayan Pink Salt Rock Crystals', slug: 'himalayan-pink-salt-crystals', category: 'Himalayan Pink Salt', countries: ['Pakistan'] },
    { name: 'Himalayan Pink Salt - Fine Ground', slug: 'himalayan-pink-salt-fine', category: 'Himalayan Pink Salt', countries: ['Pakistan'] },
    // Dates (Khairpur / Sindh belt)
    { name: 'Aseel Dates', slug: 'aseel-dates', category: 'Dates', countries: ['Pakistan'] },
    { name: 'Ajwa Dates', slug: 'ajwa-dates', category: 'Dates', countries: ['Pakistan'] },
    { name: 'Dry Dates (Chuara)', slug: 'dry-dates-chuara', category: 'Dates', countries: ['Pakistan'] },
    // Sesame and oilseeds
    { name: 'Natural White Sesame Seeds', slug: 'natural-white-sesame-seeds', category: 'Sesame Seeds & Oilseeds', countries: ['Pakistan'] },
    { name: 'Hulled Sesame Seeds', slug: 'hulled-sesame-seeds', category: 'Sesame Seeds & Oilseeds', countries: ['Pakistan'] },
    { name: 'Black Sesame Seeds', slug: 'black-sesame-seeds', category: 'Sesame Seeds & Oilseeds', countries: ['Pakistan'] },
    // India
    { name: 'Green Chili', slug: 'green-chili', category: 'Fresh Vegetables', countries: ['India'] },
    { name: 'Pomegranate', slug: 'pomegranate', category: 'Fresh Fruits', countries: ['India'] },
    // Sri Lanka
    { name: 'Coconut', slug: 'coconut', category: 'Fresh Fruits', countries: ['Sri Lanka'] },
    // USA
    { name: 'Walnuts', slug: 'walnuts', category: 'Dry Fruits & Nuts', countries: ['USA'] },
    { name: 'Almonds', slug: 'almonds', category: 'Dry Fruits & Nuts', countries: ['USA'] },
    // China
    { name: 'Garlic', slug: 'garlic', category: 'Spices & Aromatics', countries: ['China'] },
    { name: 'Ginger', slug: 'ginger', category: 'Spices & Aromatics', countries: ['China'] },
    // Turkey
    { name: 'Eggs', slug: 'eggs', category: 'Poultry / Eggs', countries: ['Turkey'] },
    // Azerbaijan
    { name: 'Persimmon', slug: 'persimmon', category: 'Fresh Fruits', countries: ['Azerbaijan'] },
  ]

  const createdProducts: any = {}
  for (const p of productsData) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        categoryId: createdCategories[p.category].id,
        seoTitle: `${p.name} Supplier & Exporter | Wholesale`,
        seoMeta: `Premium quality ${p.name} for wholesale import. Contact KhasCom today.`,
      }
    })
    createdProducts[p.slug] = product

    for (const cName of p.countries) {
      await prisma.productSourceCountry.create({
        data: {
          productId: product.id,
          sourceCountryId: createdCountries[cName].id
        }
      })
    }
  }

  // 5. Export Destinations
  const destinations = [
    { name: 'Saudi Arabia', slug: 'saudi-arabia', scope: ProductScope.MixFruits }, // plus dry items
    { name: 'Oman', slug: 'oman', scope: ProductScope.MixFruits },
    { name: 'Qatar', slug: 'qatar', scope: ProductScope.MixFruits },
  ]
  
  for (const d of destinations) {
    const dest = await prisma.exportDestination.create({
      data: {
        name: d.name,
        slug: d.slug,
        productScope: d.scope,
      }
    })

    // Link destination to MixFruits category (Fresh Fruits)
    await prisma.exportDestinationProduct.create({
      data: {
        exportDestinationId: dest.id,
        categoryId: createdCategories['Fresh Fruits'].id
      }
    })
    
    if (d.name === 'Saudi Arabia') {
      await prisma.exportDestinationProduct.create({
        data: {
          exportDestinationId: dest.id,
          categoryId: createdCategories['Dry Fruits & Nuts'].id
        }
      })
    }
  }

  console.log('Seed complete!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
