import React, { useEffect, useState } from 'react';
import { db } from '../firebase'
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Backend from '../Backend';

const ProjectTable = () => {

    const [data, setData] = useState([]);
    const [entry, setEntry] = useState();

    const getProjects = async () => {
        await getDocs(collection(db, "projects"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setData(newData);
                console.log(data, newData);
            })
    }

    useEffect(() => {
        getProjects();
    }, []);

    const upvote = (doc) => {
        setEntry(doc);
        console.log(entry)
    }

    useEffect(() => {
        console.log("use")
        async function fetchData() {
            const docRef = doc(db, "projects", entry.id);
            console.log(docRef);
            const newVotes = entry.votes + 1;
            console.log(newVotes);
            await updateDoc(docRef, {
                votes: newVotes
            });
        }
        fetchData();
    }, [entry])

    const buildRow = (project) => {
        return (
            <div className='nes-container with-title is-rounded is-dark' id='project-row'>
                <h3 className="title">{project.title}</h3>
                <div className="projectDesc">
                <p>{project.desc}</p>
                <div className="votes">
                <p>{project.votes}</p>
                <i class="nes-icon is-large heart" onClick={() => upvote(project)}></i>
                </div>
                </div>
                <Backend subject={project.desc}/>
            </div>
        )
    }

    return (
        <div className="table nes-container with-title is-centered">
             <p class="title">Suggested projects</p>
            {data.map((project, i) => buildRow(project))}
        </div>
    );
}

export default ProjectTable;