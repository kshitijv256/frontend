
export default function Sent(prop:any){
    return(
        <div className="flex rounded-t-xl rounded-bl-xl max-w-xl bg-blue-600 text-white px-5 py-2 align-bottom float-right">
            {prop.value}
        </div>
    );
}