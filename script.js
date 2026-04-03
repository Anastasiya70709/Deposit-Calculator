const ratesData = {
    refill: {
        "6 месяцев": 20,
        "1 год": 22,
        "1.5 года": 15,
        "2 года": 10
    },
    fixed: {
        "3 месяца": 20,
        "6 месяцев": 22,
        "9 месяцев": 23,
        "1 год": 24,
        "1.5 года": 18,
        "2 года": 15
    }
};

const typeSelect = document.getElementById('depositType');
const termSelect = document.getElementById('depositTerm');
const amountInput = document.getElementById('amount');
const resultParagraph = document.getElementById('resultMessage');
const calcButton = document.getElementById('calculateBtn');

function updateTermOptions() {
    termSelect.innerHTML = '<option value="">-- Выберите срок --</option>';

    const selectedType = typeSelect.value;

    if (!selectedType || !ratesData[selectedType]) {
        termSelect.disabled = true;
        return;
    }

    termSelect.disabled = false;
    const termsForType = ratesData[selectedType];

    for (const termName in termsForType) {
        const rate = termsForType[termName];
        const option = document.createElement('option');
        option.value = termName;
        option.text = termName + ' (' + rate + '% годовых)';
        termSelect.appendChild(option);
    }
}

function getTypeName(typeValue) {
    if (typeValue === 'refill') return 'Пополняемый';
    if (typeValue === 'fixed') return 'Срочный';
    return '';
}

function termToYears(termText) {
    if (termText.indexOf('месяц') !== -1) {
        var months = parseInt(termText);
        return months / 12;
    } else if (termText.indexOf('год') !== -1) {
        if (termText === '1 год') return 1;
        if (termText === '1.5 года') return 1.5;
        if (termText === '2 года') return 2;
    }
    return 1;
}

function calculateDeposit() {
    var depositType = typeSelect.value;
    var termText = termSelect.value;
    var amount = parseFloat(amountInput.value);

    if (!depositType) {
        alert('Пожалуйста, выберите тип вклада');
        resultParagraph.innerHTML = '';
        return;
    }

    if (!termText) {
        alert('Пожалуйста, выберите срок вклада');
        resultParagraph.innerHTML = '';
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert('Пожалуйста, введите корректную сумму (больше 0)');
        resultParagraph.innerHTML = '';
        return;
    }

    var rate = ratesData[depositType][termText];

    if (!rate) {
        alert('Ошибка: ставка не найдена для выбранных параметров');
        return;
    }

    var years = termToYears(termText);
    var finalAmount = amount * Math.pow(1 + rate / 100, years);
    var profit = finalAmount - amount;
    var typeName = getTypeName(depositType);

    resultParagraph.innerHTML = 'Вклад: ' + typeName + ', срок: ' + termText + ', сумма: ' + amount.toFixed(2) + ' руб. Итоговая сумма в конце срока: ' + finalAmount.toFixed(2) + ' руб. (Начислено процентов: ' + profit.toFixed(2) + ' руб., ставка: ' + rate + '% годовых)';
}

typeSelect.addEventListener('change', function() {
    updateTermOptions();
    resultParagraph.innerHTML = '';
});

calcButton.addEventListener('click', calculateDeposit);

updateTermOptions();
