export default function DashboardComp(){
    return (
        <div className="grid grid-cols-[20%_60%_20%] border grid-rows-[5%_1fr] h-screen">
            <div className="row-start-1 col-start-1 w-full border">
                Profile
            </div>
            <div className="row-start-1 col-start-2 h-full border">
                Dashboard title
            </div>
            <div className="row-start-1 col-start-3 h-full border">
                Notifications
            </div>
            <div className="row-start-2 col-start-1 flex justify-center items-center h-full border">
                Profile content
            </div>
            <div className="row-start-2 col-start-2 h-full flex justify-center items-center border">
                Main Content
            </div>
            <div className="row-start-2 col-start-3 h-full flex items-center justify-center border">
                Notifications Content
            </div>
            
            
        </div>
    )
}