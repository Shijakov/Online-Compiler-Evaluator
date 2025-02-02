import { useEffect, useState } from 'react';
import { STATUS_OK, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';
import { UserListItem } from './UserListItem';

export const UserList = () => {
    const { call } = useBackend();
    const { user } = useUser();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await call('/user', 'GET', {}, user);

            if (response.status === STATUS_OK) {
                setUsers(response.data);
            }
        };

        loadUsers();
    }, [call, user]);

    const handleAssignRole = async (userId, role) => {
        const response = await call(
            '/role/assign/' + userId,
            'PUT',
            { role },
            user
        );

        if (response.status === STATUS_OK) {
            setUsers((users) =>
                users.map((user) => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            roles: [...user.roles, role],
                        };
                    }
                    return user;
                })
            );
        }
    };

    const handleRemoveRole = async (userId, role) => {
        const response = await call(
            '/role/remove/' + userId,
            'PUT',
            { role },
            user
        );

        if (response.status === STATUS_OK) {
            setUsers((users) =>
                users.map((user) => {
                    if (user.id === userId) {
                        return {
                            ...user,
                            roles: user.roles.filter(
                                (userRole) => userRole !== role
                            ),
                        };
                    }
                    return user;
                })
            );
        }
    };

    return (
        <div>
            {users.map((user) => (
                <UserListItem
                    key={user.id}
                    user={user}
                    assignRole={handleAssignRole}
                    removeRole={handleRemoveRole}
                />
            ))}
        </div>
    );
};
