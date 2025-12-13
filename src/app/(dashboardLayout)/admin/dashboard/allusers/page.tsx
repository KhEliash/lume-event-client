// import AllUserList from '@/components/modules/Admin/AllUserList';
// import { getAllUsers } from '@/services/admin/user-management';
// import { redirect } from 'next/navigation';

// export default async function AdminUsersPage({ searchParams }: { searchParams: { page?: string, limit?: string, role?: string } }) {
    
//     // Extract search parameters for dynamic fetching
//     const page = parseInt(searchParams.page || '1');
//     const limit = parseInt(searchParams.limit || '10');
//     const role = searchParams.role || 'user'; // Default role, adjust as needed

//     const result = await getAllUsers(page, limit, role);

//     if (!result.success) {
//         // Handle authentication or major failure, e.g., redirect to login
//         if (result.message.includes("Authentication token missing")) {
//             redirect('/login'); 
//         }
//         // Fallback for other errors
//         return <div>Error loading users: {result.message}</div>;
//     }

//     // The component expects the data structure from your original API response
//     const formattedData = {
//         data: result.users.data || [],
//         meta: result.users.meta,
//         message: result.users.message,
//         statusCode: result.users.statusCode,
//         success: result.users.success,
//     };

//     return (
//         <AllUserList initialData={formattedData} />
//     );
// }

import AllUserList from '@/components/modules/Admin/AllUserList';
import { getAllUsers } from '@/services/admin/user-management';
import { redirect } from 'next/navigation';

type PageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    role?: string;
  }>;
};

export default async function AdminUsersPage({ searchParams }: PageProps) {
  // ✅ unwrap async searchParams
  const params = await searchParams;

  const page = parseInt(params.page || '1', 20);
  const limit = parseInt(params.limit || '10', 20);
  const role = params.role ?? 'user';

  const result = await getAllUsers(page, limit, role);

  if (!result.success) {
    if (result.message?.includes('Authentication token missing')) {
      redirect('/login');
    }
    return <div>Error loading users: {result.message}</div>;
  }

  const formattedData = {
    data: result.users.data || [],
    meta: result.users.meta,
    message: result.users.message,
    statusCode: result.users.statusCode,
    success: result.users.success,
  };

  return <AllUserList initialData={formattedData} />;
}
