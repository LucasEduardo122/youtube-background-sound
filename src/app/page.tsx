'use client';
import { useState, useEffect, useRef } from "react";
import { YoutubeLogo, PlayPause, StopCircle, ArrowsOut, Faders, Coffee, Bird, Tipi, Waves, Snowflake, Fire, CloudRain, CloudLightning, Keyboard, SwimmingPool, SpeakerHigh } from '@phosphor-icons/react'
import YouTube from "react-youtube";
import Videos from "@/components/videos";
import MenuComponentAmbients from "@/components/menuAmbients";

export default function Home() {
  const [useSond, useSetSond] = useState<string>("jfKfPfyJRdk")
  const [player, setPlayer] = useState<any>(null);
  const [menu, setMenu] = useState<boolean>(false);
  const [menuAmbients, setMenuAmbients] = useState<boolean>(false);
  const [menuVolume, setMenuVolume] = useState<boolean>(false);
  const [audio, setAudio] = useState<string | null>(null);
  const audioRef = useRef<any>(null)

  const icons = [
    {
      name: Coffee,
      id: "coffee"
    },

    {
      name: Tipi,
      id: "tipi"
    },

    {
      name: Waves,
      id: "waves"
    },

    {
      name: Bird,
      id: "bird"
    },

    {
      name: Snowflake,
      id: "snowflake"
    },

    {
      name: Fire,
      id: "fire"
    },

    {
      name: CloudRain,
      id: "cloudrain"
    }, 
    
    {
      name: CloudLightning,
      id: "cloudlight"
    },

    {
      name: Keyboard,
      id: "keyboard"
    },

    {
      name: SwimmingPool,
      id: "swimming"
    }

  ]
  const videos = [
    {
      banner: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hq720.jpg',
      id: 'jfKfPfyJRdk',
      name: 'Beats to relax/study to'
    },

    {
      banner: 'https://i.ytimg.com/vi/y3Q2fRqLlFk/hq720.jpg',
      id: 'y3Q2fRqLlFk',
      name: 'Chill Summer Lofi'
    },

    {
      banner: 'https://i.ytimg.com/vi/bJUO1WnjXQY/hq720.jpg',
      id: 'bJUO1WnjXQY',
      name: 'Purple Cat'
    },

    {
      banner: 'https://i.ytimg.com/vi/4xDzrJKXOOY/hq720.jpg',
      id: '4xDzrJKXOOY',
      name: 'Beats to chill/game to'
    }
  ]

  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      modestbranding: 1,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0,
      enablejsapi: 1,
      origin: 'http://localhost:3000',
      widgetid: 1,
      autoplay: 1,
      allowfullscreen: true,
      loop: true
    },
  };

  const onReady = (event: any) => {
    setPlayer(event.target);
  };


  function PausePlay() {
    let playerState = player.getPlayerState();

    if (playerState === 1) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  function toogleMenu() {
    menu ? setMenu(false) : setMenu(true);
  }

  function ambientsModal() {
    menuAmbients ? setMenuAmbients(false) : setMenuAmbients(true);
  }

  function volumeModal() {
    menuVolume ? setMenuVolume(false) : setMenuVolume(true);
  }

  function changeVolumeVideo(volume: string) {
    if(player) {
      player.setVolume(+volume)
    }
  }

  function changeVolumeAmbient(volume: string) {
    if(audioRef.current) {
      let volumeConvert = +volume / 100;
      audioRef.current.volume = volumeConvert
    }
  }

  function ambientsActive(event: any) {
    const valor = event.target.attributes.id?.value

    if (valor) {
      setAudio(valor);
    }
  }

  function stopAll() {
    if (player) {
      player.pauseVideo();
    }

    if (audioRef.current) {
      audioRef.current?.pause();
    }
  }

  function toogleFullScreen() {
    if (player) {
      const iframe = player.getIframe();

      const doc = document;

      if (doc.fullscreenElement) {
        if (doc.exitFullscreen) {
          doc.exitFullscreen();
        }
      } else {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }
      }
    }
  }

  function changeSond(id: string) {
    if (id !== useSond) {
      useSetSond(id)
      toogleMenu();
    }
  }

  return (
    <main className="container flex flex-col h-full w-full mx-auto justify-center items-center">

      <YouTube opts={opts} iframeClassName="fixed top-0 left-0 w-full h-full pointer-events-none scale-125" className="fixed top-0 left-0 w-full h-full pointer-events-none scale-125" videoId={useSond} onReady={onReady} />
      <div id="controlls" className={`fixed flex items-center mx-auto gap-12 bg-violet-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100 rounded-full p-4 bottom-5`}>
        <div className="relative inline-block">
          <button onClick={toogleMenu} className="btn bg-transparent border-none hover:bg-transparent focus:outline-none" id="menu-button" aria-expanded="true" aria-haspopup="true">
            <YoutubeLogo size={25} color="white" className="text-2xl" />
          </button>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 transition-opacity duration-300 invisible">
            <p>Add Video</p>
          </div>

          <div className={`${menu ? '' : 'hidden'} absolute right-0 z-10 mt-2 bottom-12 w-56 origin-top-right rounded-md bg-violet-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-95 backdrop-saturate-100 backdrop-contrast-100  shadow-lg ring-1 ring-blackring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
            <div className="py-1" role="none">
              {videos.map(video =>
                <Videos key={video.id} data={video} functionChangeSond={() => changeSond(video.id)} />
              )}
            </div>
          </div>
        </div>

        <div className="tooltip">
          <button onClick={PausePlay}>
            <PlayPause size={25} color="white" className="text-2xl" />
          </button>
        </div>

        <div className="tooltip">
          <button>
            <StopCircle onClick={stopAll} size={25} color="white" className="text-2xl" />
          </button>
        </div>

        <div className="tooltip">
          <button>
            <SpeakerHigh onClick={volumeModal} size={25} color="white" className="text-2xl" />
          </button>

          <div className={`${menuVolume ? '' : 'hidden'} absolute bottom-24 right-0 z-50 left-0 bg-violet-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-50 backdrop-saturate-100 backdrop-contrast-100 rounded-full p-4 justify-center items-center flex gap-4`} role="menu" aria-orientation="vertical" aria-labelledby="menu-ambients-button" tabIndex={-1}>
            <div className="grid grid-row grid-cols-2 gap-5 mr-5" role="none">
              <div className="w-full text-center">
                <label className="text-white" htmlFor="volumeVideo">Volume Video</label>
                <input onChange={(event) => changeVolumeVideo(event.target.value)} className="w-full mt-4" min={0} max={100} type="range" name="volumeVideo" id="volumeVideo" />
              </div>

              <div className="w-full text-center">
                <label className="text-white" htmlFor="volumeAmbient">Volume Ambient</label>
                <input onChange={(event) => changeVolumeAmbient(event.target.value)} className="w-full mt-4" min={0} max={100} type="range" name="volumeAmbient" id="volumeAmbient" />
              </div>
            </div>
          </div>
        </div>

        <div className="tooltip">
          <button id="menu-ambients-button" aria-expanded="true" aria-haspopup="true">
            <Faders onClick={ambientsModal} size={25} color="white" className="text-2xl" />

            <div className={`${menuAmbients ? '' : 'hidden'} absolute right-0 z-10 mt-2 bottom-32 w-56 origin-top-right rounded-md bg-violet-500 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-95 backdrop-saturate-100 backdrop-contrast-100  shadow-lg ring-1 ring-blackring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-ambients-button" tabIndex={-1}>
              <div className="grid grid-row grid-cols-5 gap-1 mr-5" role="none">
                {icons.map(icon => 
                  <MenuComponentAmbients key={icon.id} ambientsActive={ambientsActive} icon={icon.name} id={icon.id}/>  
                )}
              </div>
            </div>
          </button>
        </div>

        <div className="tooltip">
          <button>
            <ArrowsOut onClick={toogleFullScreen} size={25} color="white" className="text-2xl" />
          </button>
        </div>

      </div>

      <div id="audio">
        {audio ?
          <>
            <audio ref={audioRef} autoPlay  src={`./audios/${audio}.mp3`} loop></audio>
          </>
          :
          ''}
      </div>
    </main>
  );
}
