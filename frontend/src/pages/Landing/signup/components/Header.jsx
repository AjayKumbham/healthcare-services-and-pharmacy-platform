import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingHeader({ onLoginClick, scrollToSupport, scrollToBenefits }) {
    const navigate = useNavigate();
    return (
        <header className="bg-[#2A6041] text-white py-3 px-6 flex items-center justify-between text-lg">
            <a href="/" className="text-2xl font-bold hover:text-[#A5D6A7] transition-colors flex items-center">
                <span>Price </span>
                <img
                    src="https://res.cloudinary.com/dzymyjltu/image/upload/v1737485868/pam-logo_mpxeqp.png"
                    alt="A"
                    className="h-11 w-10 mx-1 inline"
                />
                <span>Med</span>
            </a>

            <nav>
                <div className="flex flex-wrap items-center justify-between p-4 bg-green-500 w-full rounded">


                    <a href="/login" className="tracking-wider text-white">
                        Login
                    </a>

                </div>
            </nav>
        </header>
    );
}
