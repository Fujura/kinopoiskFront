import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "@/styles/auth/register.module.css";

interface formData {
	username: string;
	email: string;
	password: string;
}

const Register = () => {
	const API_LINK = process.env.NEXT_PUBLIC_API_LINK;
	const [formData, setFormData] = useState<formData>({
		username: "",
		email: "",
		password: "",
	});

	const regUser = async (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.email && formData.username && formData.password) {
			try {
				const response = await axios.post(
					`${API_LINK}/api/auth/local/register`,
					formData
				);
				setFormData({ username: "", email: "", password: "" });
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("submit error");
		}
	};

	const changeData = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;

		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={regUser} className={styles.form}>
				<label htmlFor="username" className={styles.formlabel}>
					Имя пользователя
				</label>
				<input
					type="text"
					id="username"
					name="username"
					value={formData.username}
					className={styles.formInput}
					onChange={changeData}
				/>
				<label htmlFor="email" className={styles.formlabel}>
					Email
				</label>

				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					className={styles.formInput}
					onChange={changeData}
				/>

				<label htmlFor="username" className={styles.formlabel}>
					Password
				</label>

				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					className={styles.formInput}
					onChange={changeData}
				/>
				<button type="submit" className={styles.formButton}>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default Register;
