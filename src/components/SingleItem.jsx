import styles from "./SingleItem.module.css";
import { useContext } from "react";
import AppContext from "../AppContext";
import StarsRating from "./StarsRating";
import { useState } from "react";
import { useEffect } from "react";

const SingleItem = (props) => {

const[bumper,setBumper] = useState(false)
const context = useContext(AppContext);


const btnClasses =`${styles.button} ${bumper ? styles.bump: ""}`

useEffect(()=>{
  if(context.items.length ===0){
      return
  }
  setBumper(true)

const timer = setTimeout(()=>{
  setBumper(false)  
},300)

return ()=>{
  clearTimeout(timer)
}


},[context.items])



  return (
    <div className={styles.singleItem}>
      <div className={styles.container}>
        <div className={styles.imageGallery}>
          <div className={styles.image1}>
            <img
              src={`images/plants/${props.details[0].imageGallery[0]}`}
              alt=""
            />
          </div>
          <div className={styles.image2}>
            <img
              src={`images/plants/${props.details[0].imageGallery[1]}`}
              alt=""
            />
          </div>
          <div className={styles.image3}>
            <img
              src={`images/plants/${props.details[0].imageGallery[2]}`}
              alt=""
            />
          </div>
          <div className={styles.image4}>
            <img
              src={`images/plants/${props.details[0].imageGallery[3]}`}
              alt=""
            />
          </div>
        </div>

        <div className={styles.buy}>
          <div>
            <span className={styles.name}>{props.details[0].name}</span>
            <span className={styles.price}>{`$${props.details[0].price}`}</span>
          </div>

          <div>
            <button
            className={btnClasses}
              type="button"
              onClick={() => context.addItem(props.details[0])}
            >
              Add to cart
            </button>
          </div>
          <div className={styles.facts}>
            <div>
              <img src="images/symbols/light.png" alt="" />
              <span>{props.details[0].light}</span>
            </div>{" "}
            <div>
              <img src="images/symbols/height.png" alt="" />
              <span>{props.details[0].growthHeight}</span>
            </div>
            <div>
              <img src="images/symbols/nutrientRequirements.png" alt="" />
              <span>{props.details[0].nutrientRequirements}</span>
            </div>
            <div>
              <img src="images/symbols/soilMoisture.png" alt="" />
              <span>{props.details[0].soilMoisture}</span>
            </div>
            <div>
              <img src="images/symbols/winterHardness.png" alt="" />
              <span>{props.details[0].winterHardness}</span>
            </div>
          </div>
        
        </div>

        <div className={styles.summary}>
          <div>
            <h3>{props.details[0].name}</h3>
            {props.details[0].description}
          </div>
          <div className={styles.starContainer}>
          <div className={styles.title}> Customer Reviews</div>
            <StarsRating
              starRating={{
                name: props.details[0].name,
                id: props.details[0]._id,
              }}
            />
          </div>
        </div>
       
        
      </div>
    </div>
  );
};

export default SingleItem;
