

export default function Picture({url})
{
    return(
        <div>
            <img className="h-[10rem] rounded-full" src={url} alt="profilePicture"/>
        </div>
    )
}