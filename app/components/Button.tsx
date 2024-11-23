import { NotebookPen } from "lucide-react";
import { useFormStatus } from "react-dom";

function Button() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-outline">
      {/* <NotebookPen /> */}
      {/* Add Note */}
      {pending ? (
        <span className="loading loading-dots loading-xs"></span>
      ) : (
        <>
          <NotebookPen />
          Add Note
        </>
      )}
    </button>
  );
}

export default Button;
