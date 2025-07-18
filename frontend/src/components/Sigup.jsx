import { useEffect, useState } from 'react';
import { Logo, Stepper, Image, Slider } from './index'
export default function Sigup() {
    

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 100);
    }, [])
    

    return (
        loader ? <h2>Loading...</h2> :
            <div className='w-screen min-h-screen flex flex-col px-4 md:px-0'>
                <div className='hidden md:block absolute top-0 left-0 right-0 w-full pointer-events-none z-0'>
                    <Image />
                </div>
                <div className='flex justify-center m-3'>
                    <Logo />
                </div>
                <div className='flex items-center mt-7  '>
                    <div className='w-full md:ml-40 md:w-1/2 text-sm '>
                        <h2 className='text-3xl font-bold'>Sign <span className='text-rose-500'>Up</span> </h2>
                        <p className='text-gray-400'>Enter your details below to get started.</p>
                        <div className='mt-3'>
                            <Stepper />
                        </div>
                    </div>
                    <div className='hidden md:flex w-1/2 justify-center mr-10'>
                        <div className=' w-md rounded-md shadow-md shadow-gray-200 bg-white flex p-3 flex-col justify-center items-center text-center'>
                            <div>
                                <Slider />
                            </div>
                            <div className='mt-3 text-sm text-gray-400'>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing
                                    elit. Aut, libero dicta necessitatibus consectetur
                                    voluptatem sit harum ad beatae voluptatum. Minima
                                    harum error eveniet deserunt in, vel earum beatae
                                    illum ratione?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='w-full '>
                <Footer className="absolute bottom-0 left-0 object-cover z-0'" />
            </div> */}
            </div>
    )
}