import React, { useEffect, useRef, useState } from 'react';
import { BarChart3, Check, Home, Layout, MessageCircle, Play, RotateCw, Sparkles, Target, Volume2, VolumeX } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './ProspeccaoPage.css';

const WHATSAPP_URL = `https://wa.me/5511973290438?text=${encodeURIComponent('Acabei de finalizar a apresnetação!')}`;
const AUDIO_URL = 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=ambient-piano-amp-strings-10711.mp3';

const slides = [
  { chapter: '01', label: 'O começo', kind: 'hero', kicker: 'Uma apresentação feita para você', title: <>Seu digital pode parecer <em>mais leve.</em></>, copy: 'Uma pausa para enxergar o que acontece quando sua presença digital também tem alguém cuidando dela.', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85' },
  { chapter: '02', label: 'O alívio', kind: 'quiet', kicker: 'Antes de falar sobre marketing', title: <>Você merece terminar o dia <em>sem carregar tudo.</em></>, copy: 'Enquanto você está com sua família, existe uma operação acontecendo nos bastidores. Com atenção, método e alguém olhando para ela.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85' },
  { chapter: '03', label: 'O ecossistema', kind: 'map', kicker: 'O mundo digital, quando faz sentido', title: <>Não é só postar.<br /><em>É construir um lugar.</em></>, copy: 'Conteúdo que chama, anúncios que encontram, páginas que acolhem e dados que mostram o caminho.', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=85' },
  { chapter: '04', label: 'As possibilidades', kind: 'services', kicker: 'Uma estrutura para o corretor', title: <>Mais presença.<br /><em>Mais tranquilidade.</em></>, copy: 'Uma equipe pequena, próxima e comprometida em transformar a sua operação digital em um lugar mais claro.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85' },
  { chapter: '05', label: 'O convite', kind: 'offer', kicker: 'Um começo possível', title: <>Tudo isso pode começar com o <em>Pacote Prospec.</em></>, copy: 'O serviço completo para tirar sua presença digital do improviso e colocar uma estrutura profissional para trabalhar por você.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85' },
  { chapter: '06', label: 'O encontro', kind: 'final', kicker: 'Agora é com a gente', title: <>Obrigado por chegar <em>até aqui.</em></>, copy: 'A Lots existe para oferecer tempo, clareza e presença. Para que você cuide do que só você pode cuidar.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85' },
];

const serviceItems = [
  ['Social Media', Target], ['Gestão de tráfego', BarChart3], ['Landing pages e sites', Layout], ['Conteúdo', Sparkles], ['Consultoria', Play], ['Lots BI', Home],
];

function OrientationIntro({ onComplete }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setReady(true), 2200); return () => window.clearTimeout(timer); }, []);
  return <div className="deck-intro"><div className="deck-intro__wordmark">Lots <b>BI</b></div><div className="deck-intro__phone"><RotateCw size={30} /></div><p>Uma apresentação para o seu próximo nível.</p><strong>Vire a tela para o modo horizontal</strong><small>Uma experiência feita para ser vista com calma.</small><button type="button" disabled={!ready} onClick={onComplete}>{ready ? 'Entrar na apresentação' : 'Preparando a experiência...'}</button></div>;
}

function Slide({ slide }) {
  return <article className={`deck-slide deck-slide--${slide.kind}`} style={{ '--slide-image': `url(${slide.image})` }}>
    <div className="deck-slide__image" aria-hidden="true" />
    <div className="deck-slide__chapter">{slide.chapter}</div>
    <div className="deck-slide__content"><p className="deck-kicker">{slide.kicker}</p><h1>{slide.title}</h1><p className="deck-copy">{slide.copy}</p>
      {slide.kind === 'quiet' && <div className="deck-questions"><span>Minha campanha está indo bem?</span><span>Quanto ainda tem de saldo?</span><span>Será que ainda está ativa?</span></div>}
      {slide.kind === 'map' && <div className="deck-map"><span>Conteúdo</span><span>Tráfego</span><b>Sua marca</b><span>Página</span><span>Lots BI</span></div>}
      {slide.kind === 'services' && <div className="deck-services">{serviceItems.map(([name, Icon]) => <div key={name}><Icon size={18} /><span>{name}</span></div>)}</div>}
      {slide.kind === 'offer' && <div className="deck-offer"><div><small>primeiros 3 meses</small><strong>R$ 800<sup>,00</sup></strong></div><ul><li><Check size={16} /> Social Media</li><li><Check size={16} /> Gestão de tráfego</li><li><Check size={16} /> Landing Page ou Site</li><li><Check size={16} /> Conteúdo, consultoria e Lots BI</li></ul></div>}
      {slide.kind === 'final' && <a className="deck-cta deck-cta--whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Continuar no WhatsApp</a>}
      {slide.kind === 'final' && <p className="deck-note">A mensagem já vai pronta. É só continuar a conversa.</p>}
    </div>
  </article>;
}

export default function ProspeccaoPage() {
  const [intro, setIntro] = useState(true);
  const [current, setCurrent] = useState(0);
  const [audioOn, setAudioOn] = useState(false);
  const audioRef = useRef(null);
  const toggleAudio = async () => { if (!audioRef.current) return; if (audioOn) { audioRef.current.pause(); setAudioOn(false); return; } try { await audioRef.current.play(); setAudioOn(true); } catch { setAudioOn(false); } };
  const handleScroll = (event) => { const { scrollTop, clientHeight } = event.currentTarget; setCurrent(Math.min(slides.length - 1, Math.round(scrollTop / clientHeight))); };

  if (intro) return <OrientationIntro onComplete={() => setIntro(false)} />;
  return <div className="prospection-page deck">
    <Helmet><title>Uma apresentação para o seu próximo nível | Agência Lots</title><meta name="description" content="Conheça a forma como a Agência Lots pode cuidar do seu ecossistema digital." /></Helmet>
    <audio ref={audioRef} loop preload="none" src={AUDIO_URL} />
    <header className="deck-header"><span className="prospection-brand"><span className="prospection-brand__mark">L</span>Lots <b>BI</b></span><button type="button" className="audio-toggle" onClick={toggleAudio}>{audioOn ? <Volume2 size={15} /> : <VolumeX size={15} />}<span>{audioOn ? 'Som ligado' : 'Som ambiente'}</span></button></header>
    <div className="deck-progress"><span>{String(current + 1).padStart(2, '0')}</span><div><i style={{ width: `${((current + 1) / slides.length) * 100}%` }} /></div><span>{String(slides.length).padStart(2, '0')}</span></div>
    <main className="deck-viewport" onScroll={handleScroll}><div className="deck-track">{slides.map((slide) => <Slide key={slide.chapter} slide={slide} />)}</div></main>
  </div>;
}
