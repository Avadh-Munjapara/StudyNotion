exports.sampleData = {
  categories: [
    {
      name: "Web Development",
      description: "Learn Full Stack Web Development"
    },
    {
      name: "Artificial Intelligence",
      description: "Master AI and Machine Learning concepts"
    },
    {
      name: "Python Programming",
      description: "Master Python Programming from basics to advanced concepts"
    }
  ],
  
  instructors: [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@studynotion.com",
      password: "password123",
      accountType: "Instructor",
      approved: true,
      image: "https://api.dicebear.com/5.x/initials/svg?seed=JD",
      additionalDetails: {
        about: "Experienced Web Developer and Instructor",
        contactNumber: "+1234567890"
      }
    },
    {
      firstName: "Sarah",
      lastName: "Smith",
      email: "sarah.smith@studynotion.com",
      password: "password123",
      accountType: "Instructor",
      approved: true,
      image: "https://api.dicebear.com/5.x/initials/svg?seed=SS",
      additionalDetails: {
        about: "AI Expert and Researcher",
        contactNumber: "+1234567891"
      }
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.johnson@studynotion.com",
      password: "password123",
      accountType: "Instructor",
      approved: true,
      image: "https://api.dicebear.com/5.x/initials/svg?seed=MJ",
      additionalDetails: {
        about: "Python Expert and Software Architect",
        contactNumber: "+1234567892"
      }
    }
  ],

  courses: [
    {
      courseName: "Complete MERN Stack Bootcamp",
      courseDescription: "Master the MERN Stack from scratch to advanced level",
      instructor: "john.doe@studynotion.com",
      whatYouWillLearn: "Build fullstack applications,Create REST APIs,Work with MongoDB,Master React.js",
      price: "5999",
      tag: ["web development", "mern stack"],
      thumbnail: "https://res.cloudinary.com/dk4ka3z5e/image/upload/v1750218366/kinetic/j18ncqld906whi1ngdwu.png",
      category: "Web Development",
      status: "published",
      instructions: [
        "Basic JavaScript knowledge required",
        "Computer/Laptop needed",
        "Good internet connection required"
      ],
      sections: [
        {
          sectionName: "Getting Started with MERN",
          subSections: [
            {
              title: "Course Overview",
              description: "Introduction to the MERN Stack Course",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "Setting Up Development Environment",
              description: "Installing required tools and software",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            }
          ]
        },
        {
          sectionName: "Frontend Development",
          subSections: [
            {
              title: "React Fundamentals",
              description: "Understanding React components and props",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "State Management with Redux",
              description: "Managing application state using Redux",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "Building Responsive UI",
              description: "Creating responsive layouts with Tailwind CSS",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            }
          ]
        },
        {
          sectionName: "Backend Development",
          subSections: [
            {
              title: "Node.js Basics",
              description: "Introduction to Node.js and Express",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "REST API Development",
              description: "Building RESTful APIs with Express",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "Authentication & Authorization",
              description: "Implementing JWT authentication",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            }
          ]
        },
        {
          sectionName: "Database Integration",
          subSections: [
            {
              title: "MongoDB Fundamentals",
              description: "Working with MongoDB and Mongoose",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "Data Modeling",
              description: "Creating MongoDB schemas and models",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            }
          ]
        }
      ]
    },
    {
      courseName: "AI & Machine Learning Bootcamp",
      courseDescription: "Comprehensive guide to AI and ML",
      instructor: "sarah.smith@studynotion.com",
      whatYouWillLearn: "Python for AI,Machine Learning Fundamentals,Deep Learning,Neural Networks",
      price: "7999",
      tag: ["artificial intelligence", "machine learning"],
      thumbnail: "https://res.cloudinary.com/dk4ka3z5e/image/upload/v1750221306/kinetic/ndpfvzp0zqmj9xdkbwrm.png",
      category: "Artificial Intelligence",
      status: "published",
      instructions: [
        "Basic Python knowledge required",
        "Understanding of mathematics",
        "Computer with minimum 8GB RAM"
      ],
      sections: [
        {
          sectionName: "Getting Started with MERN",
          subSections: [
            {
              title: "Course Overview",
              description: "Introduction to the MERN Stack Course",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "Setting Up Development Environment",
              description: "Installing required tools and software",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            }
          ]
        },
        {
          sectionName: "Frontend Development",
          subSections: [
            {
              title: "React Fundamentals",
              description: "Understanding React components and props",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "State Management with Redux",
              description: "Managing application state using Redux",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "Building Responsive UI",
              description: "Creating responsive layouts with Tailwind CSS",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            }
          ]
        },
        {
          sectionName: "Backend Development",
          subSections: [
            {
              title: "Node.js Basics",
              description: "Introduction to Node.js and Express",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "REST API Development",
              description: "Building RESTful APIs with Express",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "Authentication & Authorization",
              description: "Implementing JWT authentication",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            }
          ]
        },
        {
          sectionName: "Database Integration",
          subSections: [
            {
              title: "MongoDB Fundamentals",
              description: "Working with MongoDB and Mongoose",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            },
            {
              title: "Data Modeling",
              description: "Creating MongoDB schemas and models",
              timeDuration: "39.637333",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750218473/kinetic/kttl27vegal1clnhl8pz.mp4"
            }
          ]
        }
      ]
    },
    {
      courseName: "Advanced Python Programming",
      courseDescription: "Master Python with real-world applications and advanced concepts",
      instructor: "michael.johnson@studynotion.com",
      whatYouWillLearn: "Advanced Python concepts,Design Patterns,Testing,Web Scraping,Automation",
      price: "6999",
      tag: ["python", "programming", "software development"],
      thumbnail: "https://example.com/python-thumb.jpg",
      category: "Python Programming",
      status: "published",
      instructions: [
        "Basic Python knowledge required",
        "Computer/Laptop with Python installed",
        "Understanding of programming fundamentals"
      ],
      sections: [
        {
          sectionName: "Advanced Python Concepts",
          subSections: [
            {
              title: "Object-Oriented Programming in Python",
              description: "Deep dive into OOP principles and implementation",
              timeDuration: "45.521",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750221450/kinetic/hmomk8w6xxlsjjh3vnwp.mp4"
            },
            {
              title: "Decorators and Generators",
              description: "Understanding advanced Python features",
              timeDuration: "45.521",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750221450/kinetic/hmomk8w6xxlsjjh3vnwp.mp4"
            },
            {
              title: "Context Managers",
              description: "Working with context managers and the 'with' statement",
              timeDuration: "45.521",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750221450/kinetic/hmomk8w6xxlsjjh3vnwp.mp4"
            }
          ]
        },
        {
          sectionName: "Design Patterns in Python",
          subSections: [
            {
              title: "Creational Patterns",
              description: "Implementation of creational design patterns",
              timeDuration: "45.521",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750221450/kinetic/hmomk8w6xxlsjjh3vnwp.mp4"
            },
            {
              title: "Structural Patterns",
              description: "Understanding and implementing structural patterns",
              timeDuration: "45.521",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750221450/kinetic/hmomk8w6xxlsjjh3vnwp.mp4"
            }
          ]
        },
        {
          sectionName: "Testing and Debug",
          subSections: [
            {
              title: "Unit Testing with PyTest",
              description: "Writing and running unit tests",
              timeDuration: "45.521",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750221450/kinetic/hmomk8w6xxlsjjh3vnwp.mp4"
            },
            {
              title: "Debugging Techniques",
              description: "Advanced debugging and troubleshooting",
              timeDuration: "45.521",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750221450/kinetic/hmomk8w6xxlsjjh3vnwp.mp4"
            }
          ]
        },
        {
          sectionName: "Web Scraping and Automation",
          subSections: [
            {
              title: "Web Scraping with BeautifulSoup",
              description: "Extracting data from websites",
              timeDuration: "45.521",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750221450/kinetic/hmomk8w6xxlsjjh3vnwp.mp4"
            },
            {
              title: "Selenium Automation",
              description: "Browser automation with Selenium",
              timeDuration: "45.521",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750221450/kinetic/hmomk8w6xxlsjjh3vnwp.mp4"
            },
            {
              title: "Task Automation",
              description: "Automating repetitive tasks with Python",
              timeDuration: "45.521",
              videoUrl: "https://res.cloudinary.com/dk4ka3z5e/video/upload/v1750221450/kinetic/hmomk8w6xxlsjjh3vnwp.mp4"
            }
          ]
        }
      ]
    }
  ]
};