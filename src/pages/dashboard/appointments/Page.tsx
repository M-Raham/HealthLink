import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, List, Calendar } from "lucide-react";

interface Appointment {
  date: number;
  time: string;
  patient: string;
}

const Page = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2023, 10, 1)); // November 2023
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  const appointments: Appointment[] = [
    { date: 1, time: "02:00 PM", patient: "Robert Smith" },
    { date: 1, time: "09:00 AM", patient: "Emily Davis" },
    { date: 4, time: "01:00 PM", patient: "Robert Smith" },
    { date: 4, time: "02:00 PM", patient: "Robert Smith" },
    { date: 8, time: "11:00 AM", patient: "Emily Davis" },
    { date: 12, time: "10:00 AM", patient: "Alice Johnson" },
    { date: 12, time: "11:00 AM", patient: "Emily Davis" },
    { date: 13, time: "09:00 AM", patient: "Sophia Wilson" },
    { date: 14, time: "03:00 PM", patient: "Alice Johnson" },
    { date: 15, time: "02:00 PM", patient: "Robert Smith" },
    { date: 19, time: "02:00 PM", patient: "Alice Johnson" },
    { date: 21, time: "01:00 PM", patient: "Emily Davis" },
    { date: 21, time: "10:00 AM", patient: "Sophia Wilson" },
    { date: 26, time: "03:00 PM", patient: "Alice Johnson" },
    { date: 26, time: "09:00 AM", patient: "Michael Brown" },
    { date: 27, time: "10:00 AM", patient: "Sophia Wilson" },
    { date: 27, time: "10:00 AM", patient: "Alice Johnson" },
    { date: 28, time: "03:00 PM", patient: "Michael Brown" },
  ];

  const monthNames: string[] = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const daysOfWeek: string[] = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getAppointmentsForDay = (day: number): Appointment[] => {
    return appointments.filter((apt) => apt.date === day);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-24 bg-gray-100 border border-gray-200"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = getAppointmentsForDay(day);
      const isToday = day === 15; // Highlighting day 15 as current day for demo
      
      days.push(
        <div
          key={day}
          className={`min-h-24 border border-gray-200 p-1 ${
            day > 25 ? 'bg-gray-100' : 'bg-white'
          } hover:bg-gray-50 transition-colors`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-blue-600' : 'text-gray-900'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayAppointments.slice(0, 3).map((apt, index) => (
              <div
                key={index}
                className="text-xs bg-blue-50 text-blue-700 px-1 py-0.5 rounded text-left truncate"
              >
                {apt.time} - {apt.patient}
              </div>
            ))}
            {dayAppointments.length > 3 && (
              <div className="text-xs text-gray-500 px-1">
                +{dayAppointments.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const handleBookAppointment = () => {
    console.log('Book new appointment');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Appointments</h1>
        
        <button
          onClick={handleBookAppointment}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              viewMode === 'calendar'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Calendar View</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-4 h-4" />
            <span>List View</span>
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <>
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 bg-gray-50">
              {daysOfWeek.map(day => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {renderCalendarDays()}
            </div>
          </div>
        </>
      ) : (
        /* List View */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              All Appointments - {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {appointments.map((apt, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {apt.patient}
                    </div>
                    <div className="text-sm text-gray-600">
                      {monthNames[currentDate.getMonth()]} {apt.date}, {currentDate.getFullYear()} at {apt.time}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar Legend */}
      {viewMode === 'calendar' && (
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
            <span>Appointments</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
            <span>Previous/Next Month</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;