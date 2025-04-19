import React from 'react';

const CourseCard = ({info}) => {
    return (
        <div>
            <img src={info.thumbnail} alt="" />
        </div>
    );
}

export default CourseCard;
