// Run this script to populate your MongoDB with initial data
// Usage: node scripts/seedData.js

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

const coursesData = [
  {
    title: 'UDAAN Batch (Class 7-10)',
    icon: 'FaBook',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
    description: 'Our foundation course is designed to build strong fundamentals in Science and Mathematics. The program focuses on NCERT curriculum while introducing advanced concepts gradually. Features include:',
    features: [
      'Comprehensive coverage of NCERT syllabus',
      'Weekly tests and assessments',
      'Doubt clearing sessions',
      'Regular parent-teacher meetings',
      'Preparation for Olympiads and competitive exams'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Class 11 Science',
    icon: 'FaCalculator',
    image: 'https://images.pexels.com/photos/6238120/pexels-photo-6238120.jpeg',
    description: 'Class 11 is crucial for building strong fundamentals for competitive exams. Our program covers:',
    features: [
      'PCM and PCB streams',
      'Focus on board exam preparation',
      'Integration with JEE/NEET concepts',
      'Regular practical sessions',
      'Monthly tests and performance analysis'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Class 12 Science',
    icon: 'FaCalculator',
    image: 'https://images.pexels.com/photos/6238120/pexels-photo-6238120.jpeg',
    description: 'Our Class 12 program ensures excellent board results while preparing for competitive exams:',
    features: [
      'Board exam-oriented teaching',
      'Previous year question practice',
      'Regular mock tests',
      'Special doubt clearing sessions',
      'Pre-board examinations'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'IIT JEE Preparation',
    icon: 'FaFlask',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg',
    description: 'Comprehensive coaching for JEE Main & Advanced with proven results:',
    features: [
      'Concept-based learning approach',
      'Advanced problem-solving techniques',
      'Regular mock tests',
      'Personal mentoring',
      'Performance tracking system'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'NEET Preparation',
    icon: 'FaMicroscope',
    image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg',
    description: 'Expert guidance for NEET preparation with focus on Biology, Chemistry and Physics:',
    features: [
      'NCERT-based teaching',
      'Regular practical sessions',
      'Topic-wise tests',
      'Previous year question analysis',
      'Medical entrance specific guidance'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'IISER Preparation',
    icon: 'FaUniversity',
    image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
    description: 'Specialized coaching for Indian Institutes of Science Education and Research:',
    features: [
      'Aptitude development',
      'Research-oriented approach',
      'Scientific thinking skills',
      'Interview preparation',
      'Practical training'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'NISER Preparation',
    icon: 'FaUniversity',
    image: 'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg',
    description: 'Dedicated program for National Institute of Science Education and Research:',
    features: [
      'NEST exam preparation',
      'Scientific aptitude development',
      'Regular mock tests',
      'Interview guidance',
      'Research paper analysis'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'CUET Preparation',
    icon: 'FaGraduationCap',
    image: 'https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg',
    description: 'Comprehensive preparation for Common University Entrance Test:',
    features: [
      'Domain subject preparation',
      'General test practice',
      'Language proficiency',
      'Mock tests',
      'University-specific guidance'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'OUAT Preparation',
    icon: 'FaBook',
    image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg',
    description: 'Specialized coaching for Odisha University of Agriculture and Technology:',
    features: [
      'Agriculture science focus',
      'Biology and Chemistry emphasis',
      'Previous year analysis',
      'Regular mock tests',
      'Career counseling'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const facultyData = [
  {
    name: 'Dr. Rahul Sharma',
    position: 'Physics Expert',
    image: 'https://images.pexels.com/photos/8197509/pexels-photo-8197509.jpeg',
    education: 'PhD in Theoretical Physics, IIT Delhi',
    experience: '15+ years teaching experience',
    description: 'Specializes in Classical Mechanics and Quantum Physics. Has helped numerous students crack IIT JEE with top ranks.',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'mailto:rahul@example.com'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Prof. Alisha Patel',
    position: 'Chemistry Specialist',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
    education: 'MSc. in Chemistry, ICT Mumbai',
    experience: '12+ years of academic excellence',
    description: 'Expert in Organic Chemistry and Chemical Kinetics. Known for making complex concepts easy to understand.',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'mailto:alisha@example.com'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Mr. Vikram Desai',
    position: 'Mathematics Genius',
    image: 'https://images.pexels.com/photos/8363742/pexels-photo-8363742.jpeg',
    education: 'M.Tech, IIT Kharagpur',
    experience: '10+ years teaching mathematics',
    description: 'Specializes in Calculus and Coordinate Geometry. Has authored several books on JEE Mathematics.',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'mailto:vikram@example.com'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Dr. Priya Gupta',
    position: 'Biology Expert',
    image: 'https://images.pexels.com/photos/5905921/pexels-photo-5905921.jpeg',
    education: 'PhD in Molecular Biology, AIIMS',
    experience: '8+ years in medical entrances',
    description: 'Expert in Human Physiology and Molecular Biology. Provides specialized guidance for NEET aspirants.',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'mailto:priya@example.com'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Prof. Amit Kumar',
    position: 'Physical Chemistry Expert',
    image: 'https://images.pexels.com/photos/8197521/pexels-photo-8197521.jpeg',
    education: 'PhD in Physical Chemistry, IISc Bangalore',
    experience: '14+ years teaching experience',
    description: 'Specializes in Thermodynamics and Chemical Equilibrium. Research experience in computational chemistry.',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'mailto:amit@example.com'
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('web-data');
    
    // Clear existing data
    await db.collection('Courses').deleteMany({});
    await db.collection('Faculty').deleteMany({});
    
    // Insert courses
    const coursesResult = await db.collection('Courses').insertMany(coursesData);
    console.log(`${coursesResult.insertedCount} courses inserted`);
    
    // Insert faculty
    const facultyResult = await db.collection('Faculty').insertMany(facultyData);
    console.log(`${facultyResult.insertedCount} faculty members inserted`);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();