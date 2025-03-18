import { FiBell, FiMessageSquare, FiUserPlus } from "react-icons/fi";

export const Header = () => {
    return (
        <>
            <header className="flex justify-between items-center p-4 shadow-sm bg-blue-400">
                <h1 className="text-3xl font-bold font-sans bg-gradient-to-r from-blue-700 to-blue-900 text-transparent bg-clip-text">CyberShakti: Empowering Indian Women Government Officials in Cybersecurity</h1>
                <div className="flex items-center space-x-3">
                    {/* Notification Bell */}
                    <FiBell className="text-gray-600 cursor-pointer" size={25} />
                    <div className="flex flex-col items-center space-x-1   rounded-lg cursor-pointer">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKxfjTf49GAtu0PpFXK7mKBgqyJ5MfJCgQw&s" alt="User" className="rounded-full size-15  " />
                        <div>
                            <p className="text-md font-semibold">Michael Jones</p>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
