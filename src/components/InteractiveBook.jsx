import { useEffect, useState, useRef } from 'react';

const pages = [
  {
    type: 'cover',
    title: 'El cuento de mi princesa 💖',
    subtitle: 'Un libro mágico hecho para ti, mi amor, con cada palabra y cada latido de nuestro corazón.',
  },
  {
    type: 'photo',
    title: 'Nuestro primer abrazo 💞',
    text: 'Desde el primer abrazo supe que quería dibujar mil historias a tu lado. Cada día contigo ha sido un regalo que atesoro en mi memoria.',
    photo: '/photos/photo-1.jpg',
  },
  {
    type: 'photo',
    title: 'Tu sonrisa ilumina mi mundo 🌹',
    text: 'Tu sonrisa es la luz que convierte cada día en algo precioso. Cuando ríes, siento que todo mejora y que el mundo brilla un poco más.',
    photo: '/photos/photo-2.jpg',
  },
  {
    type: 'photo',
    title: 'Magia en cada recuerdo ✨',
    text: 'Cada recuerdo contigo se vuelve un sueño que quiero repetir siempre. Guardaré estos instantes como si fueran tesoros que nos unen para siempre.',
    photo: '/photos/photo-3.jpg',
  },
  {
    type: 'photo',
    title: 'Risas compartidas que encienden mi alma 🎁',
    text: 'Las risas que compartimos son mi música favorita. Gracias por esas carcajadas que hacen que mis días sean más ligeros y alegres.',
    photo: '/photos/photo-4.jpg',
  },
  {
    type: 'photo',
    title: 'Abrazos que curan el alma 💌',
    text: 'Tus abrazos son mi refugio y mi fuerza. En tus brazos encuentro calma, valor y el calor de un hogar al que siempre quiero volver.',
    photo: '/photos/photo-5.jpg',
  },
  {
    type: 'photo',
    title: 'Días de aventura en tus brazos 🌸',
    text: 'Contigo cada momento se vuelve una aventura inolvidable. Gracias por descubrir el mundo a mi lado y por convertir lo cotidiano en extraordinario.',
    photo: '/photos/photo-6.jpg',
  },
  {
    type: 'photo',
    title: 'Ternura infinita que me enamora 💘',
    text: 'Tu ternura hace que mi corazón sonría sin razón. Eres delicadeza y fuerza a la vez, y cada gesto tuyo me enamora más.',
    photo: '/photos/photo-7.jpg',
  },
  {
    type: 'photo',
    title: 'Te busco en cada lugar porque eres mi hogar 🥀',
    text: 'En cada rincón solamente quiero encontrarte a ti. Tu compañía transforma los lugares y los llena de sentido y calor.',
    photo: '/photos/photo-8.jpg',
  },
  {
    type: 'photo',
    title: 'Mi compañera de vida y mi sueño 💒',
    text: 'Gracias por ser mi compañía, mi amiga y mi amor. A tu lado aprendo, río y crezco; gracias por sostenerme siempre.',
    photo: '/photos/photo-9.jpg',
  },
  {
    type: 'photo',
    title: 'Recuerdos que abrazan nuestro destino 💝',
    text: 'Estas fotos guardan la calidez de cada instante juntos. Cada imagen es un abrazo que revive momentos llenos de amor.',
    photo: '/photos/photo-10.jpg',
  },
  {
    type: 'photo',
    title: 'Dulce melodía de tu voz y tus gestos 🎶',
    text: 'Tu voz y tu presencia son la melodía que adoro. Escucharte es encontrar la calma y la canción más bonita de mi vida.',
    photo: '/photos/photo-11.jpg',
  },
  {
    type: 'photo',
    title: 'Unidos por siempre en un amor sin fin 💞',
    text: 'Siento que este cuento no tendría fin si lo escribimos juntas. Quiero seguir sumando capítulos a nuestro amor día tras día.',
    photo: '/photos/photo-12.jpg',
  },
  {
    type: 'photo',
    title: 'Corazones enlazados por siempre 🌺',
    text: 'Mi corazón late más fuerte cada vez que pienso en ti. Eres mi compañera, mi refugio y la mejor razón para sonreír.',
    photo: '/photos/photo-13.jpg',
  },
  {
    type: 'photo',
    title: 'Sueños compartidos que crean nuestro cielo 🌟',
    text: 'Tus sueños son los míos, y prometo cuidarlos siempre. Juntos construiremos lo que imaginamos y mucho más.',
    photo: '/photos/photo-14.jpg',
  },
  {
    type: 'photo',
    title: 'Nuestro rincón especial donde nace la magia 🎀',
    text: 'En nuestros momentos juntos se esconde la magia más real. Gracias por convertir la vida en un lugar tierno y verdadero.',
    photo: '/photos/photo-15.jpg',
  },
  {
    type: 'photo',
    title: 'Para ti, mi reina eterna 👑',
    text: 'Cada vez que te miro confirmo que eres mi mayor bendición. Feliz cumpleaños, mi reina; eres mi presente y mi futuro.',
    photo: '/photos/photo-16.jpg',
  },
  {
    type: 'final',
    title: 'Feliz cumpleaños, princesa 🎉',
    text: 'Hoy celebro tu vida, tus sueños y todo lo que nos regalas con tu amor.',
    extra: 'Que este año sea aún más dulce, brillante y lleno de momentos hermosos a tu lado. Te amo con todo mi corazón.',
  },
];

const InteractiveBook = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [turning, setTurning] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [player, setPlayer] = useState(null);
  const [coverSrc, setCoverSrc] = useState('/photos/book-cover.png');
  const page = pages[pageIndex];
  const audioCtxRef = useRef(null);
  const musicIframeRef = useRef(null);

  useEffect(() => {
    const initYoutubePlayer = () => {
      if (!window.YT || !window.YT.Player || !musicIframeRef.current) return;

      const youtubePlayer = new window.YT.Player(musicIframeRef.current, {
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          playlist: '2qG-e-a_AcA',
          mute: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            setPlayerReady(true);
            setPlayer(youtubePlayer);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initYoutubePlayer();
    } else if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initYoutubePlayer;
    } else {
      window.onYouTubeIframeAPIReady = initYoutubePlayer;
    }
  }, []);

  const playBackgroundMusic = () => {
    if (musicStarted || !playerReady || !player) return;
    player.unMute();
    player.playVideo();
    setMusicStarted(true);
  };

  const playFlipSound = () => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AC();
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      const createNote = (frequency, start, duration, type = 'sine', volume = 0.06) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(volume, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      createNote(659.25, now, 0.18, 'triangle', 0.04);
      createNote(783.99, now + 0.05, 0.16, 'sine', 0.03);
    } catch (e) {
      // no-op
    }
  };

  const handleNext = () => {
    if (pageIndex >= pages.length - 1) return;
    setTurning(true);
    setShowSparkles(true);
    window.setTimeout(() => {
      setPageIndex((current) => Math.min(current + 1, pages.length - 1));
      setShowSparkles(false);
      setTurning(false);
    }, 900);
  };

  const resetBook = () => {
    setPageIndex(0);
    setShowSparkles(false);
    setTurning(false);
  };

  return (
    <div className="book-shell">
      <div className="book-shell__top">
        <div className="book-shell__chapter">Capítulo {pageIndex + 1} de {pages.length}</div>
        <div className="book-shell__hint"></div>
      </div>

      <div className="book-shell__music-bar">
        <div className="book-shell__music-label"></div>
        <iframe
          id="background-music-player"
          ref={musicIframeRef}
          className="book-shell__music-iframe"
          title="Música de fondo"
          src="https://www.youtube.com/embed/2qG-e-a_AcA?enablejsapi=1&loop=1&playlist=2qG-e-a_AcA&controls=0&rel=0&modestbranding=1"
          allow="autoplay; encrypted-media"
        />
      </div>

      <button className={`book-shell__book ${turning ? 'book-turn--active' : ''}`} type="button" onClick={() => { playBackgroundMusic(); handleNext(); }}>
        <div className={`book-sparkle ${showSparkles ? 'book-sparkle--active' : ''}`}>
          <span />
          <span />
          <span />
        </div>

        {page.type === 'cover' ? (
          <>
            <div className="book-cover book-cover--left">
              <div className="book-cover__title">{page.title}</div>
              <div className="book-cover__subtitle">{page.subtitle}</div>
            </div>
            <div className="book-cover book-cover--right book-cover--princess">
              <img
                className="book-cover__image"
                src={coverSrc}
                alt="Portada"
                onError={() => setCoverSrc('/photos/photo-1.jpg')}
              />
              <div className="book-cover__label">Un cuento de princesas</div>
            </div>
          </>
        ) : (
          <>
            <div className="book-page book-page--left">
              <div className="book-page__title">{page.title}</div>
              <div className="book-page__text">{page.text}</div>
              {page.type === 'final' && <div className="book-page__text book-page__text--extra">{page.extra}</div>}
            </div>
            <div className="book-page book-page--right">
              {page.type === 'final' ? (
                <div className="book-page__final-art">
                  <img
                    className="book-page__rabbit"
                    src="/photos/final-rabbit.png"
                    alt="Conejito de cumpleaños"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/photos/rabbit.svg'; }}
                  />
                  <div className="book-page__final-caption">Un conejito dulce para tu día</div>
                </div>
              ) : page.photo ? (
                <div className="book-page__photo-wrap">
                  <img className="book-page__photo" src={page.photo} alt="Recuerdo" />
                </div>
              ) : (
                <div className="book-page__decor"></div>
              )}
              <div className="book-page__footer">Te amo</div>
            </div>
          </>
        )}
      </button>

      <div className="book-shell__footer">
        <div className="book-shell__progress">Página {pageIndex + 1} / {pages.length}</div>
        <button className="book-shell__button" type="button" onClick={resetBook}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default InteractiveBook;
