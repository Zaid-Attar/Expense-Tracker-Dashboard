import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/axios'


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All Fields are Required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes/", {
        title,
        content,
      });
      toast.success("Note Created Successfully!!");
      navigate("/");
    } catch (error) {
      console.log("Error", error);
      if (error?.response?.status === 429) {
        toast.error("Slow down mann!!, you're too fast!!", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create a Note.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto p-5">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-4">
            <Link to="/" className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
          </div>

          <div className="card bg-base-100 shadow-md p-6">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                {/* // 1st Part of the form: Title field */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter note title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* // 2nd Part of the form: Content field */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Enter note content"
                    className="textarea textarea-bordered"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}

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