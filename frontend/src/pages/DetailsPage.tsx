import React, { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react'
import type { NoteTy } from './types'
import { Link, useNavigate, useParams } from 'react-router'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'

const DetailsPage = () => {
    const [noteDeatails, setNoteDetails] = useState({ content: "", title: "", id: "" })
    const [loading, setLoading] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)
    const navigate = useNavigate();
    const { id } = useParams()
    const fetchNoteDetails = async () => {
        try {
            const response = await axiosInstance.get(`/notes/${id}`)
            if (response.status === 200) {
                setNoteDetails({ content: response.data.content, title: response.data.title, id: response.data._id })
            } else {
                toast.error("Error while fetching note details")
            }

        } catch (error: any) {
            toast.error("Error while fetching note details")
            navigate("/")

        } finally {
            setLoading(false)

        }
    }
    useEffect(() => {
        if (id) {
            fetchNoteDetails()
        }
    }, [])

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return
        try {
            const response = await axiosInstance.delete(`notes/${noteDeatails.id}`)
            if (response.status === 200) {
                toast.success("Note deleted successfully")
                navigate("/")
            }
        } catch (error: any) {
            toast.error("error while deleting note")
        }
    }


    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!noteDeatails.title || !noteDeatails.content) {
            toast.error("All fields are required")
            return
        }
        setSaving(true)
        const reqBody = {
            content: noteDeatails.content,
            title: noteDeatails.title,
        };
        try {
            const response = await axiosInstance.put(`/notes/${noteDeatails.id}`, reqBody)
            if (response.status === 200) {
                toast.success("Note update successfully")
                navigate("/")
            }
        } catch (error: any) {
            toast.error("error while updating note")
        }
        finally {
            setSaving(false)
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setNoteDetails(prev => ({ ...prev, [name as keyof NoteTy]: value }))

    }

    return (

        <div className='min-h-screen bg-base-200 flex justify-center'>

            {loading ? <div className='container max-w-[100%] flex justify-center items-center mx-auto px-4 py-8 max-h-screen'>
                <LoaderIcon className="animate-spin size-10" />
            </div> :
                <div className='container mx-auto px-4 py-8'>
                    <div className='max-w-2xl mx-auto'>
                        <div className='flex items-center justify-between mb-6'>
                            <Link to="/" className="btn btn-ghost">
                                <ArrowLeftIcon className='h-5 w-5' />
                                Back to Notes
                            </Link>
                            <button onClick={handleDelete} className='btn btn-error btn-outline'>
                                <Trash2Icon className='h-5 w-5' />
                                <span>Delete note</span>
                            </button>
                        </div>
                        <form className="card bg-base-100" onSubmit={handleSubmit}>
                            <div className='card-body'>
                                <div className='form-control mb-4'>
                                    <label htmlFor='title' className='label'>
                                        <span>Title</span>
                                    </label>
                                    <input name="title" type="text" placeholder='Note title' className='input input-bordered' value={noteDeatails?.title} onChange={handleChange} />
                                    <label className='label'>
                                        <span className='label-text'>
                                            Content</span>
                                    </label>
                                    <textarea name="content" onChange={handleChange} placeholder='Write your note here' className='input input-bordered h-32' value={noteDeatails?.content} />
                                </div>
                                <div className='card-actions flex justify-end items-center'>
                                    <button className='btn btn-primary' disabled={saving} type='submit'>{saving ? "Saving..." : "Save"}</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            }
        </div>

    )
}

export default DetailsPage