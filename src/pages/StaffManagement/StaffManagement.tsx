import React, { useState, useEffect, useRef } from 'react';
import { FiEdit2, FiPlus, FiCheckCircle, FiAlertCircle, FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/axiosConfig';
import { useTranslation } from '../../hooks/useTranslation';

// Define the user type based on the API response
interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  organization: string;
  role: string;
  is_active: boolean;
  must_change_password: boolean;
  date_joined: string;
}

const StaffManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [showCreateScannerModal, setShowCreateScannerModal] = useState(false);
  const [showCreateStaffModal, setShowCreateStaffModal] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedMemberName, setSelectedMemberName] = useState<string>('');
  const [selectedMemberRole, setSelectedMemberRole] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [staffMembers, setStaffMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Create Admin form state
  const [adminFullName, setAdminFullName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminFormError, setAdminFormError] = useState<string | null>(null);

  // Create Scanner form state
  const [scannerFullName, setScannerFullName] = useState('');
  const [scannerEmail, setScannerEmail] = useState('');
  const [scannerPhone, setScannerPhone] = useState('');
  const [scannerPassword, setScannerPassword] = useState('');
  const [scannerFormError, setScannerFormError] = useState<string | null>(null);

  // Create Staff Member form state
  const [staffFullName, setStaffFullName] = useState('');
  const [staffPhone, setStaffPhone] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [staffSendInvite, setStaffSendInvite] = useState(true);
  const [staffFormError, setStaffFormError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslation();

  // Fetch staff data from API with pagination
  const fetchStaffData = async (page: number = 1, size: number = 10) => {
    try {
      setLoading(true);
      // For now, we'll fetch all data and paginate on the client side
      // In a real implementation, you would use API pagination parameters
      const response = await api.get('/auth/api/admin/users/summary/');

      // Combine all users (admins, staff, scanners) into one array
      const allUsers: User[] = [
        ...response.data.admins,
        ...response.data.staff,
        ...response.data.scanners
      ];

      const start = (page - 1) * size;
      const end = start + size;
      setStaffMembers(allUsers.slice(start, end));
      setTotalItems(allUsers.length);
      setStaffMembers(allUsers);
      setError(null);
    } catch (err) {
      console.error('Error fetching staff data:', err);
      setError('Failed to load staff data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch staff data on component mount
  useEffect(() => {
    fetchStaffData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Auto-hide error message after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleEditPassword = (id: string, name: string, role: string) => {
    setSelectedMemberId(id);
    setSelectedMemberName(name);
    setSelectedMemberRole(role);
    setShowEditPasswordModal(true);
    setPasswordError(null); // Clear any previous errors
    // Reset password visibility
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleDelete = (id: string, name: string, role: string) => {
    setSelectedMemberId(id);
    setSelectedMemberName(name);
    setSelectedMemberRole(role);
    setShowDeleteModal(true);
  };

  const handleAddMember = () => {
    setShowDropdown(!showDropdown);
  };

  const handleAddNewAdmin = () => {
    setShowCreateAdminModal(true);
    setShowDropdown(false);
    setAdminFormError(null); // Clear any previous errors
  };

  const handleAddNewStaffMember = () => {
    setShowCreateStaffModal(true);
    setShowDropdown(false);
    setStaffFormError(null); // Clear any previous errors
  };

  const handleAddNewScanner = () => {
    setShowCreateScannerModal(true);
    setShowDropdown(false);
    setScannerFormError(null); // Clear any previous errors
  };

  const handleConfirmDelete = async () => {
    if (!selectedMemberId) {
      setError('No user selected for deletion');
      setShowDeleteModal(false);
      return;
    }

    try {
      let endpoint = '';
      if (selectedMemberRole === 'admin') {
        endpoint = `/auth/api/admin/users/admins/${selectedMemberId}/`;
      } else if (selectedMemberRole === 'staff') {
        endpoint = `/auth/api/admin/users/staff/${selectedMemberId}/`;
      } else {
        endpoint = `/auth/api/admin/users/scanners/${selectedMemberId}/`;
      }

      await api.delete(endpoint);

      // Show success message
      setSuccessMessage(`${selectedMemberRole === 'admin' ? t.admin : selectedMemberRole === 'staff' ? t.staff : t.scanner} ${selectedMemberName} ${t.deletedSuccessfully}`);

      // Close modal
      setShowDeleteModal(false);
      setSelectedMemberId(null);
      setSelectedMemberName('');
      setSelectedMemberRole('');

      // Refresh the staff data
      fetchStaffData(currentPage, pageSize);
    } catch (err: any) {
      console.error('Error deleting user:', err);
      setError(err.response?.data?.message || t.failedToDeleteUser);
      setShowDeleteModal(false);
    }
  };

  const handleCreateAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminFormError(null); // Clear previous errors

    try {
      await api.post('/auth/api/admin/users/admins/', {
        full_name: adminFullName,
        email: adminEmail,
        phone: adminPhone,
        password: adminPassword
      });

      // Show success message
      setSuccessMessage(`${t.admin} ${t.createdSuccessfully}`);

      // Close modal and reset form
      setShowCreateAdminModal(false);
      setAdminFullName('');
      setAdminEmail('');
      setAdminPhone('');
      setAdminPassword('');

      // Refresh the staff data
      fetchStaffData(currentPage, pageSize);
    } catch (err: any) {
      console.error('Error creating admin:', err);

      // Handle validation errors from the API
      if (err.response?.status === 400) {
        const errorData = err.response.data;
        let errorMessage = '';

        // Check for specific field errors
        if (errorData.phone) {
          errorMessage += `Phone: ${errorData.phone.join(', ')} `;
        }
        if (errorData.email) {
          errorMessage += `Email: ${errorData.email.join(', ')} `;
        }
        if (errorData.full_name) {
          errorMessage += `Name: ${errorData.full_name.join(', ')} `;
        }
        if (errorData.password) {
          errorMessage += `Password: ${errorData.password.join(', ')} `;
        }

        // If no specific field errors, use the general error message
        if (!errorMessage && errorData.detail) {
          errorMessage = errorData.detail;
        }

        // If still no error message, use a generic one
        if (!errorMessage) {
          errorMessage = t.failedToCreateAdmin;
        }

        setAdminFormError(errorMessage.trim());
      } else {
        // Handle other types of errors
        setAdminFormError(err.response?.data?.message || t.failedToCreateAdmin);
      }
    }
  };

  const handleCreateScannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScannerFormError(null); // Clear previous errors

    try {
      await api.post('/auth/api/admin/users/scanners/', {
        full_name: scannerFullName,
        email: scannerEmail,
        phone: scannerPhone,
        password: scannerPassword
      });

      // Show success message
      setSuccessMessage(`${t.scanner} ${t.createdSuccessfully}`);

      // Close modal and reset form
      setShowCreateScannerModal(false);
      setScannerFullName('');
      setScannerEmail('');
      setScannerPhone('');
      setScannerPassword('');

      // Refresh the staff data
      fetchStaffData(currentPage, pageSize);
    } catch (err: any) {
      console.error('Error creating scanner:', err);

      // Handle validation errors from the API
      if (err.response?.status === 400) {
        const errorData = err.response.data;
        let errorMessage = '';

        // Check for specific field errors
        if (errorData.phone) {
          errorMessage += `Phone: ${errorData.phone.join(', ')} `;
        }
        if (errorData.email) {
          errorMessage += `Email: ${errorData.email.join(', ')} `;
        }
        if (errorData.full_name) {
          errorMessage += `Name: ${errorData.full_name.join(', ')} `;
        }
        if (errorData.password) {
          errorMessage += `Password: ${errorData.password.join(', ')} `;
        }

        // If no specific field errors, use the general error message
        if (!errorMessage && errorData.detail) {
          errorMessage = errorData.detail;
        }

        // If still no error message, use a generic one
        if (!errorMessage) {
          errorMessage = t.failedToCreateScanner;
        }

        setScannerFormError(errorMessage.trim());
      } else {
        // Handle other types of errors
        setScannerFormError(err.response?.data?.message || t.failedToCreateScanner);
      }
    }
  };

  const handleCreateStaffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStaffFormError(null); // Clear previous errors

    try {
      await api.post('/auth/api/admin/users/staff/', {
        full_name: staffFullName,
        email: staffEmail,
        phone: staffPhone,
        password: staffPassword,
        send_invite: staffSendInvite
      });

      // Show success message
      setSuccessMessage(`${t.staff} ${t.member} ${t.createdSuccessfully}`);

      // Close modal and reset form
      setShowCreateStaffModal(false);
      setStaffFullName('');
      setStaffEmail('');
      setStaffPhone('');
      setStaffPassword('');
      setStaffSendInvite(true);

      // Refresh the staff data
      fetchStaffData(currentPage, pageSize);
    } catch (err: any) {
      console.error('Error creating staff member:', err);

      // Handle validation errors from the API
      if (err.response?.status === 400) {
        const errorData = err.response.data;
        let errorMessage = '';

        // Check for specific field errors
        if (errorData.phone) {
          errorMessage += `Phone: ${errorData.phone.join(', ')} `;
        }
        if (errorData.email) {
          errorMessage += `Email: ${errorData.email.join(', ')} `;
        }
        if (errorData.full_name) {
          errorMessage += `Name: ${errorData.full_name.join(', ')} `;
        }
        if (errorData.password) {
          errorMessage += `Password: ${errorData.password.join(', ')} `;
        }

        // If no specific field errors, use the general error message
        if (!errorMessage && errorData.detail) {
          errorMessage = errorData.detail;
        }

        // If still no error message, use a generic one
        if (!errorMessage) {
          errorMessage = t.failedToCreateStaffMember;
        }

        setStaffFormError(errorMessage.trim());
      } else {
        // Handle other types of errors
        setStaffFormError(err.response?.data?.message || t.failedToCreateStaffMember);
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null); // Clear previous errors

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Validate password length
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    // Validate password complexity
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasDigit = /\d/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasDigit) {
      setPasswordError('Password must include at least one uppercase letter, one lowercase letter, and one digit.');
      return;
    }

    if (!selectedMemberId) {
      setPasswordError('No user selected');
      return;
    }

    try {
      let endpoint = '';
      if (selectedMemberRole === 'admin') {
        endpoint = `/auth/api/admin/users/admins/${selectedMemberId}/set-password/`;
      } else if (selectedMemberRole === 'staff') {
        endpoint = `/auth/api/admin/users/staff/${selectedMemberId}/set-password/`;
      } else {
        endpoint = `/auth/api/admin/users/scanners/${selectedMemberId}/set-password/`;
      }

      await api.post(endpoint, {
        new_password: newPassword,
        confirm_password: confirmPassword
      });

      // Show success message
      setSuccessMessage(`Password updated successfully for ${selectedMemberName}!`);

      // Close modal and reset form
      setShowEditPasswordModal(false);
      setNewPassword('');
      setConfirmPassword('');
      setSelectedMemberId(null);
      setSelectedMemberName('');
      setSelectedMemberRole('');
    } catch (err: any) {
      console.error('Error updating password:', err);

      // Handle validation errors from the API
      if (err.response?.status === 400) {
        const errorData = err.response.data;
        let errorMessage = '';

        // Check for specific field errors
        if (errorData.new_password) {
          errorMessage += `New Password: ${errorData.new_password.join(', ')} `;
        }
        if (errorData.confirm_password) {
          errorMessage += `Confirm Password: ${errorData.confirm_password.join(', ')} `;
        }

        // If no specific field errors, use the general error message
        if (!errorMessage && errorData.detail) {
          errorMessage = errorData.detail;
        }

        // If still no error message, use a generic one
        if (!errorMessage) {
          errorMessage = t.failedToUpdatePassword;
        }

        setPasswordError(errorMessage.trim());
      } else {
        // Handle other types of errors
        setPasswordError(err.response?.data?.message || t.failedToUpdatePassword);
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentMembers = staffMembers.slice(startIndex, endIndex);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">{t.staffManagement}</h1>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleAddMember}
            className="bg-[#002624] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t.addMember}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 overflow-hidden">
              <div className="p-2 text-gray-500 text-sm">{t.buttonMenu}</div>
              <button
                onClick={handleAddNewAdmin}
                className="w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-50 border-t border-gray-100"
              >
                <FiPlus size={18} />
                {t.newAdmin}
              </button>
              <button
                onClick={handleAddNewStaffMember}
                className="w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-50 border-t border-gray-100"
              >
                <FiPlus size={18} />
                {t.newStaffMember}
              </button>
              <button
                onClick={handleAddNewScanner}
                className="w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-50 border-t border-gray-100"
              >
                <FiPlus size={18} />
                {t.newScanner}
              </button>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">{t.loading}</div>
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="bg-red-100 border-l-4 border-red-500 rounded shadow-lg p-4 flex items-center">
              <FiAlertCircle className="text-red-500 text-xl mr-2" />
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="bg-white border-l-4 border-green-500 rounded shadow-lg p-4 flex items-center">
              <FiCheckCircle className="text-green-500 text-xl mr-2" />
              <span className="text-green-700 font-medium">{successMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && !error && (
        <>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-600">
                  <th className="py-3 px-6 font-normal">{t.name}</th>
                  <th className="py-3 px-6 font-normal">{t.email}</th>
                  <th className="py-3 px-6 font-normal">{t.role}</th>
                  <th className="py-3 px-6 font-normal">{t.phoneNumber}</th>
                  <th className="py-3 px-6 font-normal">{t.createdAt}</th>
                  <th className="py-3 px-6 font-normal">{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {currentMembers.map((member) => (
                  <tr key={member.id} className="border-t border-gray-100">
                    <td className="py-4 px-6">{member.full_name}</td>
                    <td className="py-4 px-6">{member.email}</td>
                    <td className="py-4 px-6">
                      <span className="capitalize">{member.role}</span>
                    </td>
                    <td className="py-4 px-6">{member.phone}</td>
                    <td className="py-4 px-6">{formatDate(member.date_joined)}</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPassword(member.id, member.full_name, member.role)}
                          className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md"
                        >
                          <FiEdit2 size={16} />
                          {t.editPassword}
                        </button>
                        <button
                          onClick={() => handleDelete(member.id, member.full_name, member.role)}
                          className="bg-red-500 text-white px-3 py-2 rounded-md flex items-center gap-1"
                        >
                          <FiTrash2 size={16} />
                          {t.deleteMember}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">{t.rowsPerPage}</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span className="text-gray-600">
                {startIndex + 1}-{endIndex} of {totalItems}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded-md flex items-center gap-1 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t.previous}
              </button>

              {/* Page numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                // Show first, last, current, and nearby pages
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      className={`w-8 h-8 rounded-md flex items-center justify-center ${
                        currentPage === page
                          ? 'bg-[#0F3A62] text-white'
                          : 'border border-gray-300'
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                }

                // Show ellipsis for gaps
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="mx-1 text-gray-400">
                      ...
                    </span>
                  );
                }

                return null;
              })}

              <button
                className="px-3 py-1 border rounded-md flex items-center gap-1 disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {t.next}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Edit Password Modal */}
      {showEditPasswordModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={(e) => {
            // Close modal when clicking on the overlay (not the modal content)
            if (e.target === e.currentTarget) {
              setShowEditPasswordModal(false);
              setNewPassword('');
              setConfirmPassword('');
              setPasswordError(null);
            }
          }}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-xl font-medium mb-6">{t.editPasswordFor} {selectedMemberName}</h2>

            {passwordError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.newPassword}</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                    placeholder={t.atLeast8Characters}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <FiEyeOff className="text-gray-500" />
                    ) : (
                      <FiEye className="text-gray-500" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t.passwordComplexity}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">{t.confirmNewPassword}</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
                    placeholder={t.confirmNewPassword}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="text-gray-500" />
                    ) : (
                      <FiEye className="text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditPasswordModal(false);
                    setNewPassword('');
                    setConfirmPassword('');
                    setPasswordError(null);
                  }}
                  className="flex-1 border border-gray-300 py-2 rounded-md"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#002624] text-white py-2 rounded-md"
                >
                  {t.resetPassword}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={(e) => {
            // Close modal when clicking on the overlay (not the modal content)
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-xl font-medium mb-2">{t.confirmDeletion}</h2>
            <p className="text-gray-600 mb-6">{t.areYouSureDelete} {selectedMemberRole} <strong>{selectedMemberName}</strong>? {t.thisActionCannotBeUndone}</p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-300 py-2 rounded-md"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-500 text-white py-2 rounded-md"
              >
                {t.deleteMember}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Admin Modal */}
      {showCreateAdminModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={(e) => {
            // Close modal when clicking on the overlay (not the modal content)
            if (e.target === e.currentTarget) {
              setShowCreateAdminModal(false);
              setAdminFormError(null); // Clear error when closing
            }
          }}
        >
          <div
            className="bg-white rounded-lg p-8 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-medium mb-6">{t.createNewAdmin}</h2>

            {adminFormError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                <span>{adminFormError}</span>
              </div>
            )}

            <form onSubmit={handleCreateAdminSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.fullName}</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={t.enterFullName}
                  value={adminFullName}
                  onChange={(e) => setAdminFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.emailAddress}</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={t.enterYourEmailAddress}
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.phoneNumber}</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 phone-number"
                  placeholder={t.phonePlaceholder}
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">{t.password}</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={t.atLeast8Characters}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#002624] text-white py-3 rounded-md"
              >
                {t.createAdmin}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Scanner Modal */}
      {showCreateScannerModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={(e) => {
            // Close modal when clicking on the overlay (not the modal content)
            if (e.target === e.currentTarget) {
              setShowCreateScannerModal(false);
              setScannerFormError(null); // Clear error when closing
            }
          }}
        >
          <div
            className="bg-white rounded-lg p-8 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-medium mb-6">{t.createNewScanner}</h2>

            {scannerFormError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                <span>{scannerFormError}</span>
              </div>
            )}

            <form onSubmit={handleCreateScannerSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.fullName}</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={t.enterFullName}
                  value={scannerFullName}
                  onChange={(e) => setScannerFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.emailAddress}</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={t.enterYourEmailAddress}
                  value={scannerEmail}
                  onChange={(e) => setScannerEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.phoneNumber}</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 phone-number"
                  placeholder={t.phonePlaceholder}
                  value={scannerPhone}
                  onChange={(e) => setScannerPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">{t.password}</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={t.atLeast8Characters}
                  value={scannerPassword}
                  onChange={(e) => setScannerPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#002624] text-white py-3 rounded-md"
              >
                {t.createScanner}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Staff Member Modal */}
      {showCreateStaffModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={(e) => {
            // Close modal when clicking on the overlay (not the modal content)
            if (e.target === e.currentTarget) {
              setShowCreateStaffModal(false);
              setStaffFormError(null); // Clear error when closing
            }
          }}
        >
          <div
            className="bg-white rounded-lg p-8 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-medium mb-6">{t.createNewStaffMember}</h2>

            {staffFormError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                <span>{staffFormError}</span>
              </div>
            )}

            <form onSubmit={handleCreateStaffSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.fullName}</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={t.enterFullName}
                  value={staffFullName}
                  onChange={(e) => setStaffFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.emailAddress}</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={t.enterYourEmailAddress}
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.phoneNumber}</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 phone-number"
                  placeholder={t.phonePlaceholder}
                  value={staffPhone}
                  onChange={(e) => setStaffPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{t.password}</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder={t.atLeast8Characters}
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="sendInvite"
                  className="mr-2"
                  checked={staffSendInvite}
                  onChange={(e) => setStaffSendInvite(e.target.checked)}
                />
                <label htmlFor="sendInvite">{t.sendInvite}</label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#002624] text-white py-3 rounded-md"
              >
                {t.createStaffMember}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;