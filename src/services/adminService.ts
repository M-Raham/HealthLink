import { apiService } from './api';
import {
  ApiResponse,
  PaginationResponse,
  CreateDoctorRequest,
  DoctorProfile,
  Patient,
  AdminStats,
  Appointment
} from '../types/api';

class AdminService {
  async createDoctor(doctorData: CreateDoctorRequest): Promise<{ user: any; doctor: DoctorProfile; token: string }> {
    const response = await apiService.post<ApiResponse<{ user: any; doctor: DoctorProfile; token: string }>>(
      '/admin/doctors',
      doctorData
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to create doctor');
  }

  async getAllDoctors(page: number = 1, limit: number = 10): Promise<PaginationResponse<DoctorProfile>> {
    const response = await apiService.get<PaginationResponse<DoctorProfile>>(
      `/admin/doctors?page=${page}&limit=${limit}`
    );
    
    if (response.success) {
      return response;
    }
    
    throw new Error('Failed to fetch doctors');
  }

  async getAllPatients(page: number = 1, limit: number = 10): Promise<PaginationResponse<Patient>> {
    const response = await apiService.get<PaginationResponse<Patient>>(
      `/admin/patients?page=${page}&limit=${limit}`
    );
    
    if (response.success) {
      return response;
    }
    
    throw new Error('Failed to fetch patients');
  }

  async toggleDoctorStatus(doctorId: string): Promise<DoctorProfile> {
    const response = await apiService.patch<ApiResponse<DoctorProfile>>(
      `/admin/doctors/${doctorId}/toggle-status`
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to toggle doctor status');
  }

  async getDashboardStats(): Promise<{ stats: AdminStats; recentAppointments: Appointment[] }> {
    const response = await apiService.get<ApiResponse<{ stats: AdminStats; recentAppointments: Appointment[] }>>(
      '/admin/dashboard/stats'
    );
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch dashboard stats');
  }
}

export const adminService = new AdminService();
