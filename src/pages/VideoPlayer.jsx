import { useState } from "react";
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from "video-react";
import 'video-react/dist/video-react.css'
const VidoePlayer = ({src}) => {
  const [player, setPlayer] = useState()
  const [source, setSource] = useState()

  return (  
    <div className={'video-player'}>
      <Player
        ref={(player) => {
          setPlayer(player)
        }}
        src={source}
      >
        <source src={source} />
        <BigPlayButton position="center"/>
        <LoadingSpinner/>
        <ControlBar disableCompletely/>
      </Player>
    </div>
  );
}

export default VidoePlayer;