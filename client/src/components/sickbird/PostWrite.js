import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { message, Input, Button } from 'antd';
import 'antd/dist/antd.css';

function PostWrite({match, userObj}) {
  const { boardseq } = match.params;
  const history = useHistory();
  const [postContent, setPostContent] = useState({
    title: '',
    content: '<p>내용을 작성해주세요</p>',
    writer: userObj.displayName
  });

  const getValue = e => {
    const { value } = e.target;
    setPostContent({
      ...postContent,
      title: value
    })
    console.log(postContent);
  }

  const writePost = () => {
    Axios.post(`http://localhost:4000/api/boards/${boardseq}/write`, {
      title: postContent.title,
      writer: postContent.writer,
      content: postContent.content
    }).then(() => {
      message.success("등록 완료!");
      history.push(`/boards/${boardseq}`);
    });
  };
  return (
    <div className="PostWrite">
      <h2>게시글 작성</h2>
      <div><Input showCount maxLength={100} onChange={getValue} /></div>
      <CKEditor
        editor={ ClassicEditor }
        data="<p>내용을 작성해주세요</p>"
        onReady={ editor => {
          // You can store the "editor" and use when it is needed.
          console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
          const data = editor.getData();
          console.log( { event, editor, data } );
          setPostContent({
            ...postContent,
            content: data
          })
        } }
        onBlur={ ( event, editor ) => {
          console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
          console.log( 'Focus.', editor );
        } }
      />
      <Button
        type="primary" block 
        onClick={writePost}>작성하기</Button>
    </div>
  );
}
export default PostWrite;