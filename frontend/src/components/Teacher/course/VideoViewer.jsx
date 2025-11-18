import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { PlayCircle } from 'lucide-react';

const SimpleVideoPlayer = ({ videoUrl, thumbnailUrl }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative w-full max-w-3xl mx-auto aspect-video bg-black rounded-lg overflow-hidden"
      onContextMenu={(e) => e.preventDefault()} // 🛑 Disable right-click
    >
      {!playing && thumbnailUrl && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
          onClick={() => setPlaying(true)}
        >
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="absolute w-full h-full object-cover"
          />
          <div className="z-20 bg-white/80 p-3 rounded-full">
            <PlayCircle className="text-blue-700 w-10 h-10" />
          </div>
        </div>
      )}

      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        controls={true}
        width="100%"
        height="100%"
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload', // ⛔️ Disable native download
              onContextMenu: (e) => e.preventDefault(), // extra safety
            },
          },
        }}
      />
    </div>
  );
};

export default SimpleVideoPlayer;
