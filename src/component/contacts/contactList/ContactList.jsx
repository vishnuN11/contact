import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactServices } from '../../../services/ContactServices';
import Sppiner from '../../Sppiner';

export default function ContactList() {
    let [query,setquery]=useState({
        text:''
    })
    let [state,setstate]=useState({
        loading:false,
        contacts:[],
        filtercontacts:[],
        errorMessage:""
    })

    let searchContact=(e)=>{
        setquery({...query,text:e.target.value})
        let thecontact=state.contacts.filter(contact=>{
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setstate({
            ...state,
            filtercontacts:thecontact
        })
    }
    useEffect(async()=>{
      try{
          setstate({...state,loading:true})
let response=await ContactServices.getAllcontacts();
setstate({
    ...state,
    loading:false,
    contacts:response.data,
    filtercontacts:response.data
})
      }
      catch(error){

      }
    },[])

    let clickDelete=async(contactId)=>{
        try{
let response=await ContactServices.deleteContact(contactId)
if(response){
    setstate({
        ...state,
        loading:false,
        contacts:response.data,
        filtercontacts:response.data
    })
}
        }
        catch(error){
            setstate({
                ...state,
                loading:false,
               errorMessage:error
            })
        }
    }

    let {loading,contacts,filtercontacts}=state
  return <div>
      
      <section className='contact-search p-3'>
<div className="container">
    <div className="grid">
        <div className="row">
            <div className="col">
                <p>Contact Manager
                <Link to={'/contact/add'} className='btn btn-primary btn-sm ms-2'>New</Link>
                
                </p>
                <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea deserunt minus amet accusantium dolor? Nemo, omnis officia atque maiores ipsam qui.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <form className='row'>
                  <div className="col">
                  <div className='mb-2'>
                        <input name='text' value={query.text} onChange={searchContact}
                        type="text" className='form-control' placeholder='Search Name' />

                    </div>
                  </div>
                   <div className="col">
                   <div className='mb-2'>
                        <input type="submit" className=' btn btn-outline-dark'value="Search" />

                    </div>
                   </div>
                </form>
            </div>
        </div>
    </div>
</div>
      </section>
      {
          loading ? <Sppiner/>: <section className='contact-list'>
          <div className="container">
              <div className="row">
                  {
                      filtercontacts.length>0 && 
                      filtercontacts.map((contact)=>{
                          return(
                              
<div className="col-md-6" key={contact.id}>
                      <div className="card">
                          <div className="card-body">
                             <div className="row align-items-center d-flex justify-content-around">
                             <div className="col-md-4">
                                  <img src={contact.photo}alt="" className=' contact-image' />
                              </div>
                              <div className="col-md-7">
                                      <ul className='list-group'>
                           <li className='list-group-item list-group-item-action'>
                              Name:<span>{contact.name}</span>
                           </li>
                           <li className='list-group-item list-group-item-action'>
                              Mobile:<span>{contact.mobile}</span>
                           </li>
                           <li className='list-group-item list-group-item-action'>
                              Email:<span>{contact.email}</span>
                           </li>
                                      </ul>
                                  </div>
                                  <div className="col-md-1 d-flex flex-column align-items-center">
                                      <Link to={`/contact/view/${contact.id}`} className='btn btn-sm btn-warning my-1'>
                                         View <i className='fa fa-eye'/>
                                      </Link>
                                      <Link to={`/contact/edit/${contact.id}`} className='btn btn-sm btn-primary my-1'>
                                         Edit <i className='fa fa-pen'/>
                                      </Link>
                                      <button onClick={()=>clickDelete(contact.id)}
                                      className='btn btn-danger btn-sm'>
                                         Del <i className='fa fa-trash'/>
                                      </button>
                                  </div>
                             </div>
                          </div>
                      </div>
                  </div>

                                
                          )
                      })
                  }
                  
              </div>
          </div>
                </section>
      }

     
  </div>;
}
