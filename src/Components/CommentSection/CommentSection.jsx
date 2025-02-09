import './CommentSection.css'
import { IoSend } from "react-icons/io5";

  function CommentSection() {
    return (
<div style={{marginTop :'45px'}} className="mt-5 pt-4">
  <div className="flex items-center mt-3">
    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
    <input
      type="text"
      className="Add-Comment"
      placeholder="Add a comment..."
    />
    <IoSend style={{color:'blue' , cursor:'pointer'}} />

  </div>

</div>
   )
}

    export default CommentSection;



