// // src/api.js

// export const getUserStatus = async () => {
//     try {
//       const response = await fetch('/api/user/status', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}` // If using JWT or similar auth token
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch user status');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching user status:', error);
//       throw error;
//     }
//   };
  


// src/api.js
export const getUserStatus = async () => {
  const response = await fetch('/user-status/');
  if (!response.ok) {
    throw new Error('Failed to fetch user status');
  }
  return response.json();
};
