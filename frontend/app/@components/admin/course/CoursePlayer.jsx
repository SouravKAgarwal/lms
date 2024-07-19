import axios from "axios";
import { useEffect, useState } from "react";

const CoursePlayer = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`http://localhost:8000/api/v1/courses/video`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: "45%", position: "relative" }}>
      <iframe
        src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=UpkjCM2mBl04Edx0`}
        style={{
          border: 0,
          maxWidth: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
        allowFullScreen
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default CoursePlayer;
