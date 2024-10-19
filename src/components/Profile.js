import '../css/Profile.css';
import slide4Imge from '../images/img_04.jpg';

function Profile(){
    return(
        
        <div id="profile" class="contents">
          <div class="content_warp">
            <div class="p_img"><img src={slide4Imge} alt=""/></div>
            <h4>Hello! Welcome to 'Movie Shelter'!</h4>
            <p>
            This site was created to provide you with the opportunity to experience various movies.
            <br/>I hope that here you can share the joy, interest, and memories of movies. thank you!
            </p>
          </div>
        </div>
    )
}



export default Profile;