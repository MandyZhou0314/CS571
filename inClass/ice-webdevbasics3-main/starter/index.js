// This is where your JS goes!

fetch('https://cs571api.cs.wisc.edu/rest/f24/ice/chili', {
    headers: {
        "X-CS571-ID": CS571.getBadgerId() // You may hardcode your Badger ID instead.
    }
})
.then(res => {
    console.log(res.status, res.statusText);
    if(res.status === 200) {
        return res.json();
    } else {
        throw new Error();
    }
})
.then(data => {
    console.log(data);

    console.log("The following are 5 stars reviews");
    console.log(data.reviews.filter(rev => rev.rating === 5));

    console.log("The following are important instructions");
    console.log(data.recipes.map(ins => ins.split(":")[0]));

    console.log("The follwing are ingredients");
    console.log(Object.keys(ing).map(ing => ing[ing].amount + " "+ ing));

    console.log("Is there some instruction to bake?");
    console.log(data.recipe.some(ins => ins.toLowerCase().includes("bake")));

    console.log("Is every review 4 or 5 stars?");
    console.log(data.reviews.every(rev => rev.rating === 4 || rev.rating === 5));

    console.log("What is the average review rating?");
    console.log(data.reviews.reduce((acc, cur) => acc + cur.rating, 0) / data.reviews.length);

    console.log("What are the unique units of ingredients?")
    console/log(Object.keys(data.ingredients).reduce((prev, curr) => {
        const ingreInfo = data.ingredients[curr];
        const unit = ingreInfo.unit;
        if (unit && !prev.includes(unit)){
            prev.push(unit);
        }
        return prev;
    }, []))
})
.catch(err => {
    alert("Uh oh! Something went wrong. Are you logged in with your Badger ID?")
})