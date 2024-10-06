const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding the database.");
  try {
    // Clear existing data
    await prisma.student.deleteMany({});
    await prisma.instructor.deleteMany({});

    // Add 5 instructors with hardcoded values
    const instructors = await Promise.all([
      prisma.instructor.create({
        data: {
          name: "Instructor 1",
          email: "instructor1@example.com",
        },
      }),
      prisma.instructor.create({
        data: {
          name: "Instructor 2",
          email: "instructor2@example.com",
        },
      }),
      prisma.instructor.create({
        data: {
          name: "Instructor 3",
          email: "instructor3@example.com",
        },
      }),
      prisma.instructor.create({
        data: {
          name: "Instructor 4",
          email: "instructor4@example.com",
        },
      }),
      prisma.instructor.create({
        data: {
          name: "Instructor 5",
          email: "instructor5@example.com",
        },
      }),
    ]);

    // Add 4 students for each instructor
    const students = await Promise.all(
      instructors.flatMap((instructor, index) =>
        [...Array(4)].map(() =>
          prisma.student.create({
            data: {
              name: `Student ${index * 4 + (Math.random() * 10).toFixed(0) + 1}`,
              instructorId: instructor.id,
            },
          })
        )
      )
    );

    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}

module.exports = seed;
