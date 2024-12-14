import React, { useState } from "react";

const EditProfile = ({ profileData, onUpdateProfile }) => {
    const [formData, setFormData] = useState(profileData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateProfile(formData);
    };

    return (
        <div className="edit-profile">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Study Program:
                    <input
                        type="text"
                        name="study_program"
                        value={formData.study_program}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    University:
                    <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Skills:
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
