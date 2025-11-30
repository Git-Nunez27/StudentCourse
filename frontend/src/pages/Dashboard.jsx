import { useEffect, useState } from 'react';
import { Users, BookOpen, UserCheck, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import { studentsAPI, coursesAPI, enrollmentsAPI } from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, coursesRes, enrollmentsRes] = await Promise.all([
          studentsAPI.getAll(),
          coursesAPI.getAll(),
          enrollmentsAPI.getAll(),
        ]);

        setStats({
          students: studentsRes.data.data?.length || 0,
          courses: coursesRes.data.data?.length || 0,
          enrollments: enrollmentsRes.data.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <Card className="flex items-center space-x-4">
      <div className={`p-4 rounded-lg ${color}`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </Card>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={Users}
          label="Total Students"
          value={stats.students}
          color="bg-blue-500"
        />
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={stats.courses}
          color="bg-green-500"
        />
        <StatCard
          icon={UserCheck}
          label="Total Enrollments"
          value={stats.enrollments}
          color="bg-amber-500"
        />
      </div>

      {/* Welcome Section */}
      <Card title="Welcome to Student Course Management" className="mb-8">
        <div className="space-y-4">
          <p className="text-gray-600">
            Manage your students, courses, and enrollments efficiently with our modern platform.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.students}</div>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.courses}</div>
              <p className="text-gray-600">Courses</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.enrollments}</div>
              <p className="text-gray-600">Enrollments</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <Card title="Quick Stats">
        <div className="space-y-2 text-sm text-gray-600">
          <p>✓ Active students: {stats.students}</p>
          <p>✓ Available courses: {stats.courses}</p>
          <p>✓ Active enrollments: {stats.enrollments}</p>
        </div>
      </Card>
    </div>
  );
}
