import React from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'//
import { NotebookIcon } from 'lucide-react'
import NoteCard from '../components/NoteCard'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
    try {
      //setLoading(true);
      const res = await api.get("/notes");
      console.log(res.data);
      setNotes(res.data);
      setIsRateLimited(false); // Reset rate limit state on successful fetch
    } catch (error) {
      console.error("Error fetching notes:", error);
      console.log(error);
      toast.error("Failed to fetch notes");
      if(error.response && error.response.status === 429) {
        setIsRateLimited(true); // Set rate limit state if 429 error occurs
      } else {
        toast.error("Failed to fetch notes.");
      }
    } finally {
      setLoading(false);
    }
  };
  fetchNotes();
  }, []);
  

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading...</div>}
      
        {notes.length == 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage