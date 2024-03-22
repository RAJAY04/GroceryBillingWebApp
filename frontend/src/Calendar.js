import React, { useState } from 'react';
import { format, isToday, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
      <div className="align-middle justify-center min-h-screen bg-gradient-to-br from-peach-100 to-peach-300 mt-0">
        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-xl mt-1">
          <div className="text-2xl font-bold mb-4">
            {format(currentDate, 'MMMM yyyy')}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Weekday headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <span key={index} className="text-center font-medium text-sm text-gray-500">
              {day}
            </span>
            ))}

            {/* Calendar dates */}
            {daysInMonth.map((date, index) => (
                <button
                    key={index}
                    className={`
                ${isToday(date) ? 'bg-yellow-300' : ''} // Today's date will have a yellow background
                ${isSameMonth(date, currentDate) ? 'hover:bg-green-200' : 'text-gray-400'} // Other dates in the current month will have a green hover effect
                border rounded-md p-2
              `}
                    onClick={() => setCurrentDate(date)}
                >
                  {format(date, 'd')}
                </button>
            ))}
          </div>
        </div>
      </div>
  );
};

export default CalendarPage;
