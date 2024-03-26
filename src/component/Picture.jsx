

export default function Picture({url})
{
    const arr = ["#C69749","#FB2576"]; 
   
    const changeColor = ()=>
    {
        const random = Math.floor(Math.random()*arr.length)
        return(arr[random]);
    }

    return(
        <div className="hey h-[12rem] flex rounded-full justify-center items-center w-[12rem] border-2 border-[white] border-dashed">
            <img className="h-[10rem] rounded-full" src={url} alt="profilePicture"/>
        </div>
    )
}