import React from 'react';
import CustomButton from './CustomButton';
import card1 from '../../assets/Images/Know_your_progress.png';
import card2  from '../../assets/Images/Compare_with_others.png';
import card3 from '../../assets/Images/Plan_your_lessons.png';
import HighlightedText from './HighlightedText';
const SwissCards = () => {
    return (
        <div className='w-11/12 flex flex-col mx-auto items-center justify-center gap-8 py-20'>
            <div className='flex flex-col items-center '>
                <h3 className='text-4xl font-semibold'>Your swiss knife for <HighlightedText text={'learning any language'}/></h3>
                <p className='text-center max-w-[700px] font-medium'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>
            <div className='flex relative'>
                <div className='relative left-20'><img src={card1} alt="" /></div>
                <div className='relative'><img src={card2} alt="" /></div>
                <div className='relative right-32'><img src={card3} alt="" /></div>
            </div>
            <CustomButton active={true} linkTo={'/'}>Learn More</CustomButton>
        </div>
    );
}

export default SwissCards;
