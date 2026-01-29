   // =========== TIMELINE DATA ===========
        const timelineData = [
            {
                phase: "Phase 1",
                duration: "Weeks 1-3",
                focus: "Web Foundations",
                focusDetails: ["HTML5", "CSS3", "JavaScript Basics", "Responsive Design", "Git & GitHub"],
                description: "Build strong foundations in web technologies. Learn to create responsive websites and understand version control.",
                progress: 75,
                status: "in-progress"
            },
            {
                phase: "Phase 2",
                duration: "Weeks 4-6",
                focus: "Advanced JavaScript & Vue.js",
                focusDetails: ["ES6+", "Vue.js Framework", "API Integration", "State Management", "Component Architecture"],
                description: "Master modern JavaScript and build dynamic web applications with Vue.js framework.",
                progress: 50,
                status: "in-progress"
            },
            {
                phase: "Phase 3",
                duration: "Weeks 7-9",
                focus: "Backend with PHP & Laravel",
                focusDetails: ["PHP Programming", "Laravel Framework", "MySQL Database", "REST APIs", "Authentication"],
                description: "Learn server-side programming with PHP and Laravel to build robust backend systems.",
                progress: 25,
                status: "upcoming"
            },
            {
                phase: "Phase 4",
                duration: "Weeks 10-12",
                focus: "Full-Stack Integration & Deployment",
                focusDetails: ["Project Integration", "Testing", "DevOps Basics", "Deployment", "Performance Optimization"],
                description: "Bring everything together by building and deploying a complete full-stack application.",
                progress: 0,
                status: "upcoming"
            }
        ];

        // =========== MODERN TABLE FUNCTIONALITY ===========
        
        // Initialize Timeline
        function initializeTimeline() {
            renderTable();
            renderCards();
            setupEventListeners();
        }
        
        // Render Table View
        function renderTable(data = timelineData) {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';
            
            data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.className = `phase-${index + 1}`;
                
                // Generate focus tags HTML
                const focusTags = item.focusDetails.map(tag => 
                    `<span class="focus-tag">${tag}</span>`
                ).join('');
                
                row.innerHTML = `
                    <td>
                        <span class="phase-indicator"></span>
                        <strong>${item.phase}</strong>
                        <div class="focus-tags">${focusTags}</div>
                    </td>
                    <td>
                        <span class="duration-badge">${item.duration}</span>
                    </td>
                    <td>
                        <strong>${item.focus}</strong>
                        <p style="margin: 5px 0 0 0; font-size: 0.9rem; color: #666;">${item.description}</p>
                    </td>
                    <td>
                        <div class="progress-container">
                            <div class="progress-bar"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 0.85rem;">
                            <span>${item.progress}% Complete</span>
                            <span style="color: #666;">${item.status}</span>
                        </div>
                    </td>
                `;
                
                // Add click event
                row.addEventListener('click', () => {
                    alert(`Phase Details:\n\n${item.phase}\n${item.duration}\n\n${item.description}`);
                });
                
                tableBody.appendChild(row);
            });
            
            // Animate progress bars
            setTimeout(() => {
                document.querySelectorAll('.progress-bar').forEach(bar => {
                    bar.style.width = bar.style.width;
                });
            }, 100);
        }
        
        // Render Card View
        function renderCards(data = timelineData) {
            const cardView = document.getElementById('cardView');
            cardView.innerHTML = '';
            
            data.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = `phase-card phase-${index + 1}`;
                
                // Generate focus tags HTML
                const focusTags = item.focusDetails.map(tag => 
                    `<span class="focus-tag">${tag}</span>`
                ).join('');
                
                card.innerHTML = `
                    <div class="card-header">
                        <div class="card-phase">${item.phase}</div>
                        <div class="card-duration">${item.duration}</div>
                    </div>
                    
                    <div class="card-content">
                        <h3 style="margin: 0 0 10px 0; color: #2c3e50;">${item.focus}</h3>
                        <p style="color: #666; line-height: 1.5;">${item.description}</p>
                        
                        <div class="card-tags">
                            ${focusTags}
                        </div>
                        
                        <div class="card-progress">
                            <div class="card-progress-label">
                                <span>Progress</span>
                                <span>${item.progress}%</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar"></div>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-top: 5px; font-size: 0.85rem;">
                                <span>Status: ${item.status}</span>
                                <span>${item.duration}</span>
                            </div>
                        </div>
                    </div>
                `;
                
                // Add click event
                card.addEventListener('click', () => {
                    alert(`Phase Details:\n\n${item.phase}\n${item.duration}\n\n${item.description}`);
                });
                
                cardView.appendChild(card);
            });
        }
        
        // Setup Event Listeners
        function setupEventListeners() {
            // View Toggle
            document.getElementById('tableViewBtn').addEventListener('click', () => {
                document.getElementById('tableView').classList.add('active');
                document.getElementById('cardView').classList.remove('active');
                document.getElementById('tableViewBtn').classList.add('active');
                document.getElementById('cardViewBtn').classList.remove('active');
            });
            
            document.getElementById('cardViewBtn').addEventListener('click', () => {
                document.getElementById('tableView').classList.remove('active');
                document.getElementById('cardView').classList.add('active');
                document.getElementById('tableViewBtn').classList.remove('active');
                document.getElementById('cardViewBtn').classList.add('active');
            });
            
            // Search Functionality
            document.getElementById('timelineSearch').addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredData = timelineData.filter(item => 
                    item.phase.toLowerCase().includes(searchTerm) ||
                    item.focus.toLowerCase().includes(searchTerm) ||
                    item.description.toLowerCase().includes(searchTerm) ||
                    item.focusDetails.some(tag => tag.toLowerCase().includes(searchTerm))
                );
                renderTable(filteredData);
                renderCards(filteredData);
            });
            
            // Filter Functionality
            document.getElementById('phaseFilter').addEventListener('change', (e) => {
                const filterValue = e.target.value;
                let filteredData = timelineData;
                
                if (filterValue !== 'all') {
                    const phaseNumber = filterValue.split('-')[1];
                    filteredData = timelineData.filter((_, index) => index === parseInt(phaseNumber) - 1);
                }
                
                renderTable(filteredData);
                renderCards(filteredData);
            });
            
            // Table Sorting
            const tableHeaders = document.querySelectorAll('.sortable');
            let currentSort = { column: 'phase', direction: 'asc' };
            
            tableHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const column = header.getAttribute('data-sort');
                    
                    // Update sort direction
                    if (currentSort.column === column) {
                        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
                    } else {
                        currentSort.column = column;
                        currentSort.direction = 'asc';
                    }
                    
                    // Update sort indicators
                    tableHeaders.forEach(h => {
                        h.classList.remove('sort-asc', 'sort-desc');
                    });
                    header.classList.add(`sort-${currentSort.direction}`);
                    
                    // Sort data
                    const sortedData = [...timelineData].sort((a, b) => {
                        const aValue = a[column] || '';
                        const bValue = b[column] || '';
                        
                        if (currentSort.direction === 'asc') {
                            return aValue.localeCompare(bValue);
                        } else {
                            return bValue.localeCompare(aValue);
                        }
                    });
                    
                    renderTable(sortedData);
                });
            });
        }

        // =========== REPETITIVE JAVASCRIPT FUNCTIONS ===========
        
        // Function to check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to debounce frequent events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        // Function to throttle frequent events
        function throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
        
        // Function to generate unique ID
        function generateUniqueId(prefix = 'id') {
            return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        // =========== TABLE OF CONTENTS GENERATION ===========
        
        function generateTableOfContents() {
            const tocContainer = document.getElementById('tableOfContents');
            const headings = document.querySelectorAll('h2, h3');
            
            if (headings.length === 0) {
                tocContainer.innerHTML = '<p>No headings found for table of contents.</p>';
                return;
            }
            
            let tocHTML = '<h3>Table of Contents</h3><ul class="toc-list">';
            
            headings.forEach((heading, index) => {
                // Generate an ID if the heading doesn't have one
                if (!heading.id) {
                    heading.id = 'section-' + index + '-' + heading.textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                }
                
                tocHTML += `
                    <li>
                        <a href="#${heading.id}">
                            ${heading.textContent}
                        </a>
                    </li>
                `;
            });
            
            tocHTML += '</ul>';
            tocContainer.innerHTML = tocHTML;
            
            // Add smooth scrolling to TOC links
            const tocLinks = tocContainer.querySelectorAll('a');
            tocLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }
        
        // =========== SCROLL TO TOP BUTTON FUNCTIONALITY ===========
        
        function initScrollToTopButton() {
            const scrollButton = document.getElementById('scrollToTopBtn');
            
            // Show/hide button based on scroll position
            function toggleScrollButton() {
                if (window.scrollY > 300) {
                    scrollButton.style.display = 'block';
                } else {
                    scrollButton.style.display = 'none';
                }
            }
            
            // Scroll to top when button is clicked
            scrollButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Initial check and add scroll event listener
            toggleScrollButton();
            window.addEventListener('scroll', debounce(toggleScrollButton, 100));
        }
        
        // =========== GALLERY LIGHTBOX FUNCTIONALITY ===========
        
        // Gallery images data
        const galleryImages = [
            {
                src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'Coding Environment Setup'
            },
            {
                src: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'Learning HTML & CSS'
            },
            {
                src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'JavaScript Development'
            },
            {
                src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'Backend Programming'
            },
            {
                src: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'Web Design Principles'
            },
            {
                src: 'https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
                caption: 'Project Development'
            }
        ];
        
        function createGallery() {
            const galleryGrid = document.getElementById('galleryGrid');
            
            galleryImages.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.setAttribute('data-index', index);
                
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.caption;
                img.loading = 'lazy';
                
                galleryItem.appendChild(img);
                galleryGrid.appendChild(galleryItem);
                
                // Add click event to open lightbox
                galleryItem.addEventListener('click', () => openLightbox(index));
            });
        }
        
        function initLightbox() {
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightboxImage');
            const lightboxCaption = document.getElementById('lightboxCaption');
            const lightboxClose = document.getElementById('lightboxClose');
            const lightboxPrev = document.getElementById('lightboxPrev');
            const lightboxNext = document.getElementById('lightboxNext');
            
            let currentImageIndex = 0;
            
            // Open lightbox with specific image
            window.openLightbox = function(index) {
                currentImageIndex = index;
                updateLightbox();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
            
            // Close lightbox
            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }
            
            // Update lightbox content
            function updateLightbox() {
                const currentImage = galleryImages[currentImageIndex];
                lightboxImage.src = currentImage.src;
                lightboxCaption.textContent = currentImage.caption;
            }
            
            // Navigate to previous image
            function prevImage() {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateLightbox();
            }
            
            // Navigate to next image
            function nextImage() {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateLightbox();
            }
            
            // Event listeners
            lightboxClose.addEventListener('click', closeLightbox);
            lightboxPrev.addEventListener('click', prevImage);
            lightboxNext.addEventListener('click', nextImage);
            
            // Close lightbox when clicking outside the image
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (!lightbox.classList.contains('active')) return;
                
                switch(e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        prevImage();
                        break;
                    case 'ArrowRight':
                        nextImage();
                        break;
                }
            });
            
            // Swipe support for touch devices
            let touchStartX = 0;
            let touchEndX = 0;
            
            lightbox.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            lightbox.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                
                if (touchStartX - touchEndX > swipeThreshold) {
                    // Swipe left - next image
                    nextImage();
                } else if (touchEndX - touchStartX > swipeThreshold) {
                    // Swipe right - previous image
                    prevImage();
                }
            }
        }
        
        // =========== ACTIVE SECTION TRACKING FOR TOC ===========
        
        function initActiveSectionTracking() {
            function setActiveSection() {
                const sections = document.querySelectorAll('h2, h3, .goal-section, .contact-section, .gallery-section, .timeline-section');
                const tocLinks = document.querySelectorAll('.toc-list li');
                
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.scrollY >= (sectionTop - 150) && 
                        window.scrollY < (sectionTop + sectionHeight - 150)) {
                        const id = section.id || 
                                  (section.querySelector('h2') ? section.querySelector('h2').id : null) ||
                                  (section.querySelector('h3') ? section.querySelector('h3').id : null);
                        if (id) {
                            currentSection = '#' + id;
                        }
                    }
                });
                
                // Update active link in TOC
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    const linkElement = link.querySelector('a');
                    if (linkElement && linkElement.getAttribute('href') === currentSection) {
                        link.classList.add('active');
                    }
                });
            }
            
            // Update active section on scroll (throttled for performance)
            window.addEventListener('scroll', throttle(setActiveSection, 100));
            
            // Initial check
            setActiveSection();
        }
        
        // =========== INITIALIZE ALL FUNCTIONALITIES ===========
        
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all components
            generateTableOfContents();
            initScrollToTopButton();
            initializeTimeline();
            createGallery();
            initLightbox();
            initActiveSectionTracking();
            
            // Add some console logging for debugging
            console.log('All JavaScript functionalities initialized successfully!');
            console.log('- Modern Timeline with sorting, filtering, and search');
            console.log('- Gradient Table of Contents generated');
            console.log('- Premium About Me section with glassmorphism');
            console.log('- Scroll to Top button initialized');
            console.log('- Gallery with ' + galleryImages.length + ' images created');
            console.log('- Lightbox functionality ready');
        });