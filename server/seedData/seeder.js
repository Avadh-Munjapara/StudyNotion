// const { sampleData } = require("./sampleData");
const { sampleData } = require("./updatedSampleData");
const Category = require("../models/Category");
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress");
const RatingAndReview = require("../models/RatingAndReview");
const bcrypt = require("bcrypt");

// Clear all existing data
async function clearDatabase() {
  console.log("Clearing existing data...");
  await Promise.all([
    Category.deleteMany({}),
    Course.deleteMany({}),
    Section.deleteMany({}),
    SubSection.deleteMany({}),
    User.deleteMany({}),
    Profile.deleteMany({}),
    CourseProgress.deleteMany({}),
    RatingAndReview.deleteMany({})
  ]);
}

// Seed instructors
async function seedInstructors() {
  console.log("Creating instructors...");
  return await Promise.all(
    sampleData.instructors.map(async (instructorData) => {
      const hashedPassword = await bcrypt.hash(instructorData.password, 10);
      
      const profile = await Profile.create({
        gender: "Male",
        dateOfBirth: new Date("1990-01-01"),
        about: instructorData.additionalDetails.about,
        contactNumber: instructorData.additionalDetails.contactNumber
      });

      return await User.create({
        ...instructorData,
        password: hashedPassword,
        additionalDetails: profile._id
      });
    })
  );
}

// Seed categories
async function seedCategories() {
  console.log("Creating categories...");
  return await Promise.all(
    sampleData.categories.map(category => Category.create(category))
  );
}

// Create sections and subsections for a course
async function createSectionsAndSubsections(courseData, courseId) {
  const sections = [];
  for (const sectionData of courseData.sections) {
    const section = await Section.create({
      name: sectionData.sectionName,
      courseId: courseId
    });

    const subSections = await Promise.all(
      sectionData.subSections.map(async (subSectionData) => {
        return await SubSection.create({
          title: subSectionData.title,
          description: subSectionData.description,
          timeDuration: subSectionData.timeDuration,
          videoUrl: subSectionData.videoUrl,
          courseId: courseId,
          sectionId: section._id
        });
      })
    );

    section.subSections = subSections.map(ss => ss._id);
    await section.save();
    sections.push(section);
  }
  return sections;
}

// Seed courses
async function seedCourses(instructors, categories) {
  console.log("Creating courses...");
  const createdCourses = [];
  for (const courseData of sampleData.courses) {
    const instructor = instructors.find(i => i.email === courseData.instructor);
    const category = categories.find(c => c.name === courseData.category);

    if (!instructor || !category) {
      console.log(`Skipping course: ${courseData.courseName}`);
      continue;
    }

    const course = await Course.create({
      name: courseData.courseName,
      description: courseData.courseDescription,
      instructor: instructor._id,
      whatYouWillLearn: courseData.whatYouWillLearn,
      price: courseData.price,
      tag: courseData.tag,
      category: category._id,
      thumbnail: courseData.thumbnail,
      status: courseData.status,
      instructions: courseData.instructions
    });

    const sections = await createSectionsAndSubsections(courseData, course._id);
    course.courseContent = sections.map(section => section._id);
    await course.save();
    createdCourses.push(course);

    category.courses.push(course._id);
    await category.save();

    instructor.courses.push(course._id);
    await instructor.save();

    console.log(`Created course: ${course.name}`);
  }
  return createdCourses;
}

// Create course progress and reviews
async function createCourseProgressAndReviews(user, enrollment, course) {
  const progress = await CourseProgress.create({
    courseId: course._id,
    userId: user._id,
    completedVideos: []
  });

  if (enrollment.review) {
    const review = await RatingAndReview.create({
      user: user._id,
      course: course._id,
      rating: enrollment.review.rating,
      review: enrollment.review.review
    });

    course.ratingAndReviews.push(review._id);
    await course.save();
  }

  return progress;
}

async function seedStudents(createdCourses) {
  console.log("Creating students and their enrollments...");
  
  for (const studentData of sampleData.students) {
    try {
      // Create student profile
      const profile = await Profile.create({
        gender: "Other",
        dateOfBirth: new Date("1995-01-01"),
        about: studentData.additionalDetails.about,
        contactNumber: studentData.additionalDetails.contactNumber
      });

      // Create student
      const student = await User.create({
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        password: await bcrypt.hash(studentData.password, 10),
        accountType: "Student",
        image: studentData.image,
        additionalDetails: profile._id
      });

      // Handle course enrollments
      for (const enrollment of studentData.enrolledCourses) {
        const course = createdCourses.find(c => c.name === enrollment.courseName);
        if (!course) {
          console.log(`Course not found: ${enrollment.courseName}`);
          continue;
        }

        // Create course progress
        const progress = await CourseProgress.create({
          courseId: course._id,
          userId: student._id,
          completedVideos: [] // You can add logic to match video IDs
        });

        // Create review if exists
        if (enrollment.review) {
          const review = await RatingAndReview.create({
            user: student._id,
            course: course._id,
            rating: enrollment.review.rating,
            review: enrollment.review.review
          });

          course.ratingAndReviews.push(review._id);
          await course.save();
        }

        // Update course with new student
        course.studentsEnrolled.push(student._id);
        await course.save();

        // Update student's courses and progress
        student.courses.push(course._id);
        student.courseProgress.push(progress._id);
      }

      await student.save();
      console.log(`Created student: ${student.firstName} ${student.lastName}`);

    } catch (error) {
      console.error(`Error creating student ${studentData.email}:`, error);
    }
  }
}

async function seedEnrolledWithoutReviews(createdCourses) {
  console.log("Creating enrolled users without reviews...");
  
  if (!sampleData.enrolledWithoutReviews || !Array.isArray(sampleData.enrolledWithoutReviews)) {
    console.log("No enrolled users without reviews to create");
    return;
  }

  for (const userData of sampleData.enrolledWithoutReviews) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Create profile
      const profile = await Profile.create({
        gender: "Other",
        dateOfBirth: new Date("1995-01-01"),
        about: userData.additionalDetails.about,
        contactNumber: userData.additionalDetails.contactNumber
      });

      // Create user
      const user = await User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        accountType: userData.accountType,
        image: userData.image,
        additionalDetails: profile._id,
        courses: [],
        courseProgress: []
      });

      // Handle course enrollments without reviews
      for (const enrollment of userData.enrolledCourses) {
        const course = await Course.findOne({ name: enrollment.courseName });
        if (!course) {
          console.log(`Course not found: ${enrollment.courseName}`);
          continue;
        }

        // Create course progress
        const progress = await CourseProgress.create({
          courseId: course._id,
          userId: user._id,
          completedVideos: []
        });

        // Update user's courses and progress
        user.courses.push(course._id);
        user.courseProgress.push(progress._id);

        // Update course's enrolled students
        course.studentsEnrolled.push(user._id);
        await course.save();
      }

      await user.save();
      console.log(`Created enrolled user without reviews: ${user.firstName} ${user.lastName}`);

    } catch (error) {
      console.error(`Error creating enrolled user without reviews ${userData.email}:`, error);
    }
  }
}

async function seedNonEnrolledUsers() {
  console.log("Creating non-enrolled users...");
  
  if (!sampleData.nonEnrolledUsers || !Array.isArray(sampleData.nonEnrolledUsers)) {
    console.log("No non-enrolled users to create");
    return;
  }

  for (const userData of sampleData.nonEnrolledUsers) {
    try {
      // Create user profile
      const profile = await Profile.create({
        gender: "Other",
        dateOfBirth: new Date("1995-01-01"),
        about: userData.additionalDetails.about,
        contactNumber: userData.additionalDetails.contactNumber
      });

      // Create user
      const user = await User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        accountType: userData.accountType,
        image: userData.image,
        additionalDetails: profile._id,
        courses: [], // Empty courses array
        courseProgress: [] // Empty course progress array
      });

      await user.save();
      console.log(`Created non-enrolled user: ${user.firstName} ${user.lastName}`);

    } catch (error) {
      console.error(`Error creating non-enrolled user ${userData.email}:`, error);
    }
  }
}


// Main seeder function
async function seedDatabase() {
  try {
    await clearDatabase();
    const instructors = await seedInstructors();
    const categories = await seedCategories();
    const courses = await seedCourses(instructors, categories);
    await seedStudents(courses);
    await seedNonEnrolledUsers(); 
    await seedEnrolledWithoutReviews();

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

module.exports = seedDatabase;