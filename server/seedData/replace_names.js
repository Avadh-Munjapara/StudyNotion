const fs = require('fs');
const path = require('path');

// Lists of Indian names
const firstNames = [
  'Aarav', 'Aditi', 'Amit', 'Ananya', 'Arjun', 'Avani', 'Deepak', 'Diya',
  'Gaurav', 'Ishaan', 'Kavya', 'Manish', 'Neha', 'Nikhil', 'Pooja', 'Rahul',
  'Riya', 'Rohan', 'Saanvi', 'Sanjay', 'Shreya', 'Siddharth', 'Tanya', 'Vikram',
  'Yash'
];
const lastNames = [
  'Agarwal', 'Bhat', 'Chaudhary', 'Desai', 'Gupta', 'Jain', 'Joshi', 'Kapoor',
  'Khan', 'Kumar', 'Mehta', 'Mishra', 'Patel', 'Rao', 'Reddy', 'Sharma',
  'Singh', 'Srivastava', 'Verma', 'Yadav'
];

// Popular email domains
const emailDomains = ['@gmail.com', '@yahoo.com', '@outlook.com', '@hotmail.com'];

// Track used names to ensure uniqueness
const usedNames = new Set();

// Function to generate a unique Indian name and email
function generateIndianName() {
  let name, fullName, initials;
  do {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    fullName = `${first} ${last}`;
    name = `${first.toLowerCase()}.${last.toLowerCase()}`;
    initials = `${first[0]}${last[0]}`;
  } while (usedNames.has(name));
  usedNames.add(name);
  const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
  return { fullName, nameKey: name, initials, email: `${name}${domain}` };
}

// Function to update user object (instructor or student)
function updateUser(user) {
  const newName = generateIndianName();
  user.firstName = newName.fullName.split(' ')[0];
  user.lastName = newName.fullName.split(' ')[1];
  user.email = newName.email;
  user.image = `https://api.dicebear.com/5.x/initials/svg?seed=${newName.initials}`;
  return user;
}

// Function to process JSON data
function processJsonData(data) {
  try {
    // Update instructors
    data.instructors = data.instructors.map(updateUser);
    
    // Update enrolledUsers
    data.enrolledUsers = data.enrolledUsers.map(updateUser);
    
    // Update students
    data.students = data.students.map(updateUser);
    
    // Update course instructors (email references)
    data.courses = data.courses.map(course => {
      const instructorEmail = course.instructor;
      const matchingInstructor = data.instructors.find(
        inst => inst.email === instructorEmail
      );
      if (matchingInstructor) {
        course.instructor = matchingInstructor.email;
      } else {
        console.warn(`No matching instructor found for ${instructorEmail}. Assigning random instructor.`);
        course.instructor = data.instructors[Math.floor(Math.random() * data.instructors.length)].email;
      }
      return course;
    });

    return data;
  } catch (err) {
    console.error('Error processing data:', err);
    throw err;
  }
}

// Main function to execute the script
function main() {
  try {
    // Load sampleData.js as a module
    const sampleDataPath = path.resolve(__dirname, 'sampleData.js');
    const dataModule = require(sampleDataPath);
    const jsonData = dataModule.sampleData;

    if (!jsonData || typeof jsonData !== 'object') {
      throw new Error('Invalid sampleData: Expected an object');
    }

    console.log('Successfully loaded sampleData.js');

    // Process the data
    const updatedData = processJsonData(jsonData);
    
    // Write updated data to a new file
    const outputContent = `exports.sampleData = ${JSON.stringify(updatedData, null, 2)};`;
    const outputPath = path.resolve(__dirname, 'updatedSampleData.js');
    fs.writeFileSync(outputPath, outputContent);
    console.log(`Updated data saved to ${outputPath}`);
  } catch (err) {
    console.error('Script execution failed:', err.message);
    console.error('Stack trace:', err.stack);
  }
}

// Run the script
main();