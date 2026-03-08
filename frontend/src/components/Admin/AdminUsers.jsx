import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import { toast } from "sonner";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId, isBanned) => {
    try {
      if (isBanned) {
        await API.put(`/admin/users/${userId}/unban`);
        toast.success("User unbanned");
      } else {
        await API.put(`/admin/users/${userId}/ban`);
        toast.success("User banned");
      }
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await API.put(`/admin/users/${userId}/role`, { role });
      toast.success("User role updated");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Fraud Score</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Joined</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.fraudScore > 50
                        ? "bg-red-100 text-red-800"
                        : user.fraudScore > 25
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.fraudScore}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.isBanned
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.isBanned ? "Banned" : "Active"}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleBanUser(user._id, user.isBanned)}
                    className={`text-sm ${
                      user.isBanned
                        ? "text-green-600 hover:underline"
                        : "text-red-600 hover:underline"
                    }`}
                  >
                    {user.isBanned ? "Unban" : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
