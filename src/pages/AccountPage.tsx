import SavedShows from "../components/SavedShows"

const AccountPage = () => {
    return (
      <>
        <div className="w-full text-white">
          <img 
            className="w-full h-[400px] object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/970e664f-2df4-47ce-b4fa-446082f5abc1/58026873-6d6d-4fef-a076-a390363ee759/DO-es-20220523-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
            alt="/" 
          />
          <div className="bg-black/60 fixed top-0 lef-0 w-full h-[500px]">
            <div className="absolute top-[20%] p-4 md:p-8">
              <h1 className="text-3xl md:text-5xl font-bold">My Shows</h1>
            </div>
          </div>
        </div>
        <SavedShows />
      </>
    )
}

export default AccountPage