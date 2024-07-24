import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Loading";

const CoursePlayer = ({ videoUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://lms-2uou.onrender.com/api/v1/courses/video`,
          { videoId: videoUrl }
        );
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [videoUrl]);

  return (
    <>
      <div
        style={{
          paddingTop: "56.25%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isLoading ? (
          <div
            style={{
              border: 0,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
            className="bg-black"
          >
            <img src="/spinner.svg" className="object-center" />
          </div>
        ) : (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=UpkjCM2mBl04Edx0`}
            style={{
              border: 0,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
            allowFullScreen={true}
            allow="encrypted-media"
          ></iframe>
        )}
      </div>
    </>
  );
};

export default CoursePlayer;
