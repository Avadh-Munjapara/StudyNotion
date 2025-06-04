import React, { useEffect, useState } from "react";
import {
  getCategoryCourses,
  getCourseReviews,
} from "../services/operations/courseApi";
import { useParams } from "react-router-dom";
import { categoryEndpoint } from "../services/apis";
import apiConnector from "../services/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import TitleBar from "../components/catalog/TitleBar";
import Spinner from "../components/comman/Spinner";
import NavBar from "../components/comman/NavBar";
import SliderCourses from "../components/catalog/SliderCourses";
import GridCourses from "../components/catalog/GridCourses";
import Footer from "../components/comman/Footer";
import { setLoading } from "../slices/authSlice";
const CatalogPage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryObj, setCategoryObj] = useState(null);
  const loading = useSelector((state) => state.course.loading);
  const [call, setCall] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();

  const fetchCategories = async () => {
    dispatch(setLoading(true));
    apiConnector(categoryEndpoint.GET_ALL_CATEGORY_API, "GET")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setCall(false);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (call) fetchCategories();
    const newCategoryObject = categories
      .filter((cat) => cat.name === params.catalogName)
      .at(0);
    setCategoryObj(newCategoryObject);
    const fetchCourses = async () => {
      if (newCategoryObject) {
        const payload = { categoryId: newCategoryObject._id };
        dispatch(getCategoryCourses(payload, setCourses));
      }
    };
    fetchCourses();
  }, [params, categories]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <NavBar />
      <TitleBar para={categoryObj?.description} />
      <div className="max-w-maxContent w-11/12 mx-auto mb-14">
        <SliderCourses type={"start"} courses={courses.categoryCourses} />
        <SliderCourses type={"top"} courses={courses.topSellingCourses} />
        <GridCourses courses={courses.diffCategoryCourses} />
      </div>
      <Footer />
    </>
  );
};

export default CatalogPage;
