import AllUserList from "@/components/modules/Admin/AllUserList";
import { getAllUsers } from "@/services/admin/user-management";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    role?: string;
  }>;
};

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const limit = parseInt(params.limit || "10", 10);
  const role = params.role ?? "user";

  const result = await getAllUsers(page, limit, role);
  // console.log(result);
  if (!result.success) {
    if (result.message?.includes("Authentication token missing")) {
      redirect("/login");
    }
    return (
      <div className="p-10 font-black text-red-600 uppercase border-4 border-red-600 bg-red-50">
        Error: {result.message}
      </div>
    );
  }

  const formattedData = result.users;

  return (
    <div className="space-y-8 px-4 md:px-10 py-6">
      <div className="border-b-4 border-emerald-950 pb-6">
        <h1 className="text-5xl font-black text-emerald-950 uppercase tracking-tighter">
          User Registry
        </h1>
        <div className="flex justify-between items-center mt-2">
          <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em]">
            Authorized Personnel: {formattedData.meta.total} entries
          </p>
        </div>
      </div>

      <AllUserList initialData={formattedData} />
    </div>
  );
}
