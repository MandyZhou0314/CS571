function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	fetch("https://cs571.org/rest/f24/hw2/students", {
		headers: {
			"X-CS571-ID": CS571.getBadgerId()
		}
	})

	.then(res => {
		if (res.status === 200 || res.status === 304) {
			return res.json()
		} else {
			throw new Error();
		}
	})

	.then(data => {
		let students = data

		let nameSearched = document.getElementById("search-name").value.trim().toLowerCase();
		let majorSearched = document.getElementById("search-major").value.trim().toLowerCase();
		let interestSearched = document.getElementById("search-interest").value.trim().toLowerCase();

		// case-insensitive, substring, clear leading and trailing spaces search
		students = students
			.filter(s => {
				let fullName = `${s.name.first} ${s.name.last}`;
				return fullName.toLowerCase().includes(nameSearched);
			})
			.filter(s => s.major.toLowerCase().includes(majorSearched))
			//.filter(s => s.interests.join(' ').toLowerCase().includes(interestSearched)) // looks easier but may return incorrect result
			.filter(s => {
				for (let interest of s.interests) {
					if (interest.toLowerCase().includes(interestSearched)){
						return true;
					}
				}
				return false;
			})

		// show num of students in the bottom line
		const numRes = document.getElementById("num-results");
		numRes.innerText = `${students.length}`;

		const studentsContainer = document.getElementById("students");
		// clear the previous research results
		studentsContainer.innerHTML = '';

		// create a div for each student
		for (let student of students) {
			const studentDiv = document.createElement('div');

			// responsive degign based on devices
			studentDiv.classList.add('col-xs-12', 'col-sm-12', 'col-md-6', 'col-lg-4', 'col-xl-3');
			
			// add element of name 
			const name = document.createElement('h4');
			name.innerText = `${student.name.first} ${student.name.last}`;
			studentDiv.appendChild(name);

			//add element major
			const major = document.createElement('p');
			const strong = document.createElement("strong");
			strong.innerText = `${student.major}`
			major.appendChild(strong)
			studentDiv.appendChild(major);

			//add element interests
			const interestElement = document.createElement('ul');
			for (let interest of student.interests){
				const listItem = document.createElement('li');
				listItem.innerText = interest;

				// after clicking a interest, it will appear in interest search box and search again
				listItem.addEventListener("click", (e) => {
					const selectedText = e.target.innerText;
					document.getElementById("search-interest").value = selectedText
					handleSearch()
				})
				interestElement.appendChild(listItem)
			}
			studentDiv.appendChild(interestElement);

			// add each studentDiv into a container
			studentsContainer.appendChild(studentDiv);
		}
	})
	
	.catch(err => {
		console.error("Ah oh something went wrong.")
	})
	
}

document.getElementById("search-btn").addEventListener("click", handleSearch);