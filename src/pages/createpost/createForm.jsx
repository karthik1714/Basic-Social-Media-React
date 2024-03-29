import React from 'react'
import * as yup from 'yup';
import {useForm} from "react-hook-form";
import{yupResolver} from "@hookform/resolvers/yup"
import {addDoc , collection} from 'firebase/firestore'
import{db , auth} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom';



const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title : yup.string().required('You must enter title'),
    description : yup.string().required('You must enter description')
  })

  const {register , handleSubmit, formState:{errors}}=useForm({
    resolver:yupResolver(schema)
  });

  const postsRef = collection(db ,"posts")

  const onCreatepost = async(data)=> {
    await addDoc(postsRef,{
      title : data?.title,
      description: data?.description,
      username: user?.displayName,
      userId:user?.uid,

})
navigate('/')
  }


  return (
      <form onSubmit={handleSubmit(onCreatepost)}>
      <input placeholder='title' {...register('title')}/>
      <p style={{color:'red'}}>{errors.title?.message}</p>
      <textarea placeholder='description'{...register('description')}/>
      <p style={{color:'red'}} >{errors.description?.message}</p>
      <input className='submitbtnform'type="submit" />
      </form>
  )
}

export default CreateForm
