// Fixed configuration (change or add fields as needed)
export const formConfig = [
    { id: "name", label: "Your Name", type: "text", required: true },
    { id: "email", label: "Email", type: "text", required: true },
    {
      id: "gender",
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
      required: false
    },
    {
      id: "experience",
      label: "Experience level",
      type: "select",
      options: ["Beginner", "Intermediate", "Advanced"],
      required: true
    }
  ];
  