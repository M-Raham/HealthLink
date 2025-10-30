import { Router } from 'express';
import {
  createDoctor,
  getAllDoctors,
  getAllPatients,
  toggleDoctorStatus,
  getDashboardStats
} from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';
import { validateDoctorCreation } from '../middleware/validation';

const router = Router();

router.use(authenticate);
router.use(authorize('admin'));

router.post('/doctors', validateDoctorCreation, createDoctor);
router.get('/doctors', getAllDoctors);
router.get('/patients', getAllPatients);
router.patch('/doctors/:doctorId/toggle-status', toggleDoctorStatus);
router.get('/dashboard/stats', getDashboardStats);

export default router;
