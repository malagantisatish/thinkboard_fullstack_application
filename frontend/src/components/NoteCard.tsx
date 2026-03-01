
import React, { type MouseEvent } from 'react'
import type { NoteTy } from '../pages/types'
import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'

export interface NoteCardTy {
    noteDetails: NoteTy
    setNotes: React.Dispatch<React.SetStateAction<NoteTy[]>>
}

const NoteCard = ({ noteDetails, setNotes }: NoteCardTy) => {
    const createdAt = new Date(noteDetails.createdAt);
    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!window.confirm("Are you sure you want to delete this note?")) return

        try {
            const response = await axiosInstance.delete(`/notes/${noteDetails._id}`)
            if (response.status === 200) {
                toast.success("Note deleted successfully")
                setNotes(prev => prev.filter(item => item._id !== noteDetails._id))
            }
        } catch (error: any) {
            toast.success("Something went wrong while deleting")
        }


    }

    return (
        <Link to={`/note-details/${noteDetails._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'>
            <div className='card-body'>
                <h3 className='card-title text-base-content'>
                    {noteDetails.title}
                </h3>
                <p className='text-base-content/70 line-clamp-3'>{noteDetails.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/60'>
                        {createdAt.toLocaleString()}
                    </span>
                    <div className='flex items-center gap-10'>
                        <PenSquareIcon className='size-4' />
                        <button onClick={handleDelete} className='btn btn-goast btn-xs text-error'>
                            <Trash2Icon className='size-4' />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard