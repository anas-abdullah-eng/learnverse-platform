import React from "react";
import VideoManager from "../../Components/VideoManager/VideoManager";

const VideoManagerPage = ({ user, token }) => {
  return <VideoManager user={user} token={token} />;
};

export default VideoManagerPage;
