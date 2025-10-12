const Category = require("../models/Category");
const Course = require("../models/Course");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Category name or description is missing",
      });
    }

    // Create new category
    const newCategory = await Category.create({
      name,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating category",
      error: error.message,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}, { name: true, description: true });
    return res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      data: allCategories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("PRINTING CATEGORY ID:", categoryId);

    //  Find selected category with its published courses
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: { path: "ratingAndReviews" },
        populate:{ path: "instructor" },
      })
      .exec();

    // Handle missing category
    if (!selectedCategory) {
      console.log("Category not found.");
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Handle no published courses
    if (!selectedCategory.courses || selectedCategory.courses.length === 0) {
      console.log("No published courses for this category.");
      return res.status(404).json({
        success: false,
        message: "No published courses found for the selected category.",
      });
    }

    //  Get random different category (for “Other Courses” section)
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
      courses: { $exists: true, $not: { $size: 0 } },
    });

    let differentCourses = [];
    if (categoriesExceptSelected.length > 0) {
      const randomIndex = getRandomInt(categoriesExceptSelected.length);
      const randomCategoryId = categoriesExceptSelected[randomIndex]._id;

      const randomCategory = await Category.findById(randomCategoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: { path: "ratingAndReviews" },
          populate:{ path: "instructor" }
        })
        .exec();

      differentCourses = randomCategory?.courses || [];
    }

    // Get top-selling published courses across all categories
    const mostSellingCourses = await Course.find({ status: "Published" })
      .sort({ "studentsEnrolled.length": -1 }) // Most students first
      .limit(10)
      .populate("ratingAndReviews")
      .populate( "instructor" )
      .exec();

    //  Send response
    return res.status(200).json({
      success: true,
      message: "Category page details fetched successfully",
      data: {
        selectedCategory: {
          name: selectedCategory.name,
          description: selectedCategory.description,
          courses: selectedCategory.courses,
        },
        differentCourses,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.error("Error in categoryPageDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching category page details",
      error: error.message,
    });
  }
};
