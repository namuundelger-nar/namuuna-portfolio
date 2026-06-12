import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Profile
  const profile = await prisma.profile.create({
    data: {
      name: 'Namuundelger Narmandakh',
      title: 'Data Governance, AI Validation & Financial Analysis Specialist',
      bio: "Dynamic MSc Candidate in International Economics and Business with a background in International Relations and a specialized focus on Data Governance, AI Validation, and Financial Analysis. I am proficient in leveraging Python, SQL, and VBA. Results-driven data and operations specialist with experience in supporting business operations with a bachelor's thesis on China's Belt and Road Initiative. Proven ability to coordinate complex projects and facilitate international business communications across multiple languages.",
      email: 'narmandakhnamuuna@gmail.com',
      phone: '+36703465777',
      location: 'Budapest, Hungary',
      github: 'https://github.com/namuuna', // Placeholder
      linkedin: 'https://linkedin.com/in/namuuna', // Placeholder
    },
  })

  // Experience
  await prisma.experience.create({
    data: {
      company: 'Freelance',
      role: 'Translator & Media Communications',
      startDate: '2024',
      endDate: '2025',
      location: 'Moscow, Russia',
      description: 'Facilitated business communication and partnership development for Mongolian-Russian trade at international exhibitions, including Expocentre Moscow 2025 for distributors.',
      techStack: 'Communication, Translation, Business Development',
      order: 1,
    },
  })

  // Education
  await prisma.education.createMany({
    data: [
      {
        institution: 'Budapest University of Economics and Business',
        degree: 'International Economic and Business MSc',
        startDate: '09/2025',
        endDate: '07/2027',
        location: 'Budapest, Hungary',
        description: 'Courses: People management, Financial Management, Advanced Economy and Business Administration',
        order: 1,
      },
      {
        institution: 'The Russian Presidential Academy of National Economy and Public Administration',
        degree: 'International Relations BSc',
        startDate: '09/2020',
        endDate: '07/2025',
        location: 'Moscow, Russia',
        order: 2,
      },
    ],
  })

  // Skills
  await prisma.skill.createMany({
    data: [
      { category: 'Technical - Programming & Frameworks', name: 'Python', order: 1 },
      { category: 'Technical - Programming & Frameworks', name: 'SQL', order: 2 },
      { category: 'Technical - Programming & Frameworks', name: 'VBA', order: 3 },
      { category: 'Technical - Financial & Risk Systems', name: 'SAP ERP', order: 4 },
      { category: 'Technical - Financial & Risk Systems', name: 'Power BI', order: 5 },
      { category: 'Technical - Financial & Risk Systems', name: 'Tableau', order: 6 },
      { category: 'Technical - AI & Data Validation', name: 'AI Model Validation', order: 7 },
      { category: 'Technical - AI & Data Validation', name: 'Anomaly Detection', order: 8 },
      { category: 'Technical - AI & Data Validation', name: 'Geopolitical & Economic Analysis', order: 9 },
      { category: 'Languages', name: 'English (Fluent)', order: 10 },
      { category: 'Languages', name: 'Russian (Fluent)', order: 11 },
      { category: 'Languages', name: 'Spanish (Upper Intermediate)', order: 12 },
      { category: 'Languages', name: 'German (Intermediate)', order: 13 },
      { category: 'Languages', name: 'Hungarian (Beginner)', order: 14 },
      { category: 'Languages', name: 'Mongolian (Native)', order: 15 },
    ],
  })

  console.log('Seed data created successfully')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
