const mongoose = require('mongoose');
const Contact = require('../models/contacts.model');

async function run() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/contact-crud');
    console.log('Connected to MongoDB');

    const dummyContacts = [
      {
        first_name: 'Yahu',
        last_name: 'Baba',
        email: 'yahubaba@emailc.com',
        phone: '99889988',
        address: '#123, AB Road, Delhi',
      },
      {
        first_name: 'Asha',
        last_name: 'Verma',
        email: 'asha.verma@example.com',
        phone: '9876543210',
        address: '12, MG Road, Bengaluru',
      },
      {
        first_name: 'Rohan',
        last_name: 'Sharma',
        email: 'rohan.sharma@example.com',
        phone: '9123456780',
        address: '221-B, Bandra West, Mumbai',
      },
      {
        first_name: 'Priya',
        last_name: 'Iyer',
        email: 'priya.iyer@example.com',
        phone: '9812345678',
        address: '45, Anna Salai, Chennai',
      },
      {
        first_name: 'Aman',
        last_name: 'Khan',
        email: 'aman.khan@example.com',
        phone: '9001234567',
        address: '7, Park Street, Kolkata',
      },
      {
        first_name: 'Neha',
        last_name: 'Gupta',
        email: 'neha.gupta@example.com',
        phone: '9551237890',
        address: '9/3, Civil Lines, Prayagraj',
      },
      {
        first_name: 'Vikram',
        last_name: 'Singh',
        email: 'vikram.singh@example.com',
        phone: '9700012345',
        address: 'H.No. 56, Sector 15, Chandigarh',
      },
      {
        first_name: 'Anita',
        last_name: 'Desai',
        email: 'anita.desai@example.com',
        phone: '9898989898',
        address: '3, CG Road, Ahmedabad',
      },
      {
        first_name: 'Karan',
        last_name: 'Malhotra',
        email: 'karan.malhotra@example.com',
        phone: '9654321000',
        address: '16, Rajouri Garden, New Delhi',
      },
      {
        first_name: 'Sara',
        last_name: 'Ali',
        email: 'sara.ali@example.com',
        phone: '9807654321',
        address: '200, Hazratganj, Lucknow',
      },
    ];

    const result = await Contact.insertMany(dummyContacts, { ordered: false });
    console.log(`Inserted ${result.length} contacts.`);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

run();
