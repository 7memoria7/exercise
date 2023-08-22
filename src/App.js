// npm i react-media-recorder@1.6.5
// npm uninstall react-media-recorder

import { useState } from "react";
import axios from "axios";
import { ReactMediaRecorder } from "react-media-recorder";

function App() {
  const [resp, setResp] = useState("");

  const onSubmit = (e) => {
    e.preventDefault(); // 요거 없으면 파일 전송 안된다!

    let formData = new FormData();
    formData.append("uploadFile", document.frm.uploadFile.files[0]);

    // send
    axios
      .post("http://localhost:3000/fileUpload", formData)
      .then((resp) => {
        setResp(resp.data.text); // 벡엔드 json의 key 이름이text로 되어있다.
      })
      .catch((err) => {
        alert("error");
      });
  };

  // 깃허브 올리고 수정하는 과정

  return (
    <div>
      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p>{status}</p>
            <button onClick={startRecording}>startRecording</button>
            <button onClick={stopRecording}>stopRecording</button>
            <br />
            <br />
            <audio src={mediaBlobUrl} controls></audio>
            <br />

            {/* 다운로드링크 */}
            <a href={mediaBlobUrl} download="my-audio-file.wav">
              download
            </a>
          </div>
        )}
      />

      <hr />
      <h2>음성파일 upload</h2>

      <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
        <input type="file" name="uploadFile" accept="*"></input>
        <input type="submit" value="파일전송" />
      </form>

      <p>결과: {resp}</p>
    </div>
  );
}

export default App;
