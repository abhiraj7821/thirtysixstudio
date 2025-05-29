import React, { useEffect, useRef, useState} from 'react'
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function App() {
  // For Click and color change
  const [showCanvas, setshowCanvas] = useState(false);
  const [showIcon,setshowIcon]=useState(false);
  const headingref = useRef(null);
  const growingSpan=useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    gsap.to('.circle',{
      rotate:360,
      duration:10,
      repeat:-1,
      ease:'none'
    })
  }, []);

  const handleScale = (e)=>{
    console.log("Previous:",showCanvas);
    setshowCanvas((!showCanvas));
    console.log("After",showCanvas);
    
    if(showCanvas){
      gsap.to(growingSpan.current,{
        scale:0,
        duration:0.5,
        clearProps:'all'
      });
      gsap.to(".mouse",{
        backgroundColor:'#ED3833'
      });
    }
    else{
      gsap.set(growingSpan.current,{
        top:e.clientX,
        left:e.clientY
      })
      gsap.set(growingSpan.current,{
        scale:1000,
        duration:0.5,
      })
      gsap.to(".mouse",{
        backgroundColor:'white'
      })
    }

  }

  const mouseMoveHandelr = (e)=>{
    console.log();
    
    gsap.to(".mouse",{
      x:e.clientX,
      y:e.clientY,
      duration:0.4,
      ease:"power2.inOut"
    })
  }

  const thirtyMouseInHandler = (e)=>{
    setshowIcon(true);
    gsap.to(".mouse",{
      scale:4,
    })
  }

  const thirtyMouseOutHandler = (e)=>{
    setshowIcon(false);
    gsap.to(".mouse",{
      scale:1,
    })
  }


  return (
    <>
      {/* Red */}
      <span className='growingSpan fixed rounded-full top-[-20px] left-[-10px] h-5 w-5 block' ref={growingSpan}>
      </span>

      {/* Mouse */}
      <span className='mouse fixed rounded-full top-0 left-0 h-5 w-5 z-30'>
         {showIcon && 
          <div>
            <img src="https://thirtysixstudio.com/peppers/pepperA/7.png" alt="" />
          </div>
        }
      </span>

      <div className="w-screen min-h-screen" data-scroll-container onMouseMove={mouseMoveHandelr}>

        {/* CHILLE DESIGN */}
        {showCanvas && data[0].map((canvasdets,index)=>(
              <Canvas key={index} details={canvasdets}/>
            ))}

        {/* Nav Component */}
        <div className='main w-full'>
          <nav className="fixed top-0 left-0 w-full pt-2.5 pl-2.5 pr-2.5 flex justify-between border-b-[1px] border-[rgba(0,0,0,0.2)] pb-[0.5rem]">
            <div className="brand font-semibold font-[pp] ">Thirtysixstudios</div>
            <div className="flex gap-10">
              <h4 className='font-semibold font-[pp]'>Who we are</h4>
              <h4 className='font-semibold font-[pp]'>How we give back</h4>
              <h4 className='font-semibold font-[pp]'>What we do</h4>
              <h4 className='font-semibold font-[pp]'>Talk to us</h4>
            </div>
          </nav>
        </div>

        {/* Intro */}
        <div className="flex flex-col gap-5 justify-center mt-25 ml-[25vw] w-[300px] relative z-[1]">
            <h3 className='text-3xl'>At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.</h3>
            <p>We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.</p>
            <p>Scroll</p>
        </div>  

        <div className=''>
          <div className="circle absolute top-[5rem] right-[20rem]">
              <div className="flex items-center justify-center h-[300px]">
                <svg width="200" height="200" viewBox="0 0 300 300">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 150, 150
                        m -100, 0
                        a 100,100 0 1,1 200,0
                        a 100,100 0 1,1 -200,0"
                    />
                  </defs>
                  <text fontSize="18.5" letterSpacing="2" fill="#000">
                    <textPath xlinkHref="#circlePath" startOffset="50%" textAnchor="middle">
                      THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL PRODUCTION
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
        </div>

        {/* Thirtysixstudio. */}

        <div className="headtext mt-[10rem] relative z-30" onMouseEnter={thirtyMouseInHandler} onMouseLeave={thirtyMouseOutHandler}>
          <h1 ref={headingref} className='text-[14.5rem]' onClick={handleScale}>Thirtysixstudio</h1>
        </div> 

        {/* About */}

        {/* what we do*/}
        

          <div className="what flex w-screen justify-center py-[10rem] gap-[6rem] px-10 relative">

            {showCanvas &&
            data[1].map((canvasdets,index)=>(
              <Canvas key={index} details={canvasdets}/>
            ))
          }

            <div className="pt-22">
              <h1 className="text-sm tracking-widest uppercase text-left">01 — What We Do</h1>
            </div>
            <div className="flex flex-col gap-10 max-w-[40rem] pl-40 py-20">
              <h1 className="text-3xl font-light leading-snug mb-[10rem]">
                We aim to elevate digital production in the advertising space, bringing your ideas to life.
              </h1>
              <p className="text-sm leading-relaxed">
                As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver current digital work.
              </p>
              <p className="text-sm leading-relaxed">
                Our commitment to innovation and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.
              </p>
            </div>
          </div>

          

      </div>
    </>


  )
}

export default App
