import React, { useEffect, useState } from 'react';
import { getCategoryCourses } from '../services/operations/courseApi';
import { useParams } from 'react-router-dom';
import { categoryEndpoint } from '../services/apis';
import apiConnector from '../services/apiConnector';
import { useDispatch } from 'react-redux';
import TitleBar from '../components/catalog/TitleBar';
const CatalogPage = () => {
    const[courses,setCourses]=useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryObj, setCategoryObj] = useState(null);
    const dispatch=useDispatch();
    const params=useParams();
     useEffect(() => {
        const fetchCategories=async ()=>{
          apiConnector(categoryEndpoint.GET_ALL_CATEGORY_API,"GET")
          .then((response) => {
            setCategories(response.data.categories);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        }
        fetchCategories();
      }, []);
    useEffect(()=>{ 
        setCategoryObj(categories.filter((cat)=>cat.name===params.catalogName).at(0));
        const fetchCourses=async ()=>{
          if(categoryObj){ 
            const payload={categoryId:categoryObj._id}
            dispatch(getCategoryCourses(payload));
          }
        }
        fetchCourses();
    },[params,categories])

    return (
        <div>
            <TitleBar para={categoryObj?.description}/>
        </div>
    );
}

export default CatalogPage;
