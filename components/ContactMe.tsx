import React from 'react'
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    name: string
    email: string
    subject: string
    message: string
}

type Props = {}

function ContactMe({ }: Props) {
    const { register, handleSubmit } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        window.location.href = `mailto:sofiane.92izii@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} [${formData.email}]`
    }

    return (
        <div className='h-screen flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
            <div className='flex flex-col space-y-10'>
                <h4 className='text-4xl font-semibold text-center'>I have got just what you need.{' '}
                    <span className='decoration-[#F7AB0A]/50 underline'>Let&#39;s Talk.</span>
                </h4>
                <div className='space-y-10'>
                    <div className='flex items-center space-x-5 justify-center'>
                        <PhoneIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse' />
                        <p className='text-2xl'>+213553578329</p>
                    </div>
                    <div className='flex items-center space-x-5 justify-center'>
                        <EnvelopeIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse' />
                        <p className='text-2xl'>sofiane.92izii@gmail.com</p>
                    </div>
                    <div className='flex items-center space-x-5 justify-center'>
                        <MapPinIcon className='text-[#F7AB0A] h-7 w-7 animate-pulse' />
                        <p className='text-2xl'>Constantine, Algeria</p>
                    </div>
                </div>
                <form className='flex flex-col space-y-2 w-fit mx-auto' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex space-x-2'>
                        <input {...register('name')} type='text' className='contactInput' placeholder='Name' />
                        <input {...register('email')} type='text' className='contactInput' placeholder='Email' />
                    </div>
                    <input {...register('subject')} type='text' className='contactInput' placeholder='Subject' />
                    <textarea {...register('message')} className='contactInput' placeholder='Message' />
                    <button className='bg-[#F7AB0A] py-5 px-10 rounded-md text-black font-bold text-lg' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ContactMe