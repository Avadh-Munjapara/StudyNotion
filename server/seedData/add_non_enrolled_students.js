const fs = require('fs');
const path = require('path');

// Lists of Indian names for uniqueness
const firstNames = [
  'Aarav', 'Aditi', 'Amit', 'Ananya', 'Arjun', 'Avani', 'Deepak', 'Diya',
  'Gaurav', 'Ishaan', 'Kavya', 'Manish', 'Neha', 'Nikhil', 'Pooja', 'Rahul',
  'Riya', 'Rohan', 'Saanvi', 'Sanjay', 'Shreya', 'Siddharth', 'Tanya', 'Vikram',
  'Yash', 'Priya', 'Vivek', 'Anjali', 'Harsh', 'Meera', 'Kunal', 'Sneha',
  'Aditya', 'Nisha', 'Rakesh'
];
const lastNames = [
  'Agarwal', 'Bhat', 'Chaudhary', 'Desai', 'Gupta', 'Jain', 'Joshi', 'Kapoor',
  'Khan', 'Kumar', 'Mehta', 'Mishra', 'Patel', 'Rao', 'Reddy', 'Sharma',
  'Singh', 'Srivastava', 'Verma', 'Yadav', 'Malhotra', 'Nair', 'Pandey',
  'Rathore', 'Shetty'
];

// Sample interests for additionalDetails.about
const interests = [
  'Looking to start my coding journey',
  'Interested in learning web development',
  'Aspiring data scientist',
  'Keen on mastering algorithms',
  'Eager to explore AI and ML',
  'Passionate about full-stack development',
  'Interested in data analysis',
  'Aspiring competitive programmer',
  'Learning frontend design',
  'Exploring backend technologies'
];

// Track used names to ensure uniqueness
const usedNames = new Set();

// Function to generate a unique Indian name and email
function generateIndianName(existingEmails) {
  let name, fullName, initials, email;
  do {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    fullName = `${first} ${last}`;
    name = `${first.toLowerCase()}.${last.toLowerCase()}`;
    initials = `${first[0]}${last[0]}`;
    email = `${name}@example.com`;
  } while (usedNames.has(name) || existingEmails.includes(email));
  usedNames.add(name);
  return { fullName, initials, email };
}

// Function to generate a unique contact number
function generateContactNumber(existingNumbers) {
  let contactNumber;
  do {
    const randomNum = Math.floor(100000000 + Math.random() * 900000000);
    contactNumber = `+919${randomNum}`;
  } while (existingNumbers.includes(contactNumber));
  return contactNumber;
}

// Function to generate a non-enrolled student
function generateNonEnrolledStudent(existingEmails, existingNumbers) {
  const { fullName, initials, email } = generateIndianName(existingEmails);
  const [firstName, lastName] = fullName.split(' ');
  const contactNumber = generateContactNumber(existingNumbers);
  return {
    firstName,
    lastName,
    email,
    password: 'password123',
    accountType: 'Student',
    image: `https://api.dicebear.com/5.x/initials/svg?seed=${initials}`,
    additionalDetails: {
      about: interests[Math.floor(Math.random() * interests.length)],
      contactNumber
    }
  };
}

// Main function to add non-enrolled students
function main() {
  try {
    // Load updatedSampleData.js
    const dataPath = path.resolve(__dirname, 'updatedSampleData.js');
    const dataModule = require(dataPath);
    const jsonData = dataModule.sampleData;

    if (!jsonData || typeof jsonData !== 'object') {
      throw new Error('Invalid sampleData: Expected an object');
    }

    console.log('Successfully loaded updatedSampleData.js');

    // Get existing emails and contact numbers to ensure uniqueness
    const existingEmails = [
      ...jsonData.students.map(student => student.email),
      ...jsonData.instructors.map(instructor => instructor.email),
      ...jsonData.nonEnrolledUsers.map(user => user.email)
    ];
    const existingNumbers = [
      ...jsonData.students.map(student => student.additionalDetails.contactNumber),
      ...jsonData.instructors.map(instructor => instructor.additionalDetails.contactNumber),
      ...jsonData.nonEnrolledUsers.map(user => user.additionalDetails.contactNumber)
    ];

    // Generate 100 new non-enrolled students
    const newNonEnrolledStudents = Array.from({ length: 100 }, () => 
      generateNonEnrolledStudent(existingEmails, existingNumbers)
    );

    // Append new non-enrolled students to existing nonEnrolledUsers
    jsonData.nonEnrolledUsers = [...jsonData.nonEnrolledUsers, ...newNonEnrolledStudents];

    // Write updated data back to file
    const outputContent = `exports.sampleData = ${JSON.stringify(jsonData, null, 2)};`;
    fs.writeFileSync(dataPath, outputContent);
    console.log(`Added 100 new non-enrolled students to ${dataPath}`);
  } catch (err) {
    console.error('Script execution failed:', err.message);
    console.error('Stack trace:', err.stack);
  }
}

// Run the script
main();