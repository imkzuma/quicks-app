export const options = [
    { value: "Important ASAP", label: "Important ASAP", color: "#E5F1FF"},
    { value: "Offline Meeting", label: "Offline Meeting", color: "#FDCFA4" },
    { value: "Virtual Meeting", label: "Virtual Meeting", color: "#F9E9C3" },
    { value: "ASAP", label: "ASAP", color: "#AFEBDB" },
    { value: "Client Related", label: "Client Related", color: "#CBF1C2" },
    { value: "Self Task", label: "Self Task", color: "#CFCEF9" },
    { value: "Appointments", label: "Appointments", color: "#F9E0FD" },
    { value: "Court Related", label: "Court Related", color: "#9DD0ED" }
];    

export const customStyles = { 
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.color,
        fontSize: "0.8rem",
        marginBottom: "0.5rem",
        fontWeight: "bold",
        border: "none",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: state.isSelected ? state.data.color : "#E5E5E5",
        }
    }),
    control: (provided, state) => ({
        ...provided,
        border: "none",
        boxShadow: "none",
        "&:hover": {
            border: "none",
            boxShadow: "none",
        }
    }),
    menu: (provided, state) => ({
        ...provided,
        backgroundColor: "white",
        padding: "0.5rem",
        border: "0.1px solid #828282",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        "&:hover": {
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.data.color,
        borderRadius: "0.5rem",
        padding: "0.2rem 0.5rem",
        color: "white",
        fontWeight: "bold",
    }),
    multiValueLabel: (provided, state) => ({
        ...provided,
        fontWeight: "bold",
        fontSize: "0.8rem",
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: "black",
        backgroundColor: state.data.color,
        fontWeight: "bold",
        fontSize: "0.8rem",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: "black",
        fontWeight: "bold",
        fontSize: "0.8rem",
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "black",
        fontWeight: "bold",
    }),
    clearIndicator: (provided, state) => ({
        ...provided,
        display: "none",
    }),
};