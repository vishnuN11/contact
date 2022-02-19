
import './App.css';
import axios from "axios"
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import Navbar from './component/navbar/Navbar';
import ContactList from './component/contacts/contactList/ContactList';
import AddContact from './component/contacts/addContact/AddContact';
import ViewContact from './component/contacts/viewContact/ViewContact';
import EditContact from './component/contacts/editContact/EditContact';

function App() {

  
  return (
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path={'/'} element={<Navigate to={'/contact/list'}/>} ></Route>
    <Route path={'/contact/list'} element={<ContactList/>} ></Route>
    <Route path={'/contact/add'} element={<AddContact/>} ></Route>
    <Route path={'/contact/view/:contactId'} element={<ViewContact/>} ></Route>
    <Route path={'/contact/edit/:contactId'} element={<EditContact/>} ></Route>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
