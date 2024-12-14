import React from "react";

const FilterOptions = ({ filters, onFilterChange }) => {
    return (
        <div className="filter-options">
            <label>
                Study Program:
                <input
                    type="text"
                    name="study_program"
                    value={filters.study_program}
                    onChange={onFilterChange}
                />
            </label>
            <label>
                University:
                <input
                    type="text"
                    name="university"
                    value={filters.university}
                    onChange={onFilterChange}
                />
            </label>
            <label>
                Skills:
                <input
                    type="text"
                    name="skills"
                    value={filters.skills}
                    onChange={onFilterChange}
                />
            </label>
            <button onClick={onFilterChange}>Apply Filters</button>
        </div>
    );
};

export default FilterOptions;
