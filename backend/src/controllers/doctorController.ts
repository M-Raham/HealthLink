import { Response } from 'express';
import { Doctor, Patient, Appointment } from '../models';
import { AuthRequest } from '../types';

export const updateAvailability = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { availability } = req.body;

    const doctor = await Doctor.findOne({ user: req.user?.id });
    if (!doctor) {
      res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
      return;
    }

    doctor.availability = availability;
    await doctor.save();

    res.status(200).json({
      success: true,
      message: 'Availability updated successfully',
      data: doctor.availability
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating availability',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getMyAppointments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const doctor = await Doctor.findOne({ user: req.user?.id });
    if (!doctor) {
      res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const skip = (page - 1) * limit;

    let query: any = { doctor: doctor._id };
    if (status && ['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email phone age gender')
      .sort({ appointmentDate: 1, timeSlot: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        appointments,
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
      message: 'Server error fetching appointments',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateAppointmentStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { appointmentId } = req.params;
    const { status, notes } = req.body;

    const doctor = await Doctor.findOne({ user: req.user?.id });
    if (!doctor) {
      res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
      return;
    }

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      doctor: doctor._id
    });

    if (!appointment) {
      res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
      return;
    }

    appointment.status = status;
    if (notes) {
      appointment.notes = notes;
    }
    await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error updating appointment',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getMyPatients = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const doctor = await Doctor.findOne({ user: req.user?.id });
    if (!doctor) {
      res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Get appointments with patient details and reasons
    const appointments = await Appointment.find({
      doctor: doctor._id
    })
      .populate('patient', 'name email phone age gender description medicalHistory createdAt')
      .select('patient reason appointmentDate timeSlot status createdAt')
      .sort({ createdAt: -1 });

    // Group appointments by patient and include latest appointment reason
    const patientMap = new Map();
    appointments.forEach(appointment => {
      const patientId = (appointment.patient as any)._id.toString();
      if (!patientMap.has(patientId)) {
        const patientData = appointment.patient as any;
        patientMap.set(patientId, {
          ...patientData.toObject(),
          latestAppointmentReason: appointment.reason,
          latestAppointmentDate: appointment.appointmentDate,
          totalAppointments: 1,
          appointmentReasons: [appointment.reason]
        });
      } else {
        const existing = patientMap.get(patientId);
        existing.totalAppointments += 1;
        if (!existing.appointmentReasons.includes(appointment.reason)) {
          existing.appointmentReasons.push(appointment.reason);
        }
      }
    });

    // Convert map to array and apply pagination
    const allPatients = Array.from(patientMap.values());
    const total = allPatients.length;
    const patients = allPatients.slice(skip, skip + limit);

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

export const addPatientRecord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { patientId } = req.params;
    const { disease, diagnosis, treatment } = req.body;

    const doctor = await Doctor.findOne({ user: req.user?.id });
    if (!doctor) {
      res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
      return;
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
      return;
    }

    const hasAppointment = await Appointment.findOne({
      patient: patientId,
      doctor: doctor._id
    });

    if (!hasAppointment) {
      res.status(403).json({
        success: false,
        message: 'You can only add records for your patients'
      });
      return;
    }

    patient.medicalHistory.push({
      disease,
      diagnosis,
      treatment,
      doctorId: (doctor._id as string).toString(),
      recordedAt: new Date()
    });

    await patient.save();

    res.status(200).json({
      success: true,
      message: 'Medical record added successfully',
      data: patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error adding medical record',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getDoctorStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const doctor = await Doctor.findOne({ user: req.user?.id });
    if (!doctor) {
      res.status(404).json({
        success: false,
        message: 'Doctor profile not found'
      });
      return;
    }

    const totalAppointments = await Appointment.countDocuments({ doctor: doctor._id });
    const pendingAppointments = await Appointment.countDocuments({ 
      doctor: doctor._id, 
      status: 'pending' 
    });
    const completedAppointments = await Appointment.countDocuments({ 
      doctor: doctor._id, 
      status: 'completed' 
    });
    const totalPatients = await Appointment.distinct('patient', { doctor: doctor._id });

    const todayAppointments = await Appointment.countDocuments({
      doctor: doctor._id,
      appointmentDate: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 999))
      }
    });

    res.status(200).json({
      success: true,
      data: {
        totalAppointments,
        pendingAppointments,
        completedAppointments,
        totalPatients: totalPatients.length,
        todayAppointments
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching doctor stats',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
