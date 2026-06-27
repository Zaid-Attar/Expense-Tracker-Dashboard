import { Trash, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { PenSquareIcon } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'//
import { formatDate } from '../lib/utils'
import api from '../lib/axios'

const NoteCard = ({ note, setNotes }) => {

  const handleDelete = async(e,id) => {
    e.preventDefault();

    if(!window.confirm("Are you sure, you wanna delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id));
      toast.success("Note Successfully Deleted!!");
    } catch (error) {
      toast.error("Failed to Delete the Note.");
    }
  }
  return (
    <Link to={`/notes/${note._id}`}
        className="card bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border-solid border-gray-700">
    <div className="card-body">
      <h3 className="card-title text-lg font-bold text-white">{note.title}</h3>
      <p className="text-gray-400">{note.content}</p>
      <div className="card-footer mt-4 text-sm text-gray-500">
        <span className="text-sm text-base-content/60 text-gray-500">{formatDate(new Date(note.createdAt))}</span>
        <div className="flex justify-end">
            <button className="btn btn-sm btn-ghost text-base ml-2">
              <PenSquareIcon className="size-5" />
            </button>
            <button className="btn btn-sm btn-ghost text-error ml-2" onClick={(e)=>handleDelete(e,note._id)}>
                <Trash2Icon className="size-5" />
            </button>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default NoteCard