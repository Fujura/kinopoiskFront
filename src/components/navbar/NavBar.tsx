"use client";
import styles from "@/styles/WebLayout/navbar.module.css";
import { useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";

export default function NavBar() {
	const [navToggle, setNavToggle] = useState(false);
	const [cookie] = useCookies(["jwt"]);
	console.log(navToggle);

	return (
		<nav
			className={styles.nav}
			// style={{ alignItems: `${navToggle ? "flex-start" : "center"}` }}
		>
			<h4 className={styles.navTitle}>Кинопоиск</h4>
			<div className={`${styles.list} ${navToggle ? styles.active : ""}`}>
				<ul className={styles.listItems}>
					<li className={styles.listItem}>Фильмы</li>
					<li className={styles.listItem}>Топ</li>
					<li className={styles.listItem}>Подборки</li>
					<li className={styles.listItem}>Лучшее</li>
				</ul>
				{cookie.jwt ? (
					<Link href="/profile">профиль</Link>
				) : (
					<button className={styles.btn}>
						<Link href="/authorization">Sign In</Link>
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
