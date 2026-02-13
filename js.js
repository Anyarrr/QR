document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contractForm');
    const input = document.getElementById('contractNumber');
    const submitBtn = form.querySelector('.btn-submit');
    
    // Фокус на поле ввода при загрузке страницы
    input.focus();
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const contractNumber = input.value.trim();
        
        if (!contractNumber) {
            input.focus();
            return;
        }
        
        // Блокируем кнопку во время перехода
        submitBtn.disabled = true;
        submitBtn.textContent = 'Переход...';
        
        // Формируем URL и перенаправляем
        const url = `https://artelmik.ru/external-payment.html?contract=${encodeURIComponent(contractNumber)}`;
        
        // Небольшая задержка для лучшего UX
        setTimeout(function() {
            window.location.href = url;
        }, 300);
    });
    
    // Фильтрация ввода - только цифры
    input.addEventListener('input', function(e) {
        // Удаляем все символы кроме цифр
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    // Предотвращаем вставку нецифровых символов
    input.addEventListener('paste', function(e) {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text');
        const numbersOnly = paste.replace(/[^0-9]/g, '');
        this.value = numbersOnly;
    });
    
    // Обработка клавиатуры - только цифры и служебные клавиши
    input.addEventListener('keypress', function(e) {
        // Разрешаем Enter для отправки формы
        if (e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
            return;
        }
        
        // Разрешаем только цифры (0-9)
        const isNumber = (e.key >= '0' && e.key <= '9');
        if (!isNumber) {
            e.preventDefault();
        }
    });
});
