import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const useAuthInfo = () => {
    const token = useSelector(state => state.auth.token);

    if (!token) {
        return { roles: [], username: '' };
    }

    try {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.name || '';
        const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
        let roles = decodedToken[roleClaim] || [];

        // Ensure roles is always an array
        if (!Array.isArray(roles)) {
            roles = [roles];
        }

        return { roles, username };
    } catch (error) {
        console.error('Failed to decode JWT token', error);
        return { roles: [], username: '' };
    }
};

export default useAuthInfo;
