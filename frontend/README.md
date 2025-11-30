# Student Course Management Frontend

Modern React + Vite + Tailwind CSS UI for the Student Course Management System.

## 🚀 Features

- ✨ Modern, responsive design with Tailwind CSS
- 📱 Mobile-friendly interface
- 🎯 Dashboard with statistics
- 👨‍🎓 Student management (CRUD operations)
- 📚 Course management (CRUD operations)
- 📝 Enrollment management (CRUD operations)
- 🔄 Real-time API integration
- ⚡ Fast development server with Vite
- 🎨 Reusable UI components

## 📋 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.jsx         # Main layout with navigation
│   │   ├── Card.jsx           # Card component
│   │   ├── Button.jsx         # Button component
│   │   ├── Table.jsx          # Table component
│   │   ├── Modal.jsx          # Modal component
│   │   └── Form.jsx           # Form component
│   ├── pages/
│   │   ├── Dashboard.jsx      # Dashboard page
│   │   ├── Students.jsx       # Students management
│   │   ├── Courses.jsx        # Courses management
│   │   └── Enrollments.jsx    # Enrollments management
│   ├── utils/
│   │   └── api.js             # API client with axios
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .env.example
```

## 🛠️ Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Configure API URL** (if needed)
   Edit `.env`:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

## 🚀 Running

### Development Server
```bash
npm run dev
```
Opens at: http://localhost:5173

### Build for Production
```bash
npm run build
```
Output: `dist/` directory

### Preview Production Build
```bash
npm run preview
```

## 📦 Dependencies

- **react** (18.2.0) - UI library
- **react-dom** (18.2.0) - DOM rendering
- **react-router-dom** (6.20.0) - Routing
- **axios** (1.6.2) - HTTP client
- **lucide-react** (0.292.0) - Icons
- **tailwindcss** (3.3.6) - CSS framework
- **vite** (5.0.8) - Build tool

## 🎨 Components

### Layout
- Navigation bar with responsive menu
- Main content area
- Footer with links

### Card Component
```jsx
<Card title="My Card">
  <p>Content here</p>
</Card>
```

### Button Component
```jsx
<Button variant="primary" size="md">
  Click me
</Button>
```

### Table Component
```jsx
<Table
  columns={[{ key: 'name', label: 'Name' }]}
  data={data}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### Form Component
```jsx
<Form
  fields={[
    { name: 'email', label: 'Email', type: 'email', required: true }
  ]}
  onSubmit={handleSubmit}
/>
```

## 🔌 API Integration

All API calls are centralized in `src/utils/api.js`:

### Students API
```javascript
import { studentsAPI } from './utils/api';

studentsAPI.getAll()
studentsAPI.getById(id)
studentsAPI.create(data)
studentsAPI.update(id, data)
studentsAPI.delete(id)
studentsAPI.search(name)
```

### Courses API
```javascript
import { coursesAPI } from './utils/api';

coursesAPI.getAll()
coursesAPI.getById(id)
coursesAPI.create(data)
coursesAPI.update(id, data)
coursesAPI.delete(id)
```

### Enrollments API
```javascript
import { enrollmentsAPI } from './utils/api';

enrollmentsAPI.getAll()
enrollmentsAPI.getById(id)
enrollmentsAPI.create(data)
enrollmentsAPI.update(id, data)
enrollmentsAPI.delete(id)
enrollmentsAPI.getByStudent(studentId)
enrollmentsAPI.getByCourse(courseId)
```

## 📱 Pages

### Dashboard
- Overview statistics
- Total students, courses, enrollments
- Quick stats

### Students
- View all students
- Add new student
- Edit student information
- Delete student
- Search functionality

### Courses
- View all courses
- Add new course
- Edit course information
- Delete course

### Enrollments
- View all enrollments
- Create new enrollment
- Update enrollment
- Delete enrollment
- Student and course lookup

## 🎨 Styling

Uses Tailwind CSS with custom utility classes:

- `btn-primary` - Primary button style
- `btn-secondary` - Secondary button style
- `btn-danger` - Danger button style
- `card` - Card component style
- `input-field` - Input field style

## 🔧 Configuration

### Vite Config
- React plugin enabled
- Proxy to backend API
- Port 5173 for dev server

### Tailwind Config
- Extended colors (primary, secondary, accent)
- Full responsive utilities

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Environment Variables for Production
```
VITE_API_URL=https://your-api-domain.com/api
```

## 🐛 Troubleshooting

### API Connection Issues
- Check if backend is running on port 3000
- Verify API_URL in `.env`
- Check browser console for errors

### Styling Issues
- Clear browser cache
- Run `npm run build` and check `dist/` output
- Ensure Tailwind is processing CSS files

### Build Issues
- Delete `node_modules/` and `dist/`
- Run `npm install` again
- Check Node.js version (16+)

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## 📝 License

MIT License - See main project README for details

## 👥 Contributing

Contributions welcome! Please follow the main project's contribution guidelines.

---

**Built with ❤️ for Student Course Management**
