import React, { useState } from "react";
import Login from "@/components/auth/Login";
import Reg from "@/components/auth/Reg";
import styles from "@/styles/auth/auth.module.css";

const FormContainer = () => {
	// Состояние, чтобы отслеживать текущую выбранную форму
	const [isLogin, setIsLogin] = useState(true);

	// Функция для переключения между формами
	const toggleForm = () => {
		setIsLogin(!isLogin);
	};

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				{isLogin ? <Login /> : <Reg />}
			</div>
			<ul className={styles.leftSide}>
				<div className={styles.bgImage}></div>
				<div className={styles.leftSideContainer}>
					<h2 className={styles.authTitle}>
						Начните смотреть фильмы с нами, пройдите авторизацию!
					</h2>
					<ul className={styles.listContainer}>
						<li
							className={`${!isLogin ? styles.active : ""} ${styles.listItem}`}
							onClick={toggleForm}
						>
							Sign In
						</li>
						<li
							className={`${isLogin ? styles.active : ""} ${styles.listItem}`}
							onClick={toggleForm}
						>
							Sign Up
						</li>
					</ul>
				</div>
			</ul>
		</div>
	);
};

export default FormContainer;
