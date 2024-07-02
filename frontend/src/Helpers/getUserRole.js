import { jwtDecode } from 'jwt-decode';

export const getUserRoles = (token) => {

    try {
        const decodedToken = jwtDecode(token);
        const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
        let roles = decodedToken[roleClaim] || [];

        // Ensure roles is always an array
        if (!Array.isArray(roles)) {
            roles = [roles];
        }

        return roles;
    } catch (error) {
        console.error('Failed to decode JWT token', error);
        return [];
    }
};

