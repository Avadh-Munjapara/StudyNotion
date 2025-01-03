import React from 'react';
import { TypeAnimation } from 'react-type-animation';
const CodeBlock = () => {
    return (
        <div className='flex relative border-[1px] p-4 border-white'>
            {/* <div className='z-10 absolute right-0 w-[100px] h-[100px] text-white '>hello ji</div> */}
            <div className='z-20 bg-transparent w-[10%]  flex flex-col items-center text-richblack-300'>
                <div>1</div>
                <div>2</div>            
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>    
                <div>10</div>
                <div>11</div>
            </div>
            <div className='w-[90%]'>
            <TypeAnimation
      sequence={[
      '<html>\n<head><title>Exampe</\ntitle>\n<linkrel= " stylesheet " href=" styles . css " >\n</head>\n<body>\n<h1 / " >Header</a>\n</h1>\n<nav><ah ref= " one / " >One< two/ " > Two</\nthree/" >Three</a>\n</nav>',
       1000,
       ''
      ]}
      wrapper="span"
      speed={80}
      style={{ fontSize: '16px', display: 'inline-block' ,whiteSpace:"pre-line",color:"white"}}
      repeat={Infinity}
      omitDeletionAnimation={true}
    />
            </div>
            
        </div>

    );
}

export default CodeBlock;
