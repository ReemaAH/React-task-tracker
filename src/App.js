
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5001/tasks')
    const data = await res.json()


    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5001/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    console.log('toggled', id)
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5001/tasks/${id}`, {
      method: 'DELETE',
    })

    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  return (


    <Router>
    <div className="container">
      {showAddTask && <AddTask onAdd={addTask} />}
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask} />
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'}
      <Route path='/about' component={About} />
      <Footer />
    </div>
    
    </Router>
  );
}

export default App;
