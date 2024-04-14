"use client";
import styles from "@/styles/WebLayout/navbar.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";
import Image from "next/image";

export default function NavBar() {
	const [navToggle, setNavToggle] = useState<boolean>(false);
	const [isAuth, setIsAuth] = useState<boolean>();
	const [cookie] = useCookies(["jwt"]);
	console.log(navToggle);

	useEffect(() => {
		if (cookie.jwt) setIsAuth(true);
		else setIsAuth(false);
	}, []);
	return (
		<nav
			className={styles.nav}
			// style={{ alignItems: `${navToggle ? "flex-start" : "center"}` }}
		>
			<Link href="/" className={styles.navTitle}>
				Кинопоиск
			</Link>
			<div className={`${styles.list} ${navToggle ? styles.active : ""}`}>
				<ul className={styles.listItems}>
					<li className={styles.listItem}>
						<Link
							href={"/films"}
							style={{ color: "#fff", textDecoration: "none" }}
						>
							Поиск
						</Link>
					</li>
				</ul>
				{!!isAuth ? (
					<Link href="/profile" className={styles.profileContainer}>
						{/* <Image
							src={"/user.svg"}
							width={32}
							height={32}
							alt="profile icon"
						/> */}

						<button className={styles.profileText}>Профиль</button>
					</Link>
				) : (
					<button className={styles.profileText}>
						<Link
							href="/authorization"
							style={{ textDecoration: "none", color: "#fff" }}
						>
							Войти
						</Link>
					</button>
				)}
			</div>

			<div
				className={styles.burgerMenu}
				onClick={() => setNavToggle(!navToggle)}
			>
				<span
					className={styles.burgerLine}
					style={{
						transform: `${navToggle ? "rotate(45deg) translate(5px, 0)" : ""}`,
					}}
				></span>
				<span
					className={`${styles.burgerLine}`}
					style={{ display: `${navToggle ? "none" : "block"}` }}
				></span>
				<span
					className={styles.burgerLine}
					style={{
						transform: `${navToggle ? "rotate(-45deg) translate(5px, 0)" : ""}`,
					}}
				></span>
			</div>
		</nav>
	);
}
