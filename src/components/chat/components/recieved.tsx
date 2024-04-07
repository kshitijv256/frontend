
export default function Recieved(prop:any){
    return(
        <div className="flex rounded-t-xl rounded-br-xl max-w-xl bg-gray-300 text-black dark:bg-gray-700 dark:text-white px-5 py-2 align-bottom">
            {prop.value}
        </div>
    );
}