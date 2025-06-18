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
  'Learning web development',
  'Exploring AI and ML',
  'Mastering algorithms',
  'Aspiring data scientist',
  'Building full-stack applications',
  'Interested in frontend design',
  'Competitive programming enthusiast',
  'Working on backend technologies',
  'Data analysis enthusiast',
  'Keen on cloud computing'
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

// Function to get random courses and completed videos
function getRandomCoursesAndVideos(courses) {
  const numCourses = Math.floor(Math.random() * 2) + 1; // 1 or 2 courses
  const selectedCourses = [];
  const courseIndices = [];

  // Select random courses
  while (courseIndices.length < numCourses) {
    const idx = Math.floor(Math.random() * courses.length);
    if (!courseIndices.includes(idx)) {
      courseIndices.push(idx);
    }
  }

  // For each selected course, pick 1-3 random completed videos
  for (const idx of courseIndices) {
    const course = courses[idx];
    const subSections = course.sections.flatMap(section => section.subSections);
    const numVideos = Math.floor(Math.random() * 3) + 1; // 1-3 videos
    const videoIndices = [];
    
    while (videoIndices.length < numVideos && videoIndices.length < subSections.length) {
      const videoIdx = Math.floor(Math.random() * subSections.length);
      if (!videoIndices.includes(videoIdx)) {
        videoIndices.push(videoIdx);
      }
    }

    const completedVideos = videoIndices.map(i => subSections[i].title);
    selectedCourses.push({
      courseName: course.courseName,
      completedVideos
    });
  }

  return selectedCourses;
}

// Function to generate a student for enrolledWithoutReviews
function generateStudent(existingEmails, existingNumbers, courses) {
  const { fullName, initials, email } = generateIndianName(existingEmails);
  const [firstName, lastName] = fullName.split(' ');
  const contactNumber = generateContactNumber(existingNumbers);
  const enrolledCourses = getRandomCoursesAndVideos(courses);

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
    },
    enrolledCourses
  };
}

// Main function to add students
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
      ...jsonData.nonEnrolledUsers.map(user => user.email),
      ...jsonData.enrolledWithoutReviews.map(user => user.email)
    ];
    const existingNumbers = [
      ...jsonData.students.map(student => student.additionalDetails.contactNumber),
      ...jsonData.instructors.map(instructor => instructor.additionalDetails.contactNumber),
      ...jsonData.nonEnrolledUsers.map(user => user.additionalDetails.contactNumber),
      ...jsonData.enrolledWithoutReviews.map(user => user.additionalDetails.contactNumber)
    ];

    // Generate 200 new students
    const newStudents = Array.from({ length: 200 }, () => 
      generateStudent(existingEmails, existingNumbers, jsonData.courses)
    );

    // Append new students to enrolledWithoutReviews
    jsonData.enrolledWithoutReviews = [...jsonData.enrolledWithoutReviews, ...newStudents];

    // Write updated data back to file
    const outputContent = `exports.sampleData = ${JSON.stringify(jsonData, null, 2)};`;
    fs.writeFileSync(dataPath, outputContent);
    console.log(`Added 200 new students to enrolledWithoutReviews in ${dataPath}`);
  } catch (err) {
    console.error('Script execution failed:', err.message);
    console.error('Stack trace:', err.stack);
  }
}

// Run the script
main();