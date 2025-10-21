export const muiInputSx = {
    "& .MuiInputLabel-root": {
        color: "#666666",
        fontWeight: 500,
        fontSize: "0.9rem",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "#008b7e", // color when input is focused
    },
    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
        color: "#008b7e", // when label shrinks (i.e., floats up)
    },
    "& .MuiOutlinedInput-root": {
        color: "rgb(70, 70, 70)",
        borderRadius: "12px",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#58d0c7", // default border
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00b8a9", // hover border
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#008b7e", // focus border
        },
    },
};

export const muiButtonSx = {
    backgroundColor: "#58d0c7",
    color: "#ffffff",
    borderRadius: "12px",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#4bb1ab",
      boxShadow: "none"
    },
    "&:disabled": {
      backgroundColor: "#cccccc",
      color: "#666666",
    },
}