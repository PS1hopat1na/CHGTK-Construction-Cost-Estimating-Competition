import { useEffect, useState } from 'react';

export default function PrivacyBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('policyAccepted')) setShown(true);
    const onScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 4) setShown(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const accept = () => {
    localStorage.setItem('policyAccepted', '1');
    setShown(false);
  };

  if (!shown) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: '#e2e8f0', color: '#222', padding: '14px 10px', textAlign: 'center',
      boxShadow: '0 -2px 16px 0 rgba(40,40,90,0.1)'
    }}>
      Используя сайт, вы соглашаетесь с <a href="/privacy" style={{ textDecoration: 'underline', color: '#2563eb' }}>политикой обработки персональных данных</a>.
      <button onClick={accept} style={{ marginLeft: 16, background: '#2563eb', color: '#fff', borderRadius: 8, padding: '6px 18px', border: 'none', fontWeight: 600 }}>Принять</button>
    </div>
  );
}
