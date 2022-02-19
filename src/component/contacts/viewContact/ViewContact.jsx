import React,{useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactServices } from '../../../services/ContactServices';
import Sppiner from '../../Sppiner';

export default function ViewContact() {

    let {contactId}=useParams()

    let [state,setstate]=useState({
        loading:false,
        contacts:[],
        errorMessage:"",
        group:{}
    })

    useEffect(async()=>{
        try{
            setstate({...state,loading:true})
            let response=await ContactServices.getcontact(contactId)
            let groupResponse=await ContactServices.getGroup(response.data)
  setstate({
      ...state,
      loading:false,
      contacts:response.data,
      group:groupResponse.data
  })
        }
        catch(error){
  
        }
      },[contactId])

      let {loading,contacts,errorMessage,group}=state
  return <div>
      <pre>{JSON.stringify(group)}</pre>
      <section className='view-contact-intro p-3'>
       <div className="container">
           <div className="row">
               <div className="col">
                   <p className='h3 text-warning fw-bold'>View Contact</p>
                   <p className='fst-italic'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda ipsam incidunt earum ex ipsum eum culpa laborum.</p>

               </div>
           </div>
       </div>
      </section>
      {
          loading?<Sppiner/>:<React.Fragment>
              {
                  Object.keys(contacts).length>0 && Object.keys(group).length>0&&
                  <section className='view-contact'>
          <div className="container">
              <div className="row">
                  <div className="col-md-4">
                  <img src={contacts.photo} alt="" className=' contact-image' />
                  </div>
                  <div className="col-md-8">
                  <ul className='list-group'>
                           <li className='list-group-item list-group-item-action'>
                              Name:    <span>{contacts.name}</span>
                           </li>
                           <li className='list-group-item list-group-item-action'>
                              Mobile:   <span>{contacts.mobile}</span>
                           </li>
                           <li className='list-group-item list-group-item-action'>
                              Email:   <span>{contacts.email}</span>
                           </li>
                           <li className='list-group-item list-group-item-action'>
                              Company:  <span>{contacts.company}</span>
                           </li>
                           <li className='list-group-item list-group-item-action'>
                              Title:   <span>{contacts.title}</span>
                           </li>
                           <li className='list-group-item list-group-item-action'>
                              Group:   <span>{group.name}</span>
                           </li>
                                      </ul>
                  </div>
              </div>
              <div className="row">
                  <div className="col">
                      <Link to={'/contact/list'} className='btn btn-sm btn-warning'>Back</Link>
                  </div>
              </div>
          </div>
                </section>
              }
          </React.Fragment>
      }

      
  </div>
}
