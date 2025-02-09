{/*
import React from 'react'
import CommentSection from '../CommentSection/CommentSection';

function Posts() {
  return (
  )


    
  }  
  */}
import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import { FaRegCopy } from "react-icons/fa";
import './Posts.css'
import { Container } from 'react-bootstrap'
import CommentSection from '../CommentSection/CommentSection';


function Posts({showComments = true  }) {
  return (
    <div className='Post'>
      <React.Fragment>
  <CssBaseline />
  <Container>
    <Box sx={{ bgcolor: '#ffffff72', height: 'max-contnet', width : "90%" , marginLeft:'50px' , paddingLeft:'13px'}}>
      <div className='First-post'>
    <h1 className='Getting'>Getting  the content of window to a
      <br /> 
      text file  
  </h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
     Ipsam suscipit molestiae <br />dignissimos quae ratione dolore 
     sapiente ipsa laudantium, <br />consequatur eaque ut nostrum inventore natus,
      quia optio rem amet voluptate ad <br />quibusdam quos architecto.
     Vero, ipsum magni accusantium iste non dolorem.</p>
     </div>
     <Box>
     <Box component="section" sx={{ p: 2,  bgcolor:'rgb(156, 156, 250)' ,paddingLeft:'25px' }}>
      <div className='Coding'>
      <h3 className='Language'>Python</h3>
      <button>        
      <FaRegCopy style={{cursor:'pointer'}} />
      </button>

      </div>
     </Box>
     <Box component="section" sx={{ height:'fit-content',bgcolor:'#cce0ff',
     paddingLeft:'25px' ,
      marginBottom:'10px'
      }}>
    <p>

    Lorem ipsum dolor sit, 
      amet consectetur adipisicing elit.
      <br /> 
      Amet asperiores id eos voluptate, 
      quidem aut ipsam laboriosam quae,
      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      <br />
       Corrupti voluptatem doloremque odio sequi distinctio molestias
       <br /> 
       sapiente maiores rerum,
       accusantium mollitia commodi
       <br />
        vitae ad tempore cupiditate aliquid esse et veritatis. Quia!
      <br />
       dolores libero cumque ex tempora nemo facere.

    </p>
     </Box>
    </Box>
      <p>I spent Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        <br />
        Inventore et exercitationem eveniet excepturi perferendis beatae vel error corrupti,
        <br />
        molestias sequi atque ea doloribus hic sint illo quaerat consequatur esse dolore.
        <br />
        Quisquam neque nulla, voluptate ipsa adipisci corporis id deleniti accusantium!
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        <br />
          Quo similique cumque molestias voluptatem ad quidem?
        </p>
        <div className='Disappointed'>
        <span>Python</span>
        <span>Ai enginereering</span>
        </div>
        {showComments && <CommentSection />}
    </Box>
  </Container>
</React.Fragment>
    </div>
  )
}
export default Posts




      {/*
    <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
      <div className="flex items-start">
        <p className="text-3xl font-bold text-gray-700 mr-4">⬆</p>
        <div className="flex-1">
          <h2 className="font-semibold text-xl text-gray-900">
            Getting the content of a window to a text file
          </h2>
          <p  className="text-md text-gray-700 mt-2">
            I'm trying to use HwndWrapper.Text() which supposedly "Returns the text for each item of this control"
            but it only returns the title which is 'Flight plan settings dialog'. Why is this happening?
            <br />
            the code is :
          </p>
          <div style={{color:"blue" , backgroundColor:"aqua" ,marginTop:"12px"}} className="bg-gray-900 text-white text-sm font-mono p-4 mt-3 rounded-lg">
            <p>prog=application.Application()</p>
            <p>prog.connect(path=r'D:\Thesis\Euroscope\Euroscope.exe')</p>
            <p>hw_handle = pywinauto.findwindows.find_windows(title="Flight plan setting dialog", class_name="#32770")[0]</p>
            <p>window = prog.window_(handle=hw_handle)</p>
            <p>print(window.FlightplanSettingsdialog.Text())</p>
          </div>
          <p className="text-md text-gray-700 mt-3">
            I spent the afternoon reading the pywinauto documentation and I can’t manage to find a way to get the content
            of a window like the one before into a text file... 
            <br />

            Any ideas ??
            Thank you
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <span className="bg-gray-200 px-3 py-1 rounded-md text-gray-700">Python</span>
            <span className="bg-gray-200 px-3 py-1 rounded-md text-gray-700">AI Engineering</span>
          </div>
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

export default Posts

    */ }


    /*
       Lorem ipsum dolor sit, 
      amet consectetur adipisicing elit.
      <br /> 
      Amet asperiores id eos voluptate, 
      quidem aut ipsam laboriosam quae,
      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      <br />
       Corrupti voluptatem doloremque odio sequi distinctio molestias
       <br /> 
       sapiente maiores rerum,
       accusantium mollitia commodi
       <br />
        vitae ad tempore cupiditate aliquid esse et veritatis. Quia!
      <br />
       dolores libero cumque ex tempora nemo facere.
    */ 