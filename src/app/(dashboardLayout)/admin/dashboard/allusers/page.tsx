// import AllUserList from '@/components/modules/Admin/AllUserList';
// import { getAllUsers } from '@/services/admin/user-management';
// import React from 'react';

// const AllUsers = async() => {
//     const AllUsers = await getAllUsers()
//     console.log(AllUsers);
//     return (
//         <div>
//             <AllUserList data= {AllUsers.users}/>
//         </div>
//     );
// };

// export default AllUsers;


// src/app/admin/users/page.tsx (or similar Server Component)

// import { getAllUsers } from "@/services/api/user/user-api"; // Adjust path as needed
// import AllUserList from "@/components/admin/AllUserList"; // Adjust path as needed
import AllUserList from '@/components/modules/Admin/AllUserList';
import { getAllUsers } from '@/services/admin/user-management';
import { redirect } from 'next/navigation';

export default async function AdminUsersPage({ searchParams }: { searchParams: { page?: string, limit?: string, role?: string } }) {
    
    // Extract search parameters for dynamic fetching
    const page = parseInt(searchParams.page || '1');
    const limit = parseInt(searchParams.limit || '10');
    const role = searchParams.role || 'user'; // Default role, adjust as needed

    const result = await getAllUsers(page, limit, role);

    if (!result.success) {
        // Handle authentication or major failure, e.g., redirect to login
        if (result.message.includes("Authentication token missing")) {
            redirect('/login'); 
        }
        // Fallback for other errors
        return <div>Error loading users: {result.message}</div>;
    }

    // The component expects the data structure from your original API response
    const formattedData = {
        data: result.users.data || [],
        meta: result.users.meta,
        message: result.users.message,
        statusCode: result.users.statusCode,
        success: result.users.success,
    };

    return (
        <AllUserList initialData={formattedData} />
    );
}