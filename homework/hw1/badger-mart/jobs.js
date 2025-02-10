function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    let jobs = document.getElementsByName("job");
    let selectItem = false;
    for (let job of jobs){
        if (job.checked){
            selectItem = true
            alert(`Thank you for applying to be a ${job.value}!`);
        }
    }

    if (!selectItem){
        alert("Please select a job!");
    }
}