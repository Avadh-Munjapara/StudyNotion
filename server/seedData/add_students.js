const fs = require('fs');
const path = require('path');

// Expanded lists of Indian names to ensure uniqueness for 100 students
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

// Popular email domains
const emailDomains = ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com'];

// Sample interests for additionalDetails.about
const interests = [
  'Aspiring web developer', 'Machine learning enthusiast', 'Competitive programmer',
  'Data science learner', 'Full-stack development student', 'AI researcher',
  'Backend development specialist', 'Frontend design enthusiast',
  'Automation expert', 'Algorithm enthusiast'
];

// Sample review comments
const reviewComments = [
  'Excellent course with clear explanations and practical projects.',
  'Very comprehensive and well-structured content. Highly recommended!',
  'Great hands-on learning experience with real-world examples.',
  'The instructor makes complex topics easy to understand. Amazing course!',
  'Perfect blend of theory and practice. Great for skill-building!',
  'Outstanding course with in-depth coverage and engaging content.',
  'Really helpful projects and clear instruction. Loved this course!',
  'Fantastic course for building practical skills. Well worth it!',
  'Great course for beginners and intermediates alike. Very clear teaching!',
  'Superb content with practical applications. Highly engaging!'
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
    const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
    email = `${name}${domain}`;
  } while (usedNames.has(name) || existingEmails.includes(email));
  usedNames.add(name);
  return { fullName, initials, email };
}

// Function to get random elements from an array
function getRandomElements(arr, min, max) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get random completed videos from a course
function getCompletedVideos(course) {
  const allVideos = course.sections.flatMap(section => 
    section.subSections.map(sub => sub.title)
  );
  return getRandomElements(allVideos, 1, Math.min(3, allVideos.length));
}

// Function to generate a review
function generateReview() {
  const rating = (Math.random() * (5 - 4) + 4).toFixed(1); // 4.0 to 5.0
  const review = reviewComments[Math.floor(Math.random() * reviewComments.length)];
  return { rating: parseFloat(rating), review };
}

// Function to generate a student
function generateStudent(courses, existingEmails) {
  const { fullName, initials, email } = generateIndianName(existingEmails);
  const [firstName, lastName] = fullName.split(' ');
  const enrolledCourses = getRandomElements(courses, 1, 3).map(course => ({
    courseName: course.courseName,
    completedVideos: getCompletedVideos(course),
    review: generateReview()
  }));
  return {
    firstName,
    lastName,
    email,
    password: 'password123',
    accountType: 'Student',
    image: `https://api.dicebear.com/5.x/initials/svg?seed=${initials}`,
    additionalDetails: {
      about: interests[Math.floor(Math.random() * interests.length)],
      contactNumber: `+1234567${Math.floor(900 + Math.random() * 100)}`
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

    // Get existing emails to ensure uniqueness
    const existingEmails = jsonData.students.map(student => student.email);
    jsonData.instructors.forEach(instructor => existingEmails.push(instructor.email));

    // Generate 100 new students
    const newStudents = Array.from({ length: 100 }, () => 
      generateStudent(jsonData.courses, existingEmails)
    );

    // Append new students to existing students
    jsonData.students = [...jsonData.students, ...newStudents];

    // Write updated data back to file
    const outputContent = `exports.sampleData = ${JSON.stringify(jsonData, null, 2)};`;
    fs.writeFileSync(dataPath, outputContent);
    console.log(`Added 100 new students to ${dataPath}`);
  } catch (err) {
    console.error('Script execution failed:', err.message);
    console.error('Stack trace:', err.stack);
  }
}

// Run the script
main();