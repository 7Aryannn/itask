import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between bg-indigo-700 text-white py-2'>
            <div className="logo">
                <span className='font-bold text-xl mx-10 '>iTask</span>
            </div>
            <ul className="flex gap-8 mx-9 ">
                <li className='cursor-pointer transition-all hover:font-bold text-white'>Home</li>
                <li className='cursor-pointer transition-all hover:font-bold text-white'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default Navbar
