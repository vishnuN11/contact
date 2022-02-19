import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContactServices } from '../../../services/ContactServices';

export default function AddContact() {
    let navigate=useNavigate()
    let [state,setstate]=useState({
        loading:false,
        contact:{
            name:'',
            photo:'',
            mobile:'',
            email:'',
            company:'',
            title:'',
            groupId:''
        },
        group:[],
        errorMessage:''
    })

    let updateInput=(e)=>{
setstate({
    ...state,
    contact:{
        ...state.contact,
        [e.target.name]:e.target.value
    }
})
    }

    useEffect(async()=>{
   try{
         setstate({...state,loading:true})
         let response=await ContactServices.getGroup()
         setstate({
             ...state,
             loading:false,
             group:response.data
         })
   }
   catch(error){

   }
    },[])

    let submitForm=async(e)=>{
        e.preventDefault()
        try{
let response= await ContactServices.createContact(state.contact)
if(response){
    navigate('/contact/list',{replace:true})
}
        }
        catch(error){
            setstate({...state,errorMessage:error})
            navigate('/contact/add',{replace:false})
        }
    }
    let {loading,contact,errorMessage,group}=state
  return <div>
      <pre>{JSON.stringify(contact)}</pre>
      <section className='add-contact p-3'>
          <div className="container">
              <div className="row">
                  <div className="col">
                      <p className='fw-bold text-success'>Create Contact</p>
                      <p className='fst-italic '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium temporibus magnam, blanditiis consequatur quibusdam exercitationem in odit!</p>

                  </div>
              </div>
              <div className="row">
                  <div className="col-md-4">
                      <form onSubmit={submitForm}>
                          <div className="mb-2">
                              <input name='name' value={contact.name} onChange={updateInput} required={true}
                              type="text" className='form-control' placeholder='Name' />
                          </div>
                          <div className="mb-2">
                              <input name='photo' value={contact.photo} onChange={updateInput} required={true}
                              type="text" className='form-control' placeholder='Photo Url' />
                          </div>
                          <div className="mb-2">
                              <input name='mobile' value={contact.mobile} onChange={updateInput} required={true}
                              type="text" className='form-control' placeholder='Mobile' />
                          </div>
                          <div className="mb-2">
                              <input name='email' value={contact.email} onChange={updateInput} required={true}
                              type="email" className='form-control' placeholder='email' />
                          </div>
                          <div className="mb-2">
                              <input name='company' value={contact.company} onChange={updateInput} required={true}
                              type="text" className='form-control' placeholder='Company' />
                          </div>
                          <div className="mb-2">
                              <input name='title' value={contact.title} onChange={updateInput} required={true}
                              type="text" className='form-control' placeholder='Title' />
                          </div>
                          <div className="mb-2">
                             <select name='groupId' value={contact.groupId} onChange={updateInput} required={true}
                             className='form-control'>
                               <option value="">Select a Group</option>
                               {
                                   group.length>0&&
                                   group.map((item)=>{
                                       return(
                                           <option key={item.id} value={item.id}>{item.name}</option>
                                       )
                                   })
                               }
                             </select>
                             <div className="mb-2 mt-2">
                              <input type="submit" className='btn btn-sm btn btn-success ms-2' value='Create' />
                              <Link to={'/contact/list'} className='btn btn-sm btn-dark ms-2'>Cancel</Link>
                          </div>
                         
                          </div>
                      </form>
                  </div>
              </div>
          </div>

      </section>
  </div>;
}
