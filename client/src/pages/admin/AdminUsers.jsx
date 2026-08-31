import React, { useState, useEffect } from 'react';
import { getAdminUsers } from '../../services/adminService';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { Users, Search, Mail, Phone, MapPin } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getAdminUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load admin users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-cream-300">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal-900">
            User Directory & Accounts
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-0.5">
            Overview of registered adopters, shelter managers, and platform administrators.
          </p>
        </div>

        <div className="w-full sm:w-72">
          <Input
            icon={Search}
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-charcoal-400">Loading user directory...</div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-100 border-b border-cream-300 text-charcoal-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-cream-50/60 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-charcoal-900 text-sm">{u.name}</div>
                      <div className="text-charcoal-500">{u.email}</div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          u.role === 'admin' ? 'danger' :
                          u.role === 'shelter' ? 'brand' : 'neutral'
                        }
                        size="sm"
                        dot
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="p-4 text-charcoal-700 font-medium">
                      {u.location || 'India'}
                    </td>
                    <td className="p-4 text-charcoal-600">
                      {u.phone || 'N/A'}
                    </td>
                    <td className="p-4 text-charcoal-500">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Active'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminUsers;
