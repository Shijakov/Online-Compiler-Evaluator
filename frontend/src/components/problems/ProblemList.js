import { useEffect, useState } from 'react';
import { STATUS_OK, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';
import ProblemListItem from './ProblemListItem';
import Paginate from '../infrastructure/Paginate';

export const ProblemList = () => {
    const { call } = useBackend();
    const { user } = useUser();

    const [problems, setProblems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadProblems = async () => {
            const response = await call('/problem', 'GET', {}, user, { page });

            if (response.status === STATUS_OK) {
                setTotalPages(
                    Math.ceil(response.data.total / response.data.per_page)
                );
                setProblems(response.data.data);
            }
        };

        loadProblems();
    }, [call, user, page]);

    return (
        <div>
            {problems.map((problem) => (
                <ProblemListItem key={problem.id} problem={problem} />
            ))}
            <Paginate
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page)}
            />
        </div>
    );
};
