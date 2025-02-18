async function searchDisease() {
    const symptom = document.getElementById("symptom").value.trim();
    const resultBox = document.getElementById("result");
    const loading = document.getElementById("loading");

    if (symptom.length < 3) {
        resultBox.style.display = "block";
        resultBox.innerHTML = "অনুগ্রহ করে আরও বিস্তারিত লিখুন।";
        return;
    }

    resultBox.style.display = "none";
    loading.style.display = "block";

    try {
        const response = await fetch("https://disease.sh/v3/covid-19/all");
        const data = await response.json();

        let resultHTML = `<h2>সম্ভাব্য রোগ:</h2>`;
        resultHTML += `<b>COVID-19</b>: ${data.cases} মোট আক্রান্ত, ${data.deaths} মোট মৃত্যু, ${data.recovered} মোট সুস্থ।<br>`;
        resultHTML += `<br><b>পরামর্শ:</b> নিকটস্থ হাসপাতালে যোগাযোগ করুন।`;

        resultBox.innerHTML = resultHTML;
        resultBox.style.display = "block";
    } catch (error) {
        resultBox.innerHTML = "ডাটা আনতে সমস্যা হচ্ছে, আবার চেষ্টা করুন।";
        resultBox.style.display = "block";
    } finally {
        loading.style.display = "none";
    }
}
