
import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import Header from './components/common/Header/Header'
import Table from './components/common/Table/Table'
import AddUser from './components/modals/AddUser'
import UpdateUser from './components/modals/UpdateUser'
import Posts from './components/pages/Posts/Posts'

const userData = [
  {id:1, name:'Shani', title: 'Web Developer', email: 'shani@hamil.com', role: 'admin'},
  {id:2, name:'Sherry', title: 'Web Developer', email: 'sherry@hamil.com', role: 'manager'},
  {id:3, name:'Shah', title: 'designer', email: 'shah@hamil.com', role: 'designer'},
  {id:4, name:'mani', title: 'full stack', email: 'mani@hamil.com', role: 'admin'},
]
function App() {
  const [date, setData] = useState(userData)
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [updateFields, setUpdateFields] = useState({})
  const [updatedField, setUpdatedField] = useState({})


  const showModal = () => {
    setOpen((open)=> open ? false : true)
  }
  const showModalUpdate = () => {
    setOpenUpdate((open)=> open ? false : true)
  }
  function handleAddUser (data) {
    setData((prevData)=> [...prevData, data])
    setOpen(false)

  }
  const handleUpdate = (id) => {
    setUpdatedField(userData.find((item) => item.id === id ))
    setOpenUpdate(true);
}
useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    // Handle the successful response
    setData(response.data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error fetching data:', error);
  });
}, [])



  return (
    <>
      <Header/>
      {/* Simple CRUD */}
      <Table userData={date} setData={setData} showModal={showModal} handleUpdate={handleUpdate}/>
      <AddUser open={open} setOpen={setOpen} showModal={showModal} handleAddUser={handleAddUser}/>
      <UpdateUser openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} showModalUpdate={showModalUpdate} updatedField={updatedField}/>

      {/* CRUD With API's */}
      {/* <Posts userData={date} setData={setData}/> */}
    </>
  )
}

export default App
