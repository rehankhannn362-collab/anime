/**
 * AnimeVerse - Main Application Orchestration
 * Handles rendering, filter states, modal operations, character vault, schedule, search, and UI events.
 */

class AnimeVerseApp {
    constructor() {
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.sortBy = 'rating';
        this.activeCharacterId = 'gojo';
        this.watchlist = JSON.parse(localStorage.getItem('animeverse_watchlist') || '[]');
        
        this.init();
    }

    init() {
        this.renderAnimeCards();
        this.renderMangaCards();
        this.renderCharacterVault();
        this.renderSchedule();
        this.bindEvents();
        this.initScrollEffects();
        this.updateWatchlistCount();
    }

    // --- ANIME CARDS RENDERING ---
    renderAnimeCards() {
        const grid = document.getElementById('anime-grid');
        if (!grid) return;

        let filtered = ANIME_DATA.filter(anime => {
            const matchesCategory = this.currentFilter === 'all' || 
                anime.category === this.currentFilter || 
                anime.genres.some(g => g.toLowerCase().replace(/\s+/g, '-') === this.currentFilter);
            
            const matchesSearch = this.searchQuery === '' || 
                anime.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                anime.japaneseTitle.includes(this.searchQuery) ||
                anime.genres.some(g => g.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
                anime.studio.toLowerCase().includes(this.searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });

        // Sorting
        if (this.sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        } else if (this.sortBy === 'episodes') {
            filtered.sort((a, b) => parseInt(b.episodes) - parseInt(a.episodes));
        } else if (this.sortBy === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3 class="empty-title">No Anime Found</h3>
                    <p class="empty-desc">No anime titles matched your search query "<strong>${this.searchQuery}</strong>". Try clearing filters or searching for another title.</p>
                    <button class="btn btn-secondary" onclick="window.animeApp.resetFilters()">Reset All Filters</button>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtered.map(anime => {
            const isSaved = this.watchlist.includes(anime.id);
            const genreBadges = anime.genres.slice(0, 3).map(g => `<span class="genre-pill">${g}</span>`).join('');

            return `
                <article class="anime-card tilt-card" data-id="${anime.id}">
                    <div class="card-glare"></div>
                    <div class="card-image-wrap">
                        <img src="${anime.poster}" alt="${anime.title}" class="card-poster" loading="lazy" />
                        <div class="card-overlay"></div>
                        <div class="card-top-badges">
                            <span class="score-badge">
                                <svg class="star-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                </svg>
                                ${anime.rating}
                            </span>
                            <button class="bookmark-btn ${isSaved ? 'active' : ''}" onclick="window.animeApp.toggleWatchlist('${anime.id}', event)" title="${isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="${isSaved ? '#ff2a85' : 'none'}" stroke="currentColor" stroke-width="2">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="card-studio-tag">${anime.studio}</div>
                    </div>

                    <div class="card-body">
                        <div class="card-meta-row">
                            <span class="card-episodes">
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
                                </svg>
                                ${anime.episodes}
                            </span>
                            <span class="card-japanese-title">${anime.japaneseTitle}</span>
                        </div>

                        <h3 class="card-title">${anime.title}</h3>
                        <p class="card-description">${anime.description}</p>

                        <div class="card-genres">
                            ${genreBadges}
                        </div>

                        <div class="card-footer">
                            <button class="btn btn-card-details" onclick="window.animeApp.openAnimeModal('${anime.id}')">
                                <span>VIEW DETAILS</span>
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    }

    // --- MANGA CARDS RENDERING ---
    renderMangaCards() {
        const container = document.getElementById('manga-grid');
        if (!container) return;

        container.innerHTML = MANGA_DATA.map(manga => {
            return `
                <div class="manga-card tilt-card" data-id="${manga.id}">
                    <div class="card-glare"></div>
                    <div class="manga-cover-wrap">
                        <img src="${manga.cover}" alt="${manga.title}" class="manga-cover" loading="lazy" />
                        <div class="manga-spine"></div>
                        <span class="manga-tag">${manga.tag}</span>
                    </div>
                    <div class="manga-content">
                        <div class="manga-meta">
                            <span class="manga-rating">⭐ ${manga.rating}</span>
                            <span class="manga-vol">${manga.volumes}</span>
                        </div>
                        <h4 class="manga-title">${manga.title}</h4>
                        <span class="manga-author">By ${manga.author}</span>
                        <p class="manga-synopsis">${manga.synopsis}</p>
                        <div class="manga-footer">
                            <span class="manga-status">${manga.status}</span>
                            <button class="btn btn-subtle" onclick="window.animeApp.showToast('Chapter preview for ${manga.title} unlocked!', 'success')">
                                Read Chapter 1
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // --- CHARACTER VAULT RENDERING ---
    renderCharacterVault() {
        const char = CHARACTER_VAULT.find(c => c.id === this.activeCharacterId) || CHARACTER_VAULT[0];
        
        // Render Selector Tabs
        const selectorContainer = document.getElementById('char-selector-list');
        if (selectorContainer) {
            selectorContainer.innerHTML = CHARACTER_VAULT.map(c => {
                const isActive = c.id === this.activeCharacterId;
                return `
                    <button class="char-thumb-btn ${isActive ? 'active' : ''}" onclick="window.animeApp.switchCharacter('${c.id}')" title="${c.name}">
                        <img src="${c.image}" alt="${c.name}" />
                        <span class="thumb-name">${c.name.split(' ')[0]}</span>
                    </button>
                `;
            }).join('');
        }

        // Render Active Character Showcase Display
        const displayContainer = document.getElementById('char-showcase-display');
        if (!displayContainer) return;

        const statBars = Object.entries(char.stats).map(([stat, val]) => {
            const statName = stat.toUpperCase();
            return `
                <div class="stat-row">
                    <div class="stat-header">
                        <span class="stat-name">${statName}</span>
                        <span class="stat-val">${val}/100</span>
                    </div>
                    <div class="stat-track">
                        <div class="stat-fill" style="width: ${val}%; background: linear-gradient(90deg, #ff2a85, ${char.glowColor}); box-shadow: 0 0 12px ${char.glowColor};"></div>
                    </div>
                </div>
            `;
        }).join('');

        const abilitiesList = char.abilities.map(a => `<li class="ability-pill">⚡ ${a}</li>`).join('');

        displayContainer.innerHTML = `
            <div class="char-spotlight-card" style="--char-glow: ${char.glowColor}">
                <div class="char-art-col">
                    <div class="char-art-aura" style="background: radial-gradient(circle, ${char.glowColor}44 0%, transparent 70%);"></div>
                    <img src="${char.image}" alt="${char.name}" class="char-featured-img" />
                    <div class="char-kanji-watermark">${char.japaneseName}</div>
                </div>

                <div class="char-info-col">
                    <div class="char-badge-row">
                        <span class="char-anime-tag">${char.anime}</span>
                        <span class="char-title-tag">${char.title}</span>
                    </div>

                    <h3 class="char-main-name">${char.name} <span class="char-sub-kanji">${char.japaneseName}</span></h3>
                    <blockquote class="char-quote">${char.quote}</blockquote>

                    <div class="char-stats-section">
                        <h4 class="section-micro-title">COMBAT & AURA METRICS</h4>
                        <div class="stats-grid">
                            ${statBars}
                        </div>
                    </div>

                    <div class="char-abilities-section">
                        <h4 class="section-micro-title">SIGNATURE TECHNIQUES</h4>
                        <ul class="abilities-list">
                            ${abilitiesList}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    switchCharacter(charId) {
        this.activeCharacterId = charId;
        this.renderCharacterVault();
        if (window.audioEngine) window.audioEngine.playModalOpenSound();
    }

    // --- AIRING SCHEDULE RENDERING ---
    renderSchedule() {
        const tabsContainer = document.getElementById('schedule-day-tabs');
        const contentContainer = document.getElementById('schedule-day-content');
        if (!tabsContainer || !contentContainer) return;

        const currentDayIndex = new Date().getDay(); // 0 is Sunday
        const daysOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const todayName = daysOrder[currentDayIndex];

        let selectedDay = this.selectedScheduleDay || todayName;

        tabsContainer.innerHTML = AIRING_SCHEDULE.map(item => {
            const isActive = item.day === selectedDay;
            return `
                <button class="schedule-tab-btn ${isActive ? 'active' : ''}" onclick="window.animeApp.switchScheduleDay('${item.day}')">
                    <span class="tab-jp-day">${item.japaneseDay}</span>
                    <span class="tab-en-day">${item.day.slice(0, 3)}</span>
                </button>
            `;
        }).join('');

        const activeDayData = AIRING_SCHEDULE.find(d => d.day === selectedDay) || AIRING_SCHEDULE[0];

        contentContainer.innerHTML = `
            <div class="schedule-list">
                ${activeDayData.shows.map(show => `
                    <div class="schedule-item">
                        <div class="schedule-time-col">
                            <span class="time-main">${show.time}</span>
                            <span class="time-badge">${show.tag}</span>
                        </div>
                        <div class="schedule-info-col">
                            <h4 class="show-title">${show.title}</h4>
                            <div class="show-meta">
                                <span class="show-ep">${show.ep}</span>
                                <span class="show-studio">Studio: ${show.studio}</span>
                            </div>
                        </div>
                        <button class="btn btn-notify" onclick="window.animeApp.showToast('Reminder set for ${show.title}!', 'info')">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                            </svg>
                            Set Alert
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    switchScheduleDay(day) {
        this.selectedScheduleDay = day;
        this.renderSchedule();
    }

    // --- ANIME DETAILS MODAL ---
    openAnimeModal(animeId) {
        const anime = ANIME_DATA.find(a => a.id === animeId);
        if (!anime) return;

        const modal = document.getElementById('anime-modal');
        const modalContent = document.getElementById('modal-dynamic-content');
        if (!modal || !modalContent) return;

        const isSaved = this.watchlist.includes(anime.id);

        modalContent.innerHTML = `
            <div class="modal-hero-banner" style="background-image: url('${anime.banner}');">
                <div class="banner-gradient-overlay"></div>
                <button class="modal-close-btn" onclick="window.animeApp.closeAnimeModal()" aria-label="Close modal">&times;</button>
                <div class="banner-badge-bar">
                    <span class="modal-rank-tag">${anime.rank}</span>
                    <span class="modal-status-tag">${anime.status}</span>
                </div>
            </div>

            <div class="modal-body-content">
                <div class="modal-layout-grid">
                    <div class="modal-poster-col">
                        <img src="${anime.poster}" alt="${anime.title}" class="modal-poster-img" />
                        <div class="modal-quick-stats">
                            <div class="stat-box">
                                <span class="label">SCORE</span>
                                <span class="val text-gold">⭐ ${anime.rating}</span>
                            </div>
                            <div class="stat-box">
                                <span class="label">VOTES</span>
                                <span class="val">${anime.votes}</span>
                            </div>
                            <div class="stat-box">
                                <span class="label">EPISODES</span>
                                <span class="val">${anime.episodes}</span>
                            </div>
                            <div class="stat-box">
                                <span class="label">STUDIO</span>
                                <span class="val">${anime.studio}</span>
                            </div>
                        </div>

                        <button class="btn btn-primary btn-block ${isSaved ? 'btn-danger' : ''}" onclick="window.animeApp.toggleWatchlist('${anime.id}', event); window.animeApp.openAnimeModal('${anime.id}');">
                            ${isSaved ? '✓ REMOVE FROM WATCHLIST' : '+ ADD TO WATCHLIST'}
                        </button>
                    </div>

                    <div class="modal-info-col">
                        <div class="modal-title-wrap">
                            <h2 class="modal-anime-title">${anime.title}</h2>
                            <span class="modal-japanese-title">${anime.japaneseTitle} (${anime.romaji})</span>
                        </div>

                        <div class="modal-genre-pills">
                            ${anime.genres.map(g => `<span class="genre-pill glow">${g}</span>`).join('')}
                        </div>

                        <div class="modal-section">
                            <h4 class="modal-sec-title">SYNOPSIS</h4>
                            <p class="modal-synopsis-text">${anime.synopsis}</p>
                        </div>

                        <div class="modal-section">
                            <h4 class="modal-sec-title">OFFICIAL TRAILER SIMULATOR</h4>
                            <div class="trailer-preview-frame">
                                <iframe src="${anime.trailerUrl}" title="${anime.title} Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>

                        <div class="modal-section">
                            <h4 class="modal-sec-title">MAIN CHARACTER CAST</h4>
                            <div class="modal-cast-row">
                                ${anime.characters ? anime.characters.map(c => `
                                    <div class="cast-card">
                                        <img src="${c.avatar}" alt="${c.name}" class="cast-avatar" />
                                        <div class="cast-info">
                                            <span class="cast-name">${c.name}</span>
                                            <span class="cast-role">${c.role}</span>
                                            <span class="cast-voice">VA: ${c.voice}</span>
                                        </div>
                                    </div>
                                `).join('') : '<p>Cast details available in full databook.</p>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (window.audioEngine) window.audioEngine.playModalOpenSound();
    }

    closeAnimeModal() {
        const modal = document.getElementById('anime-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // --- WATCHLIST OPERATIONS ---
    toggleWatchlist(animeId, event) {
        if (event) event.stopPropagation();

        const index = this.watchlist.indexOf(animeId);
        const anime = ANIME_DATA.find(a => a.id === animeId);
        const title = anime ? anime.title : 'Anime';

        if (index > -1) {
            this.watchlist.splice(index, 1);
            this.showToast(`Removed "${title}" from your Watchlist.`, 'info');
        } else {
            this.watchlist.push(animeId);
            this.showToast(`Added "${title}" to your Watchlist! ⭐`, 'success');
        }

        localStorage.setItem('animeverse_watchlist', JSON.stringify(this.watchlist));
        this.updateWatchlistCount();
        this.renderAnimeCards();
    }

    updateWatchlistCount() {
        const countBadges = document.querySelectorAll('.watchlist-counter');
        countBadges.forEach(b => {
            b.textContent = this.watchlist.length;
            b.style.display = this.watchlist.length > 0 ? 'inline-flex' : 'none';
        });
    }

    showWatchlistModal() {
        const savedAnime = ANIME_DATA.filter(a => this.watchlist.includes(a.id));
        const modal = document.getElementById('anime-modal');
        const modalContent = document.getElementById('modal-dynamic-content');
        if (!modal || !modalContent) return;

        modalContent.innerHTML = `
            <div class="modal-watchlist-header">
                <button class="modal-close-btn" onclick="window.animeApp.closeAnimeModal()" aria-label="Close modal">&times;</button>
                <h2 class="section-title">YOUR SAVED WATCHLIST (${savedAnime.length})</h2>
                <p class="section-subtitle">Keep track of your favorite anime series and manga adaptations.</p>
            </div>
            <div class="modal-watchlist-body">
                ${savedAnime.length === 0 ? `
                    <div class="empty-state">
                        <div class="empty-icon">📖</div>
                        <h3 class="empty-title">Your Watchlist is Empty</h3>
                        <p class="empty-desc">Click the bookmark icon on any anime card to add it to your personal watchlist.</p>
                    </div>
                ` : `
                    <div class="watchlist-grid">
                        ${savedAnime.map(a => `
                            <div class="watchlist-item">
                                <img src="${a.poster}" alt="${a.title}" class="watchlist-poster" />
                                <div class="watchlist-details">
                                    <h4>${a.title}</h4>
                                    <span>⭐ ${a.rating} • ${a.episodes}</span>
                                    <p>${a.studio}</p>
                                </div>
                                <div class="watchlist-actions">
                                    <button class="btn btn-sm btn-primary" onclick="window.animeApp.openAnimeModal('${a.id}')">View</button>
                                    <button class="btn btn-sm btn-danger" onclick="window.animeApp.toggleWatchlist('${a.id}'); window.animeApp.showWatchlistModal();">Remove</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // --- TOAST NOTIFICATIONS ---
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast-item toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${type === 'success' ? '🌸' : (type === 'error' ? '⚠️' : '✨')}</div>
            <div class="toast-msg">${message}</div>
        `;

        container.appendChild(toast);

        // Slide in
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    resetFilters() {
        this.currentFilter = 'all';
        this.searchQuery = '';
        const searchInput = document.getElementById('anime-search-input');
        if (searchInput) searchInput.value = '';

        const filterBtns = document.querySelectorAll('.filter-chip');
        filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));

        this.renderAnimeCards();
    }

    // --- EVENT BINDINGS ---
    bindEvents() {
        // Filter Chips
        const filterChips = document.querySelectorAll('.filter-chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                this.currentFilter = chip.dataset.filter;
                this.renderAnimeCards();
            });
        });

        // Search Input
        const searchInput = document.getElementById('anime-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.trim();
                this.renderAnimeCards();
            });
        }

        // Sort Selector
        const sortSelect = document.getElementById('anime-sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.renderAnimeCards();
            });
        }

        // Sakura Toggle Button
        const sakuraToggleBtn = document.getElementById('sakura-toggle-btn');
        if (sakuraToggleBtn) {
            sakuraToggleBtn.addEventListener('click', () => {
                if (window.sakuraEngine) {
                    const isActive = window.sakuraEngine.toggle();
                    sakuraToggleBtn.classList.toggle('active', isActive);
                    this.showToast(isActive ? 'Sakura Petals enabled 🌸' : 'Sakura Petals paused', 'info');
                }
            });
        }

        // Audio Ambience Toggle Button
        const audioToggleBtn = document.getElementById('audio-toggle-btn');
        if (audioToggleBtn) {
            audioToggleBtn.addEventListener('click', () => {
                if (window.audioEngine) {
                    const isPlaying = window.audioEngine.toggleAmbient();
                    audioToggleBtn.classList.toggle('active', isPlaying);
                    this.showToast(isPlaying ? 'Cyberpunk Ambient Synth & SFX ON 🎵' : 'Audio Ambience Muted', 'info');
                }
            });
        }

        // Mobile Nav Drawer Toggle
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-links-menu');
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('open');
                mobileToggle.classList.toggle('open');
            });

            // Close on link click
            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('open');
                    mobileToggle.classList.remove('open');
                });
            });
        }

        // Keyboard Shortcuts (Escape to close modals, Ctrl+K for search)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAnimeModal();
                this.closeSearchModal();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearchModal();
            }
        });

        // Newsletter Form
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showToast('Demo only: connect a newsletter service before collecting subscriptions.', 'info');
            });
        }

        // Contact Form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showToast('Demo only: connect a form service before sending messages.', 'info');
            });
        }
    }

    // --- QUICK SEARCH MODAL ---
    openSearchModal() {
        const modal = document.getElementById('quick-search-modal');
        const input = document.getElementById('quick-search-input');
        if (modal && input) {
            modal.classList.add('active');
            setTimeout(() => input.focus(), 50);
            this.handleQuickSearch('');
        }
    }

    closeSearchModal() {
        const modal = document.getElementById('quick-search-modal');
        if (modal) modal.classList.remove('active');
    }

    handleQuickSearch(val) {
        const resultsContainer = document.getElementById('quick-search-results');
        if (!resultsContainer) return;

        const q = val.toLowerCase();
        const matches = ANIME_DATA.filter(a => 
            a.title.toLowerCase().includes(q) ||
            a.japaneseTitle.includes(q) ||
            a.genres.some(g => g.toLowerCase().includes(q))
        ).slice(0, 6);

        if (matches.length === 0) {
            resultsContainer.innerHTML = `<div class="quick-no-match">No results found for "${val}"</div>`;
            return;
        }

        resultsContainer.innerHTML = matches.map(a => `
            <div class="quick-result-item" onclick="window.animeApp.openAnimeModal('${a.id}'); window.animeApp.closeSearchModal();">
                <img src="${a.poster}" alt="${a.title}" />
                <div class="res-info">
                    <strong>${a.title}</strong>
                    <span>${a.japaneseTitle} • ⭐ ${a.rating}</span>
                </div>
                <span class="res-action">View →</span>
            </div>
        `).join('');
    }

    // --- SCROLL EFFECTS & NAVBAR BLUR ---
    initScrollEffects() {
        const navbar = document.getElementById('main-navbar');
        const backToTopBtn = document.getElementById('back-to-top-btn');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            if (navbar) {
                if (scrollY > 60) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }

            if (backToTopBtn) {
                if (scrollY > 500) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }

            // Scrollspy active state
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(sec => {
                const top = sec.offsetTop - 120;
                const height = sec.offsetHeight;
                const id = sec.getAttribute('id');
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        });

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.animeApp = new AnimeVerseApp();
});
