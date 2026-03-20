$(document).ready(function() {
    $('#mobile_btn').on('click', function() {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });     

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if(scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if(scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })
        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    })

    ScrollReveal().reveal('.dish',{
        origin: 'left',
        duration: 2000,
        distance: '20%'
    })

    ScrollReveal().reveal('#testimonial_chef',{
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback',{
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })

    // ===== MODAL: FOTO DE PERFIL =====
    $(document).on('click', '.feedback-avatar', function() {
        const src = $(this).attr('src');
        const name = $(this).closest('.feedback').find('.feedback-content p:first-child').text().trim();
        $('#profile-modal-img').attr('src', src);
        $('#profile-modal-name').text(name);
        $('#profile-modal-overlay').addClass('active');
    });

    $('#profile-modal-close, #profile-modal-overlay').on('click', function(e) {
        if ($(e.target).is('#profile-modal-overlay') || $(e.target).closest('#profile-modal-close').length) {
            $('#profile-modal-overlay').removeClass('active');
        }
    });

    // ===== MODAL: LISTA DE COMENTÁRIOS =====
    const commentsData = {
        'Ana Maria': {
            count: '5 avaliações',
            comments: [
                { initials: 'JP', name: 'João Pedro', stars: 5, text: 'Comida incrível! Entrega rápida e tudo chegou quentinho. Com certeza pedirei novamente.' },
                { initials: 'LS', name: 'Letícia Souza', stars: 5, text: 'Concordo com a Ana! O atendimento é ótimo e os pratos são deliciosos. Super recomendo!' },
                { initials: 'RC', name: 'Roberto Costa', stars: 4, text: 'Muito bom! Só achei que poderia ter um pouco mais de tempero, mas no geral aprovado.' },
                { initials: 'FM', name: 'Fernanda Melo', stars: 5, text: 'Melhor hambúrguer da cidade, sem dúvida. Ingredientes frescos e porção generosa!' },
                { initials: 'TA', name: 'Thiago Alves', stars: 5, text: 'Já pedi várias vezes e nunca decepcionou. Recomendo de olhos fechados!' }
            ]
        },
        'Márcia Alcantara': {
            count: '2 avaliações',
            comments: [
                { initials: 'CL', name: 'Carla Lima', stars: 5, text: 'Também já experimentei e posso confirmar: vale muito a pena! Atendimento nota 10.' },
                { initials: 'BN', name: 'Bruno Nunes', stars: 4, text: 'Boa experiência! O pedido chegou no tempo prometido e a embalagem estava em perfeito estado.' }
            ]
        }
    };

    function buildCommentsList(data) {
        return data.comments.map(function(c) {
            const stars = Array(c.stars).fill('<i class="fa-solid fa-star"></i>').join('');
            return `
                <div class="comment-item">
                    <div class="comment-avatar">${c.initials}</div>
                    <div class="comment-body">
                        <span class="comment-name">${c.name}</span>
                        <span class="comment-stars">${stars}</span>
                        <span class="comment-text">${c.text}</span>
                    </div>
                </div>`;
        }).join('');
    }

    $(document).on('click', '.feedback-info, .feedback-respostas', function() {
        const feedbackEl = $(this).closest('.feedback');
        const name = feedbackEl.find('.feedback-content p:first-child').text().trim();
        const data = commentsData[name] || { count: 'Avaliações', comments: [] };

        $('#comments-modal-title').text('Avaliações de ' + name);
        $('#comments-modal-count').text(data.count);
        $('#comments-list').html(buildCommentsList(data));
        $('#comments-modal-overlay').addClass('active');
    });

    $('#comments-modal-close, #comments-modal-overlay').on('click', function(e) {
        if ($(e.target).is('#comments-modal-overlay') || $(e.target).closest('#comments-modal-close').length) {
            $('#comments-modal-overlay').removeClass('active');
        }
    });

    // Fechar modais com tecla Escape
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('#profile-modal-overlay').removeClass('active');
            $('#comments-modal-overlay').removeClass('active');
        }
    });
});