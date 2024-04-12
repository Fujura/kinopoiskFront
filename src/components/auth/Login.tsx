import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styles from "@/styles/auth/login.module.css";
import { useRouter } from "next/router";

const API_LINK = process.env.NEXT_PUBLIC_API_LINK;

interface ILoginData {
	identifier: string;
	password: string;
}
const Login = () => {
	const [cookie, setCookie] = useCookies(["jwt"]);
	const router = useRouter();
	const [userData, setUserData] = useState<ILoginData>({
		identifier: "",
		password: "",
	});

	const loginUser = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(`${API_LINK}/api/auth/local`, userData);
			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + 365);
			setCookie("jwt", data.jwt, { expires: expirationDate });
			router.back();
		} catch (error) {
			console.log(error);
			setUserData((prevState) => ({
				...prevState,
				password: "",
			}));
		}
	};

	const changeData = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;

		setUserData((prevState) => ({ ...prevState, [name]: value }));
	};
	return (
		<div className={styles.formContainer}>
			<form onSubmit={loginUser} className={styles.form}>
				<label htmlFor="login" className={styles.formlabel}>
					Login
				</label>
				<input
					type="text"
					name="identifier"
					id="login"
					value={userData.identifier}
					onChange={changeData}
					className={styles.formInput}
				/>
				<label htmlFor="passw" className={styles.formlabel}>
					Password
				</label>
				<input
					type="password"
					name="password"
					id="passw"
					value={userData.password}
					onChange={changeData}
					className={styles.formInput}
				/>
				<button type="submit" className={styles.formButton}>
					Sign In
				</button>
			</form>
		</div>
	);
};

export default Login;
