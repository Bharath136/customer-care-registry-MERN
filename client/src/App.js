import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Redirect
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import Registration from './components/Registration';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './admin_components/Users';
import AdminProtectedRoute from './admin_components/AdminProtectedRoute';
import Dashboard from './admin_components/Dashoard';
import Complaint from './components/Complaint';
import Agents from './components/Agents';
import Chat from './components/Chat';
import MyComplaints from './components/MyComplaints';
import AgentDashboard from './agent_components/AgentDashboard';
import AgentProtectedRoute from './agent_components/AgentProtectedRoute';
import AgentChat from './agent_components/AgentChat';
import Complaints from './admin_components/Complaints';
import AdminAgents from './admin_components/Agents';
import Customers from './admin_components/Customers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* User routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Registration />} />
          <Route path="/" element={<Home/>} />
          <Route path='/complaint' element={<ProtectedRoute Component={Complaint}/>}/>
          <Route path='/agents' element={<ProtectedRoute Component={Agents}/>}/>
          <Route path='/chat/:id' element={<ProtectedRoute Component={Chat}/>}/>
          <Route path='/my-complaints' element={<ProtectedRoute Component={MyComplaints}/>}/>

          {/* Agent routes */}
          <Route path='/agent/dashboard' element={<AgentProtectedRoute Component={AgentDashboard}/>}/>
          <Route path='/agent/users' element={<AgentProtectedRoute Component={Users}/>}/>
          <Route path='/agent/chat/:id' element={<AgentProtectedRoute Component={AgentChat}/>}/>

          {/* Admin routes */}
          <Route path='/admin/dashboard' element={<AdminProtectedRoute Component={Dashboard}/>}/>
          <Route path='/admin/complaints' element={<AdminProtectedRoute Component={Complaints}/>}/>
          <Route path='/admin/agents' element={<AdminProtectedRoute Component={AdminAgents}/>}/>
          <Route path='/admin/customers' element={<AdminProtectedRoute Component={Customers}/>}/>
          <Route path='/admin/users' element={<AdminProtectedRoute Component={Users}/>}/>
          
          <Route path="/not-found" element={<NotFound />} /> 
          <Route path="*" element={<Navigate to='/not-found' element={<NotFound/>} />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
