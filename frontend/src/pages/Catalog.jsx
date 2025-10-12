import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';

import Footer from '../components/common/Footer';
import CourseCard from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';

const Catalog = () => {
  const { catalogName } = useParams();
  const decodedCatalogName = catalogName.replace(/-/g, ' ');

  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const res = await apiConnector('GET', categories.CATEGORIES_API);
        const categoryList = res?.data?.data ?? [];

        const matchedCategory = categoryList.find(
          (ct) => ct.name.toLowerCase() === decodedCatalogName.toLowerCase()
        );

        if (matchedCategory) {
          setCategoryId(matchedCategory._id);
          setError('');
        } else {
          setCategoryId('');
          setError('Category not found');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    if (decodedCatalogName) {
      getCategories();
    }
  }, [decodedCatalogName]);

  // Fetch catalog data
  useEffect(() => {
    const getCategoryDetails = async () => {
      setLoading(true);
      try {
        const res = await getCatalogaPageData(categoryId);

        if (res.success) {
          const data = res.data;
          setCatalogPageData({
            name: data.selectedCategory.name,
            description: data.selectedCategory.description,
            selectedCourses: {
              course: data.selectedCategory.courses,
            },
            differentCourses: {
              name: 'Other Courses',
              course: data.differentCourses,
            },
            mostSellingCourses: data.mostSellingCourses,
          });
          setError('');
        } else {
          setCatalogPageData(null);
          setError('No Courses for the category');
        }
      } catch (err) {
        console.error('Error fetching catalog data:', err);
        setError('Failed to load catalog details');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  // Loading spinner
  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center z-10">
        <div className="spinner" />
      </div>
    );
  }

  // Error
  if (!loading && (error || !catalogPageData)) {
    return (
      <div className="text-center text-lg md:text-xl text-richblack-300 my-8 px-4">
        {error || 'No Courses for the category'}
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="bg-richblack-800 px-4 py-10">
        <div className="mx-auto max-w-screen-xl flex flex-col gap-4">
          <p className="text-xs sm:text-sm text-richblack-300">
            Home / Catalog /{' '}
            <span className="text-yellow-25">{catalogPageData?.name}</span>
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-richblack-5">
            {catalogPageData?.name}
          </h1>
          <p className="text-sm sm:text-base text-richblack-200 max-w-4xl">
            {catalogPageData?.description}
          </p>
        </div>
      </div>

      {/* Section: Courses to get you started */}
      <section className="w-full px-4 py-10 mx-auto max-w-screen-xl">
        <h2 className="section_heading">Courses to get you started</h2>
        <div className="my-4 flex border-b border-richblack-600 text-sm">
          <p
            className={`px-4 py-2 cursor-pointer ${
              active === 1
                ? 'border-b-2 border-yellow-25 text-yellow-25'
                : 'text-richblack-50'
            }`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 cursor-pointer ${
              active === 2
                ? 'border-b-2 border-yellow-25 text-yellow-25'
                : 'text-richblack-50'
            }`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <CourseSlider
          Courses={catalogPageData?.selectedCourses?.course ?? []}
        />
      </section>

      {/* Section: Other Courses */}
      <section className="w-full px-4 py-10 mx-auto max-w-screen-xl">
        <h2 className="section_heading">
          Checkout {catalogPageData?.differentCourses?.name} Courses Also
        </h2>
        <div className="py-6">
          <CourseSlider
            Courses={catalogPageData?.differentCourses?.course ?? []}
          />
        </div>
      </section>

      {/* Section: Most Selling Courses */}
      <section className="w-full px-4 py-10 mx-auto max-w-screen-xl">
        <h2 className="section_heading">Most Selling Courses</h2>
        <div className="py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catalogPageData?.mostSellingCourses?.length === 0 ? (
              <p className="text-base text-white col-span-full">
                No Most Selling Courses
              </p>
            ) : (
              catalogPageData?.mostSellingCourses
                ?.slice(0, 4)
                .map((course, index) => (
                  <CourseCard
                    key={index}
                    course={course}
                    Height="h-[400px]"
                  />
                ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Catalog;
