document.addEventListener('DOMContentLoaded', () => {
    
    // Header Blur & Scroll logic
    const header = document.getElementById('main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) header.classList.add('shadow-md');
        else header.classList.remove('shadow-md');
        
        if (currentScroll > lastScroll && currentScroll > 100) header.classList.add('-translate-y-full');
        else header.classList.remove('-translate-y-full');
        lastScroll = currentScroll;
    });

    // Mobile Menu
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = menu.querySelectorAll('a');
    btn.addEventListener('click', () => menu.classList.toggle('hidden'));
    links.forEach(link => link.addEventListener('click', () => menu.classList.add('hidden')));

    // Animations (Observer)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));

    // Modal Logic
    const modal = document.getElementById('privacy-modal');
    const openBtn = document.getElementById('open-privacy');
    const closeBtns = document.querySelectorAll('#close-modal, #close-modal-btn');

    function toggleModal(show) {
        if (show) {
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.querySelector('div').classList.replace('scale-95', 'scale-100');
            }, 10);
        } else {
            modal.classList.add('opacity-0');
            modal.querySelector('div').classList.replace('scale-100', 'scale-95');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }

    openBtn.addEventListener('click', (e) => { e.preventDefault(); toggleModal(true); });
    closeBtns.forEach(b => b.addEventListener('click', () => toggleModal(false)));
    modal.addEventListener('click', (e) => { if(e.target === modal) toggleModal(false); });

    // --- MAP TABS LOGIC ---
    const btnFarma = document.getElementById('btn-farma');
    const btnHiper = document.getElementById('btn-hiper');
    const infoFarma = document.getElementById('info-farma');
    const infoHiper = document.getElementById('info-hiper');
    const mapIframe = document.getElementById('map-iframe');

    // URLs dos mapas baseados nos endereços reais
    const mapUrlFarma = "https://maps.google.com/maps?q=R+Juvenal+Mendonca,498,Uniao+dos+Palmares,AL&t=&z=16&ie=UTF8&iwloc=&output=embed";
    const mapUrlHiper = "https://maps.google.com/maps?q=R+Juvenal+Mendonca,100,Uniao+dos+Palmares,AL&t=&z=16&ie=UTF8&iwloc=&output=embed";

    // Styles for Active/Inactive buttons
    const activeClass = ['bg-brand-red', 'text-white', 'shadow-glow', 'scale-105', 'ring-2', 'ring-brand-red', 'ring-offset-2', 'ring-offset-slate-900'];
    const inactiveClass = ['bg-slate-800', 'text-slate-400', 'hover:bg-slate-700', 'hover:text-white'];

    function setMap(type) {
        if (type === 'farma') {
            // Update Map
            mapIframe.src = mapUrlFarma;
            
            // Update Info Text
            infoFarma.classList.remove('hidden');
            infoHiper.classList.add('hidden');

            // Update Buttons
            btnFarma.classList.add(...activeClass);
            btnFarma.classList.remove(...inactiveClass);
            
            btnHiper.classList.remove(...activeClass);
            btnHiper.classList.add(...inactiveClass);
            
        } else {
            // Update Map
            mapIframe.src = mapUrlHiper;

            // Update Info Text
            infoFarma.classList.add('hidden');
            infoHiper.classList.remove('hidden');

            // Update Buttons
            btnHiper.classList.add(...activeClass);
            btnHiper.classList.remove(...inactiveClass);

            btnFarma.classList.remove(...activeClass);
            btnFarma.classList.add(...inactiveClass);
        }
    }

    btnFarma.addEventListener('click', () => setMap('farma'));
    btnHiper.addEventListener('click', () => setMap('hiper'));
});