import { Response } from 'express';
import { User, Doctor, Patient, Appointment } from '../models';
import { AuthRequest } from '../types';
import { generateToken } from '../utils/jwt';

export const createDoctor = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password, name, specialization, phone, experience, qualification } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
      return;
    }

    const user = new User({
      email,
      password,
      role: 'doctor'
    });

    await user.save();

    // Create default availability (Monday to Friday, 9 AM to 5 PM)
    const defaultAvailability = [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Saturday', startTime: '09:00', endTime: '17:00', isAvailable: false },
      { day: 'Sunday', startTime: '09:00', endTime: '17:00', isAvailable: false }
    ];

    const doctor = new Doctor({
      user: user._id,
      name,
      specialization,
      phone,
      experience,
      qualification,
      availability: defaultAvailability
    });

    await doctor.save();

    const token = generateToken({
      id: (user._id as string).toString(),
      role: user.role
    });

    res.status(201).json({
      success: true,
      message: 'Doctor created successfully',
      data: {
        user: {
          id: (user._id as string).toString(),
          email: user.email,
          role: user.role
        },
        doctor: {
          id: doctor._id,
          name: doctor.name,
          specialization: doctor.specialization,
          phone: doctor.phone,
          experience: doctor.experience,
          qualification: doctor.qualification,
          isActive: doctor.isActive
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error creating doctor',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getAllDoctors = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const doctors = await Doctor.find()
      .populate('user', 'email createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Doctor.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        doctors,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching doctors',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getAllPatients = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const patients = await Patient.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Patient.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        patients,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching patients',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const toggleDoctorStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
      return;
    }

    doctor.isActive = !doctor.isActive;
    await doctor.save();

    res.status(200).json({
      success: true,
      message: `Doctor ${doctor.isActive ? 'activated' : 'deactivated'} successfully`,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating doctor status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const activeDoctors = await Doctor.countDocuments({ isActive: true });
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });

    const recentAppointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name specialization')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalDoctors,
          activeDoctors,
          totalPatients,
          totalAppointments,
          pendingAppointments,
          completedAppointments
        },
        recentAppointments
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard stats',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
