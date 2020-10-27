import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectView = () => {
    // @ts-ignore
    let { id } = useParams();
    return (
        <div>
            ProjectView {id}
        </div>
    )
}

export default ProjectView