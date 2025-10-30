import React, { useState, useEffect } from 'react';
import { Clock, Save, Calendar, CheckCircle } from 'lucide-react';
import { doctorService } from '../../../services';
import { Availability } from '../../../types/api';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { ErrorMessage } from '../../../components/common/ErrorMessage';
import { useApi } from '../../../hooks/useApi';

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
] as const;

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
];

const AvailabilityPage: React.FC = () => {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { execute: updateAvailability, loading: updating } = useApi(doctorService.updateAvailability);

  useEffect(() => {
    loadCurrentAvailability();
  }, []);

  const loadCurrentAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      // Initialize with default availability if none exists
      const defaultAvailability: Availability[] = DAYS_OF_WEEK.map(day => ({
        day,
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: false
      }));
      
      setAvailability(defaultAvailability);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  const handleDayToggle = (dayIndex: number) => {
    setAvailability(prev => prev.map((item, index) => 
      index === dayIndex 
        ? { ...item, isAvailable: !item.isAvailable }
        : item
    ));
  };

  const handleTimeChange = (dayIndex: number, field: 'startTime' | 'endTime', value: string) => {
    setAvailability(prev => prev.map((item, index) => 
      index === dayIndex 
        ? { ...item, [field]: value }
        : item
    ));
  };

  const handleSaveAvailability = async () => {
    try {
      await updateAvailability(availability);
    } catch (error) {
      // Error handled by useApi hook
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={loadCurrentAvailability}
        className="m-6"
      />
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Availability Schedule</h1>
          <p className="text-gray-600">Set your weekly availability for patient appointments</p>
        </div>

        <button
          onClick={handleSaveAvailability}
          disabled={updating}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-70"
        >
          {updating ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Schedule</span>
            </>
          )}
        </button>
      </div>

      {/* Availability Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
          <p className="text-sm text-gray-600">Toggle days and set your working hours</p>
        </div>

        <div className="divide-y divide-gray-200">
          {availability.map((dayAvailability, index) => (
            <div key={dayAvailability.day} className="px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Day Toggle */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDayToggle(index)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      dayAvailability.isAvailable
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {dayAvailability.isAvailable ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />
                    )}
                    <span className="font-medium min-w-[80px] text-left">
                      {dayAvailability.day}
                    </span>
                  </button>
                </div>

                {/* Time Selection */}
                {dayAvailability.isAvailable ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">From</span>
                      <select
                        value={dayAvailability.startTime}
                        onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        {TIME_SLOTS.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">To</span>
                      <select
                        value={dayAvailability.endTime}
                        onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        {TIME_SLOTS.filter(time => time > dayAvailability.startTime).map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 italic">Not available</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => {
                setAvailability(prev => prev.map(item => ({ ...item, isAvailable: true })));
              }}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Enable All Days
            </button>
            <button
              onClick={() => {
                setAvailability(prev => prev.map(item => ({ ...item, isAvailable: false })));
              }}
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Disable All Days
            </button>
            <button
              onClick={() => {
                setAvailability(prev => prev.map(item => ({
                  ...item,
                  startTime: '09:00',
                  endTime: '17:00'
                })));
              }}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Set Standard Hours (9-5)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule Summary</h3>
          <div className="space-y-2">
            {availability.filter(day => day.isAvailable).length > 0 ? (
              availability
                .filter(day => day.isAvailable)
                .map(day => (
                  <div key={day.day} className="flex justify-between text-sm">
                    <span className="text-gray-600">{day.day}</span>
                    <span className="text-gray-900">{day.startTime} - {day.endTime}</span>
                  </div>
                ))
            ) : (
              <p className="text-sm text-gray-500 italic">No available days set</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Set realistic availability that you can maintain consistently</p>
            <p>• Consider buffer time between appointments</p>
            <p>• Update your schedule regularly to reflect changes</p>
            <p>• Patients can only book during your available hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage;
