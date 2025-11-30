import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Form from '../components/Form';
import { studentsAPI } from '../utils/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentsAPI.getAll();
      setStudents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Error loading students');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        await studentsAPI.delete(id);
        setStudents(students.filter(s => s.id !== id));
        alert('Student deleted successfully');
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student');
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await studentsAPI.update(editingStudent.id, formData);
        alert('Student updated successfully');
      } else {
        await studentsAPI.create(formData);
        alert('Student created successfully');
      }
      setShowModal(false);
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Error saving student');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
  ];

  const formFields = [
    { name: 'name', label: 'Name', required: true, value: editingStudent?.name },
    { name: 'email', label: 'Email', type: 'email', required: true, value: editingStudent?.email },
    { name: 'phone', label: 'Phone', type: 'tel', value: editingStudent?.phone },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        <Button variant="primary" onClick={handleAdd}>
          <Plus size={20} className="inline mr-2" />
          Add Student
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          data={students}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
      >
        <Form
          fields={formFields}
          onSubmit={handleSubmit}
          submitLabel={editingStudent ? 'Update' : 'Create'}
        />
      </Modal>
    </div>
  );
}
