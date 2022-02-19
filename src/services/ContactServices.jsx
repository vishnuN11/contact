import axios from 'axios'

export class ContactServices{

    static getGroup(){
        let dataurl='  http://localhost:9000/groups'
        return axios.get(dataurl)
    }
    static getgroup(contact){
let groupId=contact.groupId
let dataurl=`http://localhost:9000/groups/${groupId}`
return axios.get(dataurl)
    }
    static getAllcontacts(){
        let dataUrl=' http://localhost:9000/contacts'
        return axios.get(dataUrl)
    }

    static getcontact(contactId){
        let dataurl=`http://localhost:9000/contacts/${contactId}`
        return axios.get(dataurl)
    }

    static createContact(contact){
        let dataurl=' http://localhost:9000/contacts'
        return axios.post(dataurl,contact)
    }

    static updateContact(contact,contactId){
        let dataurl=`http://localhost:9000/contacts/${contactId}`
        return axios.put(dataurl,contact)
    }

    static deleteContact(contactId){
        let dataurl=`http://localhost:9000/contacts/${contactId}`

        return axios.delete(dataurl)
    }
}