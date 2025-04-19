import React, { useEffect, useState } from "react";
import { getCategoryCourses } from "../services/operations/courseApi";
import { useParams } from "react-router-dom";
import { categoryEndpoint } from "../services/apis";
import apiConnector from "../services/apiConnector";
import { useDispatch, useSelector } from "react-redux";
import TitleBar from "../components/catalog/TitleBar";
import Spinner from "../components/comman/Spinner";
import NavBar from "../components/comman/NavBar";
import CoursesToStart from "../components/catalog/CoursesToStart";
const CatalogPage = () => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryObj, setCategoryObj] = useState(null);
  const loading = useSelector((state) => state.course.loading);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const fetchCategories = async () => {
      apiConnector(categoryEndpoint.GET_ALL_CATEGORY_API, "GET")
        .then((response) => {
          setCategories(response.data.categories);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    setCategoryObj(
      categories.filter((cat) => cat.name === params.catalogName).at(0)
    );
    const fetchCourses = async () => {
      if (categoryObj) {
        const payload = { categoryId: categoryObj._id };
        dispatch(getCategoryCourses(payload,setCourses));
      }
    };
    fetchCourses();
  }, [params, categories]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <NavBar />
      <TitleBar para={categoryObj?.description} />
      <CoursesToStart courses={courses?.categoryCourses?.courses}/>
      {/* <TopSellingCourses/>
      <FrequentlyBoughtCourses/> */}

    </div>
  );
};

export default CatalogPage;
