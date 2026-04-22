/**
 * THREE SIXTY GYM - MAIN.JS
 * Interactivité : menu mobile, planning dynamique, validation formulaires, etc.
 */

document.addEventListener('DOMContentLoaded', function() {

    // ---------- 1. MENU MOBILE ----------
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('open');
            // Changer le symbole (optionnel)
            menuToggle.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
        });
        
        // Fermer le menu si on clique sur un lien à l'intérieur
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                if (menuToggle) menuToggle.textContent = '☰';
            });
        });
        
        // Fermer le menu si on clique en dehors (sur le document)
        document.addEventListener('click', function(event) {
            if (mainNav.classList.contains('open') && !mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
                mainNav.classList.remove('open');
                menuToggle.textContent = '☰';
            }
        });
    }

    // ---------- 2. FILTRAGE DU PLANNING (schedule.html) ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const scheduleDays = document.querySelectorAll('.schedule-day');
    
    if (filterBtns.length && scheduleDays.length) {
        // Fonction de filtrage
        function filterSchedule(dayId) {
            scheduleDays.forEach(day => {
                if (dayId === 'all') {
                    day.style.display = 'block';
                } else {
                    if (day.getAttribute('data-day') === dayId) {
                        day.style.display = 'block';
                    } else {
                        day.style.display = 'none';
                    }
                }
            });
        }
        
        // Ajout des écouteurs sur chaque bouton
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const dayValue = this.getAttribute('data-day');
                filterSchedule(dayValue);
            });
        });
        
        // Initial : afficher tous les jours (déjà fait par CSS, mais on synchronise)
        filterSchedule('all');
    }
    
    // ---------- 3. FORMULAIRE DE RÉSERVATION (reservation.html) ----------
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des champs
            const course = document.getElementById('course');
            const date = document.getElementById('date');
            const time = document.getElementById('time');
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const paymentMethod = document.querySelector('input[name="payment"]:checked');
            
            let isValid = true;
            let errorMsg = '';
            
            // Validations simples
            if (!course.value) { isValid = false; errorMsg += 'Veuillez choisir un cours.\n'; }
            if (!date.value) { isValid = false; errorMsg += 'Veuillez choisir une date.\n'; }
            if (!time.value) { isValid = false; errorMsg += 'Veuillez choisir un horaire.\n'; }
            if (!name.value.trim()) { isValid = false; errorMsg += 'Veuillez entrer votre nom complet.\n'; }
            if (!email.value.trim() || !email.value.includes('@')) { isValid = false; errorMsg += 'Veuillez entrer un email valide.\n'; }
            if (!phone.value.trim()) { isValid = false; errorMsg += 'Veuillez entrer votre numéro de téléphone.\n'; }
            if (!paymentMethod) { isValid = false; errorMsg += 'Veuillez sélectionner un moyen de paiement.\n'; }
            
            if (!isValid) {
                alert('❌ ' + errorMsg);
                return;
            }
            
            // Simuler l'envoi (à remplacer par un vrai appel API)
            alert(`✅ Réservation confirmée pour ${name.value} (${course.value}) le ${date.value} à ${time.value}. Un email de confirmation va vous être envoyé.`);
            // Ici tu pourrais envoyer les données via fetch() à ton backend
            // bookingForm.reset(); // décommente si tu veux vider le formulaire
        });
    }
    
    // ---------- 4. FORMULAIRE DE CONTACT (contact.html) ----------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[placeholder="Votre nom"]');
            const emailInput = contactForm.querySelector('input[placeholder="Votre email"]');
            const phoneInput = contactForm.querySelector('input[placeholder="Votre téléphone"]');
            const messageTextarea = contactForm.querySelector('textarea');
            
            let isValid = true;
            let errorMsg = '';
            
            if (!nameInput.value.trim()) { isValid = false; errorMsg += 'Veuillez entrer votre nom.\n'; }
            if (!emailInput.value.trim() || !emailInput.value.includes('@')) { isValid = false; errorMsg += 'Veuillez entrer un email valide.\n'; }
            if (!messageTextarea.value.trim()) { isValid = false; errorMsg += 'Veuillez écrire un message.\n'; }
            
            if (!isValid) {
                alert('❌ ' + errorMsg);
                return;
            }
            
            alert(`📩 Merci ${nameInput.value}, votre message a bien été envoyé. Nous vous répondrons rapidement.`);
            // contactForm.reset();
        });
    }
    
    // ---------- 5. SMOOTH SCROLL (pour les ancres si besoin) ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // ---------- 6. PETITE ANIMATION AU SCROLL (optionnelle) ----------
    // On ajoute une classe "scrolled" au header quand on descend
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ---------- 7. GESTION DES ERREURS DE CHARGEMENT D'IMAGES (optionnel) ----------
    // Remplace les images manquantes par un placeholder gris
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.onerror = function() {
            this.style.backgroundColor = '#333';
            this.style.padding = '20px';
            this.style.textAlign = 'center';
            this.alt = 'Image non disponible';
        };
    });
    
    // ---------- 8. DYNAMIQUE SUR LE PLANNING : adaptation des cartes (déjà fait) ----------
    // Petit plus : si le planning est vide sur mobile, on ajuste l'affichage
    // Rien à faire de plus
    
    console.log('Three Sixty Gym - site prêt');
});