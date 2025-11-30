# 🎨 Frontend Setup Guide - Student Course Management UI

## ✨ Complete React + Tailwind CSS UI Created!

### 📁 Project Structure

```
StudentCourse/
├── frontend/                    # ← NEW: Frontend directory
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx       # Navigation, footer
│   │   │   ├── Card.jsx         # Reusable card
│   │   │   ├── Button.jsx       # Reusable button
│   │   │   ├── Table.jsx        # Data table
│   │   │   ├── Modal.jsx        # Modal dialogs
│   │   │   └── Form.jsx         # Forms
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # Home page with stats
│   │   │   ├── Students.jsx     # Student management
│   │   │   ├── Courses.jsx      # Course management
│   │   │   └── Enrollments.jsx  # Enrollment management
│   │   ├── utils/
│   │   │   └── api.js           # API client
│   │   ├── App.jsx              # Main app
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
└── ... (existing backend files)
```

---

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd D:\StudentCourse\frontend
npm install
```

This installs:
- React 18.2
- Vite 5
- Tailwind CSS 3.3
- React Router 6
- Axios
- Lucide Icons

### Step 2: Setup Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env if needed (default should work)
VITE_API_URL=http://localhost:3000/api
```

### Step 3: Start Development Server

**Terminal 1 - Backend:**
```bash
cd D:\StudentCourse
npm start
```

**Terminal 2 - Frontend:**
```bash
cd D:\StudentCourse\frontend
npm run dev
```

### Step 4: Open in Browser

- Frontend: http://localhost:5173 ✨
- Backend: http://localhost:3000
- API: http://localhost:3000/api

---

## 📖 Features

### 🏠 Dashboard
- **Statistics Cards** showing:
  - Total Students
  - Total Courses
  - Total Enrollments
- Real-time data from backend
- Welcome section
- Quick stats overview

### 👥 Students Page
- **List all students** with table
- **Add new student** - modal form
- **Edit student** - inline editing
- **Delete student** - with confirmation
- **Search** functionality

### 📚 Courses Page
- **List all courses** with table
- **Add new course** - modal form
- **Edit course** - inline editing
- **Delete course** - with confirmation
- Course code and description display

### 📝 Enrollments Page
- **List all enrollments** with table
- **Add new enrollment** - student + course selection
- **Edit enrollment** - modify existing
- **Delete enrollment** - with confirmation
- Student and course name lookup

---

## 🎨 UI Components

### Card Component
```jsx
<Card title="My Title">
  <p>Content here</p>
</Card>
```

### Button Component
```jsx
<Button variant="primary" size="md" onClick={handler}>
  Click Me
</Button>
```

**Variants:** primary, secondary, danger, outline
**Sizes:** sm, md, lg

### Table Component
```jsx
<Table
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ]}
  data={studentData}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### Modal Component
```jsx
<Modal isOpen={open} onClose={closeHandler} title="My Modal">
  {content}
</Modal>
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

---

## 🔌 API Integration

All backend endpoints automatically integrated:

### Students API
- `GET /api/students` - List all
- `GET /api/students/:id` - Get one
- `POST /api/students` - Create
- `PUT /api/students/:id` - Update
- `DELETE /api/students/:id` - Delete
- `GET /api/students/search/:name` - Search

### Courses API
- `GET /api/courses` - List all
- `GET /api/courses/:id` - Get one
- `POST /api/courses` - Create
- `PUT /api/courses/:id` - Update
- `DELETE /api/courses/:id` - Delete

### Enrollments API
- `GET /api/enrollments` - List all
- `GET /api/enrollments/:id` - Get one
- `POST /api/enrollments` - Create
- `PUT /api/enrollments/:id` - Update
- `DELETE /api/enrollments/:id` - Delete

---

## 🎨 Styling

### Tailwind CSS Included
- Responsive design
- Mobile-first approach
- Dark mode ready
- Custom utilities

### Custom Classes
```css
.btn-primary      /* Primary button */
.btn-secondary    /* Secondary button */
.btn-danger       /* Danger button */
.card             /* Card container */
.input-field      /* Input styling */
.container        /* Max-width container */
```

---

## 📱 Responsive Design

- ✅ Mobile (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)
- ✅ Large screens

Navigation automatically collapses on mobile with hamburger menu.

---

## 🚀 Build for Production

```bash
npm run build
```

Creates optimized `dist/` folder ready for deployment.

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag & drop dist/ to Netlify or use CLI
```

### Deploy to GitHub Pages
```bash
npm install --save-dev gh-pages
# Update package.json homepage
npm run build
npm run deploy
```

---

## 🔄 Development Workflow

### Hot Module Replacement (HMR)
- Save file → instant reload
- No need to refresh browser
- State is preserved

### CSS Hot Updates
- Tailwind CSS changes live
- No page reload needed

### Fast Refresh
- React component changes reflect instantly
- Component state preserved

---

## 🆘 Troubleshooting

### Port 5173 Already in Use
```bash
# Use different port
npm run dev -- --port 5174
```

### API Connection Errors
```bash
# Check backend is running
http://localhost:3000/health

# Update .env
VITE_API_URL=http://localhost:3000/api
```

### Styling Not Showing
```bash
# Clear cache
rm -rf node_modules
npm install

# Rebuild
npm run dev
```

### Module Not Found
```bash
# Reinstall dependencies
rm package-lock.json
npm install
```

---

## 📚 Project Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🎯 Next Steps

1. ✅ Install frontend: `npm install`
2. ✅ Start backend: `npm start` (in root)
3. ✅ Start frontend: `npm run dev` (in frontend)
4. ✅ Open http://localhost:5173
5. ✅ Test all pages and features

---

## 📖 File Descriptions

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite build configuration |
| `tailwind.config.js` | Tailwind CSS customization |
| `postcss.config.js` | PostCSS plugins |
| `src/main.jsx` | React app entry point |
| `src/App.jsx` | Main component with routing |
| `src/index.css` | Global styles |
| `src/utils/api.js` | API client with axios |

---

## 🔗 Useful Resources

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind**: https://tailwindcss.com
- **React Router**: https://reactrouter.com
- **Axios**: https://axios-http.com
- **Lucide Icons**: https://lucide.dev

---

## ✨ Features Highlight

✅ Modern React 18 with Hooks
✅ Vite for super-fast builds
✅ Tailwind CSS for beautiful UI
✅ React Router for page navigation
✅ Axios for API calls
✅ Lucide icons for graphics
✅ Responsive mobile design
✅ Reusable components
✅ Full CRUD operations
✅ Real-time data fetching

---

**Ready to build amazing UIs? Start with:** `npm run dev` 🚀

