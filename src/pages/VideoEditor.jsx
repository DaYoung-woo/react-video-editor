import { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { createFFmpeg } from '@ffmpeg/ffmpeg'
import styles from './VideoEditor.module.css'

import video_placeholder from '../assets/images/video_placeholder.png'
import VidoePlayer from './VideoPlayer';
import MultiRangeSlider from '../components/MultiRangeSlider';
import VideoConversionButton from './VideoConversionButton';

const ffmpeg = createFFmpeg({
  log: true
})
const VideoEditor = () => {
  const uploadFile = useRef('')
  const [videoFile, setVideoFile]  = useState();
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [sliderValues, setSliderValues] = useState([0, 100])
  

  useEffect(() => {
    ffmpeg.load().then(() => {
      setFfmpegLoaded(true)
    })
  }, [])

  if(!ffmpegLoaded) return <div>Loading...</div>
  return (
    <article className='layout' style={{padding: '56px 16px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
        <h1 className={styles.title}>Video Eidt</h1>
        {
          videoFile && (
            <div>
              <input type="file" accept='video/*' style={{display: 'none'}} ref={uploadFile}/>
              <Button className={styles.re__upload__btn} style={{width: 'fit-content'}} onClick={() => uploadFile.current.click()}>
                비디오 재선택
              </Button>
            </div>
          )
        }
      </div>
      <section>
        {
          videoFile ? (
            <VidoePlayer />
          ): (
            <>
              <img src={video_placeholder} alt="비디오를 업로드해주세요" style={{marginBottom: 32}}/>
              <div>
                <input type="file" accept='video/*' style={{display: 'none'}} ref={uploadFile}/>
                <Button className={styles.upload__btn} onClick={() => uploadFile.current.click()}>
                  비디오 업로드하기
                </Button>
              </div>
            </>
          )
        }
      </section>

      
        {videoFile && (
          <>
          <section style={{width: "100%", marginTop: 30, marginBottom: 62, display: 'flex', justifyContent: 'center'}}>
            <MultiRangeSlider min={0} max={100} onChange={(min, max) => {setSliderValues([min, max])}}/>
          </section>
          <section>
            <VideoConversionButton/>
          </section>
          </>
        )}
      
    </article>
  );
}

export default VideoEditor;