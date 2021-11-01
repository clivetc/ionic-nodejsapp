import { IonIcon } from '@ionic/react';
import './Addpost.css';
import {AiOutlineHeart} from "react-icons/ai";
import {FaRegComment} from "react-icons/fa";
import {BsShare} from "react-icons/bs"

const Add: React.FC = () => {
  return (
    <div className="container">
        <div className="card">
        <div className="card_image"></div>
        <div className="card_content">
        <h2 className="card_title">@Username</h2>
          <p className="card_text">User post and thought Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi atque dolore, labore eaque, ipsum iste eos delectus sed tempora accusantium distinctio reiciendis beatae iusto ab, autem dolor deserunt praesentium quo.</p>
          <div className="card_footer">
            <AiOutlineHeart style={{marginRight:'15px'}}/>
            <FaRegComment/>
            <BsShare style={{marginLeft:'15px'}}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;