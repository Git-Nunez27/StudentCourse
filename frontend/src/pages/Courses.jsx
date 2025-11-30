import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Form from '../components/Form';
import { coursesAPI } from '../utils/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await coursesAPI.getAll();
      setCourses(response.data.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Error loading courses');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCourse(null);
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await coursesAPI.delete(id);
        setCourses(courses.filter(c => c.id !== id));
        alert('Course deleted successfully');
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Error deleting course');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingCourse) {
        await coursesAPI.update(editingCourse.id, formData);
        alert('Course updated successfully');
      } else {
        await coursesAPI.create(formData);
        alert('Course created successfully');
      }
      setShowModal(false);
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error saving course');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Course Name' },
    { key: 'description', label: 'Description' },
  ];

  const formFields = [
    { name: 'code', label: 'Course Code', required: true, value: editingCourse?.code },
    { name: 'name', label: 'Course Name', required: true, value: editingCourse?.name },
    { name: 'description', label: 'Description', type: 'textarea', value: editingCourse?.description },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <Button variant="secondary" onClick={handleAdd}>
          <Plus size={20} className="inline mr-2" />
          Add Course
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={courses}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingCourse ? 'Edit Course' : 'Add New Course'}
      >
        <Form
          fields={formFields}
          onSubmit={handleSubmit}
          submitLabel={editingCourse ? 'Update' : 'Create'}
        />
      </Modal>
    </div>
  );
}
