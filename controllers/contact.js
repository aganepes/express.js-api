const Contact= require('../models/contactSchema')

//@ desc    Get All contacts
//@ route  /api/contact
//@ access private
const getContacts=async (req,res)=>{
    const contacts= await Contact.find({user_id:req.user.id})
    res.header({'x-powered-by':'Aganepes Ahmedow'})
    res.status(200).json(contacts)
}

//@ desc    Post contact
//@ route  /api/contact
//@ access private
const postContact=async (req,res)=>{
    const {name,phone,email}=req.body
    if(!name||!phone||!email){
        res.status(404)
        throw new Error("Pease, name email and phone to writing");
    }
    const contact=await Contact.create({user_id:req.user.id,name,phone,email})
    res.header({'x-powered-by':'Aganepes Ahmedow'})
    res.status(201).json(contact)
}

//@ desc    Get contact
//@ route  /api/contact/:id
//@ access private
const getContact=async (req,res)=>{
    const contact =await Contact.findById(req.params.id)
    if(!contact&&req.user.id==contact.user_id){
        res.status(404)
        throw new Error(`Not found for ${req.params.id}`);
    }
    res.header({'x-powered-by':'Aganepes Ahmedow'})
    res.status(200).json(contact)
}

//@ desc    Update contact
//@ route  /api/contact/:id
//@ access private
const updateContact=async (req,res)=>{
    const contact = await Contact.findByIdAndUpdate(req.params.id,req.body)
    if(!contact&&req.user.id==contact.user_id){
        res.status(404)
        throw new Error('Not Found contact and not update')
    }
    res.header({'x-powered-by':'Aganepes Ahmedow'})
    res.status(200).json(contact)
}

//@ desc    Delete contact
//@ route  /api/contact/:id
//@ access private
const deleteContact=async(req,res)=>{
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if(!contact&&req.user.id==contact.user_id){
        res.status(404)
        throw new Error('Not found contact and not delete')
    }
    res.header({'x-powered-by':'Aganepes Ahmedow'})
    res.status(200).json(contact)
}


module.exports ={getContacts,postContact,getContact,updateContact,deleteContact}