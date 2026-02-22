import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedCom from '../components/RateLimitedCom'
import toast from 'react-hot-toast';
import type { NoteTy } from './types';
import NoteCard from '../components/NoteCard';
import axiosInstance from '../lib/axios';
import NoteNotFound from '../components/NoteNotFound';

const Home = () => {
    ``
    const [isRateLimit, setIsRateLimit] = useState<boolean>(false);
    const [notes, setNotes] = useState<NoteTy[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axiosInstance.get("/notes");
                console.log(res.data)
                setNotes(res.data)
                setIsRateLimit(false)

            } catch (error: any) {
                console.log("error fetching notes")
                if (error.response.status === 429) {
                    setIsRateLimit(true)
                } else {
                    toast.error("Failed to load notes")
                }
            }
            finally {
                setLoading(false)
            }
        }
        fetchNotes()
    }, [])
    return (
        <div className='min-h-screen'>
            <Navbar />
            {isRateLimit && <RateLimitedCom />}
            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>Loading....</div>}
                {notes.length > 0 ? !isRateLimit && <div className='grid grid-cols-3 md-grid-cols-2 lg-grid-cols-3 gap-6'>
                    {notes.map((note) => (
                        <NoteCard setNotes={setNotes} noteDetails={note} />
                    ))}
                </div> :
                    <NoteNotFound />
                }
            </div>
        </div>
    )
}

export default Home