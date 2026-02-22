import { ArrowLeftIcon } from 'lucide-react';
import React, { useState, type ChangeEvent, type SubmitEvent } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import axiosInstance from '../lib/axios';

function CreatePage() {
    const [formdata, setFormData] = useState({ title: "", content: "" });
    const [isloading, setIsloading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const submitData = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formdata.title || !formdata.content) {
            toast.error("All fields are required")
            return
        }
        const reqBody = {
            title: formdata.title,
            content: formdata.content
        }

        setIsloading(true)

        try {
            const response = await axiosInstance.post("/notes", reqBody)
            if (response.status === 201) {
                toast.success("Note cretaed successfully")
                navigate("/")
            }

        } catch (error: any) {
            toast.success("Error creating note", error);
            if (error.response.status === 429) {
                toast.error("Slow down! you're creating notes too fast", {
                    duration: 4000, icon: "💀"
                })
            } else {
                toast.error("Failed to create note");
            }

        } finally {
            setIsloading(false)
        }


    }


    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto'>
                    <Link to="/" className='btn btn-ghost mb-6'>
                        <ArrowLeftIcon className='size-6' />
                        Back to Notes
                    </Link>
                    <div className='card bg-base-1000'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
                            <form onSubmit={submitData}>
                                <div className='form-control mb-4'>
                                    <label htmlFor='title' className='label'>
                                        <span className='label-text'>
                                            Title</span>
                                    </label>
                                    <input onChange={handleChange} id="titlr" type='text' placeholder='Note Title' className='input input-bordered' value={formdata.title} name="title" />
                                    <label className='label'>
                                        <span className='label-text'>
                                            Content</span>
                                    </label>
                                    <textarea onChange={handleChange} placeholder='Write your note here' className='input input-bordered h-32' value={formdata.content} name="content" />
                                </div>
                                <div className='card-actions justify-end'>
                                    <button type='submit' className='btn btn-primary' disabled={isloading}>
                                        {isloading ? "Loading..." : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage