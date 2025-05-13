import YellowBtn from '../components/comman/YellowBtn';
import { useLocation } from 'react-router-dom';
import { buyCourse } from '../services/operations/paymentApi';
const CourseInfoPage = () => {

    const loacation=useLocation();
    const courseId=loacation.pathname.split('/').at(-1);
    const handleBuyCourse = async () => {
        await buyCourse([courseId]);
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <YellowBtn clickHandler={handleBuyCourse} text={'Buy'}/>
        </div>
    );
}

export default CourseInfoPage;
