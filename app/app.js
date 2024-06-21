const $pricingRange = document.getElementById("pricing-range");
const $numberViews = document.getElementById("number-views");
 const $form = document.querySelector("form");
 const $price = document.getElementById("price");
 const $billingFreq = document.getElementById("billing-freq");
const $frequency = document.getElementById("frequency");

console.log($pricingRange, $numberViews, $form, $price, $billingFreq, $frequency);
 

const VIEWS_DATA = [
    {
        pageViews: '10k',
        monthlyCost: 8,
        leftPercentage: 0
    },
    {
        pageViews: '50k',
        monthlyCost: 12,
        leftPercentage: 25
    },
    {
        pageViews: '100k',
        monthlyCost: 16,
        leftPercentage: 50
    },
    {
        pageViews: '500k',
        monthlyCost: 24,
        leftPercentage: 75
    },
    {
        pageViews: '1M',
        monthlyCost: 36,
        leftPercentage: 100
    }
]

$form.addEventListener ("submit", e => {
    e.preventDefault();
});

const getData = () => {
    const valueRange = $pricingRange.value;
    const index = valueRange - 1;
    return { pageViews, monthlyCost, leftPercentage} = VIEWS_DATA[index];
}

const updatePageViews = () => {
    const { pageViews } = getData()
    $numberViews.textContent = `${pageViews}`
}

const isAnnualFrequency = ()  => {
    return $billingFreq.checked;
}

const updateCost = () => {
    const {monthlyCost} = getData();
    const isAnnual = isAnnualFrequency();
    const price = isAnnual ? ((monthlyCost * 12) * 0.75) : monthlyCost;
    $price.textContent = `${price}`;
    if(isAnnual) {$frequency.textContent = ' / year' } else {
        $frequency.textContent = " / month";
    }
}

const updatePercentage = () => {
    const {leftPercentage} = getData();
    $form.style.setProperty("--left", leftPercentage)
    console.log($form.style.getPropertyValue("--left"));
}


const updateFormOnRangeInput = () => {
    updatePageViews();
    updateCost();
    updatePercentage();
}

$pricingRange.addEventListener("input", updateFormOnRangeInput);

$billingFreq.addEventListener("input", updateCost)