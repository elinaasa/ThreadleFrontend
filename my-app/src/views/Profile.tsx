import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <header className="p-header">
        <div className="p-settings">
        <ul className="p-settings"></ul>
            <li className="nav-li nav-icons">
              <Link to="/folder">
                <img src={'../folder.svg'} alt="folder" />
              </Link>
            </li>
            <li className="nav-li nav-icons">
              <Link to="/settings">
                <img src={'../settings p.svg'} alt="settings" />
              </Link>
            </li>
        <ul/>
        </div>

        <div className="p-div">
          <div>
            <img className="p-img" src="../artist.png" alt="artist" />
            <Link to="/edit">
            <img className="p-edit" src="../edit.svg" alt="edit" />
            </Link>

            <img src="" alt="" />
            <h1 className="p-h1">Artist name</h1>
            <p className="p-text">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus id,
              unde molestias blanditiis maxime quos eaque voluptates doloribus ducimus vel rerum
              saepe quisquam minima quia excepturi.
            </p>
          </div>

          <div className="p-box">
            <div className="container">

               <div className="inner-div">
                 <img className='highlight-img' src="artist_3.jpg" />
               </div>
           <div className="p-profile">
            <h3 className="highlight-text" >highlight</h3>
            <p className="highlight-text">

             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis totam libero labore, unde eius culpa non et voluptas omnis veritatis quod excepturi id ipsa sit doloribus nulla quisquam. Expedita, inventore.
            </p>
           </div>
          </div>
        </div>



          <div className="grid-container">
            <img className="p-images" src="../artist_3.jpg" alt="image1" />
            <img className="p-images" src="../artist_2.jpg" alt="image2" />
            <img className="p-images"src="../artist_1.jpg" alt="image3" />
            <img className="p-images" src="../artist_3.jpg" alt="image1" />
            <img className="p-images" src="../artist_2.jpg" alt="image2" />
            <img className="p-images"src="../artist_1.jpg" alt="image3" />
            <img className="p-images" src="../artist_3.jpg" alt="image1" />
            <img className="p-images" src="../artist_2.jpg" alt="image2" />
            <img className="p-images"src="../artist_1.jpg" alt="image3" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Profile;
