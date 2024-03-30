

export default function PNG({generalInformation})
{
    
    return(
    <div className="z-80 absolute bg-yellow-300 p-5 rounded-xl text-black top-[30%] w-[90%] font-semibold text-[0.7rem] font-[Roboto]">
        <img className="h-[8rem] rounded-2xl" src={generalInformation.imageURL}alt="" />
        <h1>Contributions : {generalInformation.contributions}</h1>
        <img src={generalInformation.contributionsGraph} className="opacity-[1]" alt="Name Your Github chart"/>

    </div>
    )
}


