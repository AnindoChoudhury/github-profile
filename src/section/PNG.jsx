

export default function PNG({generalInformation})
{
    
    return(
    <div className="z-80 absolute bg-yellow-300 p-5 rounded-xl text-black top-[30%] w-[90%] font-semibold text-[0.7rem] font-[Roboto]">
        <img className="h-[6rem] rounded-2xl" src={generalInformation.imageURL}alt="" />
        <h1>Contributions : {generalInformation.contributions}</h1>
        <h1>Followers : {generalInformation.follower}</h1>
        <h1>Following : {generalInformation.following}</h1>
        <h1>Repos : {generalInformation.publicRepos}</h1>
        <h1>Collabs : {generalInformation.collabs}</h1>
        <h1>Commits : {generalInformation.numberOfCommits}</h1>
        <h1>Issues : {generalInformation.numberOfIssues}</h1>
        <h1>Merged : {generalInformation.merged}</h1>
        <h1>First merge : {generalInformation.firstMerge}</h1>
        <h1>Max Starred : {generalInformation.maxStarred}</h1>
        <img src={generalInformation.contributionsGraph} className="opacity-[1]" alt="Name Your Github chart"/>

    </div>
    )
}


