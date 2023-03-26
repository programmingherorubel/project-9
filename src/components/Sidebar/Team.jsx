import React from 'react'

import { useGetTeamQuery } from '../../features/team/teamApi'
import Error from '../shared/Error'
import Loading from '../shared/Loading'

const Team = () => {
    const { data: team, isError, isLoading } = useGetTeamQuery();

    // print on the ui 
    let content = null;
    if (isLoading) content = <Loading />;
    if (isError) content = <Error error="Error loading team members" />;
    if (!isError && !isLoading && team.length < 1) content = <Error error="No team members found" />;
    if (!isError && !isLoading && team.length > 0) content = team.map(member => {
        return (
            <div key={member.id} className="checkbox-container">
                <img src={member.avatar} className="team-avater" />
                <p className="label">{member.name}</p>
            </div>
        )
    })






    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold">Team Members</h3>
            <div className="mt-3 space-y-4">
                {content}
            </div>
        </div>

    )
}

export default Team