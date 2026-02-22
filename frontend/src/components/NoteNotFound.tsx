import { NotebookIcon } from 'lucide-react'
import React, { memo } from 'react'
import { Link } from 'react-router'

const NoteNotFound = () => {
    return (
        <div className='flex items-center flex-col justify-between py-16 space-y-6 max-w-md  mx-auto text-center'>
            <div className='bg-primary/10 rounded-full p-8'>
                <NotebookIcon className='size-10 text-primary' />
            </div>
            <h3 className='text-2xl font-bond'>No notes yet</h3>
            <p className='text-base-content/70'>
                Ready to organize your thoughts? Create your first note to get started on your journey.
            </p>
            <Link to="/note-create" className="btn btn-primary">
                Create Your First Note
            </Link>
        </div>
    )
}

export default memo(NoteNotFound)