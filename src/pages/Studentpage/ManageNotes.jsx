import React, { useState } from "react";
import useSecureAxios from "../../hooks/useSecureAxios";
import useAuth from "../../hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ManageNotes = () => {
  const { user } = useAuth();
  const secureAxios = useSecureAxios();
  const queryClient = useQueryClient();
  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch notes
  const { data: notes = [] } = useQuery({
    queryKey: ["notes", user.email],
    queryFn: async () => {
      const res = await secureAxios.get(`/notes/${user.email}`);
      return res.data;
    },
  });

  // Delete note mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await secureAxios.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      toast.success("Note deleted successfully!");
      queryClient.invalidateQueries(["notes", user.email]); // Refresh notes
    },
    onError: () => {
      toast.error("Failed to delete the note.");
    },
  });

  // Handle delete confirmation
  const confirmDelete = (id) => {
    toast.warning(
      <div>
        <p>Are you sure you want to delete this note?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              toast.dismiss(); // Dismiss the toast
              deleteMutation.mutate(id); // Trigger delete
            }}
          >
            Confirm
          </button>
          <button
            className="btn btn-sm btn-error"
            onClick={() => toast.dismiss()} // Dismiss the toast
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Keep the toast open until an action is taken
        closeOnClick: false,
      }
    );
  };

  // Handle form submission for updating a note
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedNote = {
      title: formData.get("title"),
      description: formData.get("description"),
    };
    updateMutation.mutate({ id: selectedNote._id, updatedNote });
  };

  // Update note mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedNote }) => {
      await secureAxios.put(`/notes/${id}`, updatedNote);
    },
    onSuccess: () => {
      toast.success("Note updated successfully!");
      queryClient.invalidateQueries(["notes", user.email]); // Refresh notes
      setSelectedNote(null); // Close modal
    },
    onError: () => {
      toast.error("Failed to update the note.");
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Manage Notes
      </h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Note Name</th>
                <th>Note Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, idx) => (
                <tr key={note._id}>
                  <th>{idx + 1}</th>
                  <td>{note.title}</td>
                  <td>{note.description}</td>
                  <td className="flex justify-center gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => confirmDelete(note._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setSelectedNote(note)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      {selectedNote && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Note</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedNote.title}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedNote.description}
                  className="textarea textarea-bordered"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-error"
                  onClick={() => setSelectedNote(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotes;
