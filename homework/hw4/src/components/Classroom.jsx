import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import Student from "./Student";

const Classroom = () => {
    const [originalData, setOriginalData] = useState([]);
    const [students, setStudents] = useState([]);
    const [nameSearched, setNameSearched] = useState([]);
    const [majorSearched, setMajorSearched] = useState([]);
    const [interestSearched, setInterestSearched] = useState([]);
    const [page, setPage] = useState(1);

    // filter data per required
    useEffect(() => {
        let filteredStudents = originalData
            .filter(s => {
                let fullName = `${s.name.first} ${s.name.last}`;
                return fullName.toLowerCase().includes(nameSearched);
            })
            .filter(s => s.major.toLowerCase().includes(majorSearched))
            .filter(s => {
                for (let interest of s.interests) {
                    if (interest.toLowerCase().includes(interestSearched)) {
                        return true;
                    }
                }
                return false;
            })
        setStudents(filteredStudents)
    }, [originalData, nameSearched, majorSearched, interestSearched])

    // fetch original data
    useEffect(() => {
        fetch("https://cs571.org/rest/f24/hw4/students", {
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
                setOriginalData(data)
                setStudents(data)
            })
    }, [])

    function reset() {
        setNameSearched("");
        setMajorSearched("");
        setInterestSearched("");
    }

    // change page number dynamically
    const buildPaginator = () => {
        let pages = [];
        const numPages = Math.ceil(students.length / 24);
        for (let i = 1; i <= numPages; i++) {
            pages.push(
            <Pagination.Item 
                key={i}
                onClick={() => setPage(i)} 
                active={page === i}>
                {i}
            </Pagination.Item>
            )
        }
        return pages;
    }

    const buildPrevButton = () => {
        return <Pagination.Item 
            key={0}
            onClick={() => setPage(n => n > 1 ? n - 1: n)} >
            Previous
        </Pagination.Item>
    }

    const buildNextButton = () => {
        const numPages = Math.ceil(students.length / 24);
        return <Pagination.Item 
            key={numPages}
            onClick={() => setPage(n => n < numPages ? n + 1: n)} >
            Next
        </Pagination.Item>
    }

    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={nameSearched} onChange={(e) => setNameSearched(e.target.value.toLowerCase())} />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={majorSearched} onChange={(e) => setMajorSearched(e.target.value.toLowerCase())} />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={interestSearched} onChange={(e) => setInterestSearched(e.target.value.toLowerCase())} />
            <br />
            <Button variant="neutral" onClick={reset}> Reset Search</Button>
            <br />
            <br />
            <p>There are {students.length} student(s) matching your search.</p>
        </Form>
        <Container fluid>
            <Row>
                {
                    students.slice(((page) - 1) * 24, page * 24).map(s => <Col xs={12} sm={12} md={6} lg={4} xl={3} key={s.id}>
                        <Student {...s} />
                    </Col>)
                }
            </Row>
        </Container>
        <Pagination>
            {buildPrevButton()}
            {buildPaginator()}
            {buildNextButton()}
        </Pagination>
    </div>

}

export default Classroom;