/* ============================================
   INITIALIZATION
   ============================================ */
// Initialize Lucide icons and Chart.js defaults
lucide.createIcons();
Chart.defaults.color = '#64748b';
Chart.defaults.borderColor = '#334155';

/* ============================================
   MAIN NAVIGATION TABS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons
            navButtons.forEach(b => b.classList.remove('active', 'text-white'));
            btn.classList.add('active', 'text-white');
            
            // Show corresponding content and hide others
            const targetId = btn.dataset.tab;
            tabContents.forEach(content => {
                if(content.id === targetId) {
                    content.classList.remove('hidden');
                    content.classList.remove('animate-fade-in');
                    void content.offsetWidth; // Force reflow for animation restart
                    content.classList.add('animate-fade-in');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });

    /* ============================================
       SQLI SUB-NAVIGATION
       ============================================ */
    const sqliBtns = document.querySelectorAll('.sqli-btn');
    const sqliContents = document.querySelectorAll('.sqli-content');

    sqliBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sqliBtns.forEach(b => b.classList.remove('active-sub'));
            btn.classList.add('active-sub');
            
            const targetSub = btn.dataset.sub;
            sqliContents.forEach(content => {
                content.classList.add('hidden');
                if(content.id === targetSub) {
                    content.classList.remove('hidden');
                    content.classList.remove('animate-fade-in');
                    void content.offsetWidth; // Force reflow for animation restart
                    content.classList.add('animate-fade-in');
                }
            });
        });
    });
    
    // Auto-click first sub-tab if available
    if(sqliBtns.length > 0) sqliBtns[0].click();

    /* ============================================
       ACCORDION FUNCTIONALITY
       ============================================ */
    const accordionContainer = document.getElementById('accordion-container');
    if (accordionContainer) {
        accordionContainer.addEventListener('click', (e) => {
            const header = e.target.closest('.accordion-header');
            if (!header) return;
            
            const content = header.nextElementSibling;
            content.classList.toggle('hidden');
            
            // Toggle icon between plus and minus
            if (content.classList.contains('hidden')) {
                 header.querySelector('span:last-child').innerHTML = '<i data-lucide="plus"></i>';
            } else {
                 header.querySelector('span:last-child').innerHTML = '<i data-lucide="minus"></i>';
            }
            lucide.createIcons();
        });
    }

    /* ============================================
       CHART VISUALIZATION
       ============================================ */
    const ctxEvo = document.getElementById('evolutionChart');
    if (ctxEvo) {
        new Chart(ctxEvo, {
            type: 'line',
            data: {
                labels: ['2013', '2017', '2020', '2024', '2025+'],
                datasets: [{
                    label: 'Complejidad de Ataques',
                    data: [20, 50, 70, 90, 100],
                    borderColor: '#00B0F0',
                    backgroundColor: 'rgba(0, 176, 240, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Impacto Financiero',
                    data: [10, 60, 80, 95, 100],
                    borderColor: '#D86ECC',
                    backgroundColor: 'rgba(216, 110, 204, 0)',
                    borderDash: [5, 5],
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            title: (ctx) => `Año: ${ctx[0].label}`,
                            label: (ctx) => {
                                let desc = '';
                                if(ctx.label === '2013') desc = ' (Cryptolocker)';
                                if(ctx.label === '2017') desc = ' (Wannacry)';
                                if(ctx.label === '2020') desc = ' (Doble Extorsión)';
                                if(ctx.label === '2024') desc = ' (Triple Extorsión)';
                                if(ctx.label === '2025+') desc = ' (IA & Cloud)';
                                return `${ctx.dataset.label}: ${ctx.raw}%${desc}`;
                            }
                        }
                    }
                },
                scales: {
                    y: { display: false, min: 0, max: 110 },
                    x: { grid: { color: '#2d3748' } }
                }
            }
        });
    }
});
