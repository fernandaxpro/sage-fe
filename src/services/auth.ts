// import api from './api';
// import { User } from '@/types';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useAuth } from '@/context/AuthContext';

// // --- API Functions ---

// export const loginUser = async (credentials: { email: string; password: string }): Promise<User> => {
//     const response = await api.post('/auth/login', credentials);
//     return response.data;
// };

// export const registerUser = async (userData: { name: string; email: string; password: string }): Promise<User> => {
//     const response = await api.post('/auth/register', userData);
//     return response.data;
// };

// export const fetchUserProfile = async (): Promise<User> => {
//     const response = await api.get('/auth/me');
//     return response.data;
// }


// // --- React Query Hooks ---

// export const useLoginMutation = () => {
//     const { login } = useAuth();

//     return useMutation({
//         mutationFn: loginUser,
//         onSuccess: (data) => {
//             // Assuming the API returns the user object with a token inside,
//             // or modify this if the token comes separately.
//             // For now, assuming User interface has a token field as added.
//             if (data.token) {
//                 login(data, data.token);
//             } else {
//                 console.error("No token received", data);
//             }
//         },
//     });
// };

// export const useRegisterMutation = () => {
//     const { login } = useAuth();

//     return useMutation({
//         mutationFn: registerUser,
//         onSuccess: (data) => {
//             if (data.token) {
//                 login(data, data.token);
//             }
//         }
//     })
// }
