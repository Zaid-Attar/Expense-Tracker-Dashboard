//import { Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react'
import api from '../lib/axios'
import { toast } from 'react-hot-toast'



const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const{id} = useParams();

  console.log({id});

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  console.log({note}); 

  const handleDelete = async () => {
    if(!window.confirm("Are you sure, you wanna delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note Successfully Deleted!!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to Delete the Note.");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All Fields are Required");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note Successfully Updated!!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to Update the Note.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span>Loading note...</span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto p-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-4">
            <Link to="/" className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error mb-6">
              <Trash2Icon className="size-5"/>
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100 shadow-md p-6">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />

              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter note content"
                  className="input input-bordered"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Note"}
                </button>
              </div>
            </div>
          </div>    
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage