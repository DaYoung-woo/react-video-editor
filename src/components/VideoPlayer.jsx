import { useEffect, useState } from "react";
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from "video-react";
import 'video-react/dist/video-react.css'
const VidoePlayer = ({src, onPlayerChange = () => {}, onChange = () => {}, startTime = undefined}) => {
  const [player, setPlayer] = useState()
  const [source, setSource] = useState()
  const [playerState, setPlayerState] = useState(undefined);

  useEffect(() => {
    setSource(URL.createObjectURL(src))
  }, [src])

  useEffect(() => {
    if(playerState) onChange(playerState)
  }, [playerState])

  useEffect(() => {
    onPlayerChange(player)
    if(player) player.subscribeToStateChange(setPlayerState)
  }, [player])
  
  return (  
    <div className={'video-player'}>
      <Player
        ref={(player) => {
          setPlayer(player)
        }}
        src={source}
        startTime={startTime}
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