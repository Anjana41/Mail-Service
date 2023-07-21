import { useEffect, useState,Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// import success from ".../images/success.png";
import styles from "./styles.module.css";
import success from "src/Images/success.png";



const FreePlan = () => {

	

	return (
		<Fragment>
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img} />
					<h1>Plan Apply successfully</h1>
					<Link to="/dashboard">
						<button className={styles.green_btn}>Go to Dashboard</button>
					</Link>
				</div>
		
		
		</Fragment>
	);
};

export default FreePlan;