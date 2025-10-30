import { Router } from 'express';
import {
  bookAppointment,
  getAvailableDoctors,
  getDoctorAvailability
} from '../controllers/appointmentController';
import { validateAppointmentBooking } from '../middleware/validation';

const router = Router();

router.post('/book', validateAppointmentBooking, bookAppointment);
router.get('/doctors', getAvailableDoctors);
router.get('/doctors/:doctorId/availability', getDoctorAvailability);

export default router;
