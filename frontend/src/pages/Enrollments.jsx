import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Form from '../components/Form';
import { enrollmentsAPI, studentsAPI, coursesAPI } from '../utils/api';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEnrollment, setEditingEnrollment] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enrollmentsRes, studentsRes, coursesRes] = await Promise.all([
        enrollmentsAPI.getAll(),
        studentsAPI.getAll(),
        coursesAPI.getAll(),
      ]);
      setEnrollments(enrollmentsRes.data.data || []);
      setStudents(studentsRes.data.data || []);
      setCourses(coursesRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingEnrollment(null);
    setShowModal(true);
  };

  const handleEdit = (enrollment) => {
    setEditingEnrollment(enrollment);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      try {
        await enrollmentsAPI.delete(id);
        setEnrollments(enrollments.filter(e => e.id !== id));
        alert('Enrollment deleted successfully');
      } catch (error) {
        console.error('Error deleting enrollment:', error);
        alert('Error deleting enrollment');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingEnrollment) {
        await enrollmentsAPI.update(editingEnrollment.id, formData);
        alert('Enrollment updated successfully');
      } else {
        await enrollmentsAPI.create(formData);
        alert('Enrollment created successfully');
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error('Error saving enrollment:', error);
      alert('Error saving enrollment');
    }
  };

  const getStudentName = (studentId) => {
    return students.find(s => s.id === studentId)?.name || 'N/A';
  };

  const getCourseName = (courseId) => {
    return courses.find(c => c.id === courseId)?.name || 'N/A';
  };

  const columns = [
    { key: 'id', label: 'ID' },
    {
      key: 'student_id',
      label: 'Student',
      render: (value) => getStudentName(value)
    },
    {
      key: 'course_id',
      label: 'Course',
      render: (value) => getCourseName(value)
    },
    { key: 'enrollment_date', label: 'Enrollment Date' },
  ];

  const formFields = [
    {
      name: 'student_id',
      label: 'Student',
      type: 'select',
      value: editingEnrollment?.student_id
    },
    {
      name: 'course_id',
      label: 'Course',
      type: 'select',
      value: editingEnrollment?.course_id
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Enrollments</h1>
        <Button variant="secondary" onClick={handleAdd}>
          <Plus size={20} className="inline mr-2" />
          Add Enrollment
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={enrollments}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingEnrollment ? 'Edit Enrollment' : 'Add New Enrollment'}
      >
        <Form
          fields={formFields}
          onSubmit={handleSubmit}
          submitLabel={editingEnrollment ? 'Update' : 'Create'}
        />
      </Modal>
    </div>
  );
}
