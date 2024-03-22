import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import CustomCalendar from './Calendar';
import NoteSection from './NoteSection';

const HomePage = () => {
  return (
    <div className="">
      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Main Content */}
      <div className="flex-auto p-8 bg-first-color">
        <h2 className="text-center md:text-center lg:text-left text-3xl font-bold mb-6 text-first-color">Home Page</h2>
        <div className="flex flex-col md:flex-row">
          {/* Calendar */}
          <div className="w-full  md:w-1/2 mb-0 md:mb-0 md:mr-2">
            <CustomCalendar />
          </div>

          {/* Note Section */}
          <div className="w-full md:flex-col-reverse md:w-1/2 mt-1">
            <NoteSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
