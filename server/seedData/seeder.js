const { sampleData } = require("./sampleData");
const Category = require("../models/Category");
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");

async function seedDatabase() {
  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await Promise.all([
      Category.deleteMany({}),
      Course.deleteMany({}),
      Section.deleteMany({}),
      SubSection.deleteMany({}),
      User.deleteMany({ accountType: "Instructor" }),
      Profile.deleteMany({})
    ]);

    // Create instructors
    console.log("Creating instructors...");
    const instructors = await Promise.all(
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

    // Create categories
    console.log("Creating categories...");
    const categories = await Promise.all(
      sampleData.categories.map(category => Category.create(category))
    );

    // Create courses
    console.log("Creating courses...");
    for (const courseData of sampleData.courses) {
      const instructor = instructors.find(i => i.email === courseData.instructor);
      const category = categories.find(c => c.name === courseData.category);

      if (!instructor || !category) {
        console.log(`Skipping course: ${courseData.courseName} - Missing instructor or category`);
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

      // Create sections and subsections
      for (const sectionData of courseData.sections) {
        const section = await Section.create({
          name: sectionData.sectionName,
          courseId: course._id
        });

        const subSections = await Promise.all(
          sectionData.subSections.map(async (subSectionData) => {
            return await SubSection.create({
              title: subSectionData.title,
              description: subSectionData.description,
              timeDuration: subSectionData.timeDuration,
              videoUrl: subSectionData.videoUrl,
              courseId: course._id,
              sectionId: section._id
            });
          })
        );

        section.subSections = subSections.map(ss => ss._id);
        await section.save();

        course.courseContent.push(section._id);
      }

      await course.save();
      
      // Update category and instructor
      category.courses.push(course._id);
      await category.save();
      
      instructor.courses.push(course._id);
      await instructor.save();

      console.log(`Created course: ${course.name}`);
    }

    console.log("Database seeded successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

module.exports = seedDatabase;